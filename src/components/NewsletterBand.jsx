// NewsletterBand — Inspired by Taj Hotels newsletter + Four Seasons email preferences
// Dark band with promise of exclusive rates and first-look availability

import { useState } from "react";

export default function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // In production, wire this to an email service
      setSubmitted(true);
    }
  };

  return (
    <section
      id="newsletter"
      className="bg-charcoal text-ivory"
      aria-labelledby="newsletter-heading"
    >
      <div className="container-lux py-16 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          {/* Ornament */}
          <span className="gold-rule mb-6" />

          <p className="kicker-lux mb-4 text-ivory/60">STAY IN THE KNOW</p>
          <h2
            id="newsletter-heading"
            className="font-display text-3xl font-medium text-ivory lg:text-4xl"
          >
            Be the first to know.
          </h2>
          <p className="mt-4 text-[15px] text-ivory/60">
            Exclusive rates, early availability windows, and seasonal
            announcements — delivered only to our list.
          </p>

          {submitted ? (
            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-brass/40 px-8 py-4 text-sm text-brass">
              <span aria-hidden="true">✓</span>
              Thank you — we'll be in touch soon.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-0"
              aria-label="Newsletter signup"
            >
              <label htmlFor="nl-email" className="sr-only">
                Your email address
              </label>
              <input
                id="nl-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="nl-input flex-1 sm:rounded-none"
                autoComplete="email"
              />
              <button
                type="submit"
                className="btn bg-brass text-charcoal hover:bg-ivory min-h-[44px] shrink-0 tracking-widest text-xs"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="mt-4 text-[11px] text-ivory/30 tracking-[0.15em]">
            No spam. Unsubscribe any time. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
