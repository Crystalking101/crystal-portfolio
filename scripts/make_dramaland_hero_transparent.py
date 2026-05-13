#!/usr/bin/env python3
"""
Flood-fill near-black pixels from image corners to transparent.
For dramaland-hero.png: solid canvas black around devices becomes alpha 0.
"""
from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    path = root / "public" / "dramaland-hero.png"
    if not path.exists():
        raise SystemExit(f"Missing {path}")

    img = Image.open(path).convert("RGBA")
    w, h = img.size
    px = img.load()

    corners = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]
    sr, sg, sb = None, None, None
    for x, y in corners:
        r, g, b, a = px[x, y]
        if a and (r + g + b) < 120:
            sr, sg, sb = r, g, b
            break
    if sr is None:
        raise SystemExit("No dark corner found; aborting")

    thresh = 45
    visited: set[tuple[int, int]] = set()
    q: deque[tuple[int, int]] = deque()
    for x, y in corners:
        r, g, b, a = px[x, y]
        if a and max(abs(r - sr), abs(g - sg), abs(b - sb)) <= thresh:
            q.append((x, y))

    while q:
        x, y = q.popleft()
        if (x, y) in visited:
            continue
        r, g, b, a = px[x, y]
        if a == 0:
            visited.add((x, y))
            continue
        if max(abs(r - sr), abs(g - sg), abs(b - sb)) > thresh:
            visited.add((x, y))
            continue
        visited.add((x, y))
        px[x, y] = (r, g, b, 0)
        for dx, dy in ((0, 1), (0, -1), (1, 0), (-1, 0)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                q.append((nx, ny))

    backup = path.with_suffix(".png.bak")
    backup.write_bytes(path.read_bytes())
    img.save(path, "PNG", optimize=True)
    print(f"Wrote transparent background to {path}")
    print(f"Backup: {backup}")


if __name__ == "__main__":
    main()
