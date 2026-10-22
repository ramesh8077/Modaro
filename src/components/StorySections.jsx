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
        <a data-hero href="#longing" className="mt-9 inline-flex min-h-[44px] items-center gap-3 text-sm tracking-wide hover:text-brass">
          Discover our story<span aria-hidden className="h-px w-12 bg-current" />
        </a>
      </div>
    </section>
  );
}

export function Longing() {
  const l = s.longing;
  return (
    <section id="longing" className={`${wrap} grid gap-14 py-20 lg:grid-cols-12 lg:py-32`}>
      <div data-reveal className="lg:col-span-5 lg:col-start-2 lg:self-center">
        <h2 className="h2">{l.title}</h2>
        <p className="mt-10 max-w-md">{l.text}</p>
      </div>
      <div className="aspect-[4/5] overflow-hidden lg:col-span-4 lg:col-start-8"><Img img={l.img} data-parallax className="h-[115%] w-full" /></div>
    </section>
  );
}

export function Discovery() {
  const d = s.discovery;
  return (
    <section className={`${wrap} pb-20 lg:pb-32`}>
      <div className="relative">
        <p className="font-display text-[clamp(7rem,26vw,22rem)] leading-[0.85]">
          <span className="sr-only">In 2020</span>
          <span aria-hidden className="relative block w-fit">
            <span data-parallax className="absolute left-2 top-2 text-brass/30 lg:left-4 lg:top-4">2020</span>
            <span className="relative text-transparent [-webkit-text-stroke:1.5px_#183B32]">2020</span>
          </span>
        </p>
      </div>
      <div className="mt-10 grid gap-12 lg:mt-0 lg:grid-cols-12">
        <figure className="lg:col-span-5">
          <div className="aspect-[4/5] overflow-hidden"><Img img={d.img} data-parallax className="h-[115%] w-full" /></div>
          <figcaption className="mt-3 border-t border-charcoal/20 pt-2 text-sm text-olive">{d.img.caption}</figcaption>
        </figure>
        <div data-reveal className="lg:col-span-4 lg:col-start-8 lg:pt-32">
          <h2 className="h2">{d.title}</h2>
          <p className="mt-8">{d.text}</p>
          <div className="mt-12 hidden aspect-square w-2/3 overflow-hidden lg:block"><Img img={d.img2} className="size-full" /></div>
        </div>
      </div>
    </section>
  );
}

const pos = ["lg:col-start-7 lg:col-span-6", "lg:col-start-6 lg:col-span-7", "lg:col-start-7 lg:col-span-5"];
export function Stage() {
  return (
    <section data-story-pin aria-labelledby="stage-h" className="relative overflow-hidden bg-forest text-ivory">
      <h2 id="stage-h" className="sr-only">How the story unfolded</h2>
      {s.stage.map((c, i) => (
        <article key={c.label} data-sc className={`${wrap} grid items-center gap-8 py-16 lg:h-full lg:grid-cols-12 lg:py-0`}>
          <div data-stext className="lg:col-span-4">
            <p className="mb-4 text-xs tracking-[0.3em] text-brass">CHAPTER 0{i + 1}</p>
            <h3 className="text-[clamp(2.25rem,5vw,4.5rem)]">{c.label}</h3>
            <p className="mt-5 max-w-sm text-ivory/85">{c.text}</p>
          </div>
          <div data-sphoto className={`aspect-[7/5] overflow-hidden ${pos[i]} lg:row-start-1`}><Img img={c.img} className="size-full" /></div>
        </article>
      ))}
      <div data-prog aria-hidden className="absolute bottom-10 left-12 hidden w-64 gap-2">
        {s.stage.map((c) => <span key={c.label} className="h-px flex-1 bg-ivory/25"><span data-bar className="block h-px origin-left bg-brass" /></span>)}
      </div>
    </section>
  );
}

export function Transformation() {
  const t = s.transformation;
  return (
    <section className={`${wrap} grid gap-14 py-20 lg:grid-cols-12 lg:py-32`}>
      <div className="relative lg:col-span-7">
        <figure><div className="aspect-[7/5] overflow-hidden"><Img img={t.img} data-parallax className="h-[115%] w-full" /></div>
          <figcaption className="mt-3 text-sm text-olive">{t.img.caption}</figcaption></figure>
        <figure className="mt-8 w-2/3 lg:absolute lg:-bottom-24 lg:right-[-12%] lg:mt-0 lg:w-1/3">
          <div className="aspect-[4/5] overflow-hidden border-8 border-ivory"><Img img={t.img2} className="size-full" /></div>
          <figcaption className="mt-2 text-sm text-olive">{t.img2.caption}</figcaption>
        </figure>
      </div>
      <div data-reveal className="lg:col-span-4 lg:col-start-9 lg:self-start">
        <h2 className="h2">{t.title}</h2>
        <p className="mt-8">{t.text}</p>
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
  const t = s.today, off = ["", "lg:mt-24", "lg:mt-48"];
  return (
    <section className={`${wrap} py-20 lg:py-28`}>
      <h2 data-reveal className="h2 max-w-3xl">{t.title}</h2>
      <ul data-reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-1 text-sm text-olive">{t.items.map((x) => <li key={x}>{x}</li>)}</ul>
      <div className="mt-16 grid gap-6 pb-0 sm:grid-cols-3 lg:pb-32">
        {t.imgs.map((im, i) => <div key={i} className={`aspect-[3/4] overflow-hidden ${off[i]}`}><Img img={im} data-parallax className="h-[115%] w-full" /></div>)}
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
