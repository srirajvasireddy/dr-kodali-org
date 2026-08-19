export function LegacyPage() {
  return (
    <>
      <section className="legacy cinematic-legacy section-pad" id="legacy">
        <div className="legacy-glow" aria-hidden="true" />
        <span className="legacy-monogram" aria-hidden="true">
          DK
        </span>
        <div className="legacy-top">
          <div className="section-heading">
            <p className="kicker light">The life we honour</p>
            <h2>
              Remembering
              <br />
              Dr. Kodali Veeriah.
            </h2>
          </div>
          <div className="legacy-portrait">
            <div className="portrait-frame">
              <img
                src="/media/portraits/kodaliveraiah-hd.webp"
                alt="Dr. Kodali Veeriah seated at his desk"
              />
              <div className="portrait-label">
                <span>1928—2000</span>
                <strong>
                  Physician. Reformer.
                  <br />
                  Public servant.
                </strong>
              </div>
            </div>
            <div className="since-badge">
              <span>
                His values
                <br />
                live on
              </span>
              <strong>DK</strong>
            </div>
          </div>
        </div>
        <div className="legacy-grid">
          <div className="legacy-date">
            <span>20 August 1928</span>
            <i />
            <span>10 December 2000</span>
          </div>
          <div className="legacy-story">
            <p className="lead">
              Dr. Veeriah was a respected physician and surgeon from Moparru
              village near Tenali in Andhra Pradesh’s Guntur district.
            </p>
            <p>
              He graduated from Andhra Medical College, Visakhapatnam in 1950,
              securing second rank and a gold medal. In 1952, he began a general
              medical practice in Tenali with Dr. Kurra Veeraraghaviah. Together
              they kept treatment affordable and cared for people who could not
              pay.
            </p>
            <p>
              A lifelong social activist, he worked closely with leaders
              including Loknayak Jayaprakash Narayan and Ram Manohar Lohia. He
              brought Jayaprakash Narayan to Moparru and organised meetings
              around Tenali on socialist policy.
            </p>
            <p>
              He was elected MLA for Vemuru in 1985 as a Telugu Desam Party
              candidate, while remaining accessible to people from society’s
              most vulnerable sections.
            </p>
          </div>
          <aside className="legacy-aside">
            <span className="big-initial">V</span>
            <p>
              As a member of the Senate and Syndicates of Andhra and Nagarjuna
              Universities, he studied educational institutions across the USA,
              Canada, the UK, Ireland, Switzerland and Egypt—and brought those
              ideas home.
            </p>
            <p>
              He was also closely associated with V.S.R. &amp; N.V.R. College,
              Tenali, from its inception.
            </p>
          </aside>
        </div>
      </section>

      <section className="values-band">
        <p>The values he lived by</p>
        <div>
          <span>
            <b>Dama</b>
            <small>Self-restraint</small>
          </span>
          <span>
            <b>Daana</b>
            <small>Generosity</small>
          </span>
          <span>
            <b>Daya</b>
            <small>Compassion</small>
          </span>
        </div>
      </section>
    </>
  );
}
