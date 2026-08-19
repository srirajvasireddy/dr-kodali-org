import { Scale } from "lucide-react";
import { objectives, programs } from "../data/programs";

export function OurWorkPage() {
  return (
    <>
      <section className="work section-pad" id="work">
        <div className="section-heading split-heading">
          <div>
            <p className="kicker">How we help</p>
            <h2>
              Programs that meet
              <br />
              people where they are.
            </h2>
          </div>
          <p>
            Every programme begins with a simple question: what would help this
            person, family or village move forward with dignity?
          </p>
        </div>
        <div className="program-list">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <article className="program" key={program.number}>
                <span className="program-number">{program.number}</span>
                <Icon className="program-icon" size={26} strokeWidth={1.5} />
                <h3>{program.title}</h3>
                <p>{program.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="objectives section-pad">
        <div className="objectives-head">
          <Scale size={30} strokeWidth={1.4} />
          <p className="kicker">Our commitments</p>
          <h2>
            What guides
            <br />
            every program.
          </h2>
        </div>
        <ol className="objective-list">
          {objectives.map((objective, index) => (
            <li key={objective}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{objective}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
