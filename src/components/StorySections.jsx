import { Link } from "react-router-dom";
import Img from "./Img";
import { storyPage as s } from "../data/site";
const wrap = "mx-auto max-w-[1440px] px-6 lg:px-12";

export function StoryHero() {
  return (
    <section id="top" data-story-hero className="relative flex h-[100svh] min-h-[600px] items-end overflow-hidden bg-forest text-ivory">
      <div data-tilt className="absolute inset-0"><Img img={s.hero} eager data-hero-img className="size-full" /></div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/35 to-charcoal/20" aria-hidden />
      <div data-depth className={`relative w-full ${wrap} pb-24 lg:pb-28`}>
        <p data-hero className="mb-5 text-xs tracking-[0.3em]">THE STORY OF VILLA MODARO</p>
        <h1 data-hero className="max-w-5xl text-[clamp(2.9rem,8vw,7.5rem)]">It began with a wish to be together.</h1>
        <p data-hero className="mt-6 max-w-lg text-base text-ivory/90 sm:text-lg">A longing for shared moments became a place to celebrate them.</p>
      </div>
    </section>
  );
}

export function StoryBanner() {
  const message = "A PLACE TO GATHER  ✦  A PLACE TO CELEBRATE  ✦  A PLACE TO SLOW DOWN  ✦";
  return (
    <div aria-label="A place to gather, celebrate and slow down" className="overflow-hidden border-y border-brass/30 bg-forest py-4 text-brass">
      <div aria-hidden="true" className="marquee-track motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <span key={copy} className="shrink-0 px-6 font-display text-xl tracking-[0.12em] sm:text-2xl">{message}</span>
        ))}
      </div>
    </div>
  );
}

export function Longing() {
  const l = s.longing;
  return (
    <section id="longing" className="grid overflow-hidden bg-black text-ivory md:grid-cols-2">
      <div data-reveal className="flex flex-col justify-center px-6 py-16 sm:px-10 md:px-12 lg:px-[10vw] lg:py-24">
        <h2 className="h2">{l.title}</h2>
        <p className="mt-8 max-w-md text-ivory/85 md:mt-10">{l.text}</p>
      </div>
      <div className="min-h-[420px] overflow-hidden md:min-h-[600px] lg:min-h-[720px]"><Img img={l.img} data-parallax className="h-[115%] w-full object-cover" /></div>
    </section>
  );
}

export function Discovery() {
  const d = s.discovery;
  return (
    <section className="grid overflow-hidden bg-[#f7f4ef] text-charcoal lg:min-h-[100svh] lg:grid-cols-2">
      <div className="flex min-h-[60svh] items-center justify-center overflow-hidden bg-[#f7f4ef] lg:h-[100svh]">
          <Img img={d.img} className="h-full w-full object-contain" />
      </div>
      <div className="grid min-h-[70svh] grid-rows-[1fr_auto] lg:h-[100svh] lg:min-h-0">
        <div className="min-h-[35svh] overflow-hidden lg:min-h-0">
          <Img img={d.img2} className="size-full object-cover" />
        </div>
        <div data-reveal className="flex flex-col justify-center bg-black px-6 py-10 text-ivory sm:px-10 lg:min-h-0 lg:px-[7vw] lg:py-12">
          <h2 className="h2">{d.title}</h2>
          <p className="mt-6 max-w-xl">{d.text}</p>
        </div>
      </div>
    </section>
  );
}

const pos = ["lg:col-start-6 lg:col-span-7", "lg:col-start-6 lg:col-span-7", "lg:col-start-6 lg:col-span-7"];
export function Stage() {
  return (
    <section
      data-story-pin
      aria-labelledby="stage-h"
      className="relative overflow-hidden bg-[#211F1D] text-[#F1EEE9]"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(23,21,20,.94), rgba(33,31,29,.82)), url("${s.discovery.img2.src}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 id="stage-h" className="sr-only">Villa amenities and essentials</h2>
      {s.stage.map((c, i) => (
        <article key={c.label} data-sc className={`${wrap} grid items-center gap-8 py-16 lg:h-full lg:grid-cols-12 lg:py-0`}>
          <div data-stext className="lg:col-span-4">
            <p className="mb-4 text-xs tracking-[0.3em] text-[#D5A653]">CHAPTER 0{i + 1}</p>
            <h3 className="text-[clamp(2.25rem,5vw,4.5rem)] text-[#F1EEE9]">{c.label}</h3>
            <span aria-hidden="true" className="mt-5 h-px w-16 bg-[#C97942]" />
            <p className="mt-5 max-w-md text-base leading-7 text-[#D4D0CB] sm:text-lg sm:leading-8">{c.text}</p>
          </div>
          <div data-sphoto className={`aspect-[16/10] overflow-hidden ring-1 ring-[#D5A653]/40 ${pos[i]} lg:row-start-1`}><Img img={c.img} className="size-full" /></div>
        </article>
      ))}
      <div data-prog aria-hidden className="absolute bottom-10 left-12 hidden w-64 gap-2">
        {s.stage.map((c) => <span key={c.label} className="h-px flex-1 bg-[#D4D0CB]/25"><span data-bar className="block h-px origin-left bg-[#C97942]" /></span>)}
      </div>
    </section>
  );
}

export function Transformation() {
  const t = s.transformation;
  return (
    <section className="grid overflow-hidden bg-[#211F1D] text-[#F1EEE9] lg:min-h-[100svh] lg:grid-cols-[1.15fr_.85fr]">
      <div className="relative min-h-[58svh] overflow-hidden lg:h-[100svh]">
        <Img img={t.img} data-parallax className="h-[115%] w-full object-cover" />
        <figure className="absolute bottom-7 right-6 w-[38%] max-w-[300px] border border-[#D5A653] bg-[#211F1D] p-2 sm:bottom-10 sm:right-10 lg:bottom-12 lg:right-12 lg:w-[30%]">
          <div className="aspect-[4/5] overflow-hidden"><Img img={t.img2} className="size-full object-cover" /></div>
          <figcaption className="px-1 pt-2 text-xs tracking-wide text-[#D5A653]">{t.img2.caption}</figcaption>
        </figure>
      </div>
      <div data-reveal className="flex min-h-[52svh] flex-col justify-center px-7 py-16 sm:px-12 lg:min-h-[100svh] lg:px-[7vw]">
        <p className="mb-5 text-xs tracking-[0.3em] text-[#D5A653]">A PLACE MADE WITH CARE</p>
        <h2 className="h2 text-[#F1EEE9]">{t.title}</h2>
        <span aria-hidden="true" className="mt-7 h-px w-16 bg-[#C97942]" />
        <p className="mt-7 max-w-xl text-base leading-7 text-[#D4D0CB] sm:text-lg sm:leading-8">{t.text}</p>
      </div>
    </section>
  );
}

export function Values() {
  const al = ["", "lg:ml-auto lg:text-right", "lg:mx-auto lg:text-center"];
  return (
    <section className="bg-forest text-ivory">
      <div className={`${wrap} py-20 lg:py-28`}>
        <h2 className="sr-only">What the villa stands for</h2>
        {s.values.map((v, i) => (
          <div key={v.title} data-reveal className={`max-w-xl border-t border-ivory/25 py-12 lg:py-16 ${al[i]}`}>
            <h3 className="text-[clamp(3rem,8vw,7rem)]">{v.title}</h3>
            <p className="mt-3 text-ivory/80">{v.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Today() {
  const t = s.today, off = ["", "lg:mt-12", "lg:mt-24"];
  return (
    <section className="overflow-hidden bg-white text-[#292825] shadow-[inset_0_0_64px_rgba(205,160,85,0.10)]">
      <div className={`${wrap} py-20 lg:py-28`}>
        <div data-reveal className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs tracking-[0.3em] text-[#B78235]">THE STORY CONTINUES</p>
            <h2 className="h2 max-w-3xl text-[#292825]">{t.title}</h2>
          </div>
          <div className="lg:justify-self-end lg:pb-2">
            <p className="max-w-xl text-base leading-7 text-[#625E57] sm:text-lg sm:leading-8">From a quiet morning to an afternoon spent together, each day at the villa finds its own easy rhythm.</p>
            <ul className="mt-6 flex flex-wrap gap-2.5">{t.items.map((x) => <li key={x} className="border border-[#C99B52]/55 px-3 py-2 text-xs leading-5 text-[#625E57] sm:text-sm">{x}</li>)}</ul>
          </div>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-3 sm:gap-6 lg:mt-16">
          {t.imgs.map((im, i) => (
            <figure key={i} data-reveal className={`min-w-0 ${off[i]}`}>
              <div className="aspect-[4/5] overflow-hidden border border-[#C99B52]/45 bg-[#E1DCD3]">
                <Img img={im} data-parallax className="h-[115%] w-full object-cover" />
              </div>
              <figcaption className="mt-4 border-t border-[#C99B52]/45 pt-3 text-xs uppercase tracking-[0.18em] text-[#A06D2F] sm:text-sm">{im.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing({ setType }) {
  return (
    <section className="bg-forest text-ivory">
      <div className={`${wrap} py-20 lg:py-28`}>
        <h2 data-reveal className="h2 max-w-3xl">Make your next memory part of the story.</h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/the-villa" className="btn bg-brass text-charcoal hover:bg-ivory">Explore the Villa</Link>
          <a href="#enquiry" onClick={() => setType("Stay")} className="btn border border-ivory/70 hover:bg-ivory hover:text-charcoal">Plan Your Stay</a>
        </div>
      </div>
    </section>
  );
}
