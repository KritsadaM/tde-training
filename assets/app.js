/* TDE Training site: interactivity. No build step, no dependencies. */
(() => {
  "use strict";

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
      worker = new Worker("assets/py-worker.js");
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
      tab.addEventListener("click", () => select(ex.id));
      tab.addEventListener("keydown", (e) => {
        const all = $$("[role=tab]", tabs);
        const idx = all.indexOf(tab);
        const next = e.key === "ArrowRight" ? idx + 1 : e.key === "ArrowLeft" ? idx - 1 : null;
        if (next == null) return;
        e.preventDefault();
        const target = all[(next + all.length) % all.length];
        target.focus(); select(target.dataset.id);
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
  }

  /* ------------------------------------------------------------ exercises */
  function buildExercises() {
    const root = $("#practice-root");
    const list = el("ol", { class: "ex-list" });
    const panel = el("div", { class: "ex-panel" });
    root.append(list, panel);
    const levelClass = { Easy: "easy", Medium: "medium", Hard: "hard" };

    TDE.EXERCISES.forEach((ex, i) => {
      list.append(el("li", {}, el("button", { type: "button", class: "ex-item", "data-ex-id": ex.id, onclick: () => open(i) },
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
            out.append(el("button", { class: "btn primary next", type: "button", onclick: () => { open(index + 1); panel.scrollIntoView({ behavior: "smooth", block: "start" }); } }, "Next exercise →"));
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

  function setupScrollSpy() {
    const links = $$(".nav-links a");
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        links.forEach((a) => a.removeAttribute("aria-current"));
        const a = map.get(e.target.id);
        if (a) { a.setAttribute("aria-current", "true"); a.scrollIntoView({ block: "nearest", inline: "center" }); }
      }
    }, { rootMargin: "-35% 0px -60% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) obs.observe(s); });
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
    buildExamples();
    buildExercises();
    progress.paint();
    setupScrollSpy();
  });
})();
