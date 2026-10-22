import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { introConfig as c } from "../lib/introConfig";
import { getIntro, setIntro, subscribeIntro, markDone, t0 } from "../lib/intro";
import { createSceneStage } from "../lib/sceneStage";

const now = () => performance.now();
const canGL = () => { try { const cv = document.createElement("canvas"); return !!(cv.getContext("webgl2") || cv.getContext("webgl")); } catch { return false; } };

// Entrance overlay. "scene": 3D particle wordmark + camera fly-through. "panels": CSS 3D double-panel opening (also the
// automatic fallback if WebGL or the three.js chunk is unavailable). Lifecycle: initialising -> revealing -> complete.
export default function Preloader() {
  const status = useSyncExternalStore(subscribeIntro, getIntro, getIntro);
  const root = useRef(null), api = useRef(null);
  const [mode, setMode] = useState(() => (getIntro() === "initialising" && c.mode === "scene" && canGL() ? "scene" : "panels"));
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);

  useLayoutEffect(() => {
    if (getIntro() !== "initialising") return;
    const el = root.current, q = (s) => el.querySelector(s);
    const L = q("[data-pl-l]"), R = q("[data-pl-r]"), logo = q("[data-pl-logo]"), cv = q("[data-pl-cv]"), bg = q("[data-pl-bg]"), desc = q("[data-pl-desc]");
    const parts = [L, R, logo].filter(Boolean);
    const body = document.body, app = document.getElementById("app-root");
    const prev = { o: body.style.overflow, p: body.style.paddingRight };
    const sbw = window.innerWidth - document.documentElement.clientWidth; // no layout jump when scroll locks
    const scene = mode === "scene", exitMs = scene ? c.flyMs : c.openMs + 150;
    let locked = true, alive = true, tl, ctx, stage = null, formAt = 0, tOpen;
    body.style.overflow = "hidden"; if (sbw > 0) body.style.paddingRight = `${sbw}px`;
    app?.setAttribute("inert", ""); // covered page controls can't take focus
    const unlock = () => { if (!locked) return; locked = false; body.style.overflow = prev.o; body.style.paddingRight = prev.p; app?.removeAttribute("inert"); };

    const finish = () => { if (!alive) return; setIntro("revealing"); setIntro("complete"); markDone(); unlock(); stage?.kill(); };
    const reveal = () => {
      if (!alive || getIntro() !== "initialising") return;
      setIntro("revealing"); // hero animations start as the reveal begins
      try {
        if (scene) tl = stage ? stage.fly(finish) : gsap.to(el, { autoAlpha: 0, duration: 0.5, onComplete: finish });
        else {
          const small = matchMedia("(max-width: 767px)").matches, rot = small ? c.rotationMobile : c.rotation, dur = c.openMs / 1000;
          tl = gsap.timeline({ onComplete: finish });
          tl.to(logo, { autoAlpha: 0, y: -8, duration: 0.3, ease: "power2.out" }, 0)
            .to(L, { rotationY: rot, xPercent: -108, duration: dur, ease: "power3.inOut" }, 0.15)
            .to(R, { rotationY: -rot, xPercent: 108, duration: dur, ease: "power3.inOut" }, 0.15);
        }
      } catch { finish(); } // animation failed: fail open
    };
    api.current = { reveal, skip: () => { tl?.kill(); gsap.killTweensOf([el, ...parts]); finish(); } };

    // Readiness: bounded font check + this route's above-the-fold <img> (placeholders / videos never block).
    const hero = document.querySelector("[data-hero-img]");
    const img = hero instanceof HTMLImageElement ? hero : null;
    const fontsOk = !document.fonts || document.fonts.status === "loaded", imgOk = !img || img.complete;
    const ready = fontsOk && imgOk;
    if (!scene && ready && c.readyBeatMs <= 0 && c.minMs <= 0) { finish(); return; }

    const ctl = new AbortController(), waits = [];
    if (!fontsOk) waits.push(Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, c.fontMs))]));
    if (!imgOk) waits.push(new Promise((r) => { img.addEventListener("load", r, { once: true, signal: ctl.signal }); img.addEventListener("error", r, { once: true, signal: ctl.signal }); }).then(() => img.decode?.().catch(() => {})));
    if (scene) {
      const sp = createSceneStage({ canvas: cv, bg, desc, signal: ctl.signal }).then((s) => { if (!alive || getIntro() !== "initialising") { s.kill(); return; } stage = s; formAt = now(); s.form(); });
      sp.catch(() => { if (alive) setMode("panels"); }); // WebGL / three.js unavailable: use the CSS panel entrance
      waits.push(sp);
    }
    Promise.all(waits).then(() => { // open as soon as ready (scene: after the wordmark has formed)
      if (!alive) return;
      const wait = scene ? c.formMs + c.holdMs - (now() - formAt) : Math.max(c.minMs - (now() - t0), ready ? c.readyBeatMs : 0);
      tOpen = setTimeout(reveal, Math.max(0, wait));
    }).catch(() => {});
    const t1 = setTimeout(reveal, Math.max(0, c.maxMs - exitMs - (now() - t0))); // latest moment to start the exit
    const t2 = setTimeout(finish, Math.max(0, c.maxMs - (now() - t0)));         // safety net: never stay covered
    const onKey = (e) => e.key === "Escape" && api.current.skip();
    document.addEventListener("keydown", onKey);

    if (!scene) { try { // panels arrival: logo + descriptor with one highlight pass over the wordmark
      ctx = gsap.context(() => {
        gsap.fromTo("[data-pl-word]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" });
        gsap.fromTo("[data-pl-desc]", { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.25, ease: "power3.out" });
        if (!c.logoSrc) gsap.fromTo("[data-pl-word]", { backgroundPosition: "100% 0" }, { backgroundPosition: "0% 0", duration: 0.9, delay: 0.35, ease: "power2.inOut" });
      }, el);
    } catch { /* text stays visible; timers still open the page */ } }

    return () => { // StrictMode-safe: everything created above is undone here
      alive = false; clearTimeout(t1); clearTimeout(t2); clearTimeout(tOpen); ctl.abort(); document.removeEventListener("keydown", onKey);
      tl?.kill(); gsap.killTweensOf([el, ...parts]); ctx?.revert(); stage?.kill(); unlock();
    };
  }, [mode]);

  // A route change while still loading just reveals (never leaves the overlay stuck).
  useLayoutEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    api.current?.reveal();
  }, [pathname]);

  if (status === "complete") return null;
  const small = typeof matchMedia !== "undefined" && matchMedia("(max-width: 767px)").matches;
  const panel = (side) => ({ width: "calc(50% + 0.5px)", transformOrigin: side === "l" ? "0% 50%" : "100% 50%", backfaceVisibility: "hidden", willChange: "transform", background: `linear-gradient(${side === "l" ? 90 : 270}deg, ${c.panelEdge}, ${c.panel})` });
  const frame = <div className="absolute inset-4 border sm:inset-6" style={{ borderColor: c.accent, opacity: 0.4 }} />;
  const word = c.logoSrc ? null : { backgroundImage: `linear-gradient(100deg, ${c.ink} 0%, ${c.ink} 42%, ${c.accent} 50%, ${c.ink} 58%, ${c.ink} 100%)`, backgroundSize: "300% 100%", backgroundPosition: "100% 0", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" };

  return (
    <div ref={root} data-lenis-prevent className="fixed inset-0 overflow-hidden" style={{ zIndex: 2147482000, perspective: mode === "panels" ? `${small ? c.perspectiveMobile : c.perspective}px` : undefined, paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}>
      <p role="status" className="sr-only">Loading Villa Modaro</p>
      {mode === "scene" ? (
        <div aria-hidden="true">
          <div data-pl-bg className="absolute inset-0" style={{ background: c.sceneBg }} />
          <canvas data-pl-cv className="absolute inset-0 size-full" />
          <span data-pl-desc className="absolute left-1/2 top-[56%] -translate-x-1/2 whitespace-nowrap text-[11px] tracking-[0.4em] opacity-0" style={{ color: c.ink }}>{c.descriptor}</span>
        </div>
      ) : (
        <div aria-hidden="true">
          <div data-pl-l className="absolute inset-y-0 left-0" style={panel("l")}>{frame}</div>
          <div data-pl-r className="absolute inset-y-0 right-0" style={panel("r")}>{frame}</div>
          <div data-pl-logo className="absolute inset-0 z-10 grid place-items-center px-6 text-center" style={{ color: c.ink }}>
            <div className="flex flex-col items-center">
              {c.logoSrc ? <img data-pl-word src={c.logoSrc} alt="" className="h-14 w-auto" /> : <span data-pl-word className="font-display text-[clamp(2.5rem,9vw,5rem)] leading-none tracking-[0.3em]" style={word}>{c.wordmark}</span>}
              <span data-pl-desc className="mt-4 text-[11px] tracking-[0.4em]">{c.descriptor}</span>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => api.current?.skip()} className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-20 min-h-[44px] -translate-x-1/2 px-4 text-xs uppercase tracking-[0.25em] opacity-80 hover:opacity-100" style={{ color: c.ink }}>Skip intro</button>
    </div>
  );
}
