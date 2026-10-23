// DiningSection — Inspired by Roseate Hotels ("a fascinating dining destination")
// and Taj Hotels "Dining at Taj" editorial sections
import Img from "./Img";
import { assets } from "../data/assets";

const diningFeatures = [
  {
    icon: "🕯️",
    title: "The Garden Pavilion",
    desc: "An open-air setting for long lunches, relaxed dinners and time together.",
  },
  {
    icon: "👨‍🍳",
    title: "A Chef on Request",
    desc: "Ask about chef-prepared meals, from a slow breakfast to dinner with your guests.",
  },
  {
    icon: "🍾",
    title: "Celebration Dining",
    desc: "Plan a shared meal for birthdays, anniversaries and family gatherings.",
  },
];

export default function DiningSection() {
  return (
    <section
      id="dining"
      className="overflow-hidden bg-[#183b32] text-ivory"
      aria-labelledby="dining-heading"
    >
      <div className="grid lg:grid-cols-2 lg:min-h-[600px]">

          {/* Left — Image */}
          <div className="img-zoom relative min-h-[340px] lg:min-h-full order-1">
            <Img
              img={{ ...assets.outdoorDining, alt: "Al fresco dining at Villa Modaro" }}
              className="absolute inset-0 h-full w-full object-cover opacity-75"
            />
            {/* Warm amber overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(24,59,50,0.08) 0%, rgba(24,59,50,0.58) 100%)",
              }}
              aria-hidden
            />
            {/* Floating badge */}
            <div className="glass-card absolute bottom-8 left-8 hidden px-5 py-4 lg:block">
              <p className="kicker-lux mb-1 text-ivory/70">THE DINING SETTING</p>
              <p className="font-display text-xl text-ivory">Garden Pavilion</p>
            </div>
          </div>

          {/* Right — Content */}
          <div className="order-2 flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-20">
            <p className="kicker-lux mb-4">OUTDOOR DINING</p>
            <span className="gold-rule-left mb-6" />

            <h2
              id="dining-heading"
              className="h2 max-w-md text-ivory"
            >
              Gather around the garden table.
            </h2>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/70">
              Settle beneath the pavilion for relaxed meals beside the garden.
              Ask us about a private chef or dining arrangements for your stay.
            </p>

            <ul className="mt-10 space-y-6">
              {diningFeatures.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <span
                    className="mt-0.5 text-2xl shrink-0"
                    aria-hidden="true"
                  >
                    {f.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ivory">{f.title}</h3>
                    <p className="mt-1 text-[13px] text-ivory/60">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/booking"
                className="btn bg-brass text-charcoal hover:bg-ivory"
              >
                Ask About a Chef
              </a>
              <a
                href="/booking"
                className="btn border border-ivory/30 text-ivory hover:border-brass hover:text-brass"
              >
                Plan Your Dining
              </a>
            </div>
          </div>
      </div>
    </section>
  );
}
