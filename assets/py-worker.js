/* Runs Python (Pyodide) off the main thread so a runaway loop in a learner's
   code can be killed by terminating the worker. */
importScripts("https://cdn.jsdelivr.net/pyodide/v0.29.5/full/pyodide.js");

const ready = (async () => {
  const py = await loadPyodide();
  const harness = await (await fetch(new URL("harness.py" + self.location.search, self.location.href))).text();
  py.runPython(harness);
  postMessage({ type: "ready" });
  return py;
})().catch((err) => {
  postMessage({ type: "init-error", message: String(err) });
  return null;
});

onmessage = async (event) => {
  const py = await ready;
  if (!py) return;
  const { id, req } = event.data;
  try {
    py.globals.set("_req_json", JSON.stringify(req));
    const out = py.runPython("import json\njson.dumps(handle(json.loads(_req_json)))");
    postMessage({ type: "result", id, result: JSON.parse(out) });
  } catch (err) {
    postMessage({
      type: "result",
      id,
      result: { error: String(err), results: [], stdout: "", passed: false, note: "" },
    });
  }
};
