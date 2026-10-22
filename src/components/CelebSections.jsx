import Plate from "./Plate";
import { celebrationsPage as c } from "../data/site";
const wrap = "mx-auto max-w-[1440px] px-6 lg:px-12";
const shadow = "0 1px 2px rgba(0,0,0,.2), 0 24px 44px -16px rgba(0,0,0,.55)";

// A layer is positioned/rotated with CSS; GSAP animates the layer (entrance) and its inner shift/scroll wrappers separately.
function Layer({ id, depth, className, children }) {
  return (
    <div data-layer={id} className={`absolute ${className}`}>
      <div data-shift data-depth={depth} className="size-full"><div data-scroll className="size-full">{children}</div></div>
    </div>
  );
}
const Print = ({ img }) => <div className="size-full bg-ivory p-[3%]" style={{ boxShadow: `${shadow}, inset 0 1px 0 rgba(255,255,255,.6)` }}><Plate img={img} eager className="size-full" /></div>;

export function CelebHero() {
  const h = c.hero, v = h.invite;
  return (
    <section id="top" data-hero-root className="relative overflow-hidden bg-forest text-ivory" style={{ backgroundImage: "radial-gradient(ellipse at 72% 42%, rgba(70,110,92,.35), transparent 60%)" }}>
      <div className={`${wrap} grid gap-x-8 gap-y-10 pb-20 pt-32 sm:pt-36 lg:min-h-[82svh] lg:grid-cols-12 lg:pb-24`}>
        <div className="lg:col-span-6 lg:row-start-1 lg:self-end">
          <p data-fade className="mb-6 text-xs tracking-[0.3em] text-brass">{h.label}</p>
          <h1 className="text-[clamp(2.6rem,5.4vw,5.25rem)] leading-[1.02]">
            {h.lines.map((l) => <span key={l} className="block overflow-hidden pb-[0.08em]"><span data-mask className="block">{l}</span></span>)}
          </h1>
        </div>
        {/* invitation composition: perspective on the root, 3D-preserving tilt wrapper, layered prints and card */}
        <div className="mx-auto w-full max-w-[420px] lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:max-w-[560px] lg:self-center [perspective:1400px]">
          <div data-tilt className="relative aspect-[4/5] [transform-style:preserve-3d]">
            <Layer id="a" depth="0.5" className="left-0 top-[4%] w-[46%] aspect-[3/4] rotate-[-6deg]"><Print img={h.photoA} /></Layer>
            <Layer id="b" depth="0.7" className="bottom-[2%] right-0 w-[54%] aspect-[4/3] rotate-[5deg]"><Print img={h.photoB} /></Layer>
            <Layer id="card" depth="1.2" className="left-[19%] top-[10%] w-[62%] aspect-[4/5] rotate-[-1.5deg]">
              <div className="relative size-full bg-ivory p-[6%] text-charcoal" style={{ boxShadow: `${shadow}, inset 0 1px 0 rgba(255,255,255,.8)` }}>
                <div className="absolute inset-[4%] border border-brass/70" aria-hidden />
                <div className="relative flex h-full flex-col items-center justify-between py-[10%] text-center">
                  <p className="text-[9px] tracking-[0.35em] sm:text-[10px]">{v.kicker}</p>
                  <span aria-hidden className="grid aspect-square w-[34%] place-items-center rounded-full border border-brass font-display text-[clamp(2rem,4vw,3.25rem)] leading-none text-forest">{v.monogram}</span>
                  <p className="font-display text-[clamp(1.1rem,2.2vw,1.75rem)] leading-tight">{v.line}</p>
                  <p className="text-[9px] tracking-[0.35em] sm:text-[10px]">{v.name}</p>
                </div>
              </div>
            </Layer>
          </div>
        </div>
        <div className="lg:col-span-5 lg:row-start-2 lg:self-start">
          <p data-fade className="max-w-md text-base text-ivory/90 sm:text-lg">{h.text}</p>
          <div data-fade className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href="#enquiry" className="btn bg-brass text-charcoal hover:bg-ivory">Plan Your Celebration</a>
            <a href="#occasions" className="inline-flex min-h-[44px] items-center gap-3 text-sm tracking-wide underline-offset-8 hover:text-brass hover:underline">Discover the Occasions</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Desktop: sticky stage (pinned briefly by lib/celebMotion.js). Mobile / reduced motion: three stacked sections.
export function Stage() {
  return (
    <section id="occasions" data-stage aria-labelledby="stage-h" className="relative overflow-hidden bg-forest text-ivory">
      <h2 id="stage-h" className="sr-only">Every occasion, its own atmosphere</h2>
      {c.chapters.map((x, i) => (
        <article key={x.n} data-ch data-tone={x.tone} style={{ background: x.tone }} className="w-full">
          <div className={`${wrap} grid items-center gap-10 py-20 lg:h-full lg:grid-cols-12 lg:gap-8 lg:py-0`}>
            <div className="lg:col-span-5">
              <p className="text-xs tracking-[0.3em] text-brass">EVERY OCCASION, ITS OWN ATMOSPHERE</p>
              <span data-ch-num aria-hidden className="mt-6 block font-display text-[clamp(4rem,9vw,8rem)] leading-none text-brass/80">{x.n}</span>
              <h3 className="mt-2 overflow-hidden pb-[0.08em] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05]"><span data-ch-title className="block">{x.title}</span></h3>
              <p data-ch-desc className="mt-5 max-w-sm text-ivory/90">{x.text}</p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 [perspective:1400px]">
              <div data-ch-img className="aspect-[5/6] overflow-hidden" style={{ boxShadow: "0 30px 60px -28px rgba(0,0,0,.6)" }}><Plate img={x.img} className="size-full" /></div>
            </div>
          </div>
        </article>
      ))}
      <div data-prog aria-hidden className="absolute bottom-10 left-12 hidden w-64 gap-2">
        {c.chapters.map((x) => <span key={x.n} className="h-px flex-1 bg-ivory/25"><span data-bar className="block h-px origin-left bg-brass" /></span>)}
      </div>
    </section>
  );
}

export function Interlude() {
  const t = c.interlude;
  return (
    <section className="relative overflow-hidden text-ivory" style={{ background: "linear-gradient(180deg,#242824 0%,#183B32 38%,#F5F1E8 100%)" }}>
      <div className={`${wrap} pb-20 pt-24 lg:pb-32 lg:pt-28`}>
        <h2 data-reveal className="h2 max-w-3xl">{t.title}</h2>
        <span data-rule className="mt-8 block h-px w-32 origin-left bg-brass" />
        <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="aspect-[16/10] overflow-hidden lg:col-span-8"><Plate img={t.main} data-drift="30" className="h-[calc(100%+60px)] w-full" /></div>
          <div className="aspect-[4/5] overflow-hidden lg:col-span-3 lg:col-start-10 lg:mt-24"><Plate img={t.a} data-drift="40" className="h-[calc(100%+80px)] w-full" /></div>
          <div className="aspect-square w-3/5 overflow-hidden lg:col-span-3 lg:col-start-3 lg:-mt-16 lg:w-full"><Plate img={t.b} data-drift="20" className="h-[calc(100%+40px)] w-full" /></div>
        </div>
        <p data-reveal className="mt-16 max-w-md text-charcoal lg:ml-[41%]">{t.text}</p>
      </div>
    </section>
  );
}

export function Setting() {
  const [p, g, tg] = c.setting.items;
  const cap = (x) => <figcaption data-reveal className="mt-4 border-t border-charcoal/20 pt-3"><h3 className="text-3xl">{x.title}</h3><p className="mt-1 max-w-xs text-sm">{x.text}</p></figcaption>;
  const fig = (x, box, cls) => <figure className={`group ${cls}`}><div className={`${box} overflow-hidden`}><Plate img={x.img} className="size-full transition-transform duration-300 group-hover:scale-[1.04]" /></div>{cap(x)}</figure>;
  return (
    <section className="bg-ivory">
      <div className={`${wrap} py-20 lg:py-28`}>
        <h2 data-reveal className="h2 max-w-3xl">{c.setting.title}</h2>
        <div className="mt-16 grid gap-x-8 gap-y-20 lg:grid-cols-12">
          {fig(p, "aspect-[3/2]", "lg:col-span-7")}
          {fig(g, "aspect-[4/5]", "lg:col-span-4 lg:col-start-9 lg:mt-32")}
          {fig(tg, "aspect-square", "lg:col-span-5 lg:col-start-3 lg:-mt-24")}
        </div>
      </div>
    </section>
  );
}
