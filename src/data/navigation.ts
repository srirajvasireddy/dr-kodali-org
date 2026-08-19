// Single source of truth for the site's top-level destinations. The router
// (App.tsx), both navigations and the per-route document titles all read from
// here so a new page only has to be added in one place.

export type NavItem = {
  readonly label: string;
  readonly to: string;
};

export const navItems = [
  { label: "Our Story", to: "/our-story" },
  { label: "His Legacy", to: "/legacy" },
  { label: "Our Work", to: "/our-work" },
  { label: "Impact", to: "/impact" },
  { label: "Women at Crossroads", to: "/women-at-crossroads" },
  { label: "Press", to: "/press" },
] as const satisfies readonly NavItem[];

/** Kept out of `navItems` because it renders as the header call-to-action. */
export const getInvolvedPath = "/get-involved";

const pageTitles: Record<string, string> = {
  "/": "Dr. Kodali Veeriah Educational Academy",
  "/our-story": "Our Story | Dr. Kodali Veeriah Educational Academy",
  "/legacy": "His Legacy | Dr. Kodali Veeriah Educational Academy",
  "/our-work": "Our Work | Dr. Kodali Veeriah Educational Academy",
  "/impact": "Community Impact | Dr. Kodali Veeriah Educational Academy",
  "/women-at-crossroads":
    "Women at Crossroads | Dr. Kodali Veeriah Educational Academy",
  "/press": "Press Coverage | Dr. Kodali Veeriah Educational Academy",
  "/get-involved": "Get Involved | Dr. Kodali Veeriah Educational Academy",
};

const notFoundTitle = "Page Not Found | Dr. Kodali Veeriah Educational Academy";

/** `/impact/` and `/impact` are the same page, and React Router matches both. */
export const normalizePath = (pathname: string) =>
  pathname.replace(/\/+$/, "") || "/";

export const titleForPath = (pathname: string) =>
  pageTitles[normalizePath(pathname)] ?? notFoundTitle;
