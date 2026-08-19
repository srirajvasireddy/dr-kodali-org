import { ArrowUpRight, Play, Quote } from "lucide-react";

export function WomenAtCrossroadsPage() {
  return (
    <section className="crossroads section-pad" id="crossroads">
      <div className="crossroads-copy">
        <div className="crossroads-identity">
          <img
            src="/media/women-at-crossroads/logo.jpg"
            alt="Women at Crossroads — Reset to Rise"
          />
          <div>
            <p className="kicker">Building community today</p>
            <div className="youtube-label">
              <Play size={22} fill="currentColor" />
              <span>Now on YouTube</span>
            </div>
          </div>
        </div>
        <h2>
          Women at
          <br />
          <em>Crossroads.</em>
        </h2>
        <p className="crossroads-intro">
          A new community created by Bandhavi for women navigating change,
          identity, purpose and the question of what comes next.
        </p>
        <a
          className="button crossroads-button"
          href="https://www.youtube.com/@womenatcrossroads"
          target="_blank"
          rel="noreferrer"
        >
          <Play size={19} fill="currentColor" /> Visit the channel{" "}
          <ArrowUpRight size={18} />
        </a>
      </div>
      <a
        className="crossroads-cover"
        href="https://www.youtube.com/@womenatcrossroads"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit Women at Crossroads on YouTube"
      >
        <img
          src="/media/women-at-crossroads/cover.jpg"
          alt="Women at Crossroads — Reset to Rise, empowering and supporting women toward success"
        />
        <span>
          <Play size={18} fill="currentColor" /> Explore Women at Crossroads{" "}
          <ArrowUpRight size={17} />
        </span>
      </a>
      <blockquote className="crossroads-quote">
        <Quote size={30} />
        <p>
          “There comes a time in every woman’s life when she wonders, ‘Is this
          all my life is meant to be?’ I asked myself the same question. That
          question has taken me on a new journey. I’ll be sharing that journey
          with you. I hope you’ll walk with me.”
        </p>
        <footer>— Vasireddy Priya Bandhavi</footer>
      </blockquote>
    </section>
  );
}
