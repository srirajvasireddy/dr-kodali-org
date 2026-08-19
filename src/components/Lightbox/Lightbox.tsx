import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { trackEvent } from "../../analytics";
import type { GalleryImage } from "../../data/gallery";

type LightboxProps = {
  images: GalleryImage[];
  index: number;
  onSelect: (index: number) => void;
  onClose: () => void;
};

export function Lightbox({ images, index, onSelect, onClose }: LightboxProps) {
  const image = images[index];

  // One event per opened photograph, whichever way it was opened — thumbnail,
  // arrow button or keyboard.
  useEffect(() => {
    trackEvent("gallery_image_view", {
      image_title: images[index].title,
      image_index: index + 1,
      image_src: images[index].src,
    });
  }, [images, index]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        trackEvent("gallery_navigate", {
          method: "keyboard",
          direction: "next",
        });
        onSelect((index + 1) % images.length);
      }
      if (event.key === "ArrowLeft") {
        trackEvent("gallery_navigate", {
          method: "keyboard",
          direction: "previous",
        });
        onSelect((index - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [images, index, onSelect, onClose]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
      onClick={onClose}
    >
      <button
        className="lightbox-close"
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
      >
        <X />
      </button>
      <button
        className="lightbox-nav prev"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onSelect((index - 1 + images.length) % images.length);
        }}
        aria-label="Previous image"
      >
        <ChevronLeft />
      </button>
      <figure onClick={(event) => event.stopPropagation()}>
        <img src={image.src} alt={image.alt} />
        <figcaption>
          <span>
            {String(index + 1).padStart(2, "0")} / {images.length}
          </span>
          <div>
            <strong>{image.title}</strong>
            <p>{image.caption}</p>
          </div>
        </figcaption>
      </figure>
      <button
        className="lightbox-nav next"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onSelect((index + 1) % images.length);
        }}
        aria-label="Next image"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
