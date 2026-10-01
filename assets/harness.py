"""Tiny pytest-compatible harness used by the TDE training site.

It runs inside Pyodide (in a Web Worker) but is plain Python, so it can also be
exercised locally with `python3 tools/check_exercises.py`.

Supported pytest subset: plain `test_*` functions, `pytest.raises`,
`pytest.approx`, `@pytest.fixture` (incl. yield fixtures) and
`@pytest.mark.parametrize` (stackable).
"""
import builtins
import contextlib
import inspect
import io
import re
import sys
import traceback
import types

_abs = builtins.abs
SOURCES = {}  # filename -> source, used to quote the failing line


# ---------------------------------------------------------------- pytest shim
class _Raises:
    def __init__(self, exc, match=None):
        self.exc, self.match, self.value = exc, match, None

    def __enter__(self):
        return self

    def __exit__(self, et, ev, tb):
        if et is None:
            raise AssertionError(f"DID NOT RAISE {self.exc}")
        if not issubclass(et, self.exc):
            return False
        if self.match and not re.search(self.match, str(ev)):
            raise AssertionError(f"Pattern {self.match!r} not found in {str(ev)!r}")
        self.value = ev
        return True


def raises(exc, match=None):
    return _Raises(exc, match)


class _Approx:
    def __init__(self, expected, rel=1e-6, abs=1e-12):
        self.expected, self.rel, self.abs_tol = expected, rel, abs

    def __eq__(self, other):
        tol = max(self.rel * _abs(self.expected), self.abs_tol)
        return _abs(other - self.expected) <= tol

    def __repr__(self):
        return f"approx({self.expected!r})"


def approx(expected, rel=1e-6, abs=1e-12):
    return _Approx(expected, rel, abs)


def fixture(fn=None, **_kwargs):
    def mark(f):
        f._is_fixture = True
        return f

    return mark(fn) if fn is not None else mark


class _Mark:
    @staticmethod
    def parametrize(names, values, ids=None):
        if isinstance(names, str):
            names = [n.strip() for n in names.split(",")]

        def deco(f):
            f._params = getattr(f, "_params", []) + [(names, list(values))]
            return f

        return deco


def _install_pytest_shim():
    m = types.ModuleType("pytest")
    m.raises, m.approx, m.fixture, m.mark = raises, approx, fixture, _Mark()
    sys.modules["pytest"] = m


_install_pytest_shim()


# ------------------------------------------------------------------- running
def _location(exc):
    frames = [f for f in traceback.extract_tb(exc.__traceback__) if f.filename in SOURCES]
    if not frames:
        return ""
    f = frames[-1]
    lines = SOURCES[f.filename].splitlines()
    text = lines[f.lineno - 1].strip() if 0 < f.lineno <= len(lines) else ""
    where = {"<tests>": "hidden test", "<sut>": "reference"}.get(f.filename, "line")
    return f"  [{where} {f.lineno}: {text}]"


def _format(e):
    msg = str(e)
    head = f"{type(e).__name__}: {msg}" if msg else type(e).__name__
    return head + _location(e)


def _new_ns():
    return {"__name__": "__training__"}


def _exec(src, filename, ns):
    exec(compile(src, filename, "exec"), ns)


def _collect(ns, only=None):
    out = []
    for name, fn in list(ns.items()):
        if not (name.startswith("test_") and callable(fn)) or getattr(fn, "_is_fixture", False):
            continue
        if only is not None and name not in only:
            continue
        params = getattr(fn, "_params", None)
        if not params:
            out.append((name, fn, {}))
            continue
        combos = [{}]
        for names, values in params:
            combos = [
                {**c, **dict(zip(names, v if len(names) > 1 else (v,)))}
                for c in combos
                for v in values
            ]
        for c in combos:
            out.append((f"{name}[{'-'.join(map(str, c.values()))}]", fn, c))
    return out


def _resolve(name, ns, cache, finalizers):
    if name in cache:
        return cache[name]
    fx = ns[name]
    kwargs = {
        p: _resolve(p, ns, cache, finalizers)
        for p in inspect.signature(fx).parameters
        if getattr(ns.get(p), "_is_fixture", False)
    }
    value = fx(**kwargs)
    if inspect.isgenerator(value):
        finalizers.append(value)
        value = next(value)
    cache[name] = value
    return value


def _run_one(fn, ns, params):
    """Return None on success, or an error string."""
    cache, finalizers = {}, []
    error = None
    try:
        kwargs = {}
        for p in inspect.signature(fn).parameters:
            if p in params:
                kwargs[p] = params[p]
            elif getattr(ns.get(p), "_is_fixture", False):
                kwargs[p] = _resolve(p, ns, cache, finalizers)
            else:
                raise TypeError(f"fixture {p!r} not found")
        fn(**kwargs)
    except Exception as e:  # noqa: BLE001 - we report everything
        error = _format(e)
    for gen in reversed(finalizers):
        try:
            next(gen)
        except StopIteration:
            pass
        except Exception as e:  # noqa: BLE001
            error = error or "teardown " + _format(e)
    return error


def _run_suite(ns, only=None):
    results = []
    for name, fn, params in _collect(ns, only):
        err = _run_one(fn, ns, params)
        results.append({"name": name, "ok": err is None, "error": err})
    return results


# ------------------------------------------------------------------ requests
def _dispatch(req, out):
    mode = req["mode"]

    if mode == "example":
        ns = _new_ns()
        _exec(req["user"], "<user>", ns)
        out["results"] = _run_suite(ns)
        out["passed"] = all(r["ok"] for r in out["results"])
        if not out["results"]:
            out["note"] = "Code ran. No test_* functions were found."

    elif mode == "implement":
        ns = _new_ns()
        _exec(req["user"], "<user>", ns)
        tns = dict(ns)
        _exec(req["tests"], "<tests>", tns)
        defined = {k for k, v in tns.items() if k not in ns or v is not ns[k]}
        out["results"] = _run_suite(tns, only=defined)
        out["passed"] = bool(out["results"]) and all(r["ok"] for r in out["results"])
        n_ok = sum(r["ok"] for r in out["results"])
        out["note"] = f"{n_ok}/{len(out['results'])} hidden tests passed"

    elif mode == "tests":

        def build(impl):
            ns = _new_ns()
            _exec(req["user"], "<user>", ns)
            _exec(impl, "<sut>", ns)  # SUT defined last so tests cannot shadow it
            return ns

        good = _run_suite(build(req["good"]))
        out["results"] = [dict(r, group="tests") for r in good]
        need = req.get("minTests", 1)
        if len(good) < need:
            out["note"] = f"Write at least {need} tests (found {len(good)})."
            return
        if not all(r["ok"] for r in good):
            out["note"] = (
                "Some of your tests fail on the correct implementation. "
                "Fix them first - the spec is the source of truth."
            )
            return
        caught = 0
        for i, m in enumerate(req["mutants"], 1):
            res = _run_suite(build(m["code"]))
            killed = any(not r["ok"] for r in res)
            caught += killed
            out["results"].append(
                {
                    "name": f"Bug {i}",
                    "ok": killed,
                    "group": "bugs",
                    "error": None if killed else "Your tests did not detect this bug",
                }
            )
        out["passed"] = caught == len(req["mutants"])
        out["note"] = f"{caught}/{len(req['mutants'])} bugs caught"

    else:
        raise ValueError(f"unknown mode {mode!r}")


def handle(req):
    out = {"mode": req["mode"], "results": [], "stdout": "", "error": None, "passed": False, "note": ""}
    SOURCES.clear()
    SOURCES["<user>"] = req.get("user", "")
    if req.get("tests"):
        SOURCES["<tests>"] = req["tests"]
    buf = io.StringIO()
    try:
        with contextlib.redirect_stdout(buf), contextlib.redirect_stderr(buf):
            _dispatch(req, out)
    except SyntaxError as e:
        out["error"] = f"SyntaxError: {e.msg} (line {e.lineno})"
    except Exception as e:  # noqa: BLE001
        out["error"] = _format(e)
        out["passed"] = False
    out["stdout"] = buf.getvalue()[:20000]
    return out
