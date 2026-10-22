import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { onIntroReveal } from "./intro";
gsap.registerPlugin(ScrollTrigger, useGSAP);

// All Celebrations-page motion. Scoped to the page root; reverted on unmount. Uses the app's existing GSAP/Lenis setup.
export function useCelebMotion(ref) {
  useGSAP(() => {
    const root = ref.current, q = (s, c = root) => c.querySelector(s), all = (s, c = root) => gsap.utils.toArray(s, c);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", (ctx) => {
      // Hero entrance (~1.2s), after the preloader reveals
      const stop = onIntroReveal(() => ctx.add(() => {
        gsap.from(all("[data-mask]"), { yPercent: 110, duration: 0.8, stagger: 0.08, ease: "power3.out" });
        gsap.from(all("[data-fade]"), { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.08, delay: 0.3, ease: "power2.out" });
        gsap.from(all("[data-layer]"), { autoAlpha: 0, y: 46, z: -90, duration: 0.9, stagger: 0.09, delay: 0.15, ease: "power3.out" });
      }));
      // First part of scrolling: invitation recedes, layers separate, photo A carries down towards the next section
      const hero = q("[data-hero-root]"), tilt = q("[data-tilt]");
      if (hero && tilt) {
        const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
        gsap.to(tilt, { z: -80, y: -24, ease: "none", scrollTrigger: st });
        gsap.to(q('[data-layer="a"] [data-scroll]'), { x: -24, y: 90, scale: 1.06, ease: "none", scrollTrigger: st });
        gsap.to(q('[data-layer="b"] [data-scroll]'), { x: 26, y: -18, ease: "none", scrollTrigger: st });
      }
      // Interlude: brass rule draws in, images drift 20-40px
      all("[data-rule]").forEach((el) => gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 90%", end: "top 55%", scrub: true } }));
      all("[data-drift]").forEach((el) => gsap.to(el, { y: -parseFloat(el.dataset.drift), ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));
      // Closing panel: brief perspective reveal, then rests flat
      const panel = q("[data-panel]");
      if (panel) gsap.fromTo(panel, { rotationX: 10, y: 60, autoAlpha: 0, transformOrigin: "50% 100%", transformPerspective: 1400 },
        { rotationX: 0, y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", clearProps: "transform,opacity,visibility", scrollTrigger: { trigger: panel, start: "top 85%", once: true } });
      return () => stop();
    });

    // Pointer tilt (capped ~4deg), fine pointers only
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const hero = q("[data-hero-root]"), tilt = q("[data-tilt]");
      if (!hero || !tilt) return;
      const shifts = all("[data-shift]"), depth = shifts.map((s) => parseFloat(s.dataset.depth) || 1);
      const o = { duration: 0.8, ease: "power3.out" };
      const rx = gsap.quickTo(tilt, "rotationX", o), ry = gsap.quickTo(tilt, "rotationY", o);
      const sx = shifts.map((s) => gsap.quickTo(s, "x", o)), sy = shifts.map((s) => gsap.quickTo(s, "y", o));
      const move = (e) => {
        const r = hero.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        ry(nx * 8); rx(-ny * 6); shifts.forEach((_, i) => { sx[i](nx * -16 * depth[i]); sy[i](ny * -12 * depth[i]); });
      };
      const leave = () => { rx(0); ry(0); sx.forEach((f) => f(0)); sy.forEach((f) => f(0)); };
      hero.addEventListener("pointermove", move); hero.addEventListener("pointerleave", leave);
      return () => { hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave); };
    });

    // Occasion stage: one bounded pin (~2.25 screens), no snapping
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const sec = q("[data-stage]");
      if (!sec) return;
      const arts = all("[data-ch]", sec), pick = (s) => arts.map((a) => q(s, a)), imgs = pick("[data-ch-img]"), titles = pick("[data-ch-title]"), descs = pick("[data-ch-desc]"), nums = pick("[data-ch-num]");
      const tones = arts.map((a) => a.dataset.tone), bars = all("[data-bar]", sec);
      gsap.set(sec, { height: "100svh", backgroundColor: tones[0] });
      gsap.set(arts, { position: "absolute", inset: 0, backgroundColor: "transparent" });
      gsap.set(q("[data-prog]", sec), { display: "flex" });
      gsap.set(bars, { scaleX: 0 });
      gsap.set(imgs, { transformPerspective: 1400, autoAlpha: (i) => (i ? 0 : 1) });
      gsap.set(titles, { yPercent: (i) => (i ? 110 : 0) });
      gsap.set([...descs, ...nums], { autoAlpha: (i) => (i % arts.length ? 0 : 1) });
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: sec, start: "top top", end: "+=225%", pin: true, scrub: 0.6 } });
      tl.to(bars[0], { scaleX: 1, duration: 0.6, ease: "none" }, 0);
      for (let i = 1; i < arts.length; i++) {
        const t = (i - 1) * 3 + 1.4; // resting interval before each change
        tl.to(sec, { backgroundColor: tones[i], duration: 1.4 }, t)
          .to(imgs[i - 1], { z: -140, rotationY: -6, x: -30, scale: 0.96, autoAlpha: 0, duration: 1.1 }, t)          // outgoing: back and slightly turned
          .fromTo(imgs[i], { z: 90, rotationY: 6, x: 40, scale: 1.03, autoAlpha: 0 }, { z: 0, rotationY: 0, x: 0, scale: 1, autoAlpha: 1, duration: 1.1 }, t) // incoming: settles forward
          .to(titles[i - 1], { yPercent: -110, duration: 0.6 }, t)
          .to([descs[i - 1], nums[i - 1]], { autoAlpha: 0, duration: 0.4 }, t)
          .to(titles[i], { yPercent: 0, duration: 0.7 }, t + 0.35)
          .to([descs[i], nums[i]], { autoAlpha: 1, duration: 0.5 }, t + 0.55)
          .to(bars[i], { scaleX: 1, duration: 1.4, ease: "none" }, t);
      }
      tl.to({}, { duration: 1.6 });
    });
    return () => mm.revert();
  }, { scope: ref });
}
