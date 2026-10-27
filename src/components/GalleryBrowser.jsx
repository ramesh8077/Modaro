import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Img from "./Img";
import Lightbox from "./Lightbox";

const PAGE = 24; // "Show more" page size
const tab = (on) => `min-h-[44px] shrink-0 whitespace-nowrap border-b-2 px-4 text-sm transition-colors ${on ? "border-forest text-charcoal" : "border-transparent text-charcoal/65 hover:text-charcoal"}`;

export default function GalleryBrowser({ data, onProperty, sticky = true, gridMode = false }) {
  const { properties, categories, images } = data;
  const [prop, setProp] = useState("all"), [cat, setCat] = useState("all"), [shown, setShown] = useState(PAGE), [view, setView] = useState(null);
  const grid = useRef(null), first = useRef(true);
  const propById = useMemo(() => Object.fromEntries(properties.map((p) => [p.id, p])), [properties]);

  const inProp = images.filter((i) => prop === "all" || i.propertyId === prop);
  const count = (id) => inProp.filter((i) => i.categoryId === id).length;
  const cats = categories.filter((c) => count(c.id) > 0);
  const active = cat === "all" || count(cat) > 0 ? cat : "all";
  const filtered = inProp.filter((i) => active === "all" || i.categoryId === active);
  const catLabel = Object.fromEntries(categories.map((c) => [c.id, c.label]));
  const items = useMemo(() => filtered.map((i) => ({ id: i.id, src: i.src, thumb: i.thumbnailSrc || i.src, alt: i.alt, caption: i.caption, property: properties.length > 1 ? propById[i.propertyId]?.name : "", w: i.width, h: i.height })), [filtered, properties.length, propById]);

  const choose = (setter, v, after) => { setter(v); setShown(PAGE); after?.(); };
  useGSAP(() => { // brief fade on filter change; skipped on first render and for reduced motion
    if (first.current) { first.current = false; return; }
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(grid.current, { autoAlpha: 0.35, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", clearProps: "all" });
  }, { dependencies: [active, prop] });

  const list = filtered.slice(0, shown);
  return (
    <>
      <div className={`${sticky ? "sticky top-[72px] z-30 " : ""}border-b border-charcoal/15 bg-ivory`}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {properties.length > 1 && (
            <div role="group" aria-label="Choose a property" className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none]">
              <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-olive">Property</span>
              {[{ id: "all", name: "All properties" }, ...properties].map((p) => (
                <button key={p.id} aria-pressed={prop === p.id} onClick={() => choose(setProp, p.id, () => onProperty(p.id === "all" ? null : p))} className={tab(prop === p.id)}>{p.name}</button>
              ))}
            </div>
          )}
          <div role="group" aria-label="Filter photographs by space" className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none]">
            <span className="shrink-0 pr-2 text-xs uppercase tracking-[0.2em] text-olive">Show</span>
            {[{ id: "all", label: "All", n: inProp.length }, ...cats.map((c) => ({ ...c, n: count(c.id) }))].map((c) => (
              <button key={c.id} aria-pressed={active === c.id} onClick={() => choose(setCat, c.id)} className={tab(active === c.id)}>
                {c.label} <span className="text-xs opacity-70">({c.n})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section id="collection" className="mx-auto max-w-[1440px] px-6 py-14 lg:px-12 lg:py-20">
        <h2 className="sr-only">Photographs</h2>
        <p aria-live="polite" className="mb-8 text-sm text-olive">Showing {list.length} of {filtered.length} photographs</p>
        {images.length === 0 && <p className="py-20 text-center">Photographs are coming soon.</p>}
        {images.length > 0 && filtered.length === 0 && (
          <div className="py-20 text-center"><p>No photographs match this selection.</p>
            <button onClick={() => { setProp("all"); setCat("all"); onProperty(null); }} className="btn mt-4 border border-charcoal hover:bg-charcoal hover:text-ivory">Show all photographs</button></div>
        )}
        {/* CSS columns keep each image at its true ratio (no cropping, no layout shift); featured landscapes span the full width. */}
        <ul ref={grid} className={gridMode ? "grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-2" : "columns-1 gap-x-6 sm:columns-2 lg:columns-3"}>
          {list.map((i, k) => {
            const wide = i.isFeatured && i.width > i.height;
            return (
              <li key={i.id} className={gridMode ? "min-w-0" : `mb-8 break-inside-avoid ${wide ? "[column-span:all]" : ""}`}>
                <figure className="group">
                  <button data-cursor="view" onClick={() => setView(k)} aria-label={`View photo: ${i.alt}`} className="block w-full overflow-hidden" style={{ aspectRatio: gridMode ? "4 / 3" : `${i.width} / ${i.height}` }}>
                    <Img img={{ src: i.thumbnailSrc || i.src, alt: i.alt, w: i.width, h: i.height }} eager={k < 3} className="size-full transition-transform duration-700 group-hover:scale-[1.03]" />
                  </button>
                  <figcaption className="mt-2 flex flex-wrap justify-between gap-x-4 text-xs uppercase tracking-[0.15em]">
                    <span className="break-words">{i.caption || i.alt}</span><span className="text-olive">{catLabel[i.categoryId]}</span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
        {filtered.length > shown && <div className="mt-10 text-center"><button onClick={() => setShown(filtered.length)} className="btn border border-charcoal hover:bg-charcoal hover:text-ivory">Show all photographs ({filtered.length - shown} remaining)</button></div>}
      </section>
      <Lightbox items={items} index={view} onIndex={setView} onClose={() => setView(null)} thumbs label="Photograph viewer" />
    </>
  );
}
