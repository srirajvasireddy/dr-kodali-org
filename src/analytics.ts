// Google Analytics 4 wiring for drkodali.org.
//
// The gtag stub, the measurement ID and the `config` call live in index.html so
// the tag is in place before this bundle parses. Everything sent to the property
// goes through here: page views (delayed until the real page title is set), a
// single delegated click listener that names every link and button on the site,
// scroll depth, section visibility, dwell time and form progress.

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const pageContext = (): GtagParams => ({
  page_path: window.location.pathname,
  page_title: document.title,
});

/** Send one GA4 event. Safe to call before (or without) gtag.js loading. */
export function trackEvent(name: string, params: GtagParams = {}) {
  const payload = { ...pageContext(), ...params };
  if (import.meta.env.DEV) {
    // gtag.js is not loaded on localhost, so log instead — lets us verify
    // event names and parameters without polluting the property.
    console.debug("[analytics]", name, payload);
    return;
  }
  window.gtag?.("event", name, payload);
}

/**
 * The page_view GA normally sends on load would carry index.html's static
 * title for every route, so index.html suppresses it and we send it here —
 * once React has set the real document title for the current path.
 */
let lastPageView = "";

export function trackPageView() {
  // Guards against a second send for the same URL (StrictMode in development,
  // a bfcache restore in the wild). Navigation is a full page load here, so
  // module state resets between real pages.
  if (lastPageView === window.location.href) return;
  lastPageView = window.location.href;
  const params = {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
  };
  if (import.meta.env.DEV) {
    console.debug("[analytics]", "page_view", params);
    return;
  }
  window.gtag?.("event", "page_view", params);
}

const text = (value: string | null | undefined, limit = 100) =>
  value?.replace(/\s+/g, " ").trim().slice(0, limit) || undefined;

/** Best available human name for a clicked element. */
function labelFor(element: HTMLElement) {
  return (
    text(element.dataset.analyticsLabel) ??
    text(element.getAttribute("aria-label")) ??
    text(element.innerText) ??
    text(element.querySelector("img")?.getAttribute("alt")) ??
    "unlabelled"
  );
}

/** Which part of the page the click happened in, for grouping in reports. */
function sectionFor(element: HTMLElement) {
  const marked = element.closest<HTMLElement>("[data-analytics-section]");
  if (marked?.dataset.analyticsSection) return marked.dataset.analyticsSection;
  if (element.closest(".site-header")) return "header";
  if (element.closest(".mobile-nav")) return "mobile-nav";
  if (element.closest(".site-footer")) return "footer";
  if (element.closest(".lightbox")) return "lightbox";
  const section = element.closest<HTMLElement>("section");
  return section?.className.split(" ")[0] || section?.id || "page";
}

const FILE_LINK = /\.(webp|jpe?g|png|gif|pdf|svg)$/i;

function trackClick(event: MouseEvent) {
  const start = event.target instanceof Element ? event.target : null;
  const element = start?.closest<HTMLElement>(
    "a, button, [role='button'], summary",
  );
  if (!element || element.dataset.analyticsIgnore !== undefined) return;

  const shared: GtagParams = {
    label: labelFor(element),
    section: sectionFor(element),
    element_class: text(element.className, 80),
  };

  const anchor = element.closest("a");
  const href = anchor?.getAttribute("href");
  if (!anchor || !href) {
    trackEvent("button_click", shared);
    return;
  }

  if (href.startsWith("tel:")) {
    trackEvent("contact_click", { ...shared, method: "phone", link_url: href });
    return;
  }
  if (href.startsWith("mailto:")) {
    trackEvent("contact_click", { ...shared, method: "email", link_url: href });
    return;
  }

  const url = new URL(anchor.href, window.location.href);
  const outbound = url.host !== window.location.host;
  const params: GtagParams = {
    ...shared,
    link_url: url.href.slice(0, 300),
    link_domain: url.host,
    outbound,
  };
  if (outbound) trackEvent("outbound_click", params);
  else if (FILE_LINK.test(url.pathname)) trackEvent("image_open", params);
  else trackEvent("navigation_click", { ...params, link_path: url.pathname });
}

/** 25/50/75/90% scroll milestones, each sent at most once per page. */
function watchScrollDepth() {
  const milestones = [25, 50, 75, 90];
  let sent = 0;
  let deepest = 0;
  let frame = 0;

  const measure = () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    // A page that cannot scroll (or has not laid out yet) has no depth to
    // report — treating it as 100% would fire every milestone on load.
    if (scrollable <= 0) return;
    const percent = Math.min(
      100,
      Math.round((window.scrollY / scrollable) * 100),
    );
    deepest = Math.max(deepest, percent);
    while (sent < milestones.length && deepest >= milestones[sent]) {
      trackEvent("scroll_depth", { percent_scrolled: milestones[sent] });
      sent += 1;
    }
  };

  const onScroll = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(measure);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => deepest;
}

const observedSections = new WeakSet<Element>();

/**
 * First time each section scrolls into view, so we learn what actually gets
 * read. Called from a layout effect once React has committed the page, and
 * de-duplicated so StrictMode's double render does not double-count.
 */
export function trackSectionViews() {
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        trackEvent("section_view", {
          section:
            element.dataset.analyticsSection ||
            element.className.split(" ")[0] ||
            element.id ||
            "section",
        });
        observer.unobserve(element);
      });
    },
    { threshold: 0.35 },
  );
  document.querySelectorAll<HTMLElement>("main section").forEach((section) => {
    if (observedSections.has(section)) return;
    observedSections.add(section);
    observer.observe(section);
  });
}

/** 30s / 60s / 180s dwell milestones plus a final engagement summary. */
function watchEngagement(deepestScroll: () => number) {
  const started = Date.now();
  const timers = [30, 60, 180].map((seconds) =>
    window.setTimeout(
      () => trackEvent("time_on_page", { seconds }),
      seconds * 1000,
    ),
  );
  let summarised = false;
  const summarise = () => {
    if (summarised) return;
    summarised = true;
    timers.forEach(window.clearTimeout);
    trackEvent("page_engagement", {
      engaged_seconds: Math.round((Date.now() - started) / 1000),
      max_scroll: deepestScroll(),
    });
  };
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") summarise();
  });
  window.addEventListener("pagehide", summarise);
}

/** One `form_start` the first time someone types into a form on the page. */
function watchForms() {
  let started = false;
  document.addEventListener(
    "input",
    (event) => {
      if (started) return;
      const field = event.target;
      if (!(field instanceof Element)) return;
      const form = field.closest("form");
      if (!form) return;
      started = true;
      trackEvent("form_start", {
        form_name: form.className.split(" ")[0] || "form",
      });
    },
    true,
  );
}

let started = false;

/** Wire every listener once. Safe under React StrictMode's double effect. */
export function initAnalytics() {
  if (started) return;
  started = true;
  document.addEventListener("click", trackClick, true);
  const deepestScroll = watchScrollDepth();
  watchEngagement(deepestScroll);
  watchForms();
}
