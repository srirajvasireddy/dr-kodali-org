import { pressImages, pressPile } from "../data/press";

export function PressPage() {
  return (
    <section className="press-section section-pad" id="press">
      <div className="press-copy">
        <p className="kicker light">Our work in the news</p>
        <h2>
          Service that
          <br />
          inspires attention.
        </h2>
        <p>
          Newspapers across Andhra Pradesh have covered the academy’s education,
          women’s empowerment, environmental and community-welfare programmes.
        </p>
        <div className="pile-caption">
          <span>Featured coverage</span>
          <small>Watch the story build, one article at a time.</small>
        </div>
      </div>
      <div className="press-stack" aria-label="Animated pile of press clippings">
        <div className="article-pile" aria-hidden="true">
          {pressPile.map((image) => (
            <figure className="article-sheet" key={image}>
              <img src={`/media/press/full/${image}.webp`} alt="" loading="lazy" />
              <span>Press / {image} • 4K master</span>
            </figure>
          ))}
        </div>
      </div>
      <div className="press-grid">
        <div className="press-grid-title">
          <span>Press coverage</span>
          <small>Open any clipping to view the 4K master</small>
        </div>
        {pressImages.map((image) => (
          <a
            href={`/media/press/4k/${image}.webp`}
            target="_blank"
            rel="noreferrer"
            key={image}
          >
            <img
              src={`/media/press/full/${image}.webp`}
              alt={`Press clipping ${image}`}
              loading="lazy"
            />
            <span>{image}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
