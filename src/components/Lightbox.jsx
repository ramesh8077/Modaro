import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Shared image viewer. items: [{ id, src, thumb?, alt, caption?, property?, w, h }]. index: number | null (open when not null).
export default function Lightbox({ items, index, onIndex, onClose, thumbs = false, label = "Image viewer" }) {
  const dlg = useRef(null), from = useRef(null), start = useRef(null), strip = useRef(null);
  const [status, setStatus] = useState("loading");
  const open = index != null, n = items.length, it = open ? items[index] : null;
  const go = (d) => onIndex((index + d + n) % n);

  useEffect(() => {
    const d = dlg.current;
    if (open && !d.open) { from.current = document.activeElement; d.showModal(); document.body.style.overflow = "hidden"; }
    if (!open && d.open) d.close();
  }, [open]);
  useEffect(() => { // route change / unmount while open: release scroll lock and top layer
    const d = dlg.current;
    return () => { document.body.style.overflow = ""; if (d?.open) d.close(); };
  }, []);
  useEffect(() => { setStatus(it?.src ? "loading" : "empty"); }, [it?.src, index]);
  useEffect(() => { // preload only the neighbours
    if (!open) return;
    [1, -1].forEach((k) => { const x = items[(index + k + n) % n]; if (x?.src) new Image().src = x.src; });
  }, [open, index, items, n]);
  useEffect(() => {
    if (open && thumbs) strip.current?.querySelector('[aria-current="true"]')?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [open, index, thumbs]);

  const closed = () => { document.body.style.overflow = ""; if (from.current?.isConnected) from.current.focus(); onClose(); };
  const key = (e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
  const down = (e) => { if (e.pointerType !== "mouse") start.current = { x: e.clientX, y: e.clientY }; };
  const up = (e) => {
    const s = start.current; start.current = null;
    if (!s) return;
    const dx = e.clientX - s.x, dy = e.clientY - s.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  };
  const ctl = "grid size-11 shrink-0 place-items-center bg-charcoal/10 text-charcoal transition-colors hover:bg-charcoal/20";

  return (
    <dialog ref={dlg} onClose={closed} onKeyDown={key} aria-label={label} data-lenis-prevent
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-ivory p-0 text-charcoal">
      {open && (
        <div className="flex h-full flex-col p-3 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 text-sm">
              <p aria-live="polite" className="tracking-widest">{index + 1} / {n}</p>
              {(it.property || it.caption) && <p className="mt-1 break-words text-charcoal/70">{[it.property, it.caption].filter(Boolean).join(" · ")}</p>}
            </div>
            <button onClick={() => dlg.current.close()} aria-label="Close viewer" className={ctl}><X /></button>
          </div>
          <div onPointerDown={down} onPointerUp={up} onPointerCancel={() => (start.current = null)}
            className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center py-3">
            {n > 1 && <button onClick={() => go(-1)} aria-label="Previous image" className={`${ctl} absolute left-0 z-10`}><ChevronLeft /></button>}
            {it.src ? (
              <img key={it.src} src={it.src} alt={it.alt} width={it.w} height={it.h} draggable={false}
                onLoad={() => setStatus("ready")} onError={() => setStatus("error")}
                className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${status === "ready" ? "opacity-100" : "opacity-0"}`} />
            ) : (
              <div role="img" aria-label={it.alt} style={{ aspectRatio: `${it.w} / ${it.h}` }} className="h-full max-w-full bg-olive/15" />
            )}
            {status === "error" && <p role="alert" className="absolute text-sm">This photo could not be loaded.</p>}
            {n > 1 && <button onClick={() => go(1)} aria-label="Next image" className={`${ctl} absolute right-0 z-10`}><ChevronRight /></button>}
          </div>
          {thumbs && n > 1 && (
            <ul ref={strip} className="flex gap-2 overflow-x-auto pb-1">
              {items.map((x, k) => (
                <li key={x.id} className="shrink-0">
                  <button onClick={() => onIndex(k)} aria-label={`Show image ${k + 1}: ${x.alt}`} aria-current={k === index} className={`block h-12 w-16 overflow-hidden border-2 ${k === index ? "border-brass" : "border-transparent opacity-70 hover:opacity-100"}`}>
                    {x.thumb ? <img src={x.thumb} alt="" loading="lazy" className="size-full object-cover" /> : <span className="block size-full bg-olive/20" />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </dialog>
  );
}