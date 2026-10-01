#!/usr/bin/env python3
"""Add a content-based version to the asset URLs in index.html.

    python3 tools/stamp_assets.py          # rewrite index.html
    python3 tools/stamp_assets.py --check  # exit 1 if the stamp is out of date

Why: GitHub Pages serves every file with `Cache-Control: max-age=600`. After a
deploy, a browser that reloads the page gets the new HTML but may keep using a
cached, older style.css / app.js for up to 10 minutes, which gives a broken page.
A `?v=<hash>` that changes whenever the assets change makes the browser fetch
the new files together with the new HTML.

Run it before every commit that touches anything in assets/ (the web worker and
harness are covered too, because app.js passes the same version on to them).
"""
import hashlib
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
FILES = ["assets/style.css", "assets/content.js", "assets/app.js", "assets/py-worker.js", "assets/harness.py"]
INDEX = ROOT / "index.html"
URL = re.compile(r'((?:href|src)="assets/(?:style\.css|content\.js|app\.js))(?:\?v=[0-9a-f]+)?(")')


def version():
    h = hashlib.sha1()
    for name in FILES:
        h.update(name.encode())
        h.update((ROOT / name).read_bytes())
    return h.hexdigest()[:10]


def main():
    v = version()
    html = INDEX.read_text()
    stamped, n = URL.subn(lambda m: f"{m.group(1)}?v={v}{m.group(2)}", html)
    if n != 3:
        sys.exit(f"expected 3 asset references in index.html, found {n}")
    if "--check" in sys.argv:
        if stamped != html:
            sys.exit("index.html asset version is out of date. Run: python3 tools/stamp_assets.py")
        print(f"asset version {v} is up to date")
        return
    INDEX.write_text(stamped)
    print(f"asset version {v}" + ("" if stamped != html else " (unchanged)"))


if __name__ == "__main__":
    main()
