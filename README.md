# TDE Training

Interactive training site for **Test Development Engineers (TDE)** in electronics manufacturing at Celestica Thailand. It covers:

* the role, and who a TDE works with (customer, HPS, TE, MFG)
* the two program types: **CM** (Contract Manufacturing) and **JDM** (Joint Development Manufacturing)
* the life of a tester: proposal, concept, design, fabricate, debug, **NPI**, handover to MFG, **sustaining**
* interactive diagrams: engagement flows, phases, test stages on the line, anatomy of a tester
* deep dives: test strategy and coverage, tester hardware, test software, measurement quality, yield, writing a JDM proposal, handover and sustaining
* nine Python examples and eight graded exercises that run in the browser

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

## Project layout

```
index.html            page structure, prose and the SVG diagrams
assets/style.css      design tokens, light/dark themes, layout
assets/app.js         diagrams, tabs, editor, progress, theme
assets/content.js     diagram details, code examples, exercises (edit this to add content)
assets/harness.py     pytest-compatible runner used in the browser
assets/py-worker.js   Web Worker that hosts Pyodide
tools/check_exercises.py   self-check for all content (see below)
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
