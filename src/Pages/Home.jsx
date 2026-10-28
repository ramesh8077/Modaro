import { site } from "../data/site";
import { homeSite } from "../data/home";
import { usePageMeta } from "../lib/meta";

// Untouched components (Hero + Booking stay exactly as they are)
import Hero from "../components/Hero";
import BookingSearch from "../components/BookingSearch";

// Redesigned existing sections
import {
  Story,
  Experiences,
  GalleryMasonry,
  ClosingInvite,
} from "../components/Sections";

// Brand new sections (from reference site analysis)
import DiningSection from "../components/DiningSection";
import TestimonialsSection from "../components/TestimonialsSection";

import { ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Img from "../components/Img";
import { homePhotoSets } from "../data/homePhotoLibrary";

/* ------------------------------------------------------------------ */
/*  PREMIUM LAYER — glass cards, gold accents, smooth scroll motion    */
/*  Palette: Forest #183b32 · Ivory #faf6ee · Gold #d6b46a            */
/*           Champagne #ecd9a8 · Ivory #faf6ee · Sand #f1ece2          */
/*           Espresso #17110c (warm dark accent)                      */
/*                                                                      */
/*  Jitter-safe rules (keep these if you add more animation):           */
/*   - only opacity / transform animations, no blur() filters           */
/*   - nothing scroll-linked on <html> (no root CSS variables)          */
/*   - no hover "lift" on cards (they move under the cursor on scroll)  */
/*   - pointer effects (spotlight, magnet) only run for a real mouse    */
/* ------------------------------------------------------------------ */
const premiumCss = `
:root{--gold:#d6b46a;--gold-soft:#ecd9a8;--gold-deep:#a8832f;--midnight-slate:#183b32;--slate:#183b32;--ivory:#faf6ee;}

/* scroll progress bar (updated directly on the element) */
.pm-progress{position:fixed;top:0;left:0;right:0;height:3px;z-index:9999;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,#5f471b,#80601d,#5f471b);box-shadow:0 0 4px rgba(65,48,20,.3);pointer-events:none}

/* back-to-top with progress ring */
.pm-top{opacity:0;transform:translate3d(0,16px,0) scale(.9);pointer-events:none;transition:opacity .5s,transform .6s cubic-bezier(.22,1,.36,1),border-color .6s,box-shadow .6s}
.pm-top[data-show="true"]{opacity:1;transform:none;pointer-events:auto}
.pm-top:hover{transform:scale(1.06)}

/* scroll reveal — opacity + transform only */
.pm-reveal{opacity:0;transform:translate3d(0,44px,0);transition:opacity .9s cubic-bezier(.22,1,.36,1) var(--d,0ms),transform 1.1s cubic-bezier(.22,1,.36,1) var(--d,0ms)}
.pm-reveal[data-variant="left"]{transform:translate3d(-56px,0,0)}
.pm-reveal[data-variant="right"]{transform:translate3d(56px,0,0)}
.pm-reveal[data-variant="zoom"]{transform:scale(.93)}
.pm-reveal[data-variant="soft"]{transform:translate3d(0,28px,0)}
.pm-reveal.is-in{opacity:1;transform:none}

/* image "curtain" reveal */
.pm-reveal .pm-curtain{clip-path:inset(0 0 100% 0);transition:clip-path 1.4s cubic-bezier(.77,0,.18,1) calc(var(--d,0ms) + 120ms)}
.pm-reveal.is-in .pm-curtain{clip-path:inset(0 0 0 0)}

/* headline: words rise out of a mask one by one */
.pm-word{display:inline-block;overflow:hidden;vertical-align:top;padding:0 .1em .16em 0;margin-bottom:-.16em}
.pm-w{display:inline-block;transform:translate3d(0,108%,0);transition:transform 1s cubic-bezier(.22,1,.36,1) calc(var(--d,0ms) + var(--w,0) * 80ms + 120ms)}
.pm-reveal.is-in .pm-w{transform:none}

/* small label slides in from the left */
.pm-reveal .kicker-lux{opacity:0}
.pm-reveal.is-in .kicker-lux{animation:pm-kicker 1s cubic-bezier(.22,1,.36,1) calc(var(--d,0ms) + 100ms) both}
@keyframes pm-kicker{from{opacity:0;transform:translate3d(-16px,0,0)}to{opacity:1;transform:none}}

/* inclusion list items stagger in */
.pm-reveal .pm-li{opacity:0}
.pm-reveal.is-in .pm-li{animation:pm-li .8s cubic-bezier(.22,1,.36,1) calc(var(--d,0ms) + 700ms + var(--i,0) * 110ms) both}
@keyframes pm-li{from{opacity:0;transform:translate3d(-14px,0,0)}to{opacity:1;transform:none}}

/* gold rule that draws itself */
.pm-rule{height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.pm-rule-draw{transform:scaleX(0);transform-origin:left center;transition:transform 1.4s cubic-bezier(.22,1,.36,1) calc(var(--d,0ms) + 300ms)}
.pm-reveal.is-in .pm-rule-draw{transform:scaleX(1)}

/* glass surfaces (+ cursor spotlight, driven only by pointer move) */
.pm-glass{background:radial-gradient(380px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,var(--spot,0)),transparent 60%),linear-gradient(135deg,rgba(255,255,255,.18),rgba(255,255,255,.05));-webkit-backdrop-filter:blur(16px) saturate(170%);backdrop-filter:blur(16px) saturate(170%);border:1px solid rgba(255,255,255,.22);box-shadow:0 24px 60px -24px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.35);transition:border-color .6s,box-shadow .6s}
.pm-glass:hover{--spot:.17;border-color:rgba(243,223,166,.55);box-shadow:0 28px 70px -22px rgba(214,180,106,.35),inset 0 1px 0 rgba(255,255,255,.45)}
.pm-glass-light{background:radial-gradient(420px circle at var(--mx,50%) var(--my,50%),rgba(214,180,106,var(--spot,0)),transparent 55%),linear-gradient(135deg,rgba(255,255,255,.82),rgba(255,255,255,.48));-webkit-backdrop-filter:blur(16px) saturate(160%);backdrop-filter:blur(16px) saturate(160%);border:1px solid rgba(255,255,255,.85);box-shadow:0 26px 60px -30px rgba(90,64,16,.38),inset 0 1px 0 #fff;transition:border-color .6s,box-shadow .6s}
.pm-glass-light:hover{--spot:.24;border-color:rgba(214,180,106,.7);box-shadow:0 30px 70px -26px rgba(168,131,47,.5),inset 0 1px 0 #fff}

/* gold gradient hairline edge (add to any positioned, rounded element) */
.pm-edge::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(135deg,rgba(243,223,166,.85),rgba(255,255,255,.04) 40%,rgba(214,180,106,.55));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;pointer-events:none;z-index:2}

/* shine sweep */
.pm-shine{position:relative;overflow:hidden}
.pm-shine::after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.3) 50%,transparent 65%);transform:translateX(-130%);transition:transform 1.3s cubic-bezier(.22,1,.36,1);pointer-events:none;z-index:3}
.pm-shine:hover::after{transform:translateX(130%)}

/* gold shimmer on headline emphasis — plays once when the heading enters */
.pm-gold-em em,.pm-gold-em-dark em{font-style:italic}
.pm-gold-em em .pm-w,.pm-gold-em-dark em .pm-w{background-size:220% 100%;background-position:100% 0;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent}
.pm-gold-em em .pm-w{background-image:linear-gradient(100deg,#f3dfa6 0%,#d6b46a 35%,#fff3c9 50%,#d6b46a 65%,#f3dfa6 100%)}
.pm-gold-em-dark em .pm-w{background-image:linear-gradient(100deg,#8a6a22 0%,#c39a45 35%,#e9c978 50%,#c39a45 65%,#8a6a22 100%)}
.pm-reveal.is-in .pm-gold-em em .pm-w,.pm-reveal.is-in .pm-gold-em-dark em .pm-w{animation:pm-sheen 2.8s cubic-bezier(.4,0,.2,1) calc(var(--d,0ms) + .6s) both}
@keyframes pm-sheen{from{background-position:100% 0}to{background-position:0 0}}

/* gold button + idle sheen + magnet */
.pm-btn-gold{position:relative;overflow:hidden;background:#111111;color:#fff;box-shadow:0 10px 30px -10px rgba(0,0,0,.35)}
.pm-btn-gold::after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 40%,rgba(255,255,255,.55) 50%,transparent 60%);transform:translateX(-130%);animation:pm-idle 5.5s ease-in-out 1.5s infinite;pointer-events:none}
@keyframes pm-idle{0%,60%{transform:translateX(-130%)}100%{transform:translateX(130%)}}
.pm-btn-gold:hover{background:#252824;box-shadow:0 16px 40px -10px rgba(37,40,36,.45);filter:brightness(1.04)}
.pm-magnet{transition:transform .35s cubic-bezier(.22,1,.36,1),background-color .3s,color .3s,border-color .5s,box-shadow .5s,filter .5s}

/* heart pop when saved */
.pm-pop{animation:pm-pop .6s cubic-bezier(.34,1.56,.64,1)}
@keyframes pm-pop{0%{transform:scale(.4)}60%{transform:scale(1.4)}100%{transform:scale(1)}}

/* soft glow orbs — radial gradients (no blur filter), slow float */
.pm-orb{position:absolute;border-radius:9999px;pointer-events:none;opacity:.55;background:radial-gradient(circle,var(--c,rgba(214,180,106,.5)) 0%,transparent 68%);animation:pm-float 20s ease-in-out infinite}
.pm-orb-gold{--c:rgba(214,180,106,.5)}
.pm-orb-sage{--c:rgba(61,156,127,.45)}
.pm-orb-sage{--c:rgba(143,169,138,.5)}
.pm-orb-amber{--c:rgba(196,128,62,.42)}
@keyframes pm-float{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(26px,-22px,0) scale(1.1)}}

/* twinkling gold sparkles for the dark sections */
.pm-spark{position:absolute;width:3px;height:3px;border-radius:9999px;background:#f3dfa6;box-shadow:0 0 8px 2px rgba(243,223,166,.7);opacity:0;pointer-events:none;animation:pm-twinkle var(--t,6s) ease-in-out var(--dl,0s) infinite}
@keyframes pm-twinkle{0%,100%{opacity:0;transform:translate3d(0,0,0) scale(.6)}50%{opacity:.9;transform:translate3d(0,-18px,0) scale(1.2)}}

/* rail progress bar */
.pm-railbar{height:2px;border-radius:9999px;overflow:hidden;background:rgba(255,255,255,.15)}
.pm-railbar>span{display:block;height:100%;width:100%;transform-origin:left center;transform:scaleX(.2);background:linear-gradient(90deg,#a8832f,#f3dfa6);transition:transform .25s ease-out}

/* slow cinematic zoom on the active slide image */
.pm-kenburns{animation:pm-kb 16s ease-in-out infinite alternate}
@keyframes pm-kb{from{transform:scale(1)}to{transform:scale(1.09)}}

/* gold marquee bands (second row runs the other way, outlined) */
@media (prefers-reduced-motion:reduce){
  .pm-reveal{opacity:1!important;transform:none!important;transition:none!important}
  .pm-reveal .pm-curtain{clip-path:none!important;transition:none!important}
  .pm-rule-draw{transform:none!important;transition:none!important}
  .pm-w{transform:none!important;transition:none!important}
  .pm-reveal .kicker-lux,.pm-reveal .pm-li{opacity:1!important;animation:none!important}
  .pm-orb,.pm-spark,.pm-kenburns,.pm-btn-gold::after,.pm-pop,.pm-reveal.is-in .pm-gold-em em .pm-w,.pm-reveal.is-in .pm-gold-em-dark em .pm-w{animation:none!important}
  .pm-gold-em em .pm-w,.pm-gold-em-dark em .pm-w{background-position:0 0!important}
  .pm-shine::after{display:none}
}
`;

const RING = 131.95; // 2π × r(21)

function ScrollProgress() {
  const bar = useRef(null);
  const ring = useRef(null);
  const top = useRef(null);
  useEffect(() => {
    let frame = 0;
    let shown = false;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
      if (ring.current) ring.current.style.strokeDashoffset = String(RING * (1 - progress));
      const show = window.scrollY > 700;
      if (top.current && show !== shown) {
        shown = show;
        top.current.dataset.show = String(show);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <>
      <style>{premiumCss}</style>
      <div ref={bar} aria-hidden="true" className="pm-progress" />
      <button
        ref={top}
        type="button"
        data-show="false"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="pm-top pm-glass fixed bottom-6 right-6 z-[9000] grid size-12 place-items-center rounded-full text-[#ecd9a8]"
      >
        <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="21" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="2" />
          <circle ref={ring} cx="24" cy="24" r="21" fill="none" stroke="#d6b46a" strokeWidth="2" strokeLinecap="round" strokeDasharray={RING} strokeDashoffset={RING} />
        </svg>
        <ArrowUp size={18} />
      </button>
    </>
  );
}

function Reveal({ as: Tag = "div", variant = "up", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      element.classList.add("is-in");
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.classList.add("is-in");
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <Tag ref={ref} data-variant={variant} style={{ "--d": `${delay}ms` }} className={`pm-reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

// Headline words that rise out of a mask one after another (use inside a <Reveal>)
function Words({ text, start = 0 }) {
  return text.split(" ").map((word, index) => (
    <span key={`${word}-${index}`}>
      <span className="pm-word"><span className="pm-w" style={{ "--w": start + index }}>{word}</span></span>{" "}
    </span>
  ));
}

// Twinkling gold dots for dark sections
const sparkPoints = [[8, 20], [16, 70], [27, 38], [35, 84], [46, 14], [55, 60], [63, 30], [72, 78], [80, 18], [88, 52], [94, 86], [12, 48]];
function Sparkles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {sparkPoints.map(([x, y], index) => (
        <span key={index} className="pm-spark" style={{ left: `${x}%`, top: `${y}%`, "--t": `${5 + (index % 4) * 1.6}s`, "--dl": `${(index * 0.7) % 5}s` }} />
      ))}
    </div>
  );
}

// Cursor spotlight for glass cards — real mouse only, never on scroll/touch
const spot = (event) => {
  if (event.pointerType && event.pointerType !== "mouse") return;
  const element = event.currentTarget;
  const bounds = element.getBoundingClientRect();
  element.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
  element.style.setProperty("--my", `${event.clientY - bounds.top}px`);
};

// Magnetic buttons — nudge toward the cursor, snap back on leave
const magnet = (event) => {
  if (event.pointerType && event.pointerType !== "mouse") return;
  const element = event.currentTarget;
  const bounds = element.getBoundingClientRect();
  const x = (event.clientX - bounds.left - bounds.width / 2) * 0.22;
  const y = (event.clientY - bounds.top - bounds.height / 2) * 0.35;
  element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
};
const unmagnet = (event) => {
  event.currentTarget.style.transform = "";
};

// Card destinations stay within the retained Villa, Amenities and Booking destinations.
const featuredEscapes = [
  { title: "A private villa stay", description: "A whole-villa retreat with a private pool, gardens and space to be together.", inclusions: ["Private pool", "Landscaped gardens", "Three bedrooms"], image: homePhotoSets.offers[0], to: "/the-villa", action: "Check availability" },
  { title: "Slow days by the pool", description: "Make room for unhurried afternoons, a refreshing swim and time outdoors.", inclusions: ["Poolside living", "Outdoor spaces", "Time to unwind"], image: homePhotoSets.offers[1], to: "/the-villa#outdoors", action: "Explore the villa" },
  { title: "A setting for togetherness", description: "Bring your favourite people together for a birthday, anniversary or family gathering.", inclusions: ["Private setting", "Garden pavilion", "Made for gathering"], image: homePhotoSets.offers[2], to: "/booking", action: "Plan a celebration" },
  { title: "Play, pause, repeat", description: "Switch between a friendly game, quiet garden moments and the pool.", inclusions: ["Pickleball court", "Green surroundings", "Open-air moments"], image: homePhotoSets.offers[3], to: "/the-villa#outdoors", action: "Explore the villa" },
  { title: "Dinner under open skies", description: "Share a meal and make an evening of being together outdoors.", inclusions: ["Open-air setting", "Garden surroundings", "Made for sharing"], image: homePhotoSets.offers[4], to: "/the-villa#bar-dining", action: "Explore the villa" },
  { title: "Find a quieter corner", description: "Take a slower walk through the greenery or settle into a quiet moment outside.", inclusions: ["Landscaped grounds", "Shaded walks", "A slower pace"], image: homePhotoSets.offers[5], to: "/the-villa", action: "Explore the villa" },
];

const editorialStories = [
  { category: "DINING", title: "Gather around the table", text: "The villa’s dining room gives family and friends a comfortable place to share meals and spend time together.", image: homePhotoSets.editorial[0], to: "/the-villa#bar-dining", action: "Explore dining" },
  { category: "POOL & GARDENS", title: "Take time by the pool", text: "Enjoy a refreshing dip, unwind beside the pool or spend a slow afternoon in the landscaped gardens.", image: homePhotoSets.editorial[1], to: "/the-villa#outdoors", action: "Explore pool & gardens" },
  { category: "PICKLEBALL", title: "Play a game together", text: "Enjoy a friendly game on the outdoor pickleball court, with the villa gardens all around.", image: homePhotoSets.editorial[2], to: "/the-villa#outdoors", action: "Explore pickleball" },
  { category: "CELEBRATIONS", title: "A private setting to celebrate", text: "Bring family and friends together near Mohand Forest for birthdays, anniversaries and private gatherings.", image: homePhotoSets.editorial[3], to: "/booking", action: "Plan a gathering" },
];

const browseTiles = [
  { title: "Mohand Forest", subtitle: "A private escape near the expressway", image: homePhotoSets.browse[0], to: "/the-villa" },
  { title: "Pool & gardens", subtitle: "Space to slow down outdoors", image: homePhotoSets.browse[1], to: "/the-villa#outdoors" },
  { title: "Time together", subtitle: "Gather for the moments that matter", image: homePhotoSets.browse[2], to: "/booking" },
  { title: "A little play", subtitle: "Discover the villa experiences", image: homePhotoSets.browse[3], to: "/the-villa#outdoors" },
];

function DiscoverStay() {
  const rail = useRef(null);
  const railBar = useRef(null);
  const browseRail = useRef(null);
  const syncRailBar = () => {
    const element = rail.current;
    if (!element || !railBar.current) return;
    railBar.current.style.transform = `scaleX(${Math.min(1, (element.scrollLeft + element.clientWidth) / element.scrollWidth)})`;
  };
  useEffect(() => {
    syncRailBar();
    window.addEventListener("resize", syncRailBar);
    return () => window.removeEventListener("resize", syncRailBar);
  }, []);
  useEffect(() => {
    const element = browseRail.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame;
    let previousTime = 0;
    let paused = false;
    const tick = (time) => {
      if (document.hidden || paused) {
        previousTime = 0;
        frame = window.requestAnimationFrame(tick);
        return;
      }
      if (previousTime) {
        const elapsed = Math.min(time - previousTime, 40);
        const loopStart = element.children[browseTiles.length];
        const firstCard = element.children[0];
        const loopWidth = loopStart && firstCard ? loopStart.offsetLeft - firstCard.offsetLeft : 0;
        element.scrollLeft += elapsed * 0.035;
        if (loopWidth && element.scrollLeft >= loopWidth) element.scrollLeft -= loopWidth;
      }
      previousTime = time;
      frame = window.requestAnimationFrame(tick);
    };
    const start = () => { paused = false; };
    const stop = () => { paused = true; };
    const resumeAfterFocus = (event) => {
      if (!element.contains(event.relatedTarget)) start();
    };

    element.addEventListener("focusin", stop);
    element.addEventListener("focusout", resumeAfterFocus);
    element.addEventListener("touchstart", stop, { passive: true });
    element.addEventListener("touchend", start, { passive: true });
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      element.removeEventListener("focusin", stop);
      element.removeEventListener("focusout", resumeAfterFocus);
      element.removeEventListener("touchstart", stop);
      element.removeEventListener("touchend", start);
    };
  }, []);
  const move = (target, direction) => {
    if (!target.current) return;
    const style = window.getComputedStyle(target.current);
    const pageWidth = target.current.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    target.current.scrollBy({ left: direction * pageWidth, behavior: "smooth" });
  };
  return (
    <>
      {/* Exclusive offers — warm ivory and muted gold */}
      <section aria-labelledby="featured-heading" className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#faf6ee_0%,#f1ece2_100%)] py-10 text-charcoal sm:py-12 lg:py-14">
        <div className="container-lux relative z-10" style={{ maxWidth: "none", paddingInline: "clamp(1rem, 4vw, 4rem)" }}>
          <Reveal className="mb-6 flex flex-col items-center gap-4 sm:relative sm:mb-8 sm:flex-row sm:justify-center">
            <div className="w-full">
              <h2 id="featured-heading" className="max-w-full bg-gradient-to-r from-[#080a09] via-[#343a35] to-[#080a09] bg-clip-text text-center font-display text-4xl font-semibold uppercase tracking-[0.08em] text-transparent sm:text-6xl lg:text-7xl"><Words text="Featured Stays" /></h2>
            </div>
            <div className="flex items-center gap-2 sm:absolute sm:right-0 sm:gap-3">
              <Link to="/the-villa" className="mr-1 hidden min-h-10 items-center gap-1 text-xs text-[#80601d] underline-offset-4 hover:underline sm:inline-flex">View all <ArrowUpRight size={14} /></Link>
              <button type="button" onClick={() => move(rail, -1)} onPointerMove={magnet} onPointerLeave={unmagnet} aria-label="Scroll offers left" className="pm-glass-light pm-magnet grid size-9 place-items-center rounded-full text-charcoal hover:bg-[#d6b46a] hover:text-forest sm:size-10"><ArrowLeft size={17} /></button>
              <button type="button" onClick={() => move(rail, 1)} onPointerMove={magnet} onPointerLeave={unmagnet} aria-label="Scroll offers right" className="pm-glass-light pm-magnet grid size-9 place-items-center rounded-full text-charcoal hover:bg-[#d6b46a] hover:text-forest sm:size-10"><ArrowRight size={17} /></button>
            </div>
          </Reveal>
          <div ref={rail} onScroll={syncRailBar} className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-6 pb-6 pt-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
            {featuredEscapes.map((offer, index) => (
              <Reveal as="article" key={offer.title} delay={(index % 3) * 120} className="w-full shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]">
                <div onPointerMove={spot} className="relative h-full overflow-hidden rounded-none border border-[#ead8c8] bg-white text-charcoal shadow-[0_18px_42px_-24px_rgba(57,44,25,.28)]">
                  <div>
                    <Link to={offer.to} aria-label={`${offer.title} — ${offer.action}`} className="group block">
                      <div className="pm-curtain relative aspect-[1.55] overflow-hidden bg-olive/20">
                        <Img img={offer.image} className="size-full transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]" eager />
                      </div>
                      <div className="flex min-h-[250px] flex-col p-5 sm:p-6">
                        <h3 className="font-display text-2xl font-medium leading-tight text-[#111511] capitalize sm:text-3xl">{offer.title}</h3>
                        <p className="mt-2 min-h-12 text-base leading-7 text-charcoal/80">{offer.description}</p>
                        <ul className="mt-3 space-y-1.5 border-t border-charcoal/12 pt-3 text-sm text-charcoal/85">{offer.inclusions.map((item, itemIndex) => <li key={item} style={{ "--i": itemIndex }} className="pm-li flex items-center gap-2"><span aria-hidden="true" className="text-xs text-[#80601d]">◉</span>{item}</li>)}</ul>
                        <span className="mt-auto flex min-h-11 items-end justify-end pt-4 text-xs font-semibold"><span className="inline-flex items-center bg-[#e4b02f] px-4 py-2.5 text-charcoal transition-colors group-hover:bg-[#f0d9aa]">{offer.action}</span></span>
                      </div>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div aria-hidden="true" className="pm-railbar mx-auto mt-1 max-w-xs"><span ref={railBar} /></div>
        </div>
      </section>

      {/* Browse tiles — ivory with glass captions */}
      <section aria-labelledby="browse-heading" className="relative isolate overflow-hidden pt-6 pb-12 text-charcoal sm:pt-8 sm:pb-16">
        <div aria-hidden="true" className="absolute inset-0 z-0">
          <Img img={homePhotoSets.story} className="size-full scale-110 object-cover object-center blur-[5px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/25" />
        </div>
        <span aria-hidden="true" className="pm-orb pm-orb-gold -right-24 top-0 size-80" />
        <div className="container-lux relative z-10" style={{ maxWidth: "none", paddingInline: "clamp(1rem, 4vw, 4rem)" }}>
          <Reveal as="header" className="relative mb-10 flex items-center justify-center gap-4">
            <div>
              <h2 id="browse-heading" className="mx-auto w-fit px-6 py-2 text-center font-display text-4xl font-semibold uppercase tracking-[0.08em] text-white sm:text-6xl"><Words text="Explore the villa" /></h2>
            </div>
            <div className="absolute right-0 hidden items-center gap-2 sm:flex">
              <button type="button" onClick={() => move(browseRail, -1)} aria-label="Scroll discovery tiles left" className="pm-glass-light grid size-9 place-items-center rounded-full transition-colors hover:bg-forest hover:text-white"><ArrowLeft size={16} /></button>
              <button type="button" onClick={() => move(browseRail, 1)} aria-label="Scroll discovery tiles right" className="pm-glass-light grid size-9 place-items-center rounded-full transition-colors hover:bg-forest hover:text-white"><ArrowRight size={16} /></button>
            </div>
          </Reveal>
          <div className="relative left-1/2 w-screen -translate-x-1/2 [perspective:1400px]">
            <div ref={browseRail} className="flex gap-4 overflow-x-auto overscroll-x-contain px-0 pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ transformStyle: "preserve-3d" }}>
              {[...browseTiles, ...browseTiles].map((tile, index) => (
                <Reveal as={Link} key={`${tile.title}-${index}`} to={tile.to} aria-hidden={index >= browseTiles.length} tabIndex={index >= browseTiles.length ? -1 : undefined} variant="zoom" delay={(index % browseTiles.length) * 110} className={`pm-edge group relative aspect-[1.28] w-full shrink-0 overflow-hidden rounded-none bg-olive/20 shadow-[0_18px_40px_-22px_rgba(18,53,45,.6)] [transform:translateZ(42px)] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)] ${index % browseTiles.length === 2 ? "z-10 -translate-y-3 [transform:translateZ(110px)_scale(1.06)]" : ""}`}>
                  <span className="pm-curtain absolute inset-0 block">
                    <Img img={tile.image} className="size-full transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-t from-[#183b32]/70 via-transparent to-transparent" />
                </Reveal>
              ))}
            </div>
          </div>
          <div className="mt-3 flex justify-center gap-2 sm:hidden">
            <button type="button" onClick={() => move(browseRail, -1)} aria-label="Scroll discovery tiles left" className="pm-glass-light grid size-9 place-items-center rounded-full"><ArrowLeft size={16} /></button>
            <button type="button" onClick={() => move(browseRail, 1)} aria-label="Scroll discovery tiles right" className="pm-glass-light grid size-9 place-items-center rounded-full"><ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      {/* Villa experiences — deep forest palette with calm, static cards */}
      <section aria-labelledby="experiences-heading" className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#f2f2f2_0%,#e5e5e5_52%,#dcdcdc_100%)] py-7 text-charcoal sm:py-9 lg:py-10">
        <div className="container-lux relative z-10" style={{ maxWidth: "none", paddingInline: "clamp(1rem, 4vw, 4rem)" }}>
          <header className="mb-7 sm:mb-9">
            <h2 id="experiences-heading" className="mx-auto max-w-full bg-gradient-to-r from-[#080a09] via-[#343a35] to-[#080a09] bg-clip-text text-center font-display text-4xl font-semibold uppercase tracking-[0.08em] text-transparent sm:text-6xl lg:text-7xl">Experiences at Villa Modaro</h2>
          </header>
          <div className="grid items-stretch gap-5 sm:gap-6 lg:grid-cols-3">
            {editorialStories.map((story, index) => {
              const featured = index === 0;
              return (
                <Reveal as="article" key={story.title} delay={index === 0 ? 0 : (index - 1) * 120} className={`group relative h-full overflow-hidden rounded-none border border-charcoal/10 bg-white text-charcoal ${featured ? "md:grid md:grid-cols-2 lg:col-span-3" : "flex flex-col"}`}>
                  <div className={`pm-curtain relative overflow-hidden bg-olive/20 ${featured ? "aspect-[1.35] min-h-[280px] sm:min-h-[360px] md:aspect-auto md:min-h-[420px]" : "aspect-[1.55]"}`}><Img img={story.image} className="absolute inset-0 size-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]" /></div>
                  <div className={`flex flex-1 flex-col ${featured ? "justify-center px-6 py-8 sm:px-9 sm:py-10 lg:px-12" : "min-h-[320px] px-5 py-6 sm:px-6 sm:py-7"}`}>
                    <p className="kicker-lux w-fit bg-[#f5edda] px-2 py-1 text-sm font-extrabold tracking-[0.16em] !text-[#5c420a]">{story.category}</p>
                    <h3 className={`mt-3 font-display text-[#111511] capitalize ${featured ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}>{story.title}</h3>
                    <span aria-hidden="true" className="my-4 w-full border-t border-white/15 sm:my-5" />
                    <p className="text-sm leading-7 text-[#50545A] sm:text-base">{story.text}</p>
                    <Link to={story.to} className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 border border-[#d2b16b]/60 bg-[#e4b02f] px-5 py-2 text-xs font-semibold text-charcoal transition-colors hover:bg-[#f0d9aa]">{story.action}<ArrowUpRight size={15} /></Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

const interiorSpaces = [
  { title: "The living room", note: "Room to settle in together", image: homePhotoSets.interior[0], to: "/the-villa" },
  { title: "Restful bedrooms", note: "A quieter place to unwind", image: homePhotoSets.interior[1], to: "/the-villa#bedrooms" },
  { title: "The kitchen", note: "Made for slow starts", image: homePhotoSets.interior[2], to: "/the-villa" },
];

function InteriorSpaces() {
  return (
    <section aria-labelledby="interior-heading" className="relative isolate -mt-px overflow-hidden border-0 bg-ivory pt-0 pb-10 text-charcoal sm:pb-12 lg:pb-16" style={{ border: "none", outline: "none", boxShadow: "none" }}>
      <span aria-hidden="true" className="pm-orb pm-orb-sage -right-24 bottom-0 size-[28rem]" />
      <div className="container-lux relative z-10" style={{ maxWidth: "none", paddingInline: "clamp(1rem, 4vw, 4rem)" }}>
        <Reveal as="header" className="mb-8 flex justify-center sm:mb-10">
          <h2 id="interior-heading" className="max-w-full bg-gradient-to-r from-[#080a09] via-[#343a35] to-[#080a09] bg-clip-text text-center font-display text-4xl font-semibold uppercase tracking-[0.08em] text-transparent sm:text-6xl lg:text-7xl">Inside the villa</h2>
        </Reveal>
        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {interiorSpaces.map((space, index) => (
            <Reveal key={space.title} variant="zoom" delay={index * 140} className="pm-edge group flex min-h-[340px] flex-col overflow-hidden rounded-none bg-white shadow-[0_24px_48px_-28px_rgba(18,53,45,.55)] sm:min-h-[400px] lg:min-h-[440px]">
              <Link to={space.to} aria-label={`${space.title}: ${space.note}`} className="relative block min-h-0 flex-1 overflow-hidden">
                <span className="pm-curtain absolute inset-0 block">
                  <Img img={space.image} className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]" />
                </span>
              </Link>
              <div className="shrink-0 border-t border-charcoal/15 bg-white px-5 py-3 text-charcoal sm:px-6 sm:py-4">
                <p className="font-display text-3xl font-medium leading-tight text-[#b8892c] capitalize sm:text-4xl">{space.title}</p>
                <p className="mt-1 text-base font-medium text-[#111511] capitalize sm:text-lg">{space.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Placed after the room preview so guests can see capacity, key features and rates together.
function VillaAtAGlance() {
  const facts = [
    ["01", "Bedrooms", "3"],
    ["02", "Guest capacity", "6 adults + 3 children"],
    ["03", "Highlights", "Plunge pool · Pickleball · Live bar · Bonfire lawn"],
  ];

  return (
    <section aria-labelledby="villa-glance-heading" className="bg-[#171a18] px-4 py-12 text-[#f4f0e8] sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <Reveal variant="soft" className="mx-auto grid max-w-[1440px] overflow-hidden border border-[#c7a86a]/40 bg-[#202522] shadow-[0_28px_80px_-42px_rgba(0,0,0,.8)] lg:grid-cols-[1.35fr_.65fr]">
        <div className="p-6 sm:p-9 lg:p-12">
          <h2 id="villa-glance-heading" className="mt-3 max-w-2xl font-display text-4xl text-[#b8892c] sm:text-5xl">A private three-bedroom villa near Mohand Forest</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#f4f0e8]/75 sm:text-base">Enjoy a private pool, landscaped gardens and room for family and friends, with three bedrooms and space for up to six adults and three children.</p>

          <div className="mt-7 border-t border-white/15">
            {facts.map(([number, label, value]) => (
              <div key={label} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-white/10 py-4 sm:grid-cols-[3rem_1fr] sm:gap-4">
                <span className="pt-1 text-[10px] tracking-[0.18em] text-[#d2b16b]">{number}</span>
                <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                  <p className="font-display text-xl text-[#b8892c] sm:text-2xl">{label}</p>
                  <p className="max-w-sm text-xs leading-5 text-[#f4f0e8]/75 sm:text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/the-villa" className="btn mt-6 inline-flex min-h-12 w-full items-center justify-center border border-[#d2ae6c]/60 bg-[#e4b02f] px-6 text-xs font-semibold tracking-widest text-[#171a18] transition-colors hover:bg-[#f0d9aa]">Explore the villa <ArrowUpRight size={15} className="ml-2" /></Link>
        </div>

        <div className="flex flex-col justify-between border-t border-[#c7a86a]/25 bg-[#121614] p-6 sm:p-9 lg:border-l lg:border-t-0 lg:p-10">
          <div>
            <h3 className="font-display text-2xl font-medium leading-tight text-[#d2b16b] sm:text-3xl">A special rate for your stay</h3>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-2 font-display leading-none">
              <span className="text-2xl text-[#a9aaa5] line-through decoration-[#d2b16b] decoration-2 sm:text-3xl">₹20,000</span>
              <span className="text-[clamp(2rem,4vw,3rem)] text-[#f4f0e8]">₹17,000</span>
            </p>
            <p className="mt-3 text-sm font-medium text-[#f4f0e8]/75">per night <span className="ml-2 inline-block bg-[#3b3424] px-2 py-1 text-xs font-bold text-[#e3c577]">15% off</span></p>
            <p className="mt-6 max-w-xs text-sm font-semibold leading-6 text-[#f4f0e8]/80">Rates vary by weekday, weekend, season and festive dates. Final pricing is shared during enquiry.</p>
          </div>
          <Link to="/booking" className="btn mt-8 inline-flex min-h-12 items-center justify-center border border-[#d2b16b]/60 bg-[#e4b02f] px-6 text-xs tracking-widest text-[#171a18] transition-colors hover:bg-[#f0d9aa]">Ask about your dates <ArrowUpRight size={15} className="ml-2" /></Link>
        </div>
      </Reveal>
    </section>
  );
}

// Repoint removed page links to the matching retained Villa sections or booking flow.
const exclusiveMoments = [
  { category: "POOL & GARDENS", title: "Let the afternoon linger", text: "Slow afternoons and easy gatherings by the water.", image: homePhotoSets.moments[0], to: "/the-villa#outdoors", action: "Explore the villa" },
  { category: "DINING", title: "The art of dining together", text: "Come together around the table and make time for a meal worth sharing.", image: homePhotoSets.moments[1], to: "/the-villa#bar-dining", action: "Explore dining" },
  { category: "CELEBRATIONS", title: "Your people. Your moment.", text: "Mark a birthday, anniversary or family gathering in a private setting.", image: homePhotoSets.moments[2], to: "/booking", action: "Plan a celebration" },
  { category: "PLAY & DISCOVERY", title: "A little play. A lot of connection.", text: "Take to the pickleball court, wander the gardens and enjoy time outdoors.", image: homePhotoSets.moments[3], to: "/the-villa#outdoors", action: "Explore the villa" },
];

function ExclusiveMoments() {
  const rail = useRef(null);
  const [active, setActive] = useState(1);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const element = rail.current;
      const slide = element?.children[1];
      if (element && slide) element.scrollLeft = slide.offsetLeft - (element.clientWidth - slide.clientWidth) / 2;
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const showSlide = (index) => {
    const slides = rail.current?.children;
    const slide = slides?.[index];
    if (!slide || !rail.current) return;
    rail.current.scrollTo({ left: slide.offsetLeft - (rail.current.clientWidth - slide.clientWidth) / 2, behavior: "smooth" });
    setActive(index);
  };
  const syncActive = () => {
    if (!rail.current) return;
    const center = rail.current.getBoundingClientRect().left + rail.current.clientWidth / 2;
    let nearest = 0;
    let distance = Infinity;
    [...rail.current.children].forEach((slide, index) => {
      const bounds = slide.getBoundingClientRect();
      const nextDistance = Math.abs(bounds.left + bounds.width / 2 - center);
      if (nextDistance < distance) { nearest = index; distance = nextDistance; }
    });
    setActive(nearest);
  };
  const shift = (direction) => showSlide((active + direction + exclusiveMoments.length) % exclusiveMoments.length);
  return (
    <section
      aria-labelledby="exclusive-heading"
      className="relative isolate overflow-hidden py-14 text-white sm:py-20 lg:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <Img img={homePhotoSets.interior[0]} className="size-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-[#17110c]/55" />
      </div>
      <span aria-hidden="true" className="pm-orb pm-orb-gold left-1/4 -top-24 size-[26rem]" />
      <span aria-hidden="true" className="pm-orb pm-orb-amber -right-24 bottom-0 size-[30rem]" />
      <Sparkles />
      <div className="container-lux relative z-10" style={{ maxWidth: "none", paddingInline: "clamp(1rem, 4vw, 4rem)" }}>
        <Reveal as="header" className="grid gap-5 md:grid-cols-2 md:items-end md:gap-10">
          <div>
            <h2 id="exclusive-heading" className="pm-gold-em max-w-2xl font-display text-5xl text-white sm:text-6xl"><Words text="Private experiences" /></h2>
            <span className="pm-rule pm-rule-draw mt-5 block w-40" />
          </div>
          <p className="max-w-xl pb-1 text-sm leading-7 text-white/75 sm:text-base">Find your own rhythm at Villa Modaro—from slow afternoons by the pool to celebrations and shared meals in the gardens.</p>
        </Reveal>
        <Reveal variant="soft" delay={150} className="relative mt-10 sm:mt-14">
          <div ref={rail} onScroll={syncActive} className="-mx-4 flex snap-x snap-mandatory items-start gap-5 overflow-x-auto overscroll-x-contain px-4 pb-4 [scrollbar-width:none] sm:-mx-8 sm:gap-7 sm:px-8 [&::-webkit-scrollbar]:hidden" style={{ paddingInline: "max(1rem, calc((100% - clamp(280px, 48vw, 680px)) / 2))" }}>
            {exclusiveMoments.map((moment, index) => (
              <article key={moment.title} className="pm-edge relative shrink-0 snap-center overflow-hidden rounded-none shadow-[0_30px_70px_-30px_rgba(0,0,0,.8)]" style={{ flex: "0 0 clamp(280px, 48vw, 680px)" }}>
                <div className="pm-curtain group relative aspect-[1.6] overflow-hidden bg-charcoal">
                  <Img img={moment.image} className={`size-full object-cover transition-opacity duration-700 ${active === index ? "pm-kenburns opacity-100" : "opacity-50"}`} eager={index === active} />
                  {active !== index && <div className="absolute inset-0 grid place-items-center bg-[#17110c]/45 p-6 text-center"><div><p className="kicker-lux" style={{ color: "#ecd9a8" }}>{moment.category}</p><h3 className="mt-3 font-display text-3xl capitalize text-white sm:text-4xl">{moment.title}</h3></div></div>}
                  <button type="button" onClick={() => showSlide(index)} className="moment-slide-hit-area absolute inset-0 z-10 cursor-pointer" aria-label={`Show ${moment.title}`} />
                </div>
                {active === index && <div onPointerMove={spot} className="rounded-none border-x-0 border-b-0 bg-white px-6 py-6 text-charcoal shadow-[0_12px_32px_rgba(0,0,0,.2)] sm:px-10 sm:py-8"><p className="kicker-lux" style={{ color: "#a8832f" }}>{moment.category}</p><h3 className="mt-2 font-display text-3xl capitalize text-charcoal sm:text-4xl">{moment.title}</h3><p className="mt-3 max-w-xl text-sm capitalize leading-relaxed text-charcoal/75 sm:text-base">{moment.text}</p><Link to={moment.to} onPointerMove={magnet} onPointerLeave={unmagnet} className="pm-btn-gold pm-magnet mt-5 inline-flex min-h-10 items-center gap-2 rounded-none px-4 text-xs font-medium capitalize">{moment.action}<ArrowUpRight size={14} /></Link></div>}
              </article>
            ))}
          </div>
          <button type="button" onClick={() => shift(-1)} onPointerMove={magnet} onPointerLeave={unmagnet} aria-label="Previous featured experience" className="pm-glass pm-magnet absolute left-1 top-[31%] z-20 grid size-11 place-items-center rounded-none text-white hover:bg-[#d6b46a] hover:text-forest sm:left-4 sm:size-12"><ArrowLeft size={19} /></button>
          <button type="button" onClick={() => shift(1)} onPointerMove={magnet} onPointerLeave={unmagnet} aria-label="Next featured experience" className="pm-glass pm-magnet absolute right-1 top-[31%] z-20 grid size-11 place-items-center rounded-none text-white hover:bg-[#d6b46a] hover:text-forest sm:right-4 sm:size-12"><ArrowRight size={19} /></button>
          <div className="mt-6 flex justify-center gap-2">
            {exclusiveMoments.map((moment, index) => (
              <button key={moment.title} type="button" onClick={() => showSlide(index)} aria-label={`Go to ${moment.title}`} className={`h-1.5 rounded-full transition-all duration-500 ${active === index ? "w-8 bg-[#d6b46a]" : "w-3 bg-white/30"}`} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta(site.meta.title, site.meta.description);
  return (
    <>
      <ScrollProgress />

      {/* 1. First impression — Hero with video background (UNTOUCHED) */}
      <Hero />

      {/* 2. Primary conversion — Booking/availability widget (UNTOUCHED) */}
      <BookingSearch embedded />

      {/* 3. Introduction — who we are / the villa's story */}
      <Reveal variant="soft">
        <Story />
      </Reveal>

      {/* 4. The property — rooms and spaces (what they are booking) */}
      <InteriorSpaces />

      {/* 5. Capacity, villa highlights and indicative pricing, placed after the room preview. */}
      <VillaAtAGlance />

      {/* 6. Ways to stay — curated offers, browse tiles, editorial stories */}
      <DiscoverStay />

      {/* 7. Things to do — experiences and private moments */}
      <Reveal variant="soft">
        <Experiences />
      </Reveal>
      <ExclusiveMoments />

      {/* 8. Food — dining at the villa */}
      <Reveal variant="soft">
        <DiningSection />
      </Reveal>

      {/* 9. Visual proof — gallery */}
      <Reveal variant="soft">
        <GalleryMasonry
          items={homeSite.gallery}
          title="Villa gallery"
        />
      </Reveal>

      {/* 10. Social proof — guest reviews */}
      <Reveal variant="soft">
        <TestimonialsSection />
      </Reveal>

      {/* 11. Final call to action — booking invitation */}
      <Reveal variant="soft">
        <ClosingInvite />
      </Reveal>
    </>
  );
}
