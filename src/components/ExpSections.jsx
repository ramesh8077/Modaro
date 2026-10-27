import { useEffect, useState } from "react";
import Img from "./Img";
import { experiencesPage as e } from "../data/site";
const wrap = "mx-auto max-w-[1440px] px-6 lg:px-12";
const lab = "mb-4 text-xs tracking-[0.3em] opacity-75";
const drift = "M0 20 q150 -20 300 0" + " t300 0".repeat(7);

export function ExpHero() {
  return (
    <section id="top" className="relative flex h-[100svh] min-h-[600px] items-end overflow-hidden bg-forest text-ivory">
      <Img img={e.hero} eager data-hero-img data-parallax="6" className="absolute inset-x-0 top-0 h-[115%] w-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/30 to-charcoal/20" aria-hidden />
      <div className={`relative w-full ${wrap} pb-32 lg:pb-36`}>
        <p data-hero className="mb-5 text-xs tracking-[0.3em]">EXPERIENCES AT VILLA MODARO</p>
        <h1 data-hero className="text-[clamp(3rem,9vw,8.5rem)]">Stay for the feeling.</h1>
        <p data-hero className="mt-6 max-w-lg text-base text-ivory/90 sm:text-lg">Slow mornings. Poolside afternoons. Moments that bring you closer.</p>
        <div data-hero className="mt-9 flex flex-wrap gap-3">
          <a href="#explorer" className="btn bg-brass text-charcoal hover:bg-ivory">Find Your Moment</a>
          <a href="#guest-notes" className="btn border border-ivory/70 hover:bg-ivory hover:text-charcoal">Guest Notes</a>
          <a href="/booking" className="btn border border-ivory/70 hover:bg-ivory hover:text-charcoal">Plan Your Stay</a>
        </div>
      </div>
      {/* Ripple-inspired line, kept to the bottom edge and away from the text; stops under reduced motion. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-8 overflow-hidden text-ivory/35">
        <svg viewBox="0 0 2400 40" preserveAspectRatio="none" className="h-full w-[200%] [animation:drift_40s_linear_infinite]"><path d={drift} fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" /></svg>
      </div>
    </section>
  );
}

export function ExpIntro() {
  const i = e.intro;
  return (
    <section data-tone="ivory" className={`${wrap} grid gap-14 py-20 lg:grid-cols-12 lg:py-32`}>
      <div data-reveal className="lg:col-span-5 lg:col-start-2 lg:self-center">
        <p className={lab}>01 THE RHYTHM</p>
        <h2 className="h2">{i.title}</h2>
        <p className="mt-8 max-w-md">{i.text}</p>
      </div>
      <div className="aspect-[4/5] overflow-hidden lg:col-span-4 lg:col-start-8 lg:mt-24"><Img img={i.img} data-parallax className="h-[115%] w-full" /></div>
    </section>
  );
}

export function Pool() {
  const p = e.pool;
  return (
    <section data-tone="mist" className="py-20 lg:py-28">
      <div className={wrap}><p className={`${lab} text-brass`}>03 POOLSIDE</p><h2 data-reveal className="h2 max-w-2xl">{p.title}</h2></div>
      <div data-expand className="mx-auto mt-12 h-[58svh] min-h-[360px] max-w-[1600px] overflow-hidden"><Img img={p.img} data-parallax="6" className="h-[115%] w-full" /></div>
      <div className={`${wrap} mt-12 grid gap-10 lg:grid-cols-12`}>
        <p data-reveal className="max-w-md lg:col-span-4 lg:col-start-2">{p.text}</p>
        <div className="aspect-[4/5] w-2/3 overflow-hidden border-8 border-[#E6ECE8] lg:relative lg:col-span-3 lg:col-start-8 lg:-mt-64 lg:w-full"><Img img={p.detail} className="size-full" /></div>
      </div>
    </section>
  );
}

export function Garden() {
  const g = e.garden;
  return (
    <section data-tone="sage" className={`${wrap} grid gap-14 py-20 lg:grid-cols-12 lg:gap-8 lg:py-32`}>
      <div data-reveal className="lg:col-span-4 lg:border-l lg:border-charcoal/30 lg:pl-8 lg:pt-24">
        <p className={lab}>04 GARDENS</p>
        <h2 className="h2">{g.title}</h2>
        <p className="mt-8 max-w-sm">{g.text}</p>
      </div>
      <div className="grid grid-cols-2 gap-5 lg:col-span-7 lg:col-start-6 lg:gap-8">
        <div className="aspect-[3/4] overflow-hidden"><Img img={g.img} data-parallax="6" className="h-[115%] w-full" /></div>
        <div className="aspect-[3/4] overflow-hidden lg:mt-32"><Img img={g.img2} data-parallax="14" className="h-[130%] w-full" /></div>
      </div>
    </section>
  );
}

export function Pickle() {
  const p = e.pickle;
  const l = { vectorEffect: "non-scaling-stroke", pathLength: 1, strokeDasharray: 1, "data-draw": "" };
  return (
    <section data-tone="ivory" className="relative overflow-hidden py-20 lg:py-32">
      <svg aria-hidden viewBox="0 0 300 140" className="pointer-events-none absolute right-[-10%] top-12 w-[70%] text-brass/60 lg:right-6 lg:w-[38%]" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="4" y="4" width="292" height="132" {...l} /><line x1="150" y1="4" x2="150" y2="136" {...l} />
        <line x1="85" y1="4" x2="85" y2="136" {...l} /><line x1="215" y1="4" x2="215" y2="136" {...l} />
        <line x1="4" y1="70" x2="85" y2="70" {...l} /><line x1="215" y1="70" x2="296" y2="70" {...l} />
      </svg>
      <div className={`${wrap} relative grid gap-12 lg:grid-cols-12`}>
        <div data-reveal className="lg:col-span-12">
          <p className={lab}>05 PLAY</p>
          <h2 className="h2 max-w-4xl text-[clamp(2.75rem,7vw,6.5rem)]">{p.title}</h2>
        </div>
        <div data-slide="-80" className="aspect-[4/3] overflow-hidden lg:col-span-6"><Img img={p.img} className="size-full" /></div>
        <div className="lg:col-span-4 lg:col-start-8 lg:-mt-6">
          <p className="max-w-sm">{p.text}</p>
          <div data-slide="80" className="mt-10 aspect-[3/4] w-3/5 overflow-hidden lg:ml-auto lg:-mt-0"><Img img={p.img2} className="size-full" /></div>
        </div>
      </div>
    </section>
  );
}

export function Together() {
  const t = e.together;
  return (
    <section data-tone="night" className={`${wrap} grid gap-14 py-20 lg:grid-cols-12 lg:gap-10 lg:py-32`}>
      <div className="aspect-[4/3] overflow-hidden lg:col-span-7"><Img img={t.img} data-parallax className="h-[115%] w-full" /></div>
      <div data-reveal className="lg:col-span-5 lg:self-center">
        <p className={lab}>06 TOGETHER</p>
        <h2 className="h2">{t.title}</h2>
        <p className="mt-6 max-w-md opacity-90">{t.text}</p>
        <ul className="mt-8">
          {t.items.map(([a, b]) => <li key={a} className="flex flex-col border-t border-current/25 py-3 sm:flex-row sm:items-baseline sm:justify-between"><span className="font-display text-2xl">{a}</span><span className="text-sm opacity-80">{b}</span></li>)}
          <li className="border-t border-current/25" />
        </ul>
        <a href="/booking" className="btn mt-8 bg-brass text-charcoal hover:bg-ivory">Plan Your Gathering</a>
      </div>
    </section>
  );
}

export function GuestNotes() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const notes = e.testimonials || [];
  const hasNotes = notes.length > 0;
  const note = notes[active] || null;

  useEffect(() => {
    if (!hasNotes || paused || typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % notes.length), 2500);
    return () => window.clearInterval(timer);
  }, [hasNotes, notes.length, paused]);

  return (
    <section id="guest-notes" data-tone="night" className="overflow-hidden bg-forest text-ivory" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
      <div className={`${wrap} grid gap-10 py-20 lg:grid-cols-12 lg:items-stretch lg:gap-16 lg:py-24`}>
        <div className="relative min-h-[360px] overflow-hidden lg:col-span-5 lg:min-h-[480px]">
          <Img img={e.guestNotesImage} className="size-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent" aria-hidden />
          <p className="absolute bottom-6 left-6 text-xs tracking-[0.28em] text-ivory/80">A STAY WORTH REMEMBERING</p>
        </div>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <p className={lab}>08 GUEST NOTES</p>
          {hasNotes ? (
            <>
              <div aria-live="polite" className="min-h-[230px] overflow-hidden">
                <p className="font-display text-5xl leading-none text-brass" aria-hidden>“</p>
                <div className="flex transition-transform duration-500 ease-out motion-reduce:transition-none" style={{ transform: `translateX(-${active * 100}%)` }}>
                  {notes.map((slide) => <blockquote key={slide.id || slide.quote} className="mt-3 min-w-full pr-2 font-display text-3xl leading-tight sm:text-4xl">{slide.quote}</blockquote>)}
                </div>
                <footer className="mt-8 border-t border-ivory/20 pt-4 text-sm text-ivory/75">
                  <div className="mb-4 grid size-14 place-items-center overflow-hidden rounded-full border border-brass/70 bg-brass/15 text-[10px] tracking-[0.16em] text-brass">
                    {note.image?.src ? <Img img={note.image} className="size-full" /> : <span aria-label="Guest photo placeholder">PHOTO</span>}
                  </div>
                  <span className="text-ivory">{note.name}</span>{note.detail ? ` · ${note.detail}` : ""}
                </footer>
              </div>
              <div className="mt-8 flex items-center gap-3" aria-label="Guest note slides">
                <button type="button" className="grid size-10 place-items-center rounded-full border border-ivory/40 text-lg transition hover:border-brass hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass" onClick={() => setActive((active - 1 + notes.length) % notes.length)} aria-label="Previous guest note">←</button>
                <span className="min-w-16 text-center text-xs tracking-[0.2em] text-ivory/65">{String(active + 1).padStart(2, "0")} / {String(notes.length).padStart(2, "0")}</span>
                <button type="button" className="grid size-10 place-items-center rounded-full border border-ivory/40 text-lg transition hover:border-brass hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass" onClick={() => setActive((active + 1) % notes.length)} aria-label="Next guest note">→</button>
              </div>
            </>
          ) : (
            <div className="border-t border-ivory/25 pt-8">
              <h2 className="h2 max-w-xl">The best part is hearing what guests take home.</h2>
              <p className="mt-6 max-w-lg text-ivory/75">Guest reviews will appear here as soon as they are connected to the site. This space is ready for verified notes from the people who stay with us.</p>
              <p className="mt-8 text-xs tracking-[0.24em] text-brass">VERIFIED GUEST NOTES · COMING SOON</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function DayRow() {
  const off = ["", "lg:mt-14", "lg:mt-28"];
  return (
    <section data-tone="ivory" className={`${wrap} py-20 lg:py-28`}>
      <p className={lab}>07 IMAGINE YOUR DAY</p>
      <h2 data-reveal className="h2">Your day, your pace.</h2>
      <p className="mt-4 text-sm opacity-75">Inspiration for a stay, not a schedule.</p>
      <ol className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-8">
        {e.day.map((d, i) => (
          <li key={d.time} data-reveal className={off[i]}>
            <div className="aspect-[4/5] overflow-hidden"><Img img={d.img} className="size-full" /></div>
            <div className="mt-5 border-t border-current/25 pt-4"><h3 className="text-4xl">{d.time}</h3><p className="mt-2 max-w-xs">{d.text}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ExpClosing() {
  return (
    <section data-tone="ivory" className={`${wrap} py-20 lg:py-28`}>
      <div data-reveal className="max-w-2xl border-t border-current/25 pt-12">
        <h2 className="h2">Which moment will be yours?</h2>
        <p className="mt-6">Tell us what you have in mind, and begin planning your time at Villa Modaro.</p>
        <a href="/booking" className="btn mt-8 bg-forest text-ivory hover:bg-charcoal">Enquire About Your Stay</a>
      </div>
    </section>
  );
}
