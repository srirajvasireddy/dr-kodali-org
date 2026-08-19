import { Mail, Phone, UserRound } from "lucide-react";
import { JoinForm } from "../components/JoinForm/JoinForm";

export function GetInvolvedPage() {
  return (
    <section className="join section-pad" id="join">
      <div className="join-copy">
        <p className="kicker">Get involved</p>
        <h2>
          Stand with us.
          <br />
          Serve with us.
        </h2>
        <p>
          Volunteer, collaborate, share a suggestion or simply begin a
          conversation about serving communities in and around Tenali.
        </p>
        <div className="contact-links">
          <a href="tel:+919705311228">
            <Phone size={20} />
            <span>
              <small>Call</small>+91 97053 11228
            </span>
          </a>
          <a href="mailto:pbandhavi@yahoo.com">
            <Mail size={20} />
            <span>
              <small>Email</small>pbandhavi@yahoo.com
            </span>
          </a>
          <a
            href="https://www.facebook.com/bandhavi.vasireddy"
            target="_blank"
            rel="noreferrer"
          >
            <UserRound size={20} />
            <span>
              <small>Connect</small>Bandhavi Vasireddy
            </span>
          </a>
        </div>
      </div>
      <JoinForm />
    </section>
  );
}
