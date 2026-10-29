// Nav.jsx — Enhanced luxury navigation
// Inspired by: Four Seasons (transparent→white on scroll) + Roseate Hotels (elegant typography)
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import L from "./NavLink";
import Logo from ".././assets/ModeroLogo.png";

// Header navigation contains only the approved pages and existing section anchors.
const navLinks = [
  ["The Villa", "/the-villa"],
  ["Rooms", "/the-villa#bedrooms"],
  ["Amenities", "/amenities"],
  ["Gallery", "/gallery"],
];

// Enquire button ka destination. Jo page actually exist karta ho wahi rakho
// (e.g. "/contact" ya "/booking" agar route bana liya hai).
const ENQUIRE_PATH = "/booking";

// Green CTA (header + mobile menu). Shade badalni ho toh yahan change karo.
const GREEN = "#2f8f5b";
const GREEN_HOVER = "#247549";
const greenStyle = { backgroundColor: GREEN, color: "#ffffff", border: "none" };
const greenHover = {
  onMouseEnter: (e) => (e.currentTarget.style.backgroundColor = GREEN_HOVER),
  onMouseLeave: (e) => (e.currentTarget.style.backgroundColor = GREEN),
};
const enquireBtn =
  "inline-flex items-center justify-center font-semibold shadow-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const dlg = useRef(null);
  const previousOverflow = useRef(null);
  const unlock = () => {
    if (previousOverflow.current === null) return;
    document.body.style.overflow = previousOverflow.current;
    previousOverflow.current = null;
  };
  const { pathname, hash } = useLocation();
  const isActive = (to) => {
    const [route, section] = to.split("#");
    return pathname === route && (!section || hash === `#${section}`);
  };
  useEffect(() => {
    dlg.current?.close();
    unlock();
    return unlock;
  }, [pathname]);
  useEffect(() => {
    const f = () => {
      const y = window.scrollY;
      setSolid(y > 40);
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, [pathname]);
  const open = () => {
    previousOverflow.current = document.body.style.overflow;
    dlg.current.showModal();
    document.body.style.overflow = "hidden";
  };
  const close = () => dlg.current.close();

  const linkCls = `min-h-[44px] inline-flex items-center text-sm tracking-wide transition-colors duration-200 ${solid ? "hover:text-brass" : "text-white hover:text-white/80"}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid
          ? "bg-ivory text-forest shadow-[0_1px_0_rgba(24,59,50,0.12)] backdrop-blur-sm"
          : "bg-transparent text-white"
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
            alt="Modaro Luxury Stay"
            width="500"
            height="500"
            className={`h-16 w-16 max-w-full object-contain ${solid ? "" : "brightness-0 invert"}`}
          />
        </L>

        {/* Desktop links */}
        <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
          <li>
            <L
              to="/"
              aria-current={pathname === "/" && !hash ? "page" : undefined}
              className={`${linkCls} ${pathname === "/" && !hash ? (solid ? "text-brass" : "text-white") : ""}`}
            >
              Home
            </L>
          </li>
          {navLinks.map(([l, h]) => (
            <li key={h}>
              <L
                to={h}
                aria-current={isActive(h) ? "page" : undefined}
                className={`${linkCls} ${isActive(h) ? (solid ? "text-brass" : "text-white") : ""}`}
              >
                {l}
              </L>
            </li>
          ))}
          <li>
            <L to="/location" aria-current={isActive("/location") ? "page" : undefined} className={`${linkCls} ${isActive("/location") ? (solid ? "text-brass" : "text-white") : solid ? "" : "text-white"}`}>
              Location
            </L>
          </li>
        </ul>

        {/* Desktop CTA — green */}
        <div className="hidden items-center gap-4 lg:flex">
          <L
            to={ENQUIRE_PATH}
            style={greenStyle}
            {...greenHover}
            className={`${enquireBtn} min-h-[40px] px-7 text-xs tracking-widest`}
          >
            Enquire Now
          </L>
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
              alt="Modaro Luxury Stay"
              width="500"
              height="500"
              className="h-16 w-16 max-w-full object-contain"
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
              aria-current={pathname === "/" && !hash ? "page" : undefined}
              className={`block py-4 font-display text-3xl tracking-wide ${pathname === "/" && !hash ? "text-brass" : ""}`}
            >
              Home
            </L>
          </li>
          {navLinks.map(([l, h]) => (
            <li key={h} className="border-b border-ivory/10">
              <L
                to={h}
                onClick={close}
                aria-current={isActive(h) ? "page" : undefined}
                className={`block py-4 font-display text-3xl tracking-wide ${
                  isActive(h) ? "text-brass" : ""
                }`}
              >
                {l}
              </L>
            </li>
          ))}
          <li className="border-b border-ivory/10">
            <L to="/location" onClick={close} aria-current={isActive("/location") ? "page" : undefined} className={`block py-4 font-display text-3xl tracking-wide ${isActive("/location") ? "text-brass" : ""}`}>Location</L>
          </li>
          <li className="pt-8">
            <L
              to={ENQUIRE_PATH}
              onClick={close}
              style={greenStyle}
              {...greenHover}
              className={`${enquireBtn} w-full py-4 text-xs tracking-widest`}
            >
              Enquire Now
            </L>
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