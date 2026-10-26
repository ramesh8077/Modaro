import entryPoster from "../assets/HouseEntryIMG/1 (2).png";
export default function Hero() {
  return (
    <section id="top" className="relative flex h-svh min-h-150 items-end overflow-hidden bg-forest text-ivory">
      <img src={entryPoster} alt="Villa Modaro surrounded by gardens" className="absolute inset-0 h-full w-full object-cover" data-hero-img data-parallax="3" />
      <div className="absolute inset-0 bg-charcoal/45" aria-hidden />
      <div className="relative mx-auto w-full max-w-360 px-6 pb-72 lg:px-12 lg:pb-80">
        <p data-hero className="mb-5 text-xs tracking-[0.3em] [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]" style={{ color: "#f2d58b" }}>VILLA MODARO · THE LUXURY STAY</p>
        <h1 data-hero className="text-[clamp(2rem,8.5vw,6rem)] [text-shadow:0_3px_18px_rgba(0,0,0,0.8)]" style={{ color: "#f2d58b" }}>Where celebration<br />meets calm.</h1>
        <p data-hero className="mt-6 max-w-md text-base sm:text-lg [text-shadow:0_2px_10px_rgba(0,0,0,0.85)]" style={{ color: "#ffffff" }}>A private escape for meaningful gatherings, poolside afternoons, and moments close to nature.</p>
        <div data-hero className="mt-9 flex flex-wrap gap-3">
          <a href="#villa" className="btn border border-white/80 bg-transparent text-white transition-colors hover:bg-white/15">Explore the Villa</a>
          <a href="/booking" className="btn border border-white/80 bg-transparent text-white transition-colors hover:bg-white/15">Plan Your Stay</a>
        </div>
      </div>
      {/* <figure className="absolute bottom-28 right-6 hidden w-56 border border-ivory/35 bg-charcoal/25 p-2 backdrop-blur-sm lg:block xl:right-12"><div className="aspect-[4/3] overflow-hidden"><img src={poolside} alt="Shaded seating beside the villa pool" width="1536" height="1024" className="size-full object-cover" /></div><figcaption className="flex items-center justify-between px-1 pt-2 text-[10px] uppercase tracking-[0.18em] text-ivory/75"><span>Poolside living</span><span className="text-brass">01</span></figcaption></figure> */}
      <div className="absolute bottom-7 left-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-ivory/70 lg:left-12"><span className="h-px w-10 bg-brass" /> A private retreat near Mohand Forest</div>
      <a href="#villa" aria-label="Scroll to the villa" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] sm:flex">
        SCROLL<span className="h-10 w-px bg-ivory/70" />
      </a>
    </section>
  );
}
