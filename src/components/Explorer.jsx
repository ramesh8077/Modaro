import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Img from "./Img";
import { experiencesPage as e } from "../data/site";

export default function Explorer() {
  const items = e.explorer;
  const [sel, setSel] = useState({ cur: 0, prev: null });
  const root = useRef(null), tabs = useRef([]);
  const it = items[sel.cur];

  const go = (i, focus) => {
    if (i !== sel.cur) setSel({ cur: i, prev: sel.cur });
    if (focus) tabs.current[i]?.focus();
  };
  const onKey = (ev) => {
    const n = items.length; let i = sel.cur;
    if (ev.key === "ArrowRight" || ev.key === "ArrowDown") i = (i + 1) % n;
    else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") i = (i + n - 1) % n;
    else if (ev.key === "Home") i = 0; else if (ev.key === "End") i = n - 1; else return;
    ev.preventDefault(); go(i, true);
  };

  // Mask reveal + small perspective turn; plain swap for reduced motion. No auto-cycling.
  useGSAP(() => {
    if (sel.prev === null) return;
    const done = () => setSel((s) => ({ ...s, prev: null }));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return done();
    gsap.fromTo(root.current.querySelector(`[data-si="${sel.cur}"]`),
      { clipPath: "inset(0 0 0 100%)", scale: 1.08, rotationY: -5, transformPerspective: 1200 },
      { clipPath: "inset(0 0 0 0%)", scale: 1, rotationY: 0, duration: 1, ease: "power3.inOut", clearProps: "clipPath,transform", onComplete: done });
    gsap.fromTo(root.current.querySelector("[data-ptext]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.25, clearProps: "all" });
  }, { scope: root, dependencies: [sel.cur] });

  return (
    <section id="explorer" ref={root} data-tone="ivory" style={{ "--accent": it.accent }} className="py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <h2 data-reveal className="h2 mb-12 max-w-3xl lg:mb-16">What does your perfect day feel like?</h2>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-10">
          <div role="tablist" aria-label="Choose a moment" onKeyDown={onKey} className="grid grid-cols-2 gap-x-4 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:grid-cols-1 lg:self-start">
            {items.map((x, i) => (
              <button key={x.id} ref={(el) => (tabs.current[i] = el)} role="tab" id={`tab-${x.id}`} aria-selected={i === sel.cur} aria-controls="exp-panel"
                tabIndex={i === sel.cur ? 0 : -1} onClick={() => go(i)}
                className={`min-h-[44px] border-b-2 py-3 text-left font-display text-3xl transition-colors lg:text-5xl ${i === sel.cur ? "border-[var(--accent)] text-charcoal" : "border-charcoal/15 text-charcoal/65 hover:text-charcoal"}`}>
                {x.label}
              </button>
            ))}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-olive/30 [perspective:1200px] lg:col-span-8 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:aspect-[16/11]">
            {items.map((x, i) => (
              <div key={x.id} data-si={i} className="absolute inset-0" style={{ zIndex: i === sel.cur ? 2 : i === sel.prev ? 1 : 0, visibility: i === sel.cur || i === sel.prev ? "visible" : "hidden" }}>
                <Img img={x.img} className="size-full" />
              </div>
            ))}
          </div>
          <div role="tabpanel" id="exp-panel" aria-labelledby={`tab-${it.id}`} className="min-h-[16rem] lg:col-span-4 lg:col-start-9 lg:row-start-2">
            <div data-ptext>
              <p className="text-xs tracking-[0.3em] text-charcoal/70"><span aria-hidden className="mr-2 inline-block size-2 rounded-full bg-[var(--accent)]" />0{sel.cur + 1} / 0{items.length}</p>
              <h3 className="mt-3 text-4xl">{it.title}</h3>
              <p className="mt-3 max-w-sm">{it.text}</p>
              <a href="/booking" className="btn mt-6 bg-[var(--accent)] text-charcoal hover:bg-charcoal hover:text-ivory">{it.cta}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
