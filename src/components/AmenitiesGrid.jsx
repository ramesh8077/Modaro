// AmenitiesGrid — crisp, light image-led treatment for the property highlights
import Img from "./Img";
import { homePhotoSets } from "../data/homePhotoLibrary";

const amenities = [
  {
    image: homePhotoSets.amenities[0],
    title: "Infinity Pool",
    desc: "Cool off in the water, then let the afternoon unfold beside the pool.",
  },
  {
    image: homePhotoSets.amenities[1],
    title: "Outdoor Dining",
    desc: "Share an evening meal outdoors beneath the garden lights.",
  },
  {
    image: homePhotoSets.amenities[2],
    title: "Pickleball",
    desc: "A little friendly competition adds a playful pause to the day.",
  },
  {
    image: homePhotoSets.amenities[3],
    title: "Private Dining",
    desc: "Ask us about dining options for your stay.",
  },
  {
    image: homePhotoSets.amenities[4],
    title: "Transfers on Request",
    desc: "Ask about travel to and from the villa.",
  },
  {
    image: homePhotoSets.amenities[5],
    title: "Four Bedrooms",
    desc: "Settle in, slow down, and wake ready for another easy day.",
  },
  {
    image: homePhotoSets.amenities[6],
    title: "Celebrations",
    desc: "A private setting for birthdays, anniversaries, and time together.",
  },
  {
    image: homePhotoSets.amenities[7],
    title: "Close to Nature",
    desc: "Green surroundings and open skies bring a quieter pace to your stay.",
  },
];

export default function AmenitiesGrid() {
  return (
    <section
      id="amenities"
      className="bg-white text-[#252D39]"
      aria-labelledby="amenities-heading"
    >
      <div className="container-lux pb-10 pt-8 lg:pb-12 lg:pt-10" style={{ maxWidth: "none", paddingInline: "clamp(1rem, 4vw, 4rem)" }}>
        {/* Header */}
        <div className="mb-8 text-center sm:mb-10">
          <h2
            id="amenities-heading"
            className="h2 mx-auto max-w-2xl text-[#252D39]"
          >
            Pool, gardens & more
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base font-medium text-[#4e5149]">
            Poolside afternoons, garden walks, and room for everyone to gather.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-4">
          {amenities.map((item) => (
            <div
              key={item.title}
              className="amenity-card group cursor-default overflow-hidden rounded-none"
            >
              <div className="relative aspect-[1.54] overflow-hidden">
                <Img img={item.image} className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
              </div>
              <div className="min-h-[172px] p-5 sm:p-6">
                <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#9a6b23]">Villa Modaro</p>
                <h3 className="mb-2 font-display text-2xl font-medium leading-tight text-[#252b36] sm:text-[1.7rem]">
                  {item.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-[#686b70]">
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
            className="btn amenity-cta inline-flex min-h-[52px] items-center gap-2 px-10 text-sm font-semibold tracking-widest text-white"
          >
            Check Availability
          </a>
        </div>
      </div>
    </section>
  );
}
