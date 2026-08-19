import { useEffect } from "react";
import {
  resetPageMetrics,
  trackPageView,
  trackSectionViews,
} from "../analytics";
import { titleForPath } from "../data/navigation";

/**
 * Per-route analytics. The document title is set first because `page_view`
 * reports it, and the per-page counters are reset because client-side
 * navigation no longer tears the page down between routes.
 */
export function usePageAnalytics(pathname: string) {
  useEffect(() => {
    document.title = titleForPath(pathname);
    resetPageMetrics();
    trackPageView();
    trackSectionViews();
  }, [pathname]);
}
