#!/usr/bin/env python3
"""Self-check for the course content (needs python3 + node).

    python3 tools/check_exercises.py

Verifies that, using the same harness the website runs in Pyodide:
  * every example marked runnable passes,
  * every reference solution passes,
  * every starter does NOT pass (so nobody gets a free tick),
  * for "write tests" exercises, the reference tests catch every bug.
"""
import json
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "assets"))
import harness  # noqa: E402

DUMP = """
const fs = require('fs'), vm = require('vm');
const ctx = {}; ctx.window = ctx;   // like a browser: window === global
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(process.argv[1], 'utf8'), ctx);
process.stdout.write(JSON.stringify(ctx.TDE));
"""
tde = json.loads(
    subprocess.run(
        ["node", "-e", DUMP, str(ROOT / "assets" / "content.js")],
        check=True, capture_output=True, text=True,
    ).stdout
)

failures = []


def check(label, cond, detail=""):
    print(("  ok   " if cond else "  FAIL ") + label)
    if not cond:
        failures.append(label)
        if detail:
            print("       " + detail)


def brief(res):
    bad = [r for r in res["results"] if not r["ok"]]
    return res.get("error") or (bad[0]["name"] + ": " + str(bad[0]["error"]) if bad else res.get("note", ""))


print("Examples")
for ex in tde["EXAMPLES"] + tde.get("PY_EXAMPLES", []):
    if ex["runnable"]:
        res = harness.handle({"mode": "example", "user": ex["code"]})
        check(ex["title"], res["passed"] and not res["error"] and res["results"], brief(res))
    else:
        check(ex["title"] + " (static, has code)", len(ex["code"]) > 50)

print("Exercises")
for ex in tde["EXERCISES"] + tde.get("PY_EXERCISES", []):
    print(f" {ex['id']} [{ex['kind']}]")
    if ex["kind"] == "implement":
        req = lambda code: {"mode": "implement", "user": code, "tests": ex["tests"]}
        res = harness.handle(req(ex["solution"]))
        check("solution passes", res["passed"], brief(res))
        res = harness.handle(req(ex["starter"]))
        check("starter does not pass", not res["passed"])
    else:
        base = {"mode": "tests", "good": ex["good"], "mutants": ex["mutants"], "minTests": ex["minTests"]}
        res = harness.handle({**base, "user": ex["solution"]})
        check("solution catches every bug", res["passed"], brief(res))
        res = harness.handle({**base, "user": ex["starter"]})
        check("starter does not pass", not res["passed"])
        check("starter is valid on the good version", all(r["ok"] for r in res["results"] if r.get("group") == "tests"), brief(res))
        # each bug must be catchable on its own, i.e. none is equivalent to the good code
        for i, m in enumerate(ex["mutants"], 1):
            check(f"bug {i} differs from correct code", m["code"].strip() != ex["good"].strip())
    check("has hints", len(ex["hints"]) >= 2)

ids = [e["id"] for e in tde["EXAMPLES"] + tde.get("PY_EXAMPLES", [])]
check("example ids are unique", len(ids) == len(set(ids)))
ids = [e["id"] for e in tde["EXERCISES"] + tde.get("PY_EXERCISES", [])]
check("exercise ids are unique", len(ids) == len(set(ids)))

print("Glossary and cooling data")
seen = set()
for grp in tde["GLOSSARY"]:
    for item in grp["items"]:
        ok = len(item) == 3 and all(isinstance(x, str) and x.strip() for x in item)
        key = (grp["id"], item[0])
        check(f"{grp['id']}: {item[0]}", ok and key not in seen)
        seen.add(key)
criteria = [k for k, _ in tde["COOLING"]["criteria"]]
for m in tde["COOLING"]["methods"]:
    missing = [k for k in criteria if not m.get(k, "").strip()]
    check(f"cooling method {m['id']} has every criterion", not missing, ", ".join(missing))
for grp in tde.get("FAB_CHECKS", []):
    check(f"checklist group {grp['id']} has items", len(grp["items"]) >= 3 and all(isinstance(i, str) and i.strip() for i in grp["items"]))
for dname, d in tde["DIAGRAMS"].items():
    check(f"diagram {dname} has detail text", all(v["title"] and v["body"] for v in d.values()))

print()
if failures:
    print(f"{len(failures)} check(s) FAILED")
    sys.exit(1)
print("All checks passed")
