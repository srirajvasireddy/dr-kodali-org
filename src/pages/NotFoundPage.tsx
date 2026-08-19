import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

/**
 * Rendered by the client for any path the router does not know. CloudFront's
 * 403/404 fallback still serves index.html with a 200, which is what lets
 * every real route survive a direct hit or a refresh — this page is purely
 * the in-app destination for an address that matches no route.
 */
export function NotFoundPage() {
  return (
    <section className="not-found section-pad">
      <p className="kicker">Page not found</p>
      <h1>
        This page has wandered
        <br />
        <em>off the path.</em>
      </h1>
      <p>
        The story you are looking for may have moved. Return home to continue
        exploring the academy’s work.
      </p>
      <Link className="button button-primary" to="/">
        Return home <ArrowRight size={18} />
      </Link>
    </section>
  );
}
