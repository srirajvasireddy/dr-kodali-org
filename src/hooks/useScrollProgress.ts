import { useEffect, useState } from "react";

/**
 * Drives the reading-progress bar and the header's scrolled treatment.
 * Re-measures on every route change, because the new page has a different
 * height and starts back at the top.
 */
export function useScrollProgress(pathname: string) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        setIsScrolled(window.scrollY > 40);
        setScrollProgress(
          scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0,
        );
      });
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
    };
  }, [pathname]);

  return { isScrolled, scrollProgress };
}
