// Nav.jsx — Enhanced luxury navigation
// Inspired by: Four Seasons (transparent→white on scroll) + Roseate Hotels (elegant typography)
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { site } from "../data/site";
import L from "./NavLink";
import Logo from ".././assets/ModeroLogo.png";

// Extended nav with Dining anchor added
const navLinks = [
  ["The Villa", "/the-villa"],
  ["Our Story", "/our-story"],
  ["Experiences", "/experiences"],
  ["Celebrations", "/celebrations"],
  ["Gallery", "/gallery"],
];

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
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const open = () => {
    previousOverflow.current = document.body.style.overflow;
    dlg.current.showModal();
    document.body.style.overflow = "hidden";
  };
  const close = () => dlg.current.close();

  const linkCls = "min-h-[44px] inline-flex items-center text-sm tracking-wide hover:text-brass transition-colors duration-200";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid
          ? "bg-[#f1ece2] text-[#183b32] shadow-[0_1px_0_rgba(24,59,50,0.12)] backdrop-blur-sm"
          : "bg-[#f1ece2] text-[#183b32]"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-6 lg:px-12"
      >
        {/* Logo */}
        <L
          to="/"
          aria-label="Villa Modaro home"
          className="flex h-18 w-28 shrink-0 items-center justify-center overflow-hidden"
        >
          <img
            src={Logo}
            alt="Villa Modaro Luxury Stay"
            width="500"
            height="500"
            className="h-28 w-28 max-w-none object-contain"
          />
        </L>

        {/* Desktop links */}
        <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
          <li>
            <L
              to="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={`${linkCls} ${pathname === "/" ? "text-brass" : ""}`}
            >
              Home
            </L>
          </li>
          {navLinks.map(([l, h]) => (
            <li key={h}>
              <L
                to={h}
                aria-current={pathname === h ? "page" : undefined}
                className={`${linkCls} ${pathname === h ? "text-brass" : ""}`}
              >
                {l}
              </L>
            </li>
          ))}
          {/* Dining anchor — scrolls to dining section on homepage */}
          <li>
            <a
              href="/#dining"
              className={`${linkCls} ${pathname === "/" ? "" : "opacity-80"}`}
            >
              Dining
            </a>
          </li>
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="/booking"
            className="btn btn-shimmer min-h-[40px] px-7 text-xs tracking-widest shadow-md"
          >
            Book Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={open}
          aria-label="Open menu"
          className="grid size-11 place-items-center lg:hidden"
        >
          <Menu />
        </button>
      </nav>

      {/* ---- Mobile fullscreen menu ---- */}
      <dialog
        ref={dlg}
        aria-label="Mobile navigation menu"
        data-lenis-prevent
        onClose={unlock}
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-forest p-0 text-ivory"
      >
        {/* Mobile menu header */}
        <div className="flex h-18 items-center justify-between px-6 border-b border-ivory/10">
          <L
            to="/"
            onClick={close}
            aria-label="Villa Modaro home"
            className="flex h-18 w-28 items-center justify-center overflow-hidden"
          >
            <img
              src={Logo}
              alt="Villa Modaro"
              width="500"
              height="500"
              className="h-28 w-28 max-w-none object-contain"
            />
          </L>
          <button
            onClick={close}
            aria-label="Close menu"
            className="grid size-11 place-items-center"
          >
            <X />
          </button>
        </div>

        {/* Mobile links */}
        <ul className="px-6 pt-6">
          <li className="border-b border-ivory/10">
            <L
              to="/"
              onClick={close}
              aria-current={pathname === "/" ? "page" : undefined}
              className={`block py-4 font-display text-3xl tracking-wide ${pathname === "/" ? "text-brass" : ""}`}
            >
              Home
            </L>
          </li>
          {navLinks.map(([l, h]) => (
            <li key={h} className="border-b border-ivory/10">
              <L
                to={h}
                onClick={close}
                aria-current={pathname === h ? "page" : undefined}
                className={`block py-4 font-display text-3xl tracking-wide ${
                  pathname === h ? "text-brass" : ""
                }`}
              >
                {l}
              </L>
            </li>
          ))}
          <li className="border-b border-ivory/10">
            <a
              href="/#dining"
              onClick={close}
              className="block py-4 font-display text-3xl tracking-wide"
            >
              Dining
            </a>
          </li>
          <li className="pt-8">
            <a
              href="/booking"
              onClick={close}
              className="btn btn-shimmer inline-flex w-full justify-center py-4 text-xs tracking-widest"
            >
              Book Your Stay
            </a>
          </li>
        </ul>

        {/* Mobile menu footer */}
        <div className="absolute bottom-8 left-6 right-6">
          <p className="kicker-lux text-ivory/40">Near Mohand Forest, Uttarakhand</p>
        </div>
      </dialog>
    </header>
  );
}
