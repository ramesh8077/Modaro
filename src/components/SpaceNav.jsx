import { useCallback, useEffect, useRef, useState } from "react";

// Sticky section navigation. Click par har frame target dobara calculate hota hai,
// isliye lazy images ke layout shift ke baad bhi seedha sahi jagah land hota hai.
export default function SpaceNav({ items }) {
  const [active, setActive] = useState(items[0]?.id);
  const bar = useRef(null);
  const navRef = useRef(null);
  const lockUntil = useRef(0);
  const rafId = useRef(0);

  // Sticky nav ka bottom edge = jahan se content dikhna chahiye
  const getOffset = () => (navRef.current ? navRef.current.getBoundingClientRect().bottom : 0) + 8;
  const targetTop = (el) => Math.max(0, el.getBoundingClientRect().top + window.scrollY - getOffset());

  const cancelScroll = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = 0;
    lockUntil.current = 0;
  }, []);

  const goTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    cancelScroll();
    setActive(id);
    history.replaceState(null, "", `#${id}`);

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const startY = window.scrollY;
    const startTime = performance.now();
    const distance = Math.abs(targetTop(el) - startY);
    const duration = reduce ? 0 : Math.min(1100, Math.max(450, distance * 0.35));
    const settleMs = 1500; // animation ke baad itni der tak target follow karo (late image loads ke liye)
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    lockUntil.current = Date.now() + duration + settleMs + 100;

    const step = (now) => {
      const elapsed = now - startTime;
      const target = targetTop(el); // har frame fresh target
      if (elapsed < duration) {
        const p = ease(elapsed / duration);
        window.scrollTo({ top: startY + (target - startY) * p, behavior: "instant" });
        rafId.current = requestAnimationFrame(step);
      } else if (elapsed < duration + settleMs) {
        if (Math.abs(target - window.scrollY) > 1) window.scrollTo({ top: target, behavior: "instant" });
        rafId.current = requestAnimationFrame(step);
      } else {
        rafId.current = 0;
        lockUntil.current = 0;
      }
    };
    rafId.current = requestAnimationFrame(step);
  }, [cancelScroll]);

  // User khud scroll kare (wheel/touch/keys) toh auto-scroll band
  useEffect(() => {
    const stop = () => cancelScroll();
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    return () => {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [cancelScroll]);

  // Scrollspy: jo section nav ke neeche sabse upar hai, wahi active
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (Date.now() < lockUntil.current) return;
      const line = getOffset() + 40;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = items[0]?.id;
      for (const i of items) {
        const el = document.getElementById(i.id);
        if (el && el.getBoundingClientRect().top <= line) current = i.id;
      }
      if (atBottom) {
        const last = items[items.length - 1]?.id;
        if (last && document.getElementById(last)) current = last;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  // Active link ko horizontal bar me visible rakho (page scroll nahi hota)
  useEffect(() => {
    const el = bar.current?.querySelector('[aria-current="location"]');
    if (el) bar.current.scrollTo({ left: el.offsetLeft - bar.current.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav ref={navRef} aria-label="Villa sections" className="sticky top-[72px] z-30 border-b border-charcoal/15 bg-ivory">
      <ul ref={bar} className="mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-6 [scrollbar-width:none] lg:px-12 mb-[30px] mt-[30px]">
        {items.map((i) => (
          <li key={i.id} className="shrink-0">
            <a
              href={`#${i.id}`}
              onClick={(e) => {
                e.preventDefault();
                goTo(i.id);
              }}
              aria-current={active === i.id ? "location" : undefined}
              className={`inline-flex min-h-[52px] items-center border-b-2 px-4 text-sm transition-colors ${active === i.id ? "border-forest text-charcoal" : "border-transparent text-charcoal/65 hover:text-charcoal"}`}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}