import { usePageMeta } from "../lib/meta";
import { homeSite } from "../data/home";
import Img from "../components/Img";

const wrap = "mx-auto max-w-[1440px] px-6 lg:px-12";

const points = [
  { n: "01", title: "Easy to reach", text: "Balupur–Paonta Sahib Expressway" },
  { n: "02", title: "Close to nature", text: "Mohand Forest nearby" },
  { n: "03", title: "Room to retreat", text: "A peaceful setting set apart" },
];

export default function LocationPage() {
  usePageMeta(
    "Location | Villa Modaro",
    "Find Villa Modaro along the Balupur–Paonta Sahib Expressway, near Mohand Forest."
  );

  const photo = { ...homeSite.images.villaMain, alt: "Villa Modaro entrance and landscaped grounds" };

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[72svh] min-h-[520px] max-h-[860px] items-end overflow-hidden bg-forest text-ivory" aria-labelledby="location-page-heading">
        <Img img={photo} eager data-hero-img className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/45 to-charcoal/15" aria-hidden="true" />
        <div className={`relative w-full ${wrap} pb-14 lg:pb-20`}>
          <p className="mb-5 inline-block bg-black/60 px-4 py-2 text-sm font-semibold tracking-[0.2em] text-white backdrop-blur-sm [text-shadow:0_1px_8px_rgba(0,0,0,.8)] sm:text-base">
            <span className="text-brass">BALUPUR–PAONTA SAHIB</span> EXPRESSWAY
          </p>
          <h1 id="location-page-heading" className="max-w-4xl font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.02] text-ivory [text-shadow:0_2px_16px_rgba(0,0,0,.5)]">
            Find your way to Villa Modaro.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
            A secluded stay near Mohand Forest, with an easy road approach.
          </p>
        </div>
      </section>

      {/* Intro: image + text */}
      <section id="find-us" className="bg-ivory text-charcoal">
        <div className={`${wrap} py-16 lg:py-24`}>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-charcoal/15 pb-4 text-[11px] uppercase tracking-[0.25em] text-charcoal/60">
            <span>Find your way here</span>
            <span>Accessible by road · Close to nature</span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/6]">
              <Img img={photo} className="size-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/65 to-transparent p-6 pt-28 sm:p-8 sm:pt-32">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass [text-shadow:0_2px_10px_rgba(0,0,0,.9)] sm:text-sm">
                  A quiet place, within reach
                </p>
                <p className="mt-2 font-display text-3xl font-semibold leading-tight text-white [text-shadow:0_3px_18px_rgba(0,0,0,.95)] sm:text-4xl lg:text-5xl">
                  Near Mohand Forest
                </p>
                <span aria-hidden="true" className="mt-4 block h-0.5 w-16 bg-brass" />
              </div>
            </div>

            <div>
              <h2 className="font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05]">
                A little away.
                <br />
                Easy to find.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-charcoal/80 sm:text-lg">
                Villa Modaro sits along the Balupur–Paonta Sahib Expressway, near Mohand Forest. Reach us by road, then settle into a secluded setting for stays, celebrations and time together.
              </p>

              <p className="mt-8 text-sm leading-7 tracking-wide text-charcoal/70">
                <span className="block uppercase tracking-[0.18em]">Balupur–Paonta Sahib Expressway</span>
                <span className="block uppercase tracking-[0.18em]">Near Mohand Forest Trail</span>
              </p>

              <a href="#enquiry" className="btn mt-8 inline-flex bg-brass text-charcoal hover:bg-charcoal hover:text-ivory">
                Ask about availability
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-white text-charcoal">
        <div className={`${wrap} py-14 lg:py-20`}>
          <ul className="grid gap-6 md:grid-cols-3">
            {points.map((p) => (
              <li key={p.n} className="border border-charcoal/15 bg-ivory p-7 lg:p-8">
                <span className="text-xs tracking-[0.25em] text-brass">{p.n}</span>
                <h3 className="mt-4 font-display text-2xl leading-tight sm:text-3xl">{p.title}</h3>
                <p className="mt-3 text-base leading-7 text-charcoal/75">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}