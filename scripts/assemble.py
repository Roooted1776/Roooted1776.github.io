#!/usr/bin/env python3
"""Decode chunked base64 assets into the public passerby tree."""
from __future__ import annotations

import base64
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CHUNKS = ROOT / "chunks"


def join(prefix: str, dest: Path) -> None:
    parts = sorted(CHUNKS.glob(f"{prefix}.*.b64"))
    if not parts:
        raise SystemExit(f"missing chunks for {prefix}")
    data = base64.b64decode("".join(p.read_text() for p in parts))
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
    print(f"wrote {dest.relative_to(ROOT)} ({len(data)} bytes)")


def main() -> None:
    join("tapper_html", ROOT / "tapper" / "index.html")
    join("tapper_html", ROOT / "tapper.html")
    for dest in (
        ROOT / "pheart.png",
        ROOT / "BrandLogo.png",
        ROOT / "tapper" / "pheart.png",
        ROOT / "tapper" / "BrandLogo.png",
        ROOT / "assets" / "pheart.png",
        ROOT / "assets" / "BrandLogo.png",
    ):
        join("pheart_png", dest)
    for dest in (
        ROOT / "BrandWordmark.png",
        ROOT / "tapper" / "BrandWordmark.png",
        ROOT / "assets" / "BrandWordmark.png",
    ):
        join("BrandWordmark_png", dest)


if __name__ == "__main__":
    main()
