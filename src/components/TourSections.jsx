import { useState } from "react";
import Plate from "./Plate";
import { property, hero, overview, IMAGES, CATEGORIES, hasSrc, plateImg, spaceImages } from "../data/villaTour";

const wrap = "mx-auto max-w-[1440px] px-6 lg:px-12";
const sectionWrap = "mx-auto max-w-[1720px] px-6 lg:px-4";

export function Slot({ id, ratio = "3/2", open, eager, parallax, fixed = false, className = "" }) {
  const im = IMAGES[id];
  const real = hasSrc(id);
  const [nat, setNat] = useState(null);
  const aspect = real && !fixed ? (nat || `${im.w} / ${im.h}`) : ratio.replace("/", " / ");
  const plate = <Plate img={plateImg(id)} eager={eager} data-parallax={parallax ? "6" : undefined} onLoad={(event) => setNat(`${event.currentTarget.naturalWidth} / ${event.currentTarget.naturalHeight}`)} className={`${parallax ? "h-[115%]" : "size-full"} w-full ${real && open ? "transition-transform duration-300 group-hover:scale-[1.02]" : ""}`} />;
  return real && open ? <button data-cursor="view" onClick={() => open(id)} aria-label={`View larger: ${im.alt}`} className={`group block w-full overflow-hidden ring-1 ring-charcoal/10 ${className}`} style={{ aspectRatio: aspect }}>{plate}</button> : <div className={`w-full overflow-hidden ring-1 ring-charcoal/10 ${className}`} style={{ aspectRatio: aspect }}>{plate}</div>;
}

export function TourHero({ count, openAll }) {
  const [a, b] = hero.previews;
  const preview = (id) => <div className="w-44 xl:w-56"><Slot id={id} ratio="4/3" open={count ? openAll : undefined} /></div>;
  return <section id="top" className="relative flex h-[100svh] min-h-[620px] items-end overflow-hidden bg-forest text-ivory">
    <Plate img={plateImg(hero.main)} eager data-hero-img className="absolute inset-0 size-full" />
    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/15" aria-hidden />
    <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-charcoal/45 via-charcoal/15 to-transparent lg:w-4/5" aria-hidden />
    <div className={`relative flex w-full items-end justify-between gap-10 ${wrap} pb-16 lg:pb-20`}>
      <div className="max-w-2xl"><p data-hero className="mb-5 text-xs tracking-[0.3em] text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,.9)]">MODARO LUXURY STAY</p><h1 data-hero className="!text-[clamp(2rem,4vw,3rem)] [text-shadow:0_3px_18px_rgba(0,0,0,.85)]">The Villa</h1><p data-hero className="mt-6 max-w-lg text-base text-white [text-shadow:0_2px_10px_rgba(0,0,0,.95)] sm:text-lg">{property.intro}</p><p data-hero className="mt-3 text-xs uppercase tracking-[0.18em] text-white [text-shadow:0_2px_8px_rgba(0,0,0,.95)]">{property.location}</p><div data-hero className="mt-8 flex flex-wrap items-center gap-3"><a href="#overview" className="btn bg-brass text-charcoal hover:bg-ivory">Explore the Spaces</a><a href="#enquiry" className="btn border border-ivory/70 hover:bg-ivory hover:text-charcoal">Check Availability</a></div></div>
    </div>
  </section>;
}

export function Overview() {
  const [main] = overview.images;
  return <section id="overview" data-scroll-extra="56" style={{ scrollMarginTop: 128 }} className="grid w-full overflow-hidden bg-black text-ivory lg:min-h-[86svh] lg:grid-cols-2">
    {/* Single full-bleed villa image fills the left half of the overview. */}
    <div className="relative min-h-[320px] overflow-hidden sm:min-h-[440px] lg:min-h-[720px]">
      <Slot id={main} ratio="4/3" fixed className="!h-full !ring-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" aria-hidden="true" />
      <p className="absolute bottom-5 left-6 text-[10px] uppercase tracking-[0.22em] text-white/85 sm:bottom-7 sm:left-8">{IMAGES[main]?.caption || "Villa Modaro"}</p>
    </div>

    {/* Full black text panel occupies the right half; stacks below the image on narrow screens. */}
    <div className="flex min-w-0 items-center bg-black px-6 py-12 sm:px-10 sm:py-16 lg:px-[clamp(2.5rem,6vw,7rem)] lg:py-20">
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-xs font-medium tracking-[0.3em] text-brass">EXPLORE EVERY CORNER OF MODARO</p>
        <h2 className="mt-4 font-display text-[clamp(2.4rem,4.2vw,4.5rem)] leading-[1.03] text-ivory">Our Story &amp; The Villa</h2>
        <p className="mt-7 text-sm leading-7 text-white/80 sm:text-base sm:leading-8">{property.overview}</p>
        <p className="mt-5 border-t border-white/15 pt-5 text-sm leading-7 text-white/65 sm:text-base sm:leading-8">{property.details}</p>
      </div>
    </div>
  </section>;
}

function Header({ space, open, light, embedded = false }) {
  if (!space.title && !space.intro && !space.features.length) return null;
  return <div className={`${embedded ? "mt-4 border-t border-ivory/20 pt-4" : "mb-6 bg-forest px-6 py-5 lg:mb-8 lg:px-8"} text-left text-ivory`}>{space.title && <h3 className="!text-[clamp(2rem,4vw,3rem)]">{space.title}</h3>}{space.intro && <p className="mt-3 max-w-2xl text-base leading-7 text-ivory/85 sm:text-lg">{space.intro}</p>}{space.features.length > 0 && <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">{space.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>}</div>;
}

function SpaceBlock({ space, open, showHeader = true }) {
  return <div>
    {showHeader && <Header space={space} open={open} />}
    <div className={`mx-auto grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-8 ${space.images.length === 1 ? "lg:grid-cols-1" : "lg:grid-cols-2"}`}>
      {space.images.map((id, index) => {
        const photo = IMAGES[id];
        return <figure key={id} className="group min-w-0">
          <Slot id={id} ratio="2/1" fixed eager={space.id === "bedrooms" && index < 3} open={(selected) => open(space, selected)} />
          <figcaption className="mt-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-charcoal/10 pb-2 text-sm leading-5">
            <span className="font-medium text-charcoal">{photo?.caption || photo?.alt}</span>
            <span className="text-xs text-olive">{CATEGORIES[photo?.category]?.label}</span>
          </figcaption>
        </figure>;
      })}
    </div>
  </div>;
}

export function TourSection({ section, open, tone = "ivory" }) {
  const surface = section.dark ? "bg-forest text-ivory" : tone === "white" ? "bg-white text-charcoal" : "bg-ivory text-charcoal";
  const singleSpace = section.spaces.length === 1;
  const firstSpace = section.spaces[0];
  return <section id={section.id} data-scroll-extra="56" style={{ scrollMarginTop: 128 }} className={surface}>
    <div className={`${sectionWrap} py-10 sm:py-12 lg:py-14`}>
      {/* Section heading, intro, and first space's feature row now share one continuous panel. */}
      <div className="mb-7 bg-forest px-6 py-5 text-ivory lg:mb-8 lg:px-8">
        <h2 className="!text-left !text-[clamp(2rem,4vw,3rem)]">{section.title}</h2>
        {section.intro && <p className="mt-3 max-w-2xl text-base leading-7 text-ivory/85 sm:text-lg">{section.intro}</p>}
        {firstSpace && <Header embedded space={{ ...firstSpace, title: undefined }} />}
      </div>
      <div className="space-y-12 lg:space-y-14">
        {section.spaces.map((space, index) => (
          <SpaceBlock
            key={space.id}
            space={{ ...space, title: section.spaces.length > 1 ? space.title : undefined }}
            showHeader={index > 0}
            open={(current, id) => open(current, id)}
          />
        ))}
      </div>
    </div>
  </section>;
}
