"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    bootstrap?: {
      Collapse: {
        getOrCreateInstance: (el: Element) => { hide: () => void };
      };
    };
  }
}

/** Згортає мобільне меню після кліку по якорю (як на старому сайті). */
export function NavCollapseFix() {
  useEffect(() => {
    const nav = document.getElementById("hwNav");
    if (!nav) return;

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a.nav-link[href*="#"]');
      if (!el || window.innerWidth >= 992) return;
      if (!nav.classList.contains("show")) return;
      window.bootstrap?.Collapse.getOrCreateInstance(nav).hide();
    };

    nav.addEventListener("click", onClick);
    return () => nav.removeEventListener("click", onClick);
  }, []);

  return null;
}
