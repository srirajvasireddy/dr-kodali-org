import { useCallback, useState } from "react";
import { ImpactSlider } from "../components/ImpactSlider/ImpactSlider";
import { Lightbox } from "../components/Lightbox/Lightbox";
import { gallery, momentThumb } from "../data/gallery";

export function ImpactPage() {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setActiveImage(null), []);

  return (
    <>
      <section className="impact section-pad" id="impact">
        <div className="impact-intro">
          <p className="kicker light">Community impact</p>
          <h2>
            Compassion
            <br />
            becomes action.
          </h2>
          <p>
            Moments from education, health, relief and rural-development
            programmes across Andhra Pradesh.
          </p>
        </div>
        <ImpactSlider onExpand={setActiveImage} />
        <div className="more-moments">
          <div className="moments-heading">
            <span>More moments from our work</span>
            <small>Open any photograph to view its high-resolution master</small>
          </div>
          <div className="moments-grid">
            {gallery.slice(4).map((image, index) => (
              <button
                className="moment-item"
                type="button"
                key={image.src}
                onClick={() => setActiveImage(index + 4)}
                aria-label={`View ${image.title}`}
              >
                <img
                  src={momentThumb(image.src)}
                  alt={image.alt}
                  loading="lazy"
                />
                <span>{image.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeImage !== null && (
        <Lightbox
          images={gallery}
          index={activeImage}
          onSelect={setActiveImage}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
