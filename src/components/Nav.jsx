import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { site } from "../data/site";
import L from "./NavLink";
import Logo from ".././assets/ModeroLogo.png"

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const dlg = useRef(null);
  const previousOverflow = useRef(null);
  const unlock = () => {
    if (previousOverflow.current === null) return;
    document.body.style.overflow = previousOverflow.current;
    previousOverflow.current = null;
  };
  const { pathname } = useLocation();
  useEffect(() => {
    dlg.current?.close();
    unlock();
    return unlock;
  }, [pathname]);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const open = () => { previousOverflow.current = document.body.style.overflow; dlg.current.showModal(); document.body.style.overflow = "hidden"; };
  const close = () => dlg.current.close();
  const link = "min-h-[44px] inline-flex items-center text-sm tracking-wide hover:text-brass transition-colors";
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${solid ? "bg-ivory text-charcoal border-b border-charcoal/10" : "text-ivory"}`}>
      <nav aria-label="Main" className="mx-auto flex h-18 max-w-360 items-center justify-between px-6 lg:px-12">
        <L to="/" aria-label="Villa Modaro home" className="flex h-18 w-24 shrink-0 items-center justify-center overflow-hidden">
          <img src={Logo} alt="Modaro Luxury Stay" width="500" height="500" className="h-22 w-22 max-w-none object-contain" />
        </L>
        <ul className="hidden items-center gap-5 lg:flex xl:gap-8">
          <li><L to="/" aria-current={pathname === "/" ? "page" : undefined} className={`${link} ${pathname === "/" ? "text-brass" : ""}`}>Home</L></li>
          {site.nav.map(([l, h]) => <li key={h}><L to={h} aria-current={pathname === h ? "page" : undefined} className={`${link} ${pathname === h ? "text-brass" : ""}`}>{l}</L></li>)}
          <li><a href="#enquiry" className="btn bg-brass text-charcoal hover:bg-ivory">Book Now</a></li>
        </ul>
        <button onClick={open} aria-label="Open menu" className="grid size-11 place-items-center lg:hidden"><Menu /></button>
      </nav>
      <dialog ref={dlg} aria-label="Menu" data-lenis-prevent onClose={unlock}
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-forest p-0 text-ivory">
        <div className="flex h-18 items-center justify-between px-6">
          <L to="/" onClick={close} aria-label="Villa Modaro home" className="flex h-18 w-24 items-center justify-center overflow-hidden"><img src={Logo} alt="Modaro Luxury Stay" width="500" height="500" className="h-22 w-22 max-w-none object-contain" /></L>
          <button onClick={close} aria-label="Close menu" className="grid size-11 place-items-center"><X /></button>
        </div>
        <ul className="px-6 pt-8">
          <li className="border-b border-ivory/15"><L to="/" onClick={close} aria-current={pathname === "/" ? "page" : undefined} className={`block py-4 font-display text-3xl ${pathname === "/" ? "text-brass" : ""}`}>Home</L></li>
          {site.nav.map(([l, h]) => (
            <li key={h} className="border-b border-ivory/15"><L to={h} onClick={close} aria-current={pathname === h ? "page" : undefined} className={`block py-4 font-display text-3xl ${pathname === h ? "text-brass" : ""}`}>{l}</L></li>
          ))}
          <li className="pt-8"><a href="#enquiry" onClick={close} className="btn bg-brass text-charcoal">Enquire</a></li>
        </ul>
      </dialog>
    </header>
  );
}
