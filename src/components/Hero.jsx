import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Video from "../assets/Modero.mp4";
import entryPoster from "../assets/HouseEntryIMG/1 (2).png";
export default function Hero() {
  const video = useRef(null);
  const [muted, setMuted] = useState(true);
  const [audioError, setAudioError] = useState("");
  const toggleAudio = async () => {
    const media = video.current;
    if (!media) return;
    setAudioError("");
    media.muted = !media.muted;
    setMuted(media.muted);
    if (!media.muted) {
      try { await media.play(); }
      catch { media.muted = true; setMuted(true); setAudioError("Playback unavailable. Please try again."); }
    }
  };
  return (
    <section id="top" className="relative flex h-auto min-h-[max(100svh,680px)] items-end overflow-hidden bg-forest text-ivory">
      <video ref={video} src={Video} poster={entryPoster} autoPlay muted={muted} loop playsInline onVolumeChange={() => setMuted(video.current?.muted ?? true)} className="absolute inset-0 h-full w-full object-cover" data-hero-img data-parallax="3" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/65 via-charcoal/40 to-charcoal/15" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-[clamp(8rem,18vh,11rem)] pt-32 lg:px-12">
        <p data-hero className="mb-5 max-w-3xl text-base font-bold leading-7 tracking-[0.08em] text-[#ffd166] [text-shadow:0_2px_5px_rgba(0,0,0,0.95)] sm:text-lg sm:tracking-[0.1em]">Where celebration meets calm, in the heart of the Himalayas</p>
        <h1 data-hero className="max-w-5xl text-[clamp(2.75rem,7vw,6rem)] leading-[1.02] text-ivory [text-shadow:0_3px_18px_rgba(0,0,0,0.8)]">Villa Modaro: Where Celebration Meets Calm</h1>
        <p data-hero className="mt-5 max-w-xl text-sm leading-6 text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.95)] sm:mt-6 sm:text-lg sm:leading-7">Villa Modaro is an oasis of celebration and calm — three bedrooms, one plunge pool, and the pristine Himalayan air near Mohand Forest. Designed for those who seek both joy and rejuvenation.</p>
        <div data-hero className="mt-7 grid w-full max-w-[22rem] grid-cols-2 gap-3 sm:mt-9">
          <a href="#booking" className="btn justify-center whitespace-nowrap border border-white/80 bg-transparent px-3 text-center text-white transition-colors hover:bg-white/15">Book Now</a>
          <a href="/the-villa" className="btn justify-center whitespace-nowrap border border-white/80 bg-transparent px-3 text-center text-white transition-colors hover:bg-white/15">Explore the Villa</a>
        </div>
      </div>
      {/* <figure className="absolute bottom-28 right-6 hidden w-56 border border-ivory/35 bg-charcoal/25 p-2 backdrop-blur-sm lg:block xl:right-12"><div className="aspect-[4/3] overflow-hidden"><img src={poolside} alt="Shaded seating beside the villa pool" width="1536" height="1024" className="size-full object-cover" /></div><figcaption className="flex items-center justify-between px-1 pt-2 text-[10px] uppercase tracking-[0.18em] text-ivory/75"><span>Poolside living</span><span className="text-brass">01</span></figcaption></figure> */}
      <div className="absolute bottom-7 left-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-ivory/70 lg:left-12"><span className="h-px w-10 bg-brass" /> A private retreat near Mohand Forest</div>
      <div className="absolute bottom-8 right-6 z-10 flex flex-col items-end gap-2 lg:right-12">
        <button type="button" onClick={toggleAudio} aria-label={muted ? "Play video audio" : "Mute video audio"} aria-pressed={!muted} className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-ivory/40 bg-forest/65 py-4 pl-4 pr-6 text-xs tracking-[0.12em] text-ivory shadow-lg backdrop-blur-md transition-colors hover:border-brass hover:bg-forest">
          <span className="grid size-8 place-items-center rounded-full bg-brass text-charcoal">{muted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}</span>
          {muted ? "PLAY AUDIO" : "MUTE AUDIO"}
        </button>
        <span role="status" className="text-xs text-ivory">{audioError}</span>
      </div>
      <a href="#villa" aria-label="Scroll to the villa" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] sm:flex">
        SCROLL<span className="h-10 w-px bg-ivory/70" />
      </a>
    </section>
  );
}
