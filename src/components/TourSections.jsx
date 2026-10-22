import { useState } from "react";
import Plate from "./Plate";
import { property, hero, overview, IMAGES, hasSrc, plateImg, spaceImages } from "../data/villaTour";

const wrap = "mx-auto max-w-[1440px] px-6 lg:px-12";

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
    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/25 to-charcoal/10" aria-hidden />
    <div className={`relative flex w-full items-end justify-between gap-10 ${wrap} pb-16 lg:pb-20`}>
      <div className="max-w-2xl"><p data-hero className="mb-5 text-xs tracking-[0.3em] text-brass">THE VILLA</p><h1 data-hero className="text-[clamp(2.75rem,6.5vw,6rem)]">A closer look at life at Modaro</h1><p data-hero className="mt-6 max-w-lg text-base text-ivory/90 sm:text-lg">{property.intro} {property.location}</p><div data-hero className="mt-8 flex flex-wrap items-center gap-3"><a href="#overview" className="btn bg-brass text-charcoal hover:bg-ivory">Explore the Spaces</a><a href="#enquiry" className="btn border border-ivory/70 hover:bg-ivory hover:text-charcoal">Check Availability</a>{count > 0 && <button onClick={() => openAll()} className="inline-flex min-h-[44px] items-center px-2 text-sm underline-offset-8 hover:text-brass hover:underline">View All Photos ({count})</button>}</div></div>
      <div data-hero className="hidden gap-4 lg:flex">{preview(a)}{preview(b)}</div>
    </div>
  </section>;
}

export function Overview() {
  const rows = [["Location", property.location], ["Booking type", property.bookingType], ["Bedrooms", property.bedrooms], ["Bathrooms", property.bathrooms], ["Guest capacity", property.guestCapacity], ["Amenities", property.amenities.join(" · ")]].filter(([, value]) => value);
  const [main, secondary] = overview.images;
  return <section id="overview" data-scroll-extra="56" style={{ scrollMarginTop: 128 }} className={`${wrap} grid gap-12 py-20 lg:grid-cols-12 lg:gap-8 lg:py-28`}><div data-reveal className="lg:col-span-5 lg:self-center"><p className="mb-4 text-xs tracking-[0.3em] text-brass">EXPLORE EVERY CORNER OF MODARO</p><h2 className="h2">The villa at a glance</h2><p className="mt-6 max-w-md">{property.intro}</p><dl className="mt-8 divide-y divide-charcoal/15 border-y border-charcoal/15 text-sm">{rows.map(([key, value]) => <div key={key} className="grid grid-cols-[8rem_1fr] gap-4 py-3"><dt className="text-olive">{key}</dt><dd>{value}</dd></div>)}</dl></div><div className="relative lg:col-span-6 lg:col-start-7"><Slot id={main} ratio="4/5" /><div className="absolute -bottom-8 -left-6 hidden w-1/3 border-8 border-ivory lg:block"><Slot id={secondary} ratio="1/1" /></div></div></section>;
}

function Header({ space, open, light }) {
  const has = spaceImages(space).length > 0;
  if (!space.title && !space.intro && !space.features.length && !has) return null;
  return <div data-reveal className="mb-6 lg:mb-8">{space.title && <h3 className="text-4xl">{space.title}</h3>}{space.intro && <p className="mt-3 max-w-md">{space.intro}</p>}{space.features.length > 0 && <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">{space.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>}{has && <button onClick={() => open(space)} className={`btn mt-5 border ${light ? "border-ivory/60 hover:bg-ivory hover:text-charcoal" : "border-charcoal/60 hover:bg-charcoal hover:text-ivory"}`}>{space.cta || "View Photos"}</button>}</div>;
}

function SpaceBlock({ space, open }) {
  const [main, ...rest] = space.images;
  const image = (id, ratio, extra = {}) => <Slot id={id} ratio={ratio} open={(selected) => open(space, selected)} {...extra} />;
  if (space.layout === "strip") return <div><Header space={space} open={open} />{image(main, "16/9", { parallax: space.parallax })}<div className="mt-4 grid gap-4 sm:grid-cols-3 lg:mt-6 lg:gap-6">{rest.slice(0, 3).map((id) => <div key={id}>{image(id, "4/3")}</div>)}</div></div>;
  if (space.layout === "editorial") return <div className="grid gap-8 lg:grid-cols-12 lg:gap-8"><div className="lg:col-span-4 lg:pt-8"><Header space={space} open={open} /></div><div className="lg:col-span-8">{image(main, "3/2")}</div><div className="lg:col-span-5 lg:col-start-2">{image(rest[0], "4/3")}</div><div className="lg:col-span-5 lg:col-start-7">{image(rest[1], "4/3")}</div></div>;
  if (space.id === "bathrooms") return <div><div className="grid overflow-hidden bg-forest text-ivory lg:grid-cols-12"><div className="lg:col-span-7">{image(main, "4/3", { fixed: true })}</div><div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:col-span-5 lg:px-12 lg:py-14"><p className="text-xs tracking-[0.28em] text-brass">A QUIET DETAIL</p><h3 className="mt-5 text-3xl sm:text-4xl">A considered bathroom detail</h3><p className="mt-5 max-w-md text-ivory/75">{space.intro}</p><div className="mt-8 h-px w-16 bg-brass/70" /><button onClick={() => open(space)} className="btn mt-8 w-fit border border-ivory/60 hover:bg-ivory hover:text-charcoal">{space.cta || "View Bathroom Photo"}</button></div></div></div>;
  if (space.layout === "masonry") return <div><Header space={space} open={open} /><div className="columns-1 gap-6 sm:columns-2 lg:columns-3">{space.images.map((id) => <div key={id} className="mb-6 break-inside-avoid">{image(id, "4/5")}</div>)}</div></div>;
  if (space.id === "bedrooms") return <div><Header space={space} open={open} /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6"><div className="sm:col-span-2 lg:col-span-7">{image(main, "4/3", { fixed: true })}</div><div className="lg:col-span-5 lg:grid lg:grid-cols-2 lg:gap-6">{rest.slice(0, 2).map((id) => <div key={id} className="mt-4 first:mt-0 lg:mt-0">{image(id, "4/3", { fixed: true })}</div>)}</div><div className="lg:col-span-7 lg:grid lg:grid-cols-2 lg:gap-6">{rest.slice(2, 4).map((id) => <div key={id} className="mt-4 first:mt-0 lg:mt-0">{image(id, "4/3", { fixed: true })}</div>)}</div><div className="sm:col-span-2 lg:col-span-5">{image(rest[4], "4/3", { fixed: true })}</div><div className="sm:col-span-2 lg:col-span-12 lg:grid lg:grid-cols-4 lg:gap-6">{rest.slice(5).map((id) => <div key={id} className="mt-4 lg:mt-0">{image(id, "4/3", { fixed: true })}</div>)}</div></div></div>;
  return <div><Header space={space} open={open} /><div className="grid items-start gap-4 lg:grid-cols-12 lg:gap-6"><div className="lg:col-span-8">{image(main, "3/2")}</div><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1 lg:gap-6">{rest.slice(0, 4).map((id) => <div key={id}>{image(id, "4/3")}</div>)}</div></div></div>;
}

export function TourSection({ section, open }) {
  return <section id={section.id} data-scroll-extra="56" style={{ scrollMarginTop: 128 }} className={section.dark ? "bg-forest text-ivory" : ""}><div className={`${wrap} py-16 lg:py-20`}><h2 data-reveal className="h2 mb-8 lg:mb-10">{section.title}</h2><div className="space-y-14 lg:space-y-20">{section.spaces.map((space) => <SpaceBlock key={space.id} space={{ ...space, title: section.spaces.length > 1 ? space.title : undefined }} open={(current, id) => open(current, id)} />)}</div></div></section>;
}
