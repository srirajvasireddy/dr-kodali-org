import { useLayoutEffect } from "react";

const REVEAL_TARGETS =
  ".statement-copy, .section-heading, .legacy-portrait, .legacy-date, .legacy-story, .legacy-aside, .values-band, .program, .impact-intro, .impact-slider, .more-moments, .founder-title, .founder-story, .founder-timeline, .crossroads-copy, .crossroads-stage, .objectives-head, .objective-list li, .press-copy, .press-stack, .press-grid, .join-copy, .join-form";

/**
 * Fades sections in as they scroll into view. Re-runs per route: with
 * client-side navigation the previous page's nodes are gone and the incoming
 * page's have never been observed. A layout effect so the hidden state is in
 * place before the new page's first paint.
 */
export function useRevealOnScroll(pathname: string) {
  useLayoutEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(REVEAL_TARGETS);
    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("reveal-visible"));
      return;
    }
    targets.forEach((target, index) => {
      target.classList.add("reveal-ready");
      target.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);
}
