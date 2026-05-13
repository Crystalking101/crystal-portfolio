#!/usr/bin/env python3
"""
Edge-connected flood fill for FinTips hero asset `project card-Fintips.png`:
dark outer canvas (reachable from image border, near corner color) → transparent.
Does not flood from interior so dark UI inside the mock is preserved.
"""
from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image


def dist_rgb(
    px: tuple[int, int, int, int], ref: tuple[int, int, int],
) -> int:
    r, g, b, _ = px
    br, bg, bb = ref
    return max(abs(r - br), abs(g - bg), abs(b - bb))


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    path = root / "public" / "project card-Fintips.png"
    if not path.exists():
        raise SystemExit(f"Missing {path}")

    img = Image.open(path).convert("RGBA")
    w, h = img.size
    px = img.load()

    corners = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]
    samples = [px[x, y] for x, y in corners if px[x, y][3] > 0]
    if not samples:
        raise SystemExit("Image fully transparent")
    ref_r = sum(p[0] for p in samples) // len(samples)
    ref_g = sum(p[1] for p in samples) // len(samples)
    ref_b = sum(p[2] for p in samples) // len(samples)
    ref = (ref_r, ref_g, ref_b)

    # Outer canvas is near-black; keep threshold moderate so #0F0F0F variants match.
    thresh = 52
    max_luma = 135  # r+g+b — exclude lighter pixels from fill even if near ref

    def matches(x: int, y: int) -> bool:
        r, g, b, a = px[x, y]
        if a == 0:
            return False
        if r + g + b > max_luma:
            return False
        return dist_rgb((r, g, b, a), ref) <= thresh

    visited: set[tuple[int, int]] = set()
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        for y in (0, h - 1):
            if matches(x, y) and (x, y) not in visited:
                visited.add((x, y))
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if matches(x, y) and (x, y) not in visited:
                visited.add((x, y))
                q.append((x, y))

    while q:
        x, y = q.popleft()
        r, g, b, a = px[x, y]
        if a == 0:
            continue
        px[x, y] = (r, g, b, 0)
        for dx, dy in ((0, 1), (0, -1), (1, 0), (-1, 0)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited and matches(nx, ny):
                visited.add((nx, ny))
                q.append((nx, ny))

    backup = path.with_suffix(".png.bak")
    backup.write_bytes(path.read_bytes())
    img.save(path, "PNG", optimize=True)
    print(f"Wrote transparent outer background to {path}")
    print(f"Backup: {backup}")


if __name__ == "__main__":
    main()
