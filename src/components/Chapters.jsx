import Img from "./Img";
import { homeSite as site } from "../data/home";
// Desktop: pinned crossfade (see lib/motion.js). Mobile / reduced motion: plain vertical stack.
export default function Chapters() {
  return (
    <section aria-label="Three ways to spend your time" data-pin className="relative overflow-hidden bg-ivory">
      {site.chapters.map((c, i) => (
        <article key={c.title} data-chapter className="mx-auto grid max-w-[1440px] gap-8 px-6 py-16 lg:h-full lg:grid-cols-12 lg:items-center lg:px-12 lg:py-0">
          <div className="aspect-[7/5] overflow-hidden [perspective:1100px] lg:col-span-7"><div data-photo className="size-full"><Img img={c.img} className="size-full" /></div><p className="mt-3 text-xs uppercase tracking-[0.2em] text-olive">0{i + 1} · Villa Modaro moments</p></div>
          <div className="relative lg:col-span-4 lg:col-start-9">
            <span aria-hidden className="pointer-events-none absolute -left-2 -top-16 font-display text-[9rem] leading-none text-olive/20">{i + 1}</span>
            <h2 className="h2 relative">{c.title}</h2>
            <p className="relative mt-5 max-w-sm">{c.text}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
