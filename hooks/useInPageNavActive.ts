"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy for sticky in-page nav: returns which `#section` is currently “active”
 * (last section whose top has crossed the activation line below the main sticky header).
 *
 * @param hrefs — `#id` values in **document order** (same order as nav links)
 * @param activationLinePx — Y from viewport top; use ~site nav + sub-nav height
 */
export function useInPageNavActive(hrefs: string[], activationLinePx: number): string | null {
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const key = hrefs.join("|");

  useEffect(() => {
    const ids = hrefs.map((h) => h.replace(/^#/, "").trim()).filter(Boolean);

    const update = () => {
      let chosen: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= activationLinePx) {
          chosen = `#${id}`;
        }
      }
      if (!chosen && ids.length) {
        chosen = `#${ids[0]}`;
      }
      setActiveHref(chosen);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [key, activationLinePx]);

  return activeHref;
}
