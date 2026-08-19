import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { HomeCarousel } from "../components/HomeCarousel/HomeCarousel";

export function HomePage() {
  return (
    <section className="hero home-hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <span className="hero-monogram" aria-hidden="true">
        DK
      </span>
      <div className="hero-copy">
        <p className="eyebrow">
          <span /> In memory of Dr. Kodali Veeriah • Since 2001
        </p>
        <h1>
          A legacy of care.
          <br />
          <em>A community of possibility.</em>
        </h1>
        <p className="hero-intro">
          A nonprofit led by Vasireddy Priya Bandhavi, helping women, students,
          families and rural communities move forward with knowledge, confidence
          and dignity.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/our-work">
            Explore our work <ArrowRight size={18} />
          </Link>
          <Link className="text-link" to="/our-story">
            Our story <ArrowRight size={18} />
          </Link>
        </div>
      </div>
      <HomeCarousel />
      <div className="impact-strip" aria-label="Academy highlights">
        <div>
          <strong>2001</strong>
          <span>Academy registered</span>
        </div>
        <div>
          <strong>10,000+</strong>
          <span>Women supported</span>
        </div>
        <div>
          <strong>25+ yrs</strong>
          <span>Recorded service</span>
        </div>
        <div>
          <strong>Tenali</strong>
          <span>Rooted in Andhra Pradesh</span>
        </div>
      </div>
      <Link className="scroll-cue" to="/our-story">
        Discover our story <ArrowRight size={15} />
      </Link>
    </section>
  );
}
