// AmenitiesGrid — crisp, light image-led treatment for the property highlights
import Img from "./Img";
import { homePhotoSets } from "../data/homePhotoLibrary";

const amenities = [
  {
    image: homePhotoSets.amenities[4],
    title: "Parking",
    desc: "On-site parking for guests arriving at Villa Modaro.",
  },
  {
    image: homePhotoSets.interior[0],
    title: "Wi-Fi",
    desc: "Stay connected during your time at the villa.",
  },
  {
    image: homePhotoSets.interior[2],
    title: "Kitchen & Refrigerator",
    desc: "A kitchen and refrigerator are available for practical needs during your stay.",
  },
  {
    image: homePhotoSets.story,
    title: "Security",
    desc: "Security arrangements are in place at the property.",
  },
  {
    image: homePhotoSets.amenities[4],
    title: "CCTV",
    desc: "CCTV is available as part of the villa's security setup.",
  },
];

export default function AmenitiesGrid() {
  return (
    <section
      id="amenities"
      className="bg-white text-charcoal"
      aria-labelledby="amenities-heading"
    >
      <div className="container-lux pb-10 pt-8 lg:pb-12 lg:pt-10" style={{ maxWidth: "none", paddingInline: "clamp(1rem, 4vw, 4rem)" }}>
        {/* Header */}
        <div className="mb-8 text-center sm:mb-10">
          <h2
            id="amenities-heading"
            className="h2 mx-auto max-w-2xl text-charcoal"
          >
            Thoughtful Essentials
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base font-medium text-charcoal/75">
            The everyday comforts that help make each Villa Modaro stay easy.
          </p>
        </div>

        {/* Amenities Grid */}
        {/* Keep the four-card first row at standard laptop widths; CCTV continues on the next row. */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {amenities.map((item) => (
            <div
              key={item.title}
              className="amenity-card group cursor-default overflow-hidden rounded-none"
            >
              <div className="relative aspect-[1.54] overflow-hidden">
                <Img img={item.image} className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
              </div>
              <div className="min-h-[172px] p-5 sm:p-6">
                <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-brass">Villa Modaro</p>
                <h3 className="mb-2 font-display text-2xl font-medium leading-tight text-charcoal sm:text-[1.7rem]">
                  {item.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-olive">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center sm:mt-10">
          <a
            href="/booking"
            className="btn amenity-cta inline-flex min-h-[52px] items-center gap-2 px-10 text-sm font-semibold tracking-widest text-white"
          >
            Check Availability
          </a>
        </div>
      </div>
    </section>
  );
}
