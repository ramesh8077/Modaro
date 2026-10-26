// Sections.jsx — Completely redesigned for Villa Modaro
// Inspired by: Four Seasons (editorial grids), Roseate Hotels (design-led identity),
// Taj Hotels (occasion-based sections), LuxuryEscapes (visual storytelling)

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, MapPin, Trees, Users, Waves, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Img from "./Img";
import { homeSite as site } from "../data/home";

const kicker = "kicker-lux";
const wrap = "container-lux";

// ============================================================
// 01 — VILLA SHOWCASE
// (Inspired by Four Seasons "Featured Properties" + Roseate editorial grid)
// ============================================================
export function Villa() {
}

// ============================================================
// 02 — BRAND STORY
// (Inspired by Roseate "design-led" brand editorial + Four Seasons "brand heart")
// ============================================================
export function Story() {
  return (
    <section aria-labelledby="brand-story-heading" className="w-full overflow-hidden border-0 bg-[#fff4ef] py-8 text-charcoal" style={{ border: "none", boxShadow: "none" }}>
      <div className="grid w-full grid-cols-1 items-stretch bg-[#fff4ef] lg:grid-cols-[1fr_1fr]">
        <div className="relative min-w-0 min-h-[340px] w-full overflow-hidden sm:min-h-[440px] lg:min-h-[620px]">
          <Img img={{ ...site.images.story, alt: "Tree-lined arrival to Villa Modaro near Mohand Forest" }} className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 border border-white/35 bg-[#34445a]/90 px-4 py-3 text-ivory backdrop-blur-sm sm:bottom-6 sm:left-6 sm:px-5">
            <p className="text-[9px] uppercase tracking-[0.22em] text-brass">A PRIVATE RETREAT</p>
            <p className="mt-1 font-display text-lg">Near Mohand Forest</p>
          </div>
        </div>

        <div className="relative flex w-full min-w-0 flex-col justify-center overflow-hidden bg-[#080808] px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16 xl:px-20">
          <p className={`${kicker} !font-bold !text-[#d6b46a]`}>OUR STORY · VILLA MODARO</p>
          <h2 id="brand-story-heading" className="mt-5 max-w-none font-display text-4xl font-medium leading-[1.16] tracking-[-0.01em] text-white sm:text-5xl lg:text-[3rem]">
            <span className="block">A private place to gather.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-white/90 sm:text-[18px] sm:leading-8">
            Villa Modaro began with a simple wish: to make more room for the people who matter. Set along the Balupur–Paonta Sahib Expressway near Mohand Forest, it brings poolside afternoons, garden walks, shared meals and celebrations together in one private stay.
          </p>
          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-white/90 sm:text-[18px] sm:leading-8">
            Every space is an invitation to slow down, reconnect and make the occasion your own.
          </p>
          <div className="mt-6 grid grid-cols-3 border-y border-white/25 py-4 sm:max-w-xl">
            <div className="pr-3"><p className="font-display text-lg leading-none text-white sm:text-xl">Private</p><p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-white/90 sm:text-xs">Villa stay</p></div>
            <div className="border-l border-white/25 px-3"><p className="font-display text-lg leading-none text-white sm:text-xl">Open</p><p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-white/90 sm:text-xs">Garden & pool</p></div>
            <div className="border-l border-white/25 pl-3"><p className="font-display text-lg leading-none text-white sm:text-xl">Together</p><p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-white/90 sm:text-xs">Room to gather</p></div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link to="/our-story" className="group inline-flex min-h-12 items-center gap-3 border border-[#34445a] bg-[#34445a] px-6 text-xs font-medium text-ivory shadow-[0_8px_22px_rgba(39,50,66,0.2)] transition-all hover:border-[#a77b37] hover:bg-[#26364a]">
              Discover our story <ArrowUpRight size={15} />
            </Link>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-white"><MapPin size={15} className="text-[#d6b46a]" /> Dehradun, Uttarakhand</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 03 — EXPERIENCES EDITORIAL
// (Inspired by Taj Hotels "Discover Our Experiences" + filter tabs)
// ============================================================
const expCategories = ["Pool", "Nature", "Activities", "Social"];

export function Experiences() {
  const [active, setActive] = useState("Pool");
  const sectionRef = useRef(null);
  const filteredExperiences = !active
    ? site.experiences
    : site.experiences.filter((experience) => experience.category === active);

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll("[data-experience-card]");
    if (!cards?.length) return;
    gsap.fromTo(cards,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.1, ease: "power2.out", clearProps: "all" }
    );
  }, { scope: sectionRef, dependencies: [active], revertOnUpdate: true });

  return (
    <section ref={sectionRef} id="experiences" className="w-full px-3 pb-6 pt-1 sm:px-5 lg:px-8 lg:pb-8 lg:pt-2" aria-labelledby="exp-heading">
      <header className="mb-6 border-b border-charcoal/15 pb-5 sm:mb-8 sm:pb-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="exp-heading" className="h2 mt-4 max-w-2xl">Things to do at the villa</h2>
          </div>
          <Link to="/experiences" className="inline-flex min-h-11 items-center gap-2 text-sm transition-colors hover:text-brass">
            See every experience <ArrowUpRight size={15} />
          </Link>
        </div>
      </header>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8" role="tablist" aria-label="Experience categories">
        <div className="flex flex-wrap gap-2">
          {expCategories.map((cat) => (
            <button key={cat} type="button" role="tab" aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={`min-h-10 rounded-full border px-5 text-xs tracking-[0.12em] transition-colors ${active === cat
                ? "border-brass bg-brass text-charcoal"
                : "border-charcoal/20 bg-transparent text-charcoal/70 hover:border-brass hover:text-charcoal"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7" role="tabpanel" aria-label={`${active || "All"} experiences`}>
        {filteredExperiences.map((e) => (
          <figure
            key={e.title}
            data-experience-card
            className={`group relative ${filteredExperiences.length === 1 ? "sm:col-span-2" : ""}`}
          >
            <div className={`img-zoom relative overflow-hidden bg-olive/15 ${filteredExperiences.length === 1 ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
              <Img
                img={e.img}
                className="size-full transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent transition-colors duration-300 group-hover:from-charcoal/90" />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 text-ivory sm:p-7 lg:p-8">
                <span className="text-[10px] uppercase tracking-[0.22em] text-ivory/75">{e.category}</span>
                <h3 className="font-display text-3xl leading-none sm:text-4xl lg:text-5xl">{e.title}</h3>
                <p className="max-w-md text-sm leading-6 text-ivory/80">{e.text}</p>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// 04 — CELEBRATIONS
// (Inspired by Roseate "your occasion" + Four Seasons "Weddings & Events")
// ============================================================
const occasions = [
  { label: "Birthdays", icon: "🎂", desc: "Mark another year with those who matter most — in a space that feels entirely yours." },
  { label: "Anniversaries", icon: "💍", desc: "Celebrate love and milestones in quiet luxury, away from the ordinary." },
  { label: "Family Gatherings", icon: "👨‍👩‍👧‍👦", desc: "Bring generations together under one roof with room to breathe and reconnect." },
  { label: "Private Get-togethers", icon: "🥂", desc: "Friends, celebrations, and unforgettable evenings in a setting you'll have all to yourself." },
];

export function Celebrations({ onPlan }) {
  const [activeOccasion, setActiveOccasion] = useState(0);
  return (
    <section id="celebrations" className="overflow-hidden bg-ivory text-charcoal" aria-labelledby="celeb-heading">
      <div className={`${wrap} grid gap-8 py-12 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-16`}>

        {/* Image */}
        <figure className="relative lg:col-span-7">
          <div className="img-zoom aspect-[3/2] overflow-hidden">
            <Img img={site.images.celebrations} data-parallax="4" className="h-[108%] w-full" />
          </div>
          {/* Floating occasion badge */}
          <div
            className="absolute bottom-6 left-6 hidden border border-[#8a642d]/45 bg-[#f3e8d2] px-5 py-4 shadow-sm lg:block"
          >
            <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#76521f]">A moment to celebrate</p>
            <p className="font-display text-lg text-charcoal">{occasions[activeOccasion].icon} {occasions[activeOccasion].label}</p>
          </div>
          <figcaption className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.15em] text-charcoal/55">
            <span>04 — CELEBRATIONS</span>
            <span>An outdoor table at dusk</span>
          </figcaption>
        </figure>

        {/* Content */}
        <div data-reveal className="lg:col-span-4 lg:col-start-9">
          <p className="kicker-lux text-[#684711]">MADE FOR YOUR PEOPLE</p>
          <span className="gold-rule-left my-5" />
          <h2 id="celeb-heading" className="h2 max-w-xl">
            Celebrate together
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-6 text-charcoal/70">
            Birthdays, anniversaries, and family time in a private setting made for being together.
          </p>

          {/* Occasion tabs */}
          <ul className="mt-5">
            {occasions.map((occ, i) => (
              <li key={occ.label}>
                <button
                  onClick={() => setActiveOccasion(i)}
                  className={`w-full border-t border-[#8a642d]/25 py-3 text-left transition-colors ${
                    activeOccasion === i ? "border-[#704a14]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-display text-2xl transition-colors ${
                        activeOccasion === i ? "text-[#76521f]" : "text-charcoal"
                      }`}
                    >
                      {occ.label}
                    </span>
                    <span className="text-lg" aria-hidden="true">{occ.icon}</span>
                  </div>
                  {activeOccasion === i && (
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-charcoal/65">{occ.desc}</p>
                  )}
                </button>
              </li>
            ))}
          </ul>

          <Link
            to="/celebrations"
            onClick={onPlan}
            className="btn mt-6 inline-flex items-center gap-2 bg-[#8a642d] text-ivory hover:bg-[#704a14]"
          >
            Explore celebrations <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 05 — GALLERY MASONRY (enhanced)
// (Inspired by Luxury Escapes visual grid + Roseate photography-led identity)
// ============================================================
export function GalleryMasonry({ items, title }) {
  return (
    <section id="gallery-preview" className="bg-[#f0ece0]" aria-labelledby="gallery-heading">
      <div className={`${wrap} pt-8 pb-12 lg:pt-10 lg:pb-16`}>
        <div className="mb-8 text-center">
          <h2 id="gallery-heading" className="h2">{title || "A first look at Villa Modaro"}</h2>
        </div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {(items || []).slice(0, 12).map((img, i) => (
            <div
              key={i}
              className="masonry-item img-zoom group relative cursor-pointer"
              data-reveal
            >
              <Img
                img={img}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-forest/0 transition-all duration-300 group-hover:bg-forest/40">
                <span className="translate-y-3 text-[10px] uppercase tracking-[0.3em] text-ivory opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/gallery" className="btn border border-charcoal hover:bg-charcoal hover:text-ivory">
            View full gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 06 — LOCATION (enhanced)
// (Inspired by Taj Hotels "Find Us" + Four Seasons property location sections)
// ============================================================
export function Location() {
  const distances = [
    { icon: "🚗", label: "45 min", sub: "from Dehradun city" },
    { icon: "🛣️", label: "6 hrs", sub: "from New Delhi" },
    { icon: "🌲", label: "5 min", sub: "to Mohand Forest Reserve" },
    { icon: "✈️", label: "1 hr", sub: "from Jolly Grant Airport" },
  ];

  return (
    <section id="location" className="bg-[#eae6d8]" aria-labelledby="location-heading">
      <div className={`${wrap} section-pad`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">

          {/* Text + distances */}
          <div className="lg:col-span-5">
            <p className={kicker}>06 — FIND YOUR WAY HERE</p>
            <span className="gold-rule-left my-5" />
            <h2 id="location-heading" className="h2">
              Find us near Mohand Forest
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-charcoal/70">
              Villa Modaro sits along the Balupur–Paonta Sahib Expressway, near
              Mohand Forest. Ask us about availability, group size, and
              celebration requirements.
            </p>

            {/* Distance matrix */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {distances.map((d) => (
                <div
                  key={d.label}
                  className="border border-charcoal/10 bg-white px-4 py-4"
                >
                  <span className="text-xl" aria-hidden="true">{d.icon}</span>
                  <p className="mt-2 font-display text-2xl text-forest">{d.label}</p>
                  <p className="text-[12px] text-olive">{d.sub}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-2 text-sm text-charcoal/60">
              <p className="flex items-center gap-2">
                <MapPin size={13} className="text-brass shrink-0" />
                Balupur–Paonta Sahib Expressway
              </p>
              <p className="flex items-center gap-2">
                <Trees size={13} className="text-brass shrink-0" />
                Near Mohand Forest Reserve
              </p>
            </div>

            <a
              href="#booking"
              className="btn mt-8 border border-charcoal hover:bg-charcoal hover:text-ivory"
            >
              Ask about availability
            </a>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-3 lg:col-span-6 lg:col-start-7">
            <div className="img-zoom aspect-[4/5] overflow-hidden">
              <Img img={site.images.story} className="size-full" />
            </div>
            <div className="img-zoom mt-10 aspect-[4/5] overflow-hidden">
              <Img img={site.images.villaSmall} className="size-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 07 — CLOSING CTA (Cinematic redesign)
// (Inspired by Four Seasons full-bleed brand CTA section)
// ============================================================
export function ClosingInvite() {
  return (
    <section
      className="w-full px-4 pt-4 pb-8 sm:px-6 lg:px-8 lg:pt-5 lg:pb-10"
      aria-label="Call to action"
    >
      <div className="relative overflow-hidden bg-[#080808] text-ivory">
        {/* Full-height background image */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-3/5">
          <Img
            img={site.images.celebrations}
            className="size-full opacity-60"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #080808 0%, #080808 30%, rgba(8,8,8,0.5) 65%, rgba(8,8,8,0.2) 100%)",
            }}
            aria-hidden
          />
        </div>

        {/* Content */}
        <div className="relative max-w-3xl px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
          <p className={kicker}>READY WHEN YOU ARE</p>
          <span className="gold-rule-left my-3" />
          <h2 className="h2 max-w-2xl">
            Plan your stay
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ivory/75 sm:text-[15px]">
            Choose your dates and let us create something unforgettable.
            Villa Modaro is waiting — whenever you're ready.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="#booking" className="btn btn-shimmer min-h-11 px-8 tracking-widest text-xs">
              Check Availability
            </a>
            <a
              href="/booking"
              className="btn min-h-11 border border-ivory/40 text-ivory hover:border-brass hover:text-brass"
            >
              Plan Your Stay
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Legacy exports kept for backward compatibility with other pages
export { Villa as default };
