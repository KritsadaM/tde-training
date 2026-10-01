/* TDE Training site: interactivity. No build step, no dependencies. */
(() => {
  "use strict";

  /* the "?v=..." stamped on this script's URL (see tools/stamp_assets.py), passed on to the worker */
  const ASSET_V = (document.currentScript && new URL(document.currentScript.src).search) || "";

  /* hooks filled in by the builders and by setupNavigation() */
  const TDEUI = (window.TDEUI = { sync() {}, refreshNav() {}, selectExample: null, openExercise: null, selectGlossary: null });

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) node.setAttribute(k, v === true ? "" : v);
    }
    for (const c of children.flat()) if (c != null) node.append(c);
    return node;
  }

  /* ------------------------------------------------------------ storage */
  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode etc. */ }
    },
  };

  /* ------------------------------------------------------------ syntax highlighting */
  const PY_RE = /(#[^\n]*)|((?:[fFrRbB]{1,2})?(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'))|(@[A-Za-z_][\w.]*)|\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|is|None|True|False|with|as|try|except|raise|yield|lambda|assert|pass|break|continue|finally|global|nonlocal|async|await|self)\b|\b(\d+(?:\.\d+)?)\b|\b(print|len|range|isinstance|sorted|sum|min|max|dict|list|set|str|int|float|enumerate|zip|any|all|abs|round|super|type)\b(?=\()/g;
  const PY_CLASSES = [null, "tk-c", "tk-s", "tk-d", "tk-k", "tk-n", "tk-b"];

  function highlightPython(code) {
    let out = "", last = 0;
    for (const m of code.matchAll(PY_RE)) {
      out += esc(code.slice(last, m.index));
      const group = m.findIndex((g, i) => i > 0 && g !== undefined);
      out += `<span class="${PY_CLASSES[group]}">${esc(m[0])}</span>`;
      last = m.index + m[0].length;
    }
    return out + esc(code.slice(last));
  }

  function highlightYaml(code) {
    return code.split("\n").map((line) => {
      const hash = line.search(/(^|\s)#/);
      const comment = hash >= 0 ? line.slice(hash) : "";
      const body = hash >= 0 ? line.slice(0, hash) : line;
      const m = body.match(/^(\s*(?:-\s+)?)([\w.-]+)(:)(.*)$/);
      const rest = (t) => esc(t).replace(/(&quot;.*?&quot;)/g, '<span class="tk-s">$1</span>');
      const html = m ? `${esc(m[1])}<span class="tk-k">${esc(m[2])}</span>${m[3]}${rest(m[4])}` : rest(body);
      return html + (comment ? `<span class="tk-c">${esc(comment)}</span>` : "");
    }).join("\n");
  }

  const highlight = (code, lang) => (lang === "yaml" ? highlightYaml(code) : highlightPython(code));

  function codeBlock(code, lang = "python") {
    const pre = el("pre", { class: "code" }, el("code", { html: highlight(code.replace(/\n$/, ""), lang) }));
    const btn = el("button", { class: "copy", type: "button", "aria-label": "Copy code" }, "Copy");
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = "Copied";
      } catch { btn.textContent = "Press Ctrl+C"; }
      setTimeout(() => (btn.textContent = "Copy"), 1500);
    });
    return el("div", { class: "code-wrap" }, btn, pre);
  }

  /* ------------------------------------------------------------ Python runner (Web Worker) */
  const Py = (() => {
    let worker = null, ready = null, nextId = 1;
    const pending = new Map();

    function start() {
      worker = new Worker("assets/py-worker.js" + ASSET_V);
      ready = new Promise((resolve, reject) => {
        worker.onmessage = (e) => {
          const m = e.data;
          if (m.type === "ready") resolve();
          else if (m.type === "init-error") reject(new Error(m.message));
          else if (m.type === "result") {
            const p = pending.get(m.id);
            if (p) { pending.delete(m.id); p(m.result); }
          }
        };
        worker.onerror = (e) => reject(new Error(e.message || "The Python worker could not start."));
      });
      ready.catch(() => {});
    }

    function stop(reason) {
      if (worker) worker.terminate();
      worker = null; ready = null;
      for (const resolve of pending.values()) resolve(failure(reason));
      pending.clear();
    }

    const failure = (error) => ({ error, results: [], stdout: "", passed: false, note: "" });

    async function run(req, { timeoutMs = 10000, onStatus = () => {} } = {}) {
      if (location.protocol === "file:") {
        return failure("Browsers block Web Workers on file:// pages. Serve the folder instead: run `python3 -m http.server` in it and open http://localhost:8000.");
      }
      if (!worker) {
        onStatus("Loading the Python runtime (first run only, about 10 MB)…");
        start();
      }
      try {
        await ready;
      } catch (err) {
        stop(String(err.message));
        return failure("Could not load the Python runtime. Check your connection (it is fetched from cdn.jsdelivr.net) and try again.");
      }
      onStatus("Running…");
      const id = nextId++;
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          pending.delete(id);
          stop("Run cancelled.");
          resolve(failure(`Stopped after ${timeoutMs / 1000}s. Is there an infinite loop?`));
        }, timeoutMs);
        pending.set(id, (result) => { clearTimeout(timer); resolve(result); });
        worker.postMessage({ id, req });
      });
    }
    return { run };
  })();

  /* ------------------------------------------------------------ editor + output widgets */
  function makeEditor(code, { onRun, onChange } = {}) {
    const ta = el("textarea", {
      class: "editor", spellcheck: false, autocomplete: "off", autocapitalize: "off",
      "aria-label": "Python code editor",
    });
    ta.value = code;
    const fit = () => { ta.rows = Math.min(30, Math.max(9, ta.value.split("\n").length + 1)); };
    fit();
    ta.addEventListener("input", () => { fit(); onChange && onChange(ta.value); });
    ta.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        const { selectionStart: s, selectionEnd: t } = ta;
        ta.setRangeText("    ", s, t, "end");
        ta.dispatchEvent(new Event("input"));
      } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onRun && onRun();
      }
    });
    ta.setValue = (v) => { ta.value = v; fit(); };
    return ta;
  }

  function renderResult(box, res, { passText = "All tests passed" } = {}) {
    box.className = "output";
    box.replaceChildren();
    const kind = res.error ? "error" : res.passed ? "pass" : "fail";
    const total = res.results.length;
    const title = res.error ? "Error" : res.passed ? passText : "Not there yet";
    box.classList.add(kind);
    box.append(el("div", { class: "banner" }, el("strong", {}, title), res.note && !res.error ? el("span", {}, res.note) : null));
    if (res.error) box.append(el("pre", { class: "err" }, res.error));

    const groups = { tests: "Your tests on the correct version", bugs: "Hidden bugs" };
    const list = (items) => el("ul", { class: "results" }, items.map((r) => el("li", { class: r.ok ? "ok" : "bad" },
      el("span", { class: "mark", "aria-hidden": "true" }, r.ok ? "✓" : "✗"),
      el("span", { class: "rname" }, r.name),
      !r.ok && r.error ? el("pre", { class: "rerr" }, r.error) : null)));
    if (total) {
      if (res.results.some((r) => r.group)) {
        for (const g of ["tests", "bugs"]) {
          const items = res.results.filter((r) => r.group === g);
          if (items.length) box.append(el("h5", {}, groups[g]), list(items));
        }
      } else {
        box.append(list(res.results));
      }
    }
    if (res.stdout) box.append(el("h5", {}, "Output"), el("pre", { class: "stdout" }, res.stdout));
  }

  /* ------------------------------------------------------------ progress */
  const progress = {
    done: store.get("tde.progress", {}),
    mark(id) { this.done[id] = true; store.set("tde.progress", this.done); this.paint(); },
    paint() {
      const total = TDE.EXERCISES.length;
      const n = TDE.EXERCISES.filter((e) => this.done[e.id]).length;
      $$("[data-progress-count]").forEach((n_) => (n_.textContent = `${n}/${total}`));
      const bar = $("#progress-bar");
      if (bar) bar.style.setProperty("--p", `${(n / total) * 100}%`);
      $$("[data-ex-id]").forEach((b) => b.classList.toggle("done", !!this.done[b.dataset.exId]));
      TDEUI.refreshNav();
    },
  };

  /* ------------------------------------------------------------ examples */
  function buildExamples() {
    const root = $("#examples-root");
    const tabs = el("div", { class: "tabs", role: "tablist", "aria-label": "Code examples" });
    const panels = el("div", { class: "tabpanels" });
    root.append(tabs, panels);

    const select = (id) => {
      $$("[role=tab]", tabs).forEach((t) => {
        const on = t.dataset.id === id;
        t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1;
      });
      $$(".tabpanel", panels).forEach((p) => (p.hidden = p.dataset.id !== id));
    };

    TDE.EXAMPLES.forEach((ex, i) => {
      const tab = el("button", { role: "tab", type: "button", "data-id": ex.id, id: `tab-${ex.id}`, "aria-controls": `panel-${ex.id}` }, ex.title);
      tab.addEventListener("click", () => { select(ex.id); TDEUI.sync("examples", ex.id); });
      tab.addEventListener("keydown", (e) => {
        const all = $$("[role=tab]", tabs);
        const idx = all.indexOf(tab);
        const next = e.key === "ArrowRight" ? idx + 1 : e.key === "ArrowLeft" ? idx - 1 : null;
        if (next == null) return;
        e.preventDefault();
        const target = all[(next + all.length) % all.length];
        target.focus(); select(target.dataset.id); TDEUI.sync("examples", target.dataset.id);
      });
      tabs.append(tab);

      const panel = el("div", { class: "tabpanel", role: "tabpanel", id: `panel-${ex.id}`, "aria-labelledby": `tab-${ex.id}`, "data-id": ex.id, hidden: true });
      panel.append(el("p", { class: "lead", html: ex.intro }));
      if (ex.runnable) {
        const out = el("div", { class: "output empty" }, "Press Run to execute the tests in your browser.");
        const run = async () => {
          runBtn.disabled = true; out.className = "output"; out.textContent = "";
          const status = (t) => { out.className = "output busy"; out.textContent = t; };
          const res = await Py.run({ mode: "example", user: editor.value }, { onStatus: status });
          renderResult(out, res); runBtn.disabled = false;
        };
        const editor = makeEditor(ex.code, { onRun: run });
        const runBtn = el("button", { class: "btn primary", type: "button", onclick: run }, "Run tests ", el("kbd", {}, "⌘/Ctrl+Enter"));
        const reset = el("button", { class: "btn", type: "button", onclick: () => editor.setValue(ex.code) }, "Reset");
        panel.append(editor, el("div", { class: "actions" }, runBtn, reset, el("span", { class: "tag" }, "Editable · runs in your browser")), out);
      } else {
        panel.append(codeBlock(ex.code, ex.lang || "python"), el("p", { class: "tag" }, "Read-only: needs external packages or services"));
      }
      panels.append(panel);
      if (i === 0) select(ex.id);
    });
    TDEUI.selectExample = (id) => { if (TDE.EXAMPLES.some((e) => e.id === id)) select(id); };
  }

  /* ------------------------------------------------------------ exercises */
  function buildExercises() {
    const root = $("#practice-root");
    const list = el("ol", { class: "ex-list" });
    const panel = el("div", { class: "ex-panel" });
    root.append(list, panel);
    const levelClass = { Easy: "easy", Medium: "medium", Hard: "hard" };

    TDE.EXERCISES.forEach((ex, i) => {
      list.append(el("li", {}, el("button", { type: "button", class: "ex-item", "data-ex-id": ex.id, onclick: () => { open(i); TDEUI.sync("practice", ex.id); } },
        el("span", { class: "num" }, String(i + 1)),
        el("span", { class: "ex-title" }, ex.title, el("small", {}, ex.summary)),
        el("span", { class: `chip ${levelClass[ex.level]}` }, ex.level),
        el("span", { class: "check", "aria-label": "Solved" }, "✓"))));
    });

    function open(index) {
      const ex = TDE.EXERCISES[index];
      store.set("tde.lastExercise", index);
      $$(".ex-item", list).forEach((b, j) => b.classList.toggle("current", j === index));
      let shownHints = 0;
      const saved = store.get(`tde.code.${ex.id}`, null);

      const out = el("div", { class: "output empty" }, "Press Run to check your work.");
      const hintBox = el("div", { class: "hints" });
      const solBox = el("div", { class: "solution" });
      const editor = makeEditor(saved ?? ex.starter, {
        onRun: run, onChange: (v) => store.set(`tde.code.${ex.id}`, v),
      });

      async function run() {
        runBtn.disabled = true;
        const status = (t) => { out.className = "output busy"; out.textContent = t; };
        status("Starting…");
        const req = ex.kind === "implement"
          ? { mode: "implement", user: editor.value, tests: ex.tests }
          : { mode: "tests", user: editor.value, good: ex.good, mutants: ex.mutants, minTests: ex.minTests };
        const res = await Py.run(req, { onStatus: status });
        renderResult(out, res, { passText: ex.kind === "implement" ? "All hidden tests passed" : "Every bug caught" });
        if (res.passed) {
          progress.mark(ex.id);
          if (index + 1 < TDE.EXERCISES.length) {
            out.append(el("button", { class: "btn primary next", type: "button", onclick: () => { open(index + 1); TDEUI.sync("practice", TDE.EXERCISES[index + 1].id); panel.scrollIntoView({ behavior: "smooth", block: "start" }); } }, "Next exercise →"));
          } else {
            out.append(el("p", { class: "finish" }, "That was the last one. You have finished the course. 🎉"));
          }
        }
        runBtn.disabled = false;
      }

      const runBtn = el("button", { class: "btn primary", type: "button", onclick: run }, "Run ", el("kbd", {}, "⌘/Ctrl+Enter"));
      const hintBtn = el("button", { class: "btn", type: "button" }, `Hint (0/${ex.hints.length})`);
      hintBtn.addEventListener("click", () => {
        if (shownHints >= ex.hints.length) return;
        hintBox.append(el("div", { class: "hint", html: `<b>Hint ${shownHints + 1}.</b> ${ex.hints[shownHints]}` }));
        shownHints++;
        hintBtn.textContent = `Hint (${shownHints}/${ex.hints.length})`;
        if (shownHints >= ex.hints.length) hintBtn.disabled = true;
      });
      const solBtn = el("button", { class: "btn", type: "button" }, "Show solution");
      solBtn.addEventListener("click", () => {
        if (solBox.childElementCount) { solBox.replaceChildren(); solBtn.textContent = "Show solution"; return; }
        solBox.append(el("p", { class: "tag" }, "Compare with yours. There is often more than one good answer."), codeBlock(ex.solution));
        solBtn.textContent = "Hide solution";
      });
      const resetBtn = el("button", { class: "btn ghost", type: "button", onclick: () => {
        if (confirm("Replace your code with the starter code?")) { editor.setValue(ex.starter); store.set(`tde.code.${ex.id}`, ex.starter); }
      } }, "Reset");

      panel.replaceChildren(
        el("div", { class: "ex-head" },
          el("span", { class: `chip ${levelClass[ex.level]}` }, ex.level),
          el("span", { class: "chip kind" }, ex.kind === "implement" ? "Implement the function" : "Write the tests"),
          el("h3", {}, `${index + 1}. ${ex.title}`)),
        el("div", { class: "brief", html: ex.brief }),
        editor,
        el("div", { class: "actions" }, runBtn, hintBtn, solBtn, resetBtn),
        hintBox, solBox, out);
    }

    TDEUI.openExercise = (id) => { const i = TDE.EXERCISES.findIndex((e) => e.id === id); if (i >= 0) open(i); };
    open(Math.min(store.get("tde.lastExercise", 0), TDE.EXERCISES.length - 1));
  }

  /* ------------------------------------------------------------ diagrams */
  function bindDiagram(svgId, panelId, data, firstKey) {
    const svg = $(`#${svgId}`), panel = $(`#${panelId}`);
    if (!svg || !panel) return;
    const nodes = $$("[data-key]", svg);
    const select = (key) => {
      nodes.forEach((n) => { const on = n.dataset.key === key; n.classList.toggle("active", on); n.setAttribute("aria-pressed", on); });
      const d = data[key];
      panel.innerHTML = `<h4>${esc(d.title)}</h4>${d.body}`;
    };
    nodes.forEach((n) => {
      n.setAttribute("tabindex", "0"); n.setAttribute("role", "button");
      n.setAttribute("aria-label", data[n.dataset.key].title);
      n.addEventListener("click", () => select(n.dataset.key));
      n.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(n.dataset.key); } });
    });
    select(firstKey);
  }

  /* ------------------------------------------------------------ glossary */
  /* One topic at a time (short page). Searching looks across every topic. */
  function buildGlossary() {
    const root = $("#glossary-root");
    if (!root || !TDE.GLOSSARY) return;
    const search = $("#gl-search"), filters = $("#gl-filters"), empty = $("#gl-empty"), count = $("#gl-count");
    const total = TDE.GLOSSARY.reduce((n, g) => n + g.items.length, 0);
    let topic = store.get("tde.glossaryTopic", TDE.GLOSSARY[0].id);
    if (!TDE.GLOSSARY.some((g) => g.id === topic)) topic = TDE.GLOSSARY[0].id;

    const groups = TDE.GLOSSARY.map((g) => {
      const rows = g.items.map(([acr, full, plain]) => {
        const row = el("div", { class: "gl-row" }, el("dt", {}), el("dd", { class: "full" }), el("dd", { class: "plain" }));
        row._cells = [acr, full, plain];
        row._text = `${acr} ${full} ${plain}`.toLowerCase();
        return row;
      });
      const heading = el("h3", {}, g.title, el("small", {}));
      const section = el("section", { class: "gl-group", id: `gl-${g.id}` }, heading, el("p", {}, g.intro), el("dl", {}, rows));
      root.append(section);
      return { g, rows, section, heading };
    });

    const buttons = TDE.GLOSSARY.map((g) => {
      const b = el("button", { type: "button" }, el("span", {}, g.title), el("em", {}, String(g.items.length)));
      b.addEventListener("click", () => {
        topic = g.id; store.set("tde.glossaryTopic", topic);
        search.value = "";
        apply();
        TDEUI.sync("glossary", g.id);
      });
      filters.append(b);
      return b;
    });

    const mark = (text, q) => {
      const i = q ? text.toLowerCase().indexOf(q) : -1;
      return i < 0 ? esc(text) : `${esc(text.slice(0, i))}<mark>${esc(text.slice(i, i + q.length))}</mark>${esc(text.slice(i + q.length))}`;
    };

    function apply() {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      groups.forEach(({ g, rows, section, heading }, i) => {
        let n = 0;
        for (const row of rows) {
          const hit = q ? row._text.includes(q) : g.id === topic;
          row.hidden = !hit;
          if (hit) {
            n++;
            [0, 1, 2].forEach((c) => (row.children[c].innerHTML = mark(row._cells[c], q)));
          }
        }
        section.hidden = n === 0;
        $("small", heading).textContent = `${n} ${n === 1 ? "term" : "terms"}`;
        buttons[i].setAttribute("aria-pressed", !q && g.id === topic);
        shown += n;
      });
      empty.hidden = shown > 0;
      count.textContent = q ? `${shown} of ${total} terms match, across all topics` : `${total} terms in ${groups.length} topics`;
    }
    search.addEventListener("input", apply);
    TDEUI.selectGlossary = (id) => {
      if (!TDE.GLOSSARY.some((g) => g.id === id)) return;
      topic = id; store.set("tde.glossaryTopic", topic); search.value = ""; apply();
    };
    apply();
  }

  /* ------------------------------------------------------------ cooling page */
  function buildCooling() {
    if (!$("#cooling-calc") || !TDE.COOLING) return;

    // --- why liquid: heat per volume calculator
    const kw = $("#calc-kw"), dta = $("#calc-dta"), dtw = $("#calc-dtw");
    const fmt = (n, d = 0) => n.toLocaleString("en-US", { maximumFractionDigits: d });
    function calc() {
      const P = +kw.value, Ta = +dta.value, Tw = +dtw.value;
      const ok = P > 0 && Ta > 0 && Tw > 0;
      if (!ok) {
        ["air", "water", "ratio"].forEach((k) => ($(`#calc-${k}`).textContent = "–"));
        $("#calc-air2").textContent = $("#calc-water2").textContent = "";
        return;
      }
      const airM3s = (P * 1000) / (1005 * 1.2 * Ta);          // W / (cp * rho * dT)
      const waterM3s = (P * 1000) / (4180 * 997 * Tw);
      const lpm = waterM3s * 1000 * 60;
      $("#calc-air").textContent = `${fmt(airM3s * 2118.88)} CFM`;
      $("#calc-air2").textContent = `${fmt(airM3s * 3600)} m³/h`;
      $("#calc-water").textContent = `${fmt(lpm, 1)} L/min`;
      $("#calc-water2").textContent = `${fmt(lpm / 3.78541, 1)} GPM`;
      $("#calc-ratio").textContent = `${fmt(airM3s / waterM3s)}×`;
    }
    [kw, dta, dtw].forEach((i) => i.addEventListener("input", calc));
    calc();

    // --- compare the methods side by side
    const { methods, criteria } = TDE.COOLING;
    const valid = new Set(methods.map((m) => m.id));
    let selected = store.get("tde.cmp", ["air", "dlc", "imm1"]).filter((id) => valid.has(id));
    if (!selected.length) selected = ["air", "dlc", "imm1"];
    const chips = $("#cmp-chips"), table = $("#cmp-table");

    function render() {
      $$("button", chips).forEach((b) => b.setAttribute("aria-pressed", selected.includes(b.dataset.id)));
      const cols = methods.filter((m) => selected.includes(m.id));
      const head = el("thead", {}, el("tr", {}, el("th", { scope: "col" }, ""), cols.map((m) => el("th", { scope: "col", class: m.id === "dlc" ? "focus" : "" }, m.name))));
      const body = el("tbody", {}, criteria.map(([key, label]) =>
        el("tr", { class: key === "tde" ? "hl" : "" }, el("th", { scope: "row" }, label), cols.map((m) => el("td", {}, m[key])))));
      table.style.setProperty("--n", cols.length);
      table.replaceChildren(head, body);
    }

    methods.forEach((m) => {
      const b = el("button", { type: "button", "data-id": m.id }, m.short);
      b.addEventListener("click", () => {
        if (selected.includes(m.id)) { if (selected.length === 1) return; selected = selected.filter((x) => x !== m.id); }
        else selected = methods.filter((x) => selected.includes(x.id) || x.id === m.id).map((x) => x.id);
        store.set("tde.cmp", selected);
        render();
      });
      chips.append(b);
    });
    render();
  }

  /* ------------------------------------------------------------ capacity and cost calculators */
  function buildPlanning() {
    if (!$("#cap-calc")) return;
    const num = (id) => parseFloat($(`#${id}`).value);
    const fmt = (n, d = 0) => n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });
    const blank = (ids) => ids.forEach((id) => { $(`#${id}`).textContent = "–"; });

    function capacity() {
      const demand = num("cap-demand"), hours = num("cap-hours"), cycle = num("cap-cycle");
      const units = num("cap-units"), retest = num("cap-retest") / 100, uptime = num("cap-uptime") / 100;
      if (!(demand >= 0 && hours > 0 && cycle > 0 && units >= 1 && retest >= 0 && uptime > 0 && uptime <= 1)) {
        blank(["cap-n", "cap-util", "cap-capacity", "cap-takt"]); $("#cap-exact").textContent = ""; return;
      }
      const line = hours * 3600;
      const perUnit = (cycle * (1 + retest)) / units;           // seconds of tester time per unit
      const exact = (demand * perUnit) / (line * uptime);
      const n = demand === 0 ? 0 : Math.ceil(exact - 1e-9);
      $("#cap-n").textContent = fmt(n);
      $("#cap-exact").textContent = `${fmt(exact, 2)} before rounding up`;
      $("#cap-util").textContent = n ? `${fmt((exact / n) * 100)}%` : "–";
      $("#cap-capacity").textContent = n ? fmt((n * line * uptime) / perUnit) : "0";
      $("#cap-takt").textContent = demand ? `${fmt(line / demand, 1)} s` : "–";
    }
    ["cap-demand", "cap-hours", "cap-cycle", "cap-units", "cap-retest", "cap-uptime"].forEach((id) => $(`#${id}`).addEventListener("input", capacity));
    capacity();

    function cost() {
      const capex = num("cost-capex"), nre = num("cost-nre"), life = num("cost-life"), annual = num("cost-annual"), run = num("cost-run");
      if (!(capex >= 0 && nre >= 0 && life > 0 && annual > 0 && run >= 0)) { blank(["cost-total", "cost-amort", "cost-running"]); return; }
      const amort = (capex + nre) / life, running = run / annual;
      $("#cost-amort").textContent = fmt(amort, 2);
      $("#cost-running").textContent = fmt(running, 2);
      $("#cost-total").textContent = fmt(amort + running, 2);
    }
    ["cost-capex", "cost-nre", "cost-life", "cost-annual", "cost-run"].forEach((id) => $(`#${id}`).addEventListener("input", cost));
    cost();

    function breakeven() {
      const fixed = num("be-fixed"), saving = num("be-saving"), annual = num("be-annual");
      if (!(fixed >= 0 && saving > 0 && annual > 0)) { blank(["be-units", "be-months"]); return; }
      const units = fixed / saving;
      $("#be-units").textContent = fmt(units);
      $("#be-months").textContent = `${fmt((units / annual) * 12, 1)} months`;
    }
    ["be-fixed", "be-saving", "be-annual"].forEach((id) => $(`#${id}`).addEventListener("input", breakeven));
    breakeven();
  }

  /* ------------------------------------------------------------ theme + nav */
  function setupTheme() {
    const root = document.documentElement;
    const saved = store.get("tde.theme", null);
    if (saved) root.dataset.theme = saved;
    const btn = $("#theme-toggle");
    const current = () => root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const paint = () => { btn.setAttribute("aria-label", `Switch to ${current() === "dark" ? "light" : "dark"} theme`); btn.textContent = current() === "dark" ? "☀" : "☾"; };
    btn.addEventListener("click", () => {
      const next = current() === "dark" ? "light" : "dark";
      root.dataset.theme = next; store.set("tde.theme", next); paint();
    });
    paint();
  }

  /* ------------------------------------------------------------ navigation
     Left sidebar: category > page > sub-page, with full-text search.
     Every top-level <section class="view"> is a page. Long pages are split
     into sub-pages (#page/sub). One document, so the Python runtime stays
     loaded when you move around. */
  const CATEGORIES = [
    { id: "start", title: "Start", pages: ["top"] },
    { id: "job", title: "The job", pages: ["role", "models", "lifecycle"] },
    { id: "systems", title: "Test systems", pages: ["diagrams", "deep-dive", "sequencer", "planning"] },
    { id: "ocp", title: "OCP rack and cooling", pages: ["ocp", "cooling", "servertest"] },
    { id: "practice", title: "Learn by doing", pages: ["examples", "practice"] },
    { id: "ref", title: "Reference", pages: ["glossary"] },
  ];
  const PAGE_LABELS = { top: "Home", role: "The role", models: "CM vs JDM", lifecycle: "NPI to sustaining", diagrams: "Diagrams", "deep-dive": "Deep dive", ocp: "OCP rack", cooling: "Cooling", sequencer: "Test sequencer", planning: "Capacity and cost", servertest: "Node test", examples: "Examples", practice: "Practice", glossary: "Glossary" };

  function setupNavigation() {
    const html = document.documentElement;
    html.classList.add("js-views");
    const views = $$("section.view");
    const ids = views.map((v) => v.id);
    const tree = $("#nav-tree"), results = $("#nav-results"), input = $("#nav-search");
    const toggleBtn = $("#sb-toggle"), backdrop = $("#sb-backdrop");

    const plain = (h) => String(h).replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
    const slugOf = (s, used) => {
      let base = s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40).replace(/-+$/, "") || "section";
      let slug = base, n = 2;
      while (used.has(slug)) slug = `${base}-${n++}`;
      used.add(slug);
      return slug;
    };

    /* ---- 1. work out the sub-pages of every page */
    const subsOf = {};
    views.forEach((v) => {
      const container = v.querySelector(".container");
      if (!container || v.id === "top") return;
      let subs = $$(".subpage[data-sub]", v).map((s) => ({ id: s.dataset.sub, title: s.dataset.title, el: s }));

      if (!subs.length) {
        const used = new Set();
        const kids = [...container.children];
        const detailsList = kids.filter((k) => k.tagName === "DETAILS");
        if (detailsList.length) {
          // each accordion topic becomes its own sub-page
          subs = detailsList.map((d) => {
            const summary = d.querySelector("summary");
            const small = summary.querySelector("small");
            const hint = small ? small.textContent.trim() : "";
            const clone = summary.cloneNode(true);
            const sm = clone.querySelector("small"); if (sm) sm.remove();
            const title = clone.textContent.trim().replace(/^\d+\s*·\s*/, "");
            const wrap = el("div", { class: "subpage", "data-sub": slugOf(title, used), "data-title": title },
              el("h3", {}, title), hint ? el("p", { class: "tag" }, hint) : null, [...d.querySelector(".dd").childNodes]);
            d.replaceWith(wrap);
            return { id: wrap.dataset.sub, title, el: wrap };
          });
        } else if (!["examples", "practice", "glossary"].includes(v.id)) {
          // split at <h3>: an "Overview" for what comes before the first one
          let i = 0;
          while (i < kids.length && kids[i].matches(".kicker, h2, .lead")) i++;
          const groups = [];
          let cur = null;
          kids.slice(i).forEach((k) => {
            if (k.tagName === "H3") { cur = { title: plain(k.innerHTML), nodes: [k] }; groups.push(cur); }
            else if (cur) cur.nodes.push(k);
            else { if (!groups.length || groups[0].title !== "Overview") groups.unshift({ title: "Overview", nodes: [] }); groups[0].nodes.push(k); }
          });
          if (groups.length >= 2) {
            subs = groups.map((g) => {
              const wrap = el("div", { class: "subpage", "data-sub": slugOf(g.title, used), "data-title": g.title });
              g.nodes[0].before(wrap);
              g.nodes.forEach((n) => wrap.append(n));
              return { id: wrap.dataset.sub, title: g.title, el: wrap };
            });
          }
        }
      }
      if (subs.length) subsOf[v.id] = subs.map((s) => ({ ...s, dom: true, raw: plain(s.el.innerHTML) }));
    });

    // pages whose sub-pages come from data (their own UI shows the selected item)
    subsOf.examples = TDE.EXAMPLES.map((e) => ({ id: e.id, title: e.title.replace(/^\d+\.\s*/, ""), raw: plain(`${e.intro} ${e.code}`), note: e.runnable ? "▶" : "" }));
    subsOf.practice = TDE.EXERCISES.map((e) => ({ id: e.id, title: e.title, raw: plain(`${e.summary} ${e.brief}`), exercise: true }));
    subsOf.glossary = TDE.GLOSSARY.map((g) => ({ id: g.id, title: g.title, raw: `${g.intro} ${g.items.map((it) => plain(it.join(" "))).join(" ")}` }));
    Object.values(subsOf).forEach((list) => list.forEach((s) => (s.text = `${s.title} ${s.raw}`.toLowerCase())));

    /* ---- 2. flat reading order for the Previous / Next buttons */
    const flat = [];
    ids.forEach((pid) => {
      const subs = subsOf[pid];
      if (subs && subs[0].dom) subs.forEach((s) => flat.push({ pid, sub: s.id, title: s.title }));
      else flat.push({ pid, sub: undefined, title: PAGE_LABELS[pid] });
    });
    const hrefOf = (pid, sub) => `#${pid}${sub ? `/${sub}` : ""}`;

    views.forEach((v) => {
      const container = v.querySelector(".container") || v;
      container.append(el("nav", { class: "pager", "aria-label": "Previous and next" }));
      // from the second sub-page on, the heading names the sub-page instead of repeating the page intro
      if (subsOf[v.id] && subsOf[v.id][0].dom) {
        const kicker = container.querySelector(".kicker");
        const h = el("h2", { class: "subhead" });
        if (kicker) kicker.after(h); else container.prepend(h);
      }
    });

    function updatePager(view, pid, sub) {
      const idx = flat.findIndex((f) => f.pid === pid && f.sub === sub);
      const item = (f, cls, label) => f && el("a", { class: cls, href: hrefOf(f.pid, f.sub) },
        el("small", {}, label), el("b", {}, f.title), f.sub ? el("small", { class: "where" }, PAGE_LABELS[f.pid]) : null);
      $(".pager", view).replaceChildren(...[item(flat[idx - 1], "prev", "← Previous"), item(flat[idx + 1], "next", "Next →")].filter(Boolean));
    }

    /* ---- 3. sidebar tree */
    let state = { id: "top", sub: undefined };
    const collapsed = new Set(store.get("tde.navCollapsed", []));

    function renderTree() {
      const subsFor = (pid) => subsOf[pid] || [];
      tree.replaceChildren(...CATEGORIES.map((cat) => {
        const isClosed = collapsed.has(cat.id) && !cat.pages.includes(state.id);
        const btn = el("button", { type: "button", class: "nav-cat-btn", "aria-expanded": String(!isClosed) }, el("span", {}, cat.title), el("i", { class: "chev", "aria-hidden": "true" }));
        btn.addEventListener("click", () => {
          if (collapsed.has(cat.id)) collapsed.delete(cat.id); else collapsed.add(cat.id);
          store.set("tde.navCollapsed", [...collapsed]);
          renderTree();
        });
        const list = el("ul", { class: "nav-pages", hidden: isClosed }, cat.pages.map((pid) => {
          const here = pid === state.id, subs = subsFor(pid);
          const pageActive = here && (!subs.length || !state.sub);
          const li = el("li", {}, el("a", { class: "nav-page", href: `#${pid}`, "aria-current": pageActive ? "page" : false }, el("span", {}, PAGE_LABELS[pid]), subs.length ? el("em", {}, String(subs.length)) : null));
          if (here && subs.length) {
            li.append(el("ul", { class: "nav-subs" }, subs.map((s) => el("li", {}, el("a", {
              href: hrefOf(pid, s.id), class: `${s.exercise && progress.done[s.id] ? "done" : ""}`, "aria-current": state.sub === s.id ? "page" : false,
            }, el("span", {}, s.title), s.exercise && progress.done[s.id] ? el("i", { "aria-label": "solved" }, "✓") : null)))));
          }
          return li;
        }));
        return el("section", { class: "nav-cat" }, btn, list);
      }));
      const cur = $('#nav-tree [aria-current="page"]');
      if (cur) cur.scrollIntoView({ block: "nearest" });
    }
    TDEUI.refreshNav = renderTree;

    /* ---- 4. open / close the sidebar */
    const wide = matchMedia("(min-width: 1000px)");
    let open = wide.matches ? store.get("tde.sidebar", true) : false;
    function setOpen(v, persist = true) {
      open = v;
      html.classList.toggle("sb-open", v);
      toggleBtn.setAttribute("aria-expanded", v);
      toggleBtn.setAttribute("aria-label", v ? "Hide navigation" : "Show navigation");
      if (persist && wide.matches) store.set("tde.sidebar", v);
    }
    toggleBtn.addEventListener("click", () => setOpen(!open));
    backdrop.addEventListener("click", () => setOpen(false, false));
    wide.addEventListener("change", () => setOpen(wide.matches ? store.get("tde.sidebar", true) : false, false));
    setOpen(open, false);

    /* ---- 5. full-text search */
    const entries = [];
    CATEGORIES.forEach((cat) => cat.pages.forEach((pid) => {
      const trail = `${cat.title} › ${PAGE_LABELS[pid]}`;
      const subs = subsOf[pid];
      if (subs) subs.forEach((s) => entries.push({ pid, sub: s.id, title: s.title, trail, raw: s.raw, text: s.text }));
      else {
        const v = $(`#${pid}`);
        const raw = plain(v.innerHTML);
        entries.push({ pid, sub: undefined, title: PAGE_LABELS[pid], trail, raw, text: `${PAGE_LABELS[pid]} ${raw}`.toLowerCase() });
      }
    }));

    function runSearch() {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { results.hidden = true; tree.hidden = false; results.replaceChildren(); return; }
      const terms = q.split(/\s+/);
      const hits = entries.map((e) => {
        let score = 0;
        for (const term of terms) {
          const inTitle = e.title.toLowerCase().includes(term);
          let count = 0, from = 0;
          while (count < 15 && (from = e.text.indexOf(term, from)) >= 0) { count++; from += term.length; }
          if (!inTitle && !count) return null;
          score += (inTitle ? 50 : 0) + count;
        }
        return { e, score };
      }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 30);

      const snippet = (e) => {
        const i = e.raw.toLowerCase().indexOf(terms[0]);
        if (i < 0) return esc(e.raw.slice(0, 90));
        const s = Math.max(0, i - 40), end = Math.min(e.raw.length, i + terms[0].length + 70);
        const piece = e.raw.slice(s, end);
        const k = i - s;
        return `${s > 0 ? "…" : ""}${esc(piece.slice(0, k))}<mark>${esc(piece.slice(k, k + terms[0].length))}</mark>${esc(piece.slice(k + terms[0].length))}${end < e.raw.length ? "…" : ""}`;
      };
      results.hidden = false; tree.hidden = true;
      results.replaceChildren(
        el("p", { class: "nav-count", "aria-live": "polite" }, hits.length ? `${hits.length} result${hits.length === 1 ? "" : "s"}` : "No results. Try a shorter word or an acronym."),
        ...hits.map(({ e }) => el("a", { class: "nav-hit", href: hrefOf(e.pid, e.sub) },
          el("b", {}, e.title), el("small", {}, e.trail), el("span", { html: snippet(e) }))));
    }
    input.addEventListener("input", runSearch);
    input.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") { input.value = ""; runSearch(); }
      if (ev.key === "Enter") { const first = $(".nav-hit", results); if (first) { location.hash = first.getAttribute("href"); } }
    });
    results.addEventListener("click", (ev) => { if (ev.target.closest(".nav-hit") && !wide.matches) setOpen(false, false); });
    tree.addEventListener("click", (ev) => { if (ev.target.closest("a") && !wide.matches) setOpen(false, false); });
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
        ev.preventDefault(); setOpen(true, false); input.focus();
      } else if (ev.key === "Escape" && !wide.matches && open && document.activeElement !== input) setOpen(false, false);
    });

    /* ---- 6. routing */
    const titleOf = (id, sub) => {
      if (id === "top") return "TDE Training – Test Development Engineer";
      const s = (subsOf[id] || []).find((x) => x.id === sub);
      return `${s ? `${s.title} · ` : ""}${PAGE_LABELS[id]} · TDE Training`;
    };
    let current = null;

    function show() {
      const [rawId, rawSub] = decodeURIComponent(location.hash.slice(1)).split("/");
      const id = ids.includes(rawId) ? rawId : "top";
      const view = $(`#${id}`);
      const subs = subsOf[id] || [];
      let sub;
      if (subs.length) {
        const found = subs.find((s) => s.id === rawSub);
        sub = found ? found.id : (subs[0].dom ? subs[0].id : undefined);
      }
      // tidy links such as #top/undefined or #cooling/bogus
      if (rawSub !== undefined && sub !== rawSub) history.replaceState(null, "", hrefOf(id, sub));

      const first = current === null, viewChanged = id !== current;
      current = id;
      state = { id, sub };
      if (viewChanged) views.forEach((v) => v.classList.toggle("active", v.id === id));
      if (subs.length && subs[0].dom) {
        subs.forEach((s) => s.el.classList.toggle("active", s.id === sub));
        const n = subs.findIndex((s) => s.id === sub);
        view.dataset.subIndex = n;
        $(".subhead", view).textContent = subs[n].title;
      }
      else if (sub) {
        if (id === "examples") TDEUI.selectExample && TDEUI.selectExample(sub);
        if (id === "practice") TDEUI.openExercise && TDEUI.openExercise(sub);
        if (id === "glossary") TDEUI.selectGlossary && TDEUI.selectGlossary(sub);
      }
      document.title = titleOf(id, sub);
      renderTree();
      updatePager(view, id, subs.length && !subs[0].dom ? undefined : sub);
      if (!wide.matches) setOpen(false, false);
      window.scrollTo({ top: 0, behavior: "instant" });
      if (!first) {
        const h = $$("h1, h2", view).find((x) => x.offsetParent !== null);
        if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
      }
    }

    // the example, exercise and glossary UIs call this when the user picks an item
    TDEUI.sync = (id, sub) => {
      state = { id, sub };
      history.replaceState(null, "", hrefOf(id, sub));
      document.title = titleOf(id, sub);
      renderTree();
    };
    window.addEventListener("hashchange", show);
    show();
  }

  function highlightStaticBlocks() {
    $$("pre[data-hl]").forEach((pre) => {
      const code = pre.textContent.replace(/^\n/, "").replace(/\s+$/, "");
      pre.replaceChildren(el("code", { html: highlight(code, pre.dataset.hl) }));
      pre.classList.add("code");
    });
  }

  /* ------------------------------------------------------------ init */
  document.addEventListener("DOMContentLoaded", () => {
    setupTheme();
    highlightStaticBlocks();
    bindDiagram("svg-engagement", "panel-engagement", TDE.DIAGRAMS.engagement, "jdm-proposal");
    bindDiagram("svg-phases", "panel-phases", TDE.DIAGRAMS.phases, "npi");
    bindDiagram("svg-line", "panel-line", TDE.DIAGRAMS.line, "fct");
    bindDiagram("svg-tester", "panel-tester", TDE.DIAGRAMS.tester, "drivers");
    bindDiagram("svg-rack", "panel-rack", TDE.DIAGRAMS.rack, "busbar");
    bindDiagram("svg-stand", "panel-stand", TDE.DIAGRAMS.stand, "interface");
    bindDiagram("svg-nodeflow", "panel-nodeflow", TDE.DIAGRAMS.nodeflow, "firmware");
    bindDiagram("svg-loop", "panel-loop", TDE.DIAGRAMS.loop, "cdu");
    buildExamples();
    buildExercises();
    buildGlossary();
    buildCooling();
    buildPlanning();
    progress.paint();
    setupNavigation();
  });
})();
