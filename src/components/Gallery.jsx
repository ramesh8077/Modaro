import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Img from "./Img";
import Lightbox from "./Lightbox";
import { site } from "../data/site";

// Simple image section used by the Home, Villa and Experiences pages. Viewer is the shared Lightbox.
export default function Gallery({ items = site.gallery, title = "Gallery" }) {
  const [idx, setIdx] = useState(null);
  const view = useMemo(() => items.map((p, k) => ({ id: `${k}-${p.alt}`, src: p.src, alt: p.alt, caption: p.caption, w: p.w, h: p.h })), [items]);
  return (
    <section id="gallery" className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5 border-b border-charcoal/15 pb-5"><div><p className="text-[11px] uppercase tracking-[0.28em] text-brass">06 · THE GALLERY</p><h2 data-reveal className="h2 mt-3">{title}</h2></div><Link to="/gallery" className="inline-flex min-h-11 items-center gap-2 text-sm hover:text-brass">View the full gallery <ArrowUpRight size={16} /></Link></div>
      <ul className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] lg:grid-cols-4">
        {items.map((p, k) => (
          <li key={k} className={p.cls}>
            <button data-cursor="view" onClick={() => setIdx(k)} aria-label={`Open image: ${p.alt}`} className="block size-full overflow-hidden">
              <Img img={p} className="size-full transition-transform duration-700 hover:scale-105" />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={view} index={idx} onIndex={setIdx} onClose={() => setIdx(null)} label="Image gallery" />
    </section>
  );
}
