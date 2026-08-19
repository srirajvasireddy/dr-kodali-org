import { Quote } from "lucide-react";
import { founderMilestones } from "../data/founder";

export function OurStoryPage() {
  return (
    <>
      <section className="statement-section section-pad" id="story">
        <div className="section-index">01 / OUR STORY</div>
        <div className="statement-copy">
          <Quote size={42} strokeWidth={1.3} />
          <h2>A living memorial, expressed through service.</h2>
          <p>
            Dr. Kodali Veeriah Educational Academy was established in November
            2001 in his loving memory. Led by his granddaughter Vasireddy Priya
            Bandhavi, the nonprofit turns the values he lived by into practical
            help for people and communities.
          </p>
        </div>
      </section>

      <section className="founder section-pad">
        <div className="founder-title">
          <p className="kicker">Carrying the legacy forward</p>
          <h2>
            Vasireddy
            <br />
            <em>Priya Bandhavi</em>
          </h2>
          <p className="founder-role">Founder &amp; Secretary</p>
          <div className="founder-portrait">
            <div className="portrait-frame">
              <img
                src="/media/portraits/bandhavi-founder.webp"
                alt="Vasireddy Priya Bandhavi, Founder and Secretary"
                loading="lazy"
              />
              <div className="portrait-label">
                <span>Tenali • Andhra Pradesh</span>
                <strong>
                  Service
                  <br />
                  with purpose
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className="founder-story">
          <p className="lead">
            The eldest granddaughter of Dr. Kodali Veeriah, Bandhavi transformed
            the values he gave her into an organisation built for service.
          </p>
          <p>
            Through the academy she organised seminars, workshops, health camps,
            science exhibitions and mathematical talent tests spanning
            education, health, agriculture, gardening and the environment. The
            Homemaker’s Institute supported more than 6,000 women through free
            classes, while the helpline offered women advice, information and
            counselling.
          </p>
          <p>
            She also took part in the fight against corruption through rallies,
            dharnas, hunger strikes and public-awareness campaigns undertaken
            with the appropriate permissions.
          </p>
        </div>
        <div className="founder-timeline">
          {founderMilestones.map(([year, text]) => (
            <div key={year}>
              <span>{year}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
