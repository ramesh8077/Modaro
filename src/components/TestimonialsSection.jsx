// TestimonialsSection — Inspired by LuxuryEscapes "65,000+ verified reviews"
// Guest testimonials with star ratings and occasion labels

const testimonials = [
  {
    quote:
      "The most magical birthday celebration we've ever had. Everything was perfect — the pool, the gardens, the sheer privacy. We didn't want to leave.",
    name: "Priya & Rohit S.",
    occasion: "Birthday Celebration",
    city: "New Delhi",
    stars: 5,
  },
  {
    quote:
      "We came for a long weekend and ended up extending by two nights. There's something about Villa Modaro that makes the world outside feel very far away.",
    name: "Arjun & Neha K.",
    occasion: "Anniversary Getaway",
    city: "Mumbai",
    stars: 5,
  },
  {
    quote:
      "Truly private, spectacular in every sense. Our family reunion here was everything we hoped for — spacious, peaceful and beautifully arranged.",
    name: "The Mehta Family",
    occasion: "Family Gathering",
    city: "Dehradun",
    stars: 5,
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-brass text-sm" aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-ivory"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-lux pt-6 pb-0 lg:pt-8 lg:pb-0">
        {/* Header */}
        <div className="mb-5 text-center">
          <h2
            id="testimonials-heading"
            className="h2"
          >
            Guest reviews
          </h2>

        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card"
              data-reveal
            >
              <div className="mb-5 mt-4">
                <StarRating count={t.stars} />
              </div>
              <p className="text-[15px] leading-relaxed text-charcoal/80">
                {t.quote}
              </p>
              <div className="mt-6 border-t border-charcoal/10 pt-5">
                <p className="font-display text-base text-forest">{t.name}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-brass">
                  {t.occasion}
                </p>
                <p className="text-[12px] text-olive">{t.city}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
