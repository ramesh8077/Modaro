import { Location as LocationSection } from "../components/Sections";
import { usePageMeta } from "../lib/meta";
import { homeSite } from "../data/home";
import Img from "../components/Img";

export default function LocationPage() {
  usePageMeta(
    "Location | Villa Modaro",
    "Find Villa Modaro along the Balupur–Paonta Sahib Expressway, near Mohand Forest."
  );

  return (
    <>
      {/* Dedicated location hero with existing Villa Modaro photography. */}
      <section className="relative flex min-h-[560px] h-[72svh] max-h-[900px] items-end overflow-hidden bg-forest text-ivory" aria-labelledby="location-page-heading">
        <Img
          img={{ ...homeSite.images.villaMain, alt: "Villa Modaro entrance and landscaped grounds" }}
          eager
          data-hero-img
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/10" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-16 lg:px-12 lg:pb-20">
          <p className="mb-4 text-xs tracking-[0.3em] text-brass">BALUPUR–PAONTA SAHIB EXPRESSWAY</p>
          <h1 id="location-page-heading" className="max-w-4xl font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.98] text-ivory">Find your way<br className="hidden sm:block" /> to Villa Modaro.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg">A secluded stay near Mohand Forest, with an easy road approach.</p>
        </div>
      </section>
      <LocationSection />
    </>
  );
}
