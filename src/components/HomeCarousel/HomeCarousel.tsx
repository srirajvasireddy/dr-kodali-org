import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { trackEvent } from "../../analytics";
import { carouselMid, carouselThumb, homeCarousel } from "../../data/gallery";

export function HomeCarousel() {
  const [homeSlide, setHomeSlide] = useState(0);
  const [homePlaying, setHomePlaying] = useState(true);
  const [homeTouchStart, setHomeTouchStart] = useState<number | null>(null);
  // Off-screen slides are laid out (opacity 0), not removed, so `loading=lazy`
  // never held them back — all ten downloaded up front. Mount a slide's image
  // only once its slide has been reached, keeping one slide of lookahead so
  // the next is already decoded before the 4.8s auto-advance lands on it.
  // Slides already seen stay mounted so the .75s cross-fade still has an
  // outgoing image to fade out, even when a thumb click jumps several along.
  const [homeSlidesReady, setHomeSlidesReady] = useState(() => new Set([0, 1]));
  const [homeSlideSeen, setHomeSlideSeen] = useState(0);
  if (homeSlideSeen !== homeSlide) {
    // Adjusting state during render — React's documented alternative to an
    // effect here; it bails out on the very next pass instead of cascading.
    setHomeSlideSeen(homeSlide);
    setHomeSlidesReady((ready) => {
      const after = (homeSlide + 1) % homeCarousel.length;
      if (ready.has(homeSlide) && ready.has(after)) return ready;
      const grown = new Set(ready);
      grown.add(homeSlide);
      grown.add(after);
      return grown;
    });
  }

  useEffect(() => {
    if (
      !homePlaying ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(
      () => setHomeSlide((current) => (current + 1) % homeCarousel.length),
      4800, // keep in step with the lookahead in the homeSlidesReady effect
    );
    return () => window.clearInterval(timer);
  }, [homePlaying]);

  return (
    <div
      className="home-visual home-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Moments from the academy's founding years"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          trackEvent("carousel_navigate", {
            carousel: "home",
            method: "keyboard",
            direction: "next",
          });
          setHomeSlide((homeSlide + 1) % homeCarousel.length);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          trackEvent("carousel_navigate", {
            carousel: "home",
            method: "keyboard",
            direction: "previous",
          });
          setHomeSlide(
            (homeSlide - 1 + homeCarousel.length) % homeCarousel.length,
          );
        }
      }}
      onTouchStart={(event) => setHomeTouchStart(event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (homeTouchStart === null) return;
        const distance = event.changedTouches[0].clientX - homeTouchStart;
        if (Math.abs(distance) > 45) {
          trackEvent("carousel_navigate", {
            carousel: "home",
            method: "swipe",
            direction: distance < 0 ? "next" : "previous",
          });
          setHomeSlide((current) =>
            distance < 0
              ? (current + 1) % homeCarousel.length
              : (current - 1 + homeCarousel.length) % homeCarousel.length,
          );
        }
        setHomeTouchStart(null);
      }}
    >
      <div className="home-carousel-stage" aria-live="off">
        {homeCarousel.map((image, index) => (
          <figure
            className={`home-carousel-slide${index === homeSlide ? " active" : ""}`}
            aria-hidden={index !== homeSlide}
            key={image.src}
          >
            {homeSlidesReady.has(index) && (
              <img
                className="home-carousel-image"
                src={image.thumb}
                srcSet={`${image.thumb} 1404w, ${carouselMid(image.src)} 2000w, ${image.src} 3840w`}
                // Measured, not guessed: the slide renders ~53vw, capping
                // near 990px on very wide screens. The old 62vw overstated
                // it by a fifth, which pushed retina laptops onto the
                // 3840px master when 2000px covers them.
                sizes="(max-width: 720px) 100vw, (min-width: 1800px) 990px, 53vw"
                alt={image.alt}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            )}
            <figcaption>
              <span>
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(homeCarousel.length).padStart(2, "0")}
              </span>
              <div>
                <small>Moments of service</small>
                <strong>{image.title}</strong>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="home-carousel-toolbar">
        <div className="home-carousel-buttons">
          <button
            type="button"
            onClick={() =>
              setHomeSlide(
                (homeSlide - 1 + homeCarousel.length) % homeCarousel.length,
              )
            }
            aria-label="Previous historical photograph"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => setHomePlaying(!homePlaying)}
            aria-label={
              homePlaying
                ? "Pause historical photographs"
                : "Play historical photographs"
            }
          >
            {homePlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            type="button"
            onClick={() => setHomeSlide((homeSlide + 1) % homeCarousel.length)}
            aria-label="Next historical photograph"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="home-carousel-progress" aria-hidden="true">
          <span key={homeSlide} className={homePlaying ? "playing" : ""} />
        </div>
      </div>
      <div
        className="home-carousel-thumbs"
        aria-label="Choose a historical photograph"
      >
        {homeCarousel.map((image, index) => (
          <button
            type="button"
            className={index === homeSlide ? "active" : ""}
            onClick={() => setHomeSlide(index)}
            aria-label={`Show ${image.title}`}
            aria-current={index === homeSlide ? "true" : undefined}
            key={image.src}
          >
            <img src={carouselThumb(image.src)} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}
