// DiningSection — Inspired by Roseate Hotels ("a fascinating dining destination")
// and Taj Hotels "Dining at Taj" editorial sections
import Img from "./Img";
import { homePhotoSets } from "../data/homePhotoLibrary";

const diningFeatures = [
  {
    title: "Covered Garden Dining",
    desc: "An open-air setting for long lunches, relaxed dinners and time together.",
  },
  {
    title: "B&B Features",
    desc: "Enjoy a clean, hygienic setup and the comforts of a bed-and-breakfast stay.",
  },
  {
    title: "Celebration Dining",
    desc: "Plan a shared meal for birthdays, anniversaries and family gatherings.",
  },
];

export default function DiningSection() {
  return (
    <section
      id="dining"
      className="overflow-hidden bg-black text-ivory"
      aria-labelledby="dining-heading"
    >
      <div aria-hidden="true" className="h-2 w-full bg-white" />
      <div className="grid lg:grid-cols-2 lg:min-h-[600px]">

          {/* Left — Image */}
          <div className="img-zoom relative min-h-[340px] lg:min-h-full order-1">
            <Img
              img={homePhotoSets.dining}
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
              <p className="font-display text-xl text-ivory">Covered Garden Dining</p>
            </div>
          </div>

          {/* Right — Content */}
          <div className="order-2 flex flex-col justify-center bg-black px-8 py-16 lg:px-16 lg:py-20">
            <p className="kicker-lux mb-4">OUTDOOR DINING</p>
            <span className="gold-rule-left mb-6" />

            <h2
              id="dining-heading"
              className="h2 max-w-md text-ivory"
            >
              Dining at Villa Modaro
            </h2>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/70">
              Settle beneath the pavilion for relaxed meals beside the garden.
              Ask us about a private chef or dining arrangements for your stay.
            </p>

            <ul className="mt-10 space-y-6">
              {diningFeatures.map((f) => (
                <li key={f.title}>
                    <h3 className="font-display text-lg text-ivory">{f.title}</h3>
                    <p className="mt-1 text-[13px] text-ivory/60">{f.desc}</p>
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
