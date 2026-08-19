import type { FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "../../analytics";

/**
 * There is no backend: the form hands the message to the visitor's own mail
 * client, which is a genuine external navigation and stays a location change.
 */
function handleJoin(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") || "");
  trackEvent("form_submit", {
    form_name: "join-form",
    has_phone: Boolean(data.get("phone")),
    has_email: Boolean(data.get("email")),
    message_length: String(data.get("message") || "").length,
  });
  const body = `Name: ${name}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
  window.location.href = `mailto:pbandhavi@yahoo.com?subject=${encodeURIComponent(`Website enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
}

export function JoinForm() {
  return (
    <form className="join-form" onSubmit={handleJoin}>
      <div className="form-row">
        <label>
          Name
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your full name"
          />
        </label>
        <label>
          Phone
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Your phone number"
          />
        </label>
      </div>
      <label>
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
        />
      </label>
      <label>
        Suggestion or query
        <textarea
          name="message"
          rows={5}
          required
          placeholder="How would you like to help?"
        />
      </label>
      <button className="button button-primary" type="submit">
        Send your message <ArrowRight size={18} />
      </button>
      <p className="form-note">
        Submitting opens your email app with the message ready to send.
      </p>
    </form>
  );
}
