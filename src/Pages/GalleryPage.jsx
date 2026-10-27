import { Link } from "react-router-dom";
import { galleryPage as g } from "../data/gallery";
import { usePageMeta } from "../lib/meta";
import { useGallery } from "../lib/useGallery";
import Img from "../components/Img";
import GalleryBrowser from "../components/GalleryBrowser";
import GalleryShowcase from "../components/GalleryShowcase";

const wrap = "mx-auto max-w-[1440px] px-6 lg:px-12";

export default function GalleryPage() {
  usePageMeta(g.meta.title, g.meta.description);
  const data = useGallery();

  return (
    <>
      <section id="top" className="relative flex h-[84svh] min-h-[560px] items-end overflow-hidden bg-forest text-ivory">
        <Img img={{ src: g.hero.src, alt: g.hero.alt, w: g.hero.width, h: g.hero.height, focus: g.hero.focus }} eager data-hero-img className="absolute inset-0 size-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/25 to-charcoal/15" aria-hidden />
        <div className={`relative w-full ${wrap} pb-20 lg:pb-24`}>
          <p data-hero className="mb-5 text-xs tracking-[0.3em]">THE MODARO GALLERY</p>
          <h1 data-hero className="max-w-4xl text-[clamp(2.9rem,8vw,7rem)]">A closer look at your escape.</h1>
          <p data-hero className="mt-6 max-w-lg text-base text-ivory/90 sm:text-lg">Explore the spaces, surroundings, and details that make Villa Modaro.</p>
          <a data-hero href="#collection" className="mt-8 inline-flex min-h-[44px] items-center gap-3 text-sm tracking-wide hover:text-brass">View the photographs<span aria-hidden className="h-px w-12 bg-current" /></a>
        </div>
      </section>

      {data.status === "loading" && (
        <div className={`${wrap} grid gap-6 py-20 sm:grid-cols-2 lg:grid-cols-3`} aria-busy="true">
          {[0, 1, 2].map((k) => <div key={k} className="aspect-[3/2] animate-pulse bg-olive/20" />)}
        </div>
      )}
      {data.status === "error" && (
        <div role="alert" className={`${wrap} py-24 text-center`}>
          <p>The gallery could not be loaded.</p>
          <button onClick={data.reload} className="btn mt-4 border border-charcoal hover:bg-charcoal hover:text-ivory">Try again</button>
        </div>
      )}
      {data.status === "loaded" && <GalleryShowcase images={data.images} categories={data.categories} />}
      {data.status === "loaded" && <GalleryBrowser data={data} />}

      <section className={`${wrap} pb-28 lg:pb-40`}>
        <div data-reveal className="max-w-2xl border-t border-charcoal/20 pt-12">
          <h2 className="h2">Found your favourite corner?</h2>
          <p className="mt-6">Take the next step towards your time at Villa Modaro.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/the-villa" className="btn bg-forest text-ivory hover:bg-charcoal">Explore the Villa</Link>
          </div>
        </div>
      </section>
    </>
  );
}
