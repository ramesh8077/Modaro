// Sections.jsx — Completely redesigned for Villa Modaro
// Inspired by: Four Seasons (editorial grids), Roseate Hotels (design-led identity),
// Taj Hotels (occasion-based sections), LuxuryEscapes (visual storytelling)

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, MapPin, Users, Waves, ChevronRight } from "lucide-react";
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
    <section aria-labelledby="brand-story-heading" className="w-full overflow-hidden border-0 bg-ivory py-8 text-charcoal" style={{ border: "none", boxShadow: "none" }}>
      <div className="grid w-full grid-cols-1 items-stretch bg-ivory lg:grid-cols-[1fr_1fr]">
        <div className="relative min-w-0 min-h-[340px] w-full overflow-hidden sm:min-h-[440px] lg:min-h-[620px]">
          <Img img={{ ...site.images.story, alt: "Tree-lined arrival to Villa Modaro near Mohand Forest" }} className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 border border-white/35 bg-forest/90 px-4 py-3 text-ivory backdrop-blur-sm sm:bottom-6 sm:left-6 sm:px-5">
            <p className="text-[9px] uppercase tracking-[0.22em] text-brass">A PRIVATE RETREAT</p>
            <p className="mt-1 font-display text-lg">Near Mohand Forest</p>
          </div>
        </div>

        <div className="relative flex w-full min-w-0 flex-col justify-center overflow-hidden bg-[#080808] px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16 xl:px-20">
          <p className={`${kicker} !font-bold !text-[#d6b46a]`}>OUR STORY · VILLA MODARO</p>
          <h2 id="brand-story-heading" className="mt-5 max-w-none font-display text-4xl font-medium leading-[1.16] tracking-[-0.01em] text-white sm:text-5xl lg:text-[3rem]">
            <span className="block">A private place to gather</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-white/90 sm:text-[18px] sm:leading-8">
            Villa Modaro is an oasis of celebration and calm, designed for those who seek both joy and rejuvenation. Every occasion finds its perfect setting: a quiet escape with friends and family, intimate anniversaries, birthdays, family gatherings, poolside relaxation or parties.
          </p>
          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-white/90 sm:text-[18px] sm:leading-8">
            Surrounded by lush gardens, vibrant plants and the pristine Himalayan air near Mohand Forest, the villa blends nature with lifestyle. Enjoy pickleball, refreshing dips in the pool and serene walks through landscaped greenery, all while staying effortlessly connected on the Balupur–Paonta Sahib Expressway. Villa Modaro is where accessibility meets exclusivity, a retreat for discerning travellers who value celebration, connection and the beauty of the outdoors.
          </p>
          <div className="mt-6 grid grid-cols-3 border-y border-white/25 py-4 sm:max-w-xl">
            <div className="pr-3"><p className="font-display text-lg leading-none text-white sm:text-xl">Private</p><p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-white/90 sm:text-xs">Villa stay</p></div>
            <div className="border-l border-white/25 px-3"><p className="font-display text-lg leading-none text-white sm:text-xl">Open</p><p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-white/90 sm:text-xs">Garden & pool</p></div>
            <div className="border-l border-white/25 pl-3"><p className="font-display text-lg leading-none text-white sm:text-xl">Together</p><p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-white/90 sm:text-xs">Room to gather</p></div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link to="/amenities" className="btn group inline-flex min-h-12 items-center gap-3 border border-forest bg-forest px-6 text-xs font-medium text-ivory shadow-[0_8px_22px_rgba(24,59,50,0.2)] transition-all hover:border-[#a77b37] hover:bg-[#10291f]">
              Explore Amenities <ArrowUpRight size={15} />
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
            <h2 id="exp-heading" className="mt-4 whitespace-nowrap text-[clamp(1rem,5vw,4.5rem)]">POOL, PLAY &amp; GARDEN EXPERIENCES</h2>
          </div>
          <Link to="/the-villa#outdoors" className="inline-flex min-h-11 items-center gap-2 text-sm transition-colors hover:text-brass">
            Explore the villa <ArrowUpRight size={15} />
          </Link>
        </div>
      </header>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8" role="tablist" aria-label="Experience categories">
        <div className="flex flex-wrap gap-2">
          {expCategories.map((cat) => (
            <button key={cat} type="button" role="tab" aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={`min-h-10 rounded-md border px-5 text-xs tracking-[0.12em] transition-colors ${active === cat
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
              <figcaption className="absolute bottom-5 left-5 flex max-w-[85%] flex-col gap-2 border border-[#d6b46a]/40 bg-[#3f342a]/85 px-5 py-4 text-ivory shadow-lg backdrop-blur-sm sm:bottom-7 sm:left-7 sm:px-6 sm:py-5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e2c27b]">{e.category}</span>
                <h3 className="font-display text-2xl leading-tight sm:text-3xl">{e.title}</h3>
                <p className="max-w-md text-sm leading-6 text-ivory/85">{e.text}</p>
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
            to="/booking"
            onClick={onPlan}
            className="btn mt-6 inline-flex items-center gap-2 bg-[#8a642d] text-ivory hover:bg-[#704a14]"
          >
            Plan your celebration <ChevronRight size={15} />
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
    { number: "01", label: "Easy to reach", sub: "Balupur–Paonta Sahib Expressway" },
    { number: "02", label: "Close to nature", sub: "Mohand Forest nearby" },
    { number: "03", label: "Room to retreat", sub: "A peaceful setting set apart" },
  ];

  return (
    <section id="location" className="relative isolate overflow-hidden bg-[#eeeade] text-charcoal" aria-labelledby="location-heading">
      {/* Editorial location feature: oversized image, route marker, and compact travel notes. */}
      <div className={`${wrap} py-16 sm:py-20 lg:py-28`}>
        <div className="mb-8 flex items-center justify-between border-b border-charcoal/15 pb-4 sm:mb-12">
          <p className={`${kicker} !mb-0`}>06 — FIND YOUR WAY HERE</p>
          <span className="hidden text-xs uppercase tracking-[0.22em] text-charcoal/45 sm:block">Accessible by road · Close to nature</span>
        </div>

        <div className="grid gap-9 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-14">
          <div className="relative min-h-[360px] overflow-hidden sm:min-h-[480px] lg:min-h-[620px]">
            <Img img={{ ...site.images.story, alt: "Villa Modaro grounds near the Balupur–Paonta Sahib Expressway" }} eager className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 border-t border-white/60 pt-4 text-white sm:bottom-8 sm:left-8 sm:right-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/75">A quiet place, within reach</p>
                <p className="mt-1 font-display text-2xl sm:text-3xl">Near Mohand Forest</p>
              </div>
              <span className="font-display text-4xl text-white/80" aria-hidden="true">M.</span>
            </div>
          </div>

          <div className="lg:py-8">
            <span className="gold-rule-left mb-6" />
            <h2 id="location-heading" className="h2 max-w-xl !text-[clamp(2.6rem,5vw,5rem)]">A little away.<br />Easy to find.</h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-charcoal/70 sm:text-base">
              Villa Modaro sits along the Balupur–Paonta Sahib Expressway, near
              Mohand Forest. Reach us by road, then settle into a secluded setting
              for stays, celebrations and time together.
            </p>

            <div className="mt-8 border-y border-charcoal/15">
              {distances.map((d) => (
                <div key={d.number} className="grid grid-cols-[3rem_1fr] gap-3 border-b border-charcoal/10 py-4 last:border-b-0 sm:grid-cols-[3.5rem_1fr] sm:gap-4">
                  <span className="pt-1 text-[10px] tracking-[0.2em] text-brass">{d.number}</span>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="font-display text-xl text-forest sm:text-2xl">{d.label}</p>
                    <p className="text-xs text-olive sm:text-sm">{d.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs uppercase leading-6 tracking-[0.13em] text-charcoal/55">Balupur–Paonta Sahib Expressway<br />Near Mohand Forest Trail</p>
            <a href="/booking" className="btn mt-7 border border-charcoal hover:bg-charcoal hover:text-ivory">Ask about availability</a>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:mt-10 lg:grid-cols-[1fr_.55fr]">
          <div className="img-zoom aspect-[2/1] overflow-hidden"><Img img={{ ...site.images.villaMain, alt: "Villa Modaro and its landscaped grounds" }} className="size-full" /></div>
          <div className="img-zoom aspect-[2/1] overflow-hidden"><Img img={{ ...site.images.villaSmall, alt: "A calm outdoor corner at Villa Modaro" }} className="size-full" /></div>
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
            Plan Your Celebration at Villa Modaro
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ivory/75 sm:text-[15px]">
            Bring your favourite people together for a birthday, anniversary or
            family gathering. Tell us what you are planning and enquire about a stay.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="#booking" className="btn btn-shimmer min-h-11 px-8 tracking-widest text-xs">
              Book Now
            </a>
            {site.contact.whatsapp ? (
              <a href={site.contact.whatsapp} className="btn min-h-11 border border-ivory/40 text-ivory hover:border-brass hover:text-brass" target="_blank" rel="noopener noreferrer">
                Enquire on WhatsApp
              </a>
            ) : (
              <span aria-disabled="true" title="WhatsApp contact details pending" className="btn min-h-11 cursor-not-allowed border border-ivory/30 text-ivory/55">
                Enquire on WhatsApp · Contact pending
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Legacy exports kept for backward compatibility with other pages
export { Villa as default };
