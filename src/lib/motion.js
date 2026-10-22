import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { onIntroReveal } from "./intro";
import "lenis/dist/lenis.css";
gsap.registerPlugin(ScrollTrigger, useGSAP);

let lenis;
// Sections under a sticky sub-nav add data-scroll-extra (px) so headings land below both bars.
export const scrollToTarget = (t) => { const x = parseFloat(t.dataset.scrollExtra) || 0; return lenis ? lenis.scrollTo(t, { offset: -72 - x }) : t.scrollIntoView(); };
export const getHashTarget = (hash) => {
  if (!hash || hash === "#") return null;
  const id = decodeURIComponent(hash.slice(1));
  return id ? document.getElementById(id) : null;
};
export const resetScroll = () => {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
};

export function useMotion(ref, route) {
  useGSAP(() => {
    // Anchor links: Lenis when active, native otherwise.
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      const id = a?.getAttribute("href");
      const t = id && id.length > 1 && document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      scrollToTarget(t);
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", (ctx) => {
      lenis = new Lenis({ lerp: 0.1 });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t) => lenis.raf(t * 1000); // single rAF driver: GSAP ticker
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      const refresh = () => ScrollTrigger.refresh(); // re-measure once fonts/images settle
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh);

      // Hero entrances wait for the preloader's reveal (immediate when there is no intro).
      const stopIntro = onIntroReveal(() => ctx.add(() => {
        const heroText = gsap.utils.toArray("[data-hero]");
        const heroImages = gsap.utils.toArray("[data-hero-img]");
        if (heroText.length) gsap.from(heroText, { y: 36, autoAlpha: 0, duration: 1.2, stagger: 0.12, delay: 0.2, ease: "power3.out" });
        if (heroImages.length) gsap.fromTo(heroImages, { scale: 1.025 }, { scale: 1, duration: 1.6, ease: "power2.out" }); // hero media only, never the app wrapper
        gsap.utils.toArray("[data-curtain]").forEach((el) =>
          gsap.fromTo(el, { clipPath: "inset(0 50% 0 50%)" }, { clipPath: "inset(0 0% 0 0%)", duration: 1.4, ease: "power4.inOut", clearProps: "clipPath" }));
      }));
      gsap.utils.toArray("[data-parallax]").forEach((el) =>
        gsap.to(el, { yPercent: -(parseFloat(el.dataset.parallax) || 8), ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));
      gsap.utils.toArray("[data-reveal]").forEach((el) =>
        gsap.from(el, { y: 28, autoAlpha: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }));
      // Experiences page effects (all no-ops on pages without these hooks)
      gsap.utils.toArray("[data-expand]").forEach((el) =>
        gsap.fromTo(el, { clipPath: "inset(14% 16% 14% 16%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: el, start: "top 90%", end: "top 25%", scrub: true } }));
      gsap.utils.toArray("[data-draw]").forEach((el) =>
        gsap.fromTo(el, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: el.ownerSVGElement, start: "top 85%", end: "top 35%", scrub: true } }));
      gsap.utils.toArray("[data-slide]").forEach((el) =>
        gsap.from(el, { x: +el.dataset.slide, autoAlpha: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }));
      const wrapEl = ref.current.querySelector("[data-tones]");
      if (wrapEl) {
        const tones = { ivory: ["#F5F1E8", "#242824"], mist: ["#E6ECE8", "#242824"], sage: ["#D3D9C6", "#242824"], night: ["#183B32", "#F5F1E8"] };
        gsap.utils.toArray("[data-tone]", wrapEl).forEach((sec) => {
          const [bg, color] = tones[sec.dataset.tone];
          ScrollTrigger.create({ trigger: sec, start: "top 55%", end: "bottom 55%", onToggle: (self) => self.isActive && gsap.to(wrapEl, { backgroundColor: bg, color, duration: 0.7, overwrite: true }) });
        });
      }
      return () => { stopIntro(); window.removeEventListener("load", refresh); gsap.ticker.remove(tick); lenis.destroy(); lenis = null; };
    });

    // Signature section: one pinned sequence, desktop + motion allowed only.
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const sec = ref.current.querySelector("[data-pin]");
      if (!sec) return; // page has no pinned section
      const ps = gsap.utils.toArray("[data-chapter]", sec);
      gsap.set(sec, { height: "100svh" });
      gsap.set(ps, { position: "absolute", inset: 0, autoAlpha: 0 });
      gsap.set(ps[0], { autoAlpha: 1 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: "top top", end: "+=180%", pin: true, scrub: 0.5 } });
      ps.forEach((p, i) => {
        const photo = p.querySelector("[data-photo]");
        if (i) tl.to(ps[i - 1], { autoAlpha: 0, duration: 1 }, ">+0.4").fromTo(p, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, "<");
        tl.fromTo(photo, { rotationY: i ? -9 : 0, scale: i ? 1.06 : 1, transformPerspective: 1100 }, { rotationY: 0, scale: 1, duration: 1.2 }, i ? "<" : 0);
      });
    });

    // Our Story hero: restrained pointer depth, fine-pointer desktops only. No React state involved.
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const h = ref.current.querySelector("[data-story-hero]");
      if (!h) return;
      const img = h.querySelector("[data-tilt]"), txt = h.querySelector("[data-depth]");
      const q = (el, p) => gsap.quickTo(el, p, { duration: 1.2, ease: "power3.out" });
      const rx = q(img, "rotationX"), ry = q(img, "rotationY"), tx = q(txt, "x"), ty = q(txt, "y");
      gsap.set(img, { transformPerspective: 1000, scale: 1.06 });
      const mv = (e) => {
        const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
        ry(nx * 4); rx(-ny * 3); tx(nx * -14); ty(ny * -10);
      };
      h.addEventListener("pointermove", mv);
      return () => h.removeEventListener("pointermove", mv);
    });

    // Our Story signature stage: three photographic planes at different depths, one pin (~2.6 screens).
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const st = ref.current.querySelector("[data-story-pin]");
      if (!st) return;
      const arts = gsap.utils.toArray("[data-sc]", st);
      const photos = arts.map((a) => a.querySelector("[data-sphoto]"));
      const texts = arts.map((a) => a.querySelector("[data-stext]"));
      const bars = gsap.utils.toArray("[data-bar]", st);
      gsap.set(st, { height: "100svh" });
      gsap.set(arts, { position: "absolute", inset: 0 });
      gsap.set(st.querySelector("[data-prog]"), { display: "flex" });
      gsap.set(photos, { transformPerspective: 1200, zIndex: (i) => 3 - i, z: (i) => -400 * i, x: (i) => (i ? 80 : 0), rotationY: (i) => (i ? -10 : 0), autoAlpha: (i) => (i === 0 ? 1 : i === 1 ? 0.35 : 0.15) });
      gsap.set(texts, { autoAlpha: (i) => (i ? 0 : 1), y: (i) => (i ? 30 : 0) });
      gsap.set(bars, { scaleX: 0 });
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: st, start: "top top", end: "+=260%", pin: true, scrub: 0.6 } });
      tl.to(bars[0], { scaleX: 1, duration: 0.5, ease: "none" }, 0);
      for (let i = 1; i < arts.length; i++) {
        const t = (i - 1) * 3 + 1.5; // 1.5 units of reading time before each transition
        tl.to(photos[i - 1], { z: 350, x: -80, rotationY: 10, autoAlpha: 0, duration: 1.5 }, t)
          .to(texts[i - 1], { autoAlpha: 0, y: -30, duration: 0.7 }, t)
          .to(photos[i], { z: 0, x: 0, rotationY: 0, autoAlpha: 1, duration: 1.5 }, t)
          .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.8 }, t + 0.7)
          .to(bars[i], { scaleX: 1, duration: 1.5, ease: "none" }, t);
        if (photos[i + 1]) tl.to(photos[i + 1], { z: -400, x: 80, autoAlpha: 0.35, duration: 1.5 }, t);
      }
      tl.to({}, { duration: 1.5 }); // closing hold
    });

    // Celebrations: framed photo expands to the viewport edges while the surround shifts ivory -> forest (one short pin).
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const sec = ref.current.querySelector("[data-grow]");
      if (!sec) return;
      const img = sec.querySelector("[data-grow-img]"), txt = sec.querySelector("[data-grow-text]");
      gsap.set(sec, { height: "100svh", backgroundColor: "#F5F1E8" });
      gsap.set(img, { clipPath: "inset(18% 22% 18% 22%)", scale: 1.08 });
      gsap.set(txt, { autoAlpha: 0, y: 24 });
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: sec, start: "top top", end: "+=110%", pin: true, scrub: 0.5 } })
        .to(img, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 3 })
        .to(sec, { backgroundColor: "#183B32", duration: 3 }, 0)
        .to(txt, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }, 2.2);
    });
    return () => { document.removeEventListener("click", onClick); mm.revert(); };
  }, { scope: ref, dependencies: [route], revertOnUpdate: true });
}
