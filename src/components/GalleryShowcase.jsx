import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Img from "./Img";
import Lightbox from "./Lightbox";

const MAX = 6, D = 620; // photos in the showcase, and the depth gap between them (px)
const XS = ["-20vw", "21vw", "-9vw", "23vw", "-23vw", "12vw"], YS = ["-6vh", "5vh", "-2vh", "-5vh", "6vh", "-4vh"];
const Q = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function useDeep() {
  const [on, setOn] = useState(() => matchMedia(Q).matches);
  useEffect(() => { const m = matchMedia(Q), f = () => setOn(m.matches); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  return on;
}

// Scroll-driven 3D fly-through (desktop, motion allowed): the camera travels forward through photographs hung at
// different depths. Everything else gets a swipeable strip. The full filterable grid below is the accessible index.
export default function GalleryShowcase({ images, categories }) {
  const deep = useDeep(), root = useRef(null), [view, setView] = useState(null);
  const pick = useMemo(() => { const step = Math.max(1, Math.ceil(images.length / MAX)); return images.filter((_, i) => i % step === 0).slice(0, MAX); }, [images]);
  const label = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c.label])), [categories]);
  const items = useMemo(() => pick.map((i) => ({ id: i.id, src: i.src, thumb: i.thumbnailSrc || i.src, alt: i.alt, caption: i.caption, w: i.width, h: i.height })), [pick]);
  const n = pick.length;
  const img = (i) => ({ src: i.thumbnailSrc || i.src, alt: i.alt, w: i.width, h: i.height });

  useGSAP(() => {
    if (!deep || !n) return;
    const sec = root.current, cam = sec.querySelector("[data-cam]"), bar = sec.querySelector("[data-bar]");
    const cards = gsap.utils.toArray("[data-card]", sec), caps = gsap.utils.toArray("[data-cap]", sec), frames = gsap.utils.toArray("[data-frame]", sec);
    const len = n + 0.6; // timeline units: the camera advances one photo gap (D) per unit
    gsap.set(cards, { xPercent: -50, yPercent: -50, x: (i) => XS[i % XS.length], y: (i) => YS[i % YS.length], z: (i) => -(i + 1.2) * D, rotationY: (i) => (XS[i % XS.length][0] === "-" ? 12 : -12) });
    gsap.set(frames, { xPercent: -50, yPercent: -50, z: (i) => -i * D * 0.8 - 200 });
    const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: sec, start: "top top", end: "+=300%", pin: true, scrub: 0.6 } });
    tl.fromTo(cam, { z: 0, rotationY: -3, rotationX: 1 }, { z: len * D, rotationY: 3, rotationX: -1, duration: len }, 0);
    tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: len }, 0);
    cards.forEach((c, i) => {
      const pass = i + 1.2, inS = pass - 2.6, inE = pass - 1.6, outS = pass - 0.15, outE = pass + 0.35;
      const init = inE <= 0 ? 1 : inS >= 0 ? 0 : -inS / (inE - inS);
      gsap.set(c, { autoAlpha: init });
      if (inE > 0) tl.fromTo(c, { autoAlpha: init }, { autoAlpha: 1, duration: inE - Math.max(inS, 0) }, Math.max(inS, 0));
      tl.to(c, { autoAlpha: 0, duration: outE - outS }, outS);
      const cs = pass - 2.0;
      gsap.set(caps[i], { autoAlpha: cs <= 0 ? 1 : 0 });
      if (cs > 0) tl.to(caps[i], { autoAlpha: 1, duration: 0.3 }, cs);
      if (i < n - 1) tl.to(caps[i], { autoAlpha: 0, duration: 0.3 }, pass - 0.3);
    });
  }, { scope: root, dependencies: [deep, n] });

  if (!n) return null;
  return (
    <>
      {deep ? (
        <section id="showcase" ref={root} aria-label="Photograph showcase" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-charcoal text-ivory">
          <h2 className="sr-only">Photograph showcase</h2>
          <a href="#collection" className="absolute right-12 top-24 z-20 inline-flex min-h-[44px] items-center text-xs uppercase tracking-[0.2em] hover:text-brass">Skip to all photographs</a>
          <div aria-hidden="true">
            <div className="absolute inset-0 [perspective:1300px]">
              <div data-cam className="absolute inset-0 [transform-style:preserve-3d]">
                {Array.from({ length: 7 }, (_, k) => <div key={k} data-frame className="absolute left-1/2 top-1/2 h-[70vh] w-[80vw] border border-ivory/10" />)}
                {pick.map((it, i) => (
                  <figure key={it.id} data-card className={`absolute left-1/2 top-1/2 ${it.height > it.width ? "w-[min(22vw,360px)]" : "w-[min(34vw,560px)]"}`} style={{ aspectRatio: `${it.width} / ${it.height}` }}>
                    <button tabIndex={-1} data-cursor="view" onClick={() => setView(i)} className="block size-full overflow-hidden"><Img img={img(it)} className="size-full" /></button>
                  </figure>
                ))}
              </div>
            </div>
            <p className="absolute left-12 top-28 text-xs tracking-[0.3em] text-brass">A MOVING LOOK · SCROLL</p>
            <div className="pointer-events-none absolute bottom-14 left-12 z-10 h-20 w-[min(80vw,420px)]">
              {pick.map((it, i) => (
                <div key={it.id} data-cap className="absolute inset-0">
                  <p className="text-xs tracking-[0.3em] text-brass">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · {label[it.categoryId]}</p>
                  <p className="mt-2 font-display text-3xl">{it.caption || it.alt}</p>
                </div>
              ))}
            </div>
            <span className="absolute inset-x-12 bottom-8 h-px bg-ivory/20"><span data-bar className="block h-px origin-left bg-brass" /></span>
          </div>
        </section>
      ) : (
        <section id="showcase" aria-label="Photograph showcase" className="bg-charcoal py-16 text-ivory">
          <div className="px-6 pb-6"><p className="text-xs tracking-[0.3em] text-brass">THE MODARO GALLERY</p><h2 className="mt-3 font-display text-4xl">Swipe through the villa.</h2></div>
          <ul className="flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none]">
            {pick.map((it, i) => (
              <li key={it.id} className="w-[80vw] max-w-[560px] shrink-0 snap-center sm:w-[56vw]">
                <button data-cursor="view" onClick={() => setView(i)} aria-label={`View photo: ${it.alt}`} className="block w-full overflow-hidden" style={{ aspectRatio: `${it.width} / ${it.height}` }}><Img img={img(it)} className="size-full" /></button>
                <p className="mt-2 text-xs uppercase tracking-[0.15em]">{it.caption || it.alt} <span className="text-brass">· {label[it.categoryId]}</span></p>
              </li>
            ))}
          </ul>
        </section>
      )}
      <Lightbox items={items} index={view} onIndex={setView} onClose={() => setView(null)} thumbs label="Showcase viewer" />
    </>
  );
}
