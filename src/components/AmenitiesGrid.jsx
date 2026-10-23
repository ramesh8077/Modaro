// AmenitiesGrid — light ivory and brass treatment for the property highlights
import { BedDouble, Car, Mountain, PartyPopper, Trees, Utensils, Waves, Trophy } from "lucide-react";
import Img from "./Img";
import { assets } from "../data/assets";

const amenities = [
  {
    icon: Waves,
    image: assets.pool,
    title: "Infinity Pool",
    desc: "Cool off in the water, then let the afternoon unfold beside the pool.",
  },
  {
    icon: Trees,
    image: assets.pavilion,
    title: "Landscaped Gardens",
    desc: "Shaded paths and greenery invite an unhurried walk outdoors.",
  },
  {
    icon: Trophy,
    image: assets.pickleball,
    title: "Pickleball",
    desc: "A little friendly competition adds a playful pause to the day.",
  },
  {
    icon: Utensils,
    image: assets.dining,
    title: "Private Dining",
    desc: "Ask us about dining options for your stay.",
  },
  {
    icon: Car,
    image: assets.driveway,
    title: "Transfers on Request",
    desc: "Ask about travel to and from the villa.",
  },
  {
    icon: BedDouble,
    image: assets.bedroomOne,
    title: "Four Bedrooms",
    desc: "Settle in, slow down, and wake ready for another easy day.",
  },
  {
    icon: PartyPopper,
    image: assets.outdoorDining,
    title: "Celebrations",
    desc: "A private setting for birthdays, anniversaries, and time together.",
  },
  {
    icon: Mountain,
    image: assets.entry,
    title: "Close to Nature",
    desc: "Green surroundings and open skies bring a quieter pace to your stay.",
  },
];

export default function AmenitiesGrid() {
  return (
    <section
      id="amenities"
      className="bg-ivory text-charcoal"
      aria-labelledby="amenities-heading"
    >
      <div className="container-lux pb-12 pt-3 lg:pb-16 lg:pt-4">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-10">
          <h2
            id="amenities-heading"
            className="h2 mx-auto max-w-2xl text-charcoal"
          >
            Space to feel at home.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-charcoal/65">
            Poolside afternoons, garden walks, and room for everyone to gather.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((item) => (
            <div
              key={item.title}
              className="amenity-card group cursor-default overflow-hidden"
            >
              <div className="relative aspect-[16/8] overflow-hidden">
                <Img img={item.image} className="size-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 to-transparent" />
              </div>
              <div className="p-4">
                <span className="mb-3 grid size-9 place-items-center rounded-full border border-[#704a14] bg-[#8a642d] text-[#fff8e8]" aria-hidden="true">
                  <item.icon size={18} strokeWidth={1.5} />
                </span>
                <h3 className="mb-2 font-display text-xl text-charcoal transition-colors group-hover:text-[#76521f]">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-charcoal/65">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center sm:mt-10">
          <a
            href="#booking"
            className="btn amenity-cta inline-flex min-h-[50px] items-center gap-2 px-10 text-sm tracking-widest"
          >
            Check Availability
          </a>
          <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-charcoal/50">
            Exclusively available for private bookings
          </p>
        </div>
      </div>
    </section>
  );
}
