import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

/**
 * Client-side navigation keeps the document — and therefore the scroll
 * position — so every top-level page has to be put back at the top itself.
 * Runs in a layout effect so the new page is never painted at the previous
 * page's offset. Back/forward still work normally; they land at the top of
 * the page, which is what a full document navigation did here before.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
