import { useEffect, useRef, useState } from "react";

// Sticky section navigation. Highlights the section in view (IntersectionObserver); anchor offsets come from data-scroll-extra.
export default function SpaceNav({ items }) {
  const [active, setActive] = useState(items[0]?.id), bar = useRef(null);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-30% 0px -60% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);
  useEffect(() => { // keep the active link visible in the horizontally scrolling bar (no page scroll)
    const el = bar.current?.querySelector('[aria-current="location"]');
    if (el) bar.current.scrollTo({ left: el.offsetLeft - bar.current.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [active]);
  return (
    <nav aria-label="Villa sections" className="sticky top-[72px] z-30 border-b border-charcoal/15 bg-ivory">
      <ul ref={bar} className="mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-6 [scrollbar-width:none] lg:px-12">
        {items.map((i) => (
          <li key={i.id} className="shrink-0">
            <a href={`#${i.id}`} aria-current={active === i.id ? "location" : undefined}
              className={`inline-flex min-h-[52px] items-center border-b-2 px-4 text-sm transition-colors ${active === i.id ? "border-forest text-charcoal" : "border-transparent text-charcoal/65 hover:text-charcoal"}`}>{i.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
