import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { trackEvent } from "../../analytics";
import { featuredGallery, impactWeb } from "../../data/gallery";

type ImpactSliderProps = {
  /** Opens the given gallery index in the lightbox. */
  onExpand: (index: number) => void;
};

export function ImpactSlider({ onExpand }: ImpactSliderProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slidePlaying, setSlidePlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    if (!slidePlaying) return;
    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % featuredGallery.length),
      5500,
    );
    return () => window.clearInterval(timer);
  }, [slidePlaying]);

  return (
    <div
      className="impact-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured community impact"
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const distance = event.changedTouches[0].clientX - touchStart;
        if (Math.abs(distance) > 50) {
          trackEvent("carousel_navigate", {
            carousel: "impact",
            method: "swipe",
            direction: distance < 0 ? "next" : "previous",
          });
          setActiveSlide((current) =>
            distance < 0
              ? (current + 1) % featuredGallery.length
              : (current - 1 + featuredGallery.length) % featuredGallery.length,
          );
        }
        setTouchStart(null);
      }}
    >
      <div className="impact-slides" aria-live="polite">
        {featuredGallery.map((image, index) => (
          <figure
            className={`impact-slide${index === activeSlide ? " active" : ""}`}
            aria-hidden={index !== activeSlide}
            key={image.src}
          >
            <img
              src={impactWeb(image.src)}
              srcSet={`${impactWeb(image.src)} 1600w, ${image.src} 2880w`}
              sizes="(max-width: 720px) 100vw, min(1240px, 92vw)"
              alt={image.alt}
              loading={index === 0 ? "eager" : "lazy"}
            />
            <button
              type="button"
              className="slide-expand"
              onClick={() => onExpand(index)}
              aria-label={`Open ${image.title} in gallery`}
            >
              <ArrowUpRight size={18} />
            </button>
            <figcaption>
              <span>
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(featuredGallery.length).padStart(2, "0")}
              </span>
              <div>
                <strong>{image.title}</strong>
                <p>{image.caption}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="slider-controls">
        <button
          type="button"
          onClick={() =>
            setActiveSlide(
              (activeSlide - 1 + featuredGallery.length) %
                featuredGallery.length,
            )
          }
          aria-label="Previous impact story"
        >
          <ChevronLeft />
        </button>
        <div className="slider-dots">
          {featuredGallery.map((image, index) => (
            <button
              type="button"
              className={index === activeSlide ? "active" : ""}
              onClick={() => setActiveSlide(index)}
              aria-label={`Show ${image.title}`}
              aria-current={index === activeSlide ? "true" : undefined}
              key={image.src}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setActiveSlide((activeSlide + 1) % featuredGallery.length)
          }
          aria-label="Next impact story"
        >
          <ChevronRight />
        </button>
        <button
          type="button"
          className="slider-play"
          onClick={() => setSlidePlaying(!slidePlaying)}
          aria-label={slidePlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {slidePlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
    </div>
  );
}
