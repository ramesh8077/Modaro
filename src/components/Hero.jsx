import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Video from ".././assets/Modero.mp4"
import entryPoster from "../assets/HouseEntryIMG/1 (2).png";
import poolside from "../assets/OutdoorIMG/2 (1).png";
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
    <section id="top" className="relative flex h-svh min-h-150 items-end overflow-hidden bg-forest text-ivory">
      <video ref={video} src={Video} poster={entryPoster} autoPlay muted={muted} loop playsInline onVolumeChange={() => setMuted(video.current?.muted ?? true)} className="absolute inset-0 h-full w-full object-cover" data-hero-img data-parallax="3" />
      <div className="absolute inset-0 bg-charcoal/45" aria-hidden />
      <div className="relative mx-auto w-full max-w-360 px-6 pb-24 lg:px-12 lg:pb-28">
        <p data-hero className="mb-5 text-xs tracking-[0.3em]">VILLA MODARO · THE LUXURY STAY</p>
        <h1 data-hero className="text-[clamp(2rem,8.5vw,6rem)]">Where celebration<br />meets calm.</h1>
        <p data-hero className="mt-6 max-w-md text-base text-ivory/90 sm:text-lg">A private escape for meaningful gatherings, poolside afternoons, and moments close to nature.</p>
        <div data-hero className="mt-9 flex flex-wrap gap-3">
          <a href="#villa" className="btn bg-brass text-charcoal hover:bg-ivory">Explore the Villa</a>
          <a href="/booking" className="btn border border-ivory/70 hover:bg-ivory hover:text-charcoal">Plan Your Stay</a>
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
