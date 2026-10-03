# TDE Training

Interactive training site for **Test Development Engineers (TDE)** in electronics manufacturing at Celestica Thailand. It is organised in five sessions:

* **Overview:** the role and who a TDE works with (customer, HPS, TE, MFG), **CM** vs **JDM** programs, the life of a tester (proposal, concept, design, fabricate, debug, **NPI**, handover, **sustaining**), and where test sits on the line
* **1 · Project management:** RFQ to purchase order, the design proposal, capacity and cost, the **quotation** (with a quote builder), running the project (schedule, RACI, gates, status, risks, change control, FAT and SAT), handover and sustaining
* **2 · Hardware:** test strategy and DFT, tester hardware and fixtures, measurement, yield and line debug, rack fabrication, OCP racks, cooling and node test
* **3 · Software:** test software architecture (data and MES, releases), the test sequencer, a Python guide with examples and practice
* **4 · Practice and reference:** test-engineering examples and graded exercises that run in the browser, and a glossary

It is a plain static site (HTML, CSS, JS). There is no build step and nothing to install.

## Run locally

Browsers block Web Workers on `file://` pages, so serve the folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Publish on GitHub Pages

1. Create an empty repository on GitHub (for example `tde-training`).
2. From this folder:

```bash
git init -b main
git add .
git commit -m "Add TDE training site"
git remote add origin git@github.com:<your-user>/tde-training.git
git push -u origin main
```

3. In the repository go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. After a minute the site is live at `https://<your-user>.github.io/tde-training/`.

`.nojekyll` is included so GitHub serves the files as they are.

> If the content is internal to Celestica, use a **private** repository (GitHub Pages for private repositories needs a paid GitHub plan) or an internal host. Do not publish customer or program details.

## How the exercises run

Python runs in the learner's browser with [Pyodide](https://pyodide.org) inside a Web Worker (`assets/py-worker.js`). A runaway loop is stopped after 10 seconds by terminating the worker. Pyodide is loaded from `cdn.jsdelivr.net`, so learners need internet access on first use.

`assets/harness.py` is a small pytest-compatible runner. It supports plain `test_*` functions, `pytest.raises`, `pytest.approx`, `@pytest.fixture` (including `yield` fixtures) and stacked `@pytest.mark.parametrize`.

There are two exercise kinds:

| `kind` | What the learner does | How it is graded |
| --- | --- | --- |
| `implement` | Writes a function | Hidden `tests` run against it |
| `tests` | Writes `test_*` functions | They must pass on the `good` implementation and fail on **every** entry in `mutants` |

### Exercises

| # | Level | Kind | Topic |
| --- | --- | --- | --- |
| 1 | Easy | implement | `check_limit`: inclusive limits, one-sided limits, NaN never passes |
| 2 | Easy | write tests | `judge_rail`: boundaries and guardband (7 hidden bugs) |
| 3 | Easy | implement | First-pass yield, final yield, retest rate from tester logs |
| 4 | Medium | implement | `parse_readings`: extract `NAME = value unit` from noisy DUT output |
| 5 | Medium | implement | `read_stable`: wait for a rail to settle, with an injected clock |
| 6 | Medium | write tests | `final_verdict`: FAIL vs ERROR, nothing tested never passes (7 hidden bugs) |
| 7 | Hard | implement | `run_sequence`: limits, FAIL vs ERROR, stop on fail, always power off |
| 8 | Medium | implement | `calc_cpk`: sample mean, standard deviation, one/two-sided limits, Cpk threshold |
| 9 | Medium | implement | `evaluate_leak_test`: pressure-decay leak test for a liquid loop |
| 10 | Medium | implement | `heat_load_kw`, `required_flow_lpm`, `heat_balance_ok`: heat balance of a coolant loop |
| 11 | Easy | implement | `usable_capacity_kw`, `redundancy_ok`, `bbu_runtime_s`: N+1 power shelf and battery ride-through |
| 12 | Medium | implement | `testers_needed`, `cost_per_unit`, `breakeven_units`: size a test line and price the test |
| 13 | Medium | implement | `diff_config`: compare a node's readings with its golden configuration |
| 14 | Medium | implement | `guardbanded_limits`, `classify_guardbanded`, `acceleration_factor`, `burnin_hours`: guardbands and Arrhenius burn-in |
| 15 | Hard | implement | `ring_out`: opens and shorts of a harness from expected and measured nets (union-find) |

Python practice (Software section): `with_item` / `copy_grid` / `merge_limits` (aliasing), `record_reading` / `make_config` (mutable defaults), a `Sensor` class with constructors, `Dmm` / `Psu` subclasses with `super()`, a `Station` class with class variables, a bug hunt in a `Cart` class (9 hidden bugs), a `Voltage` class with operator overloading, `format_value` with `singledispatch`, a simulator and factory on an abstract `PsuDriver`, and three quadratic functions to make linear (checked by counting comparisons).

## Navigation

A collapsible **left sidebar** (a drawer on phones) lists the sessions and their **main pages only**, and has full-text search (press `/` to focus it). Each page shows all of its content in one scroll: its parts get a numbered heading and an **On this page** list at the top, and **Previous / Next** at the bottom walk the pages in session order. Everything is one HTML document routed by hash: `#page` opens a page at the top, `#page/part` scrolls to a part, for example `#quotation/builder`, `#cooling/compare`, `#examples/cpk`, `#practice/leak-decay`, `#glossary/hardware`.

* **Sessions and page names:** edit `CATEGORIES` and `PAGE_LABELS` in `assets/app.js`. The order there is the reading order, and the kicker above each page title ("Session 1 · Project management · page 2 of 6") is written from it.
* **Old links** such as `#deep-dive`, `#tools/fixture` or `#lifecycle` are redirected by `ALIASES` in `assets/app.js`.
* **Parts of a page are found automatically:**
  * `<div class="subpage" data-sub="id" data-title="Title">` blocks that are direct children of the page's `.container` are parts (prefer this for new content);
  * on a page without them, each `<h3>` starts a part;
  * what comes before the first part is the page intro;
  * Examples, Practice and Glossary list their items from `assets/content.js`.
* **Adding a page:** add a `<section class="block view" id="my-page">` in `index.html` (keep the file in the same order as `CATEGORIES`), then add its id to a session in `CATEGORIES`, a label to `PAGE_LABELS`, and a link on the Home page's session card.
* Do not use the CSS class `sub` for anything new: the hero subtitle already uses it. Parts use `subpage`.

## Sections, examples and practice sets

The sidebar groups pages into sessions (`CATEGORIES` in `assets/app.js`). The **Software** session (`id: "sw"`) holds the test software architecture, the Test sequencer, the Python guide, Python examples and Python practice. New software documents (for example ISS3 or Robot Framework) belong there too:

1. Add a `<section class="block view" id="my-page">` to `index.html`, in the same position as in `CATEGORIES`.
2. Add the id to the `sw` session's `pages` in `CATEGORIES` and a label to `PAGE_LABELS` in `assets/app.js`.
3. Add it to the Software card in the Home page's session list. The kickers number themselves.

**Examples and practice are separate pages and separate data sets.** Test-engineering ones are `TDE.EXAMPLES` and `TDE.EXERCISES`, Python ones are `TDE.PY_EXAMPLES` and `TDE.PY_EXERCISES` (all in `assets/content.js`). To add another set (say for Robot Framework):

* add `TDE.RF_EXAMPLES` / `TDE.RF_EXERCISES` arrays with the same fields as the others (unique `id` values across all sets);
* add `<div id="rf-examples-root"></div>` and `<div id="rf-practice-root" class="practice-grid"></div>` inside new page sections;
* register them in `DATA_PAGES` and in the init block at the bottom of `assets/app.js` (`buildExamples(...)` / `buildExercises(...)`), and add them to `ALL_EXERCISES` so progress counts them;
* `tools/check_exercises.py` should include the new arrays in its loops (it already covers the Python ones).

Note for exercises that run Python: the in-browser runner (Pyodide) executes Python only. Robot Framework or ISS3 examples would be read-only code listings unless a runner is added.

## Adding ISS3 content

No public documentation for ISS3 (the test sequencer most JDM programs use) was available when the Test sequencer page was written, so the site teaches sequencer *concepts* and gives a first-week checklist, but does not describe ISS3's own screens, syntax or features. To add them, edit the `ISS3 in JDM programs` sub-page in `index.html` (`data-sub="iss3"` inside `<section id="sequencer">`): replace the grey note with real material, such as the full name, how a sequence and a step are written, a screenshot or a short example sequence, and how a release is built. Take it from the team's own ISS3 documentation. Run `python3 tools/stamp_assets.py` before committing.

## Before you commit (cache-busting)

GitHub Pages serves every file with a 10-minute cache. Without a version in the asset URLs, a browser can show the *new* page with an *old* `style.css` / `app.js`, which looks broken (this actually happened once). So after changing anything in `assets/`, run:

```bash
python3 tools/stamp_assets.py
```

It writes a content hash into the `?v=` of the three asset links in `index.html` (the web worker and harness get the same version from `app.js`). CI fails with a reminder if you forget (`python3 tools/stamp_assets.py --check`).

The hash is taken over the raw bytes of the files, so line endings matter. `.gitattributes` keeps every text file LF in the repository and in each checkout, Windows included, so a stamp made on any machine matches the one CI computes.

## Project layout

```
index.html            page structure, prose and the SVG diagrams
assets/style.css      design tokens, light/dark themes, layout
assets/app.js         diagrams, tabs, editor, progress, theme
assets/content.js     diagram details, code examples, exercises (edit this to add content)
assets/harness.py     pytest-compatible runner used in the browser
assets/py-worker.js   Web Worker that hosts Pyodide
tools/check_exercises.py   self-check for all content (see below)
tools/stamp_assets.py      cache-busting stamp for the asset URLs (run before committing)
```

## Adding or changing content

* **Exercises and examples:** edit `assets/content.js`. Wrap code in `String.raw` so backslashes survive. Avoid backticks and `${` inside code.
* **Diagram text:** edit `TDE.DIAGRAMS` in `assets/content.js`. Each key matches a `data-key` in `index.html`.
* **Prose:** edit `index.html`.

After changing any exercise run the self-check. It needs `python3` and `node`:

```bash
python3 tools/check_exercises.py
```

It verifies with the same harness the site uses that every runnable example passes, every reference solution passes, every starter does **not** pass, and that the reference tests catch every planted bug.

Learner progress and code are stored in the browser's `localStorage` under keys starting with `tde.`.
