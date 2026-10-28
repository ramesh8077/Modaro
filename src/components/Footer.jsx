// Footer.jsx — Luxury 4-column footer
import { site } from "../data/site";
import Logo from "../assets/ModeroLogo.png";
import L from "./NavLink";

const EMAIL = "modarotheluxuryvilla@gmail.com";
const PHONE_LABEL = "+91 93117 44444";
const PHONE_HREF = "tel:+919311744444";
const INSTAGRAM = "https://www.instagram.com/modaro__theluxurystay";

// Address yahan ek jagah edit karo. Pura/sahi address mile toh bas ye lines badal do.
const ADDRESS_LINES = [
  "Villa Modaro",
  "Balupur–Paonta Sahib Expressway",
  "Near Mohand Forest Trail",
  "Uttarakhand, India",
];
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Villa Modaro, Balupur–Paonta Sahib Expressway, Near Mohand Forest")}`;

const EXPLORE = [
  ["Home", "/"],
  ["The Villa", "/the-villa"],
  ["Rooms", "/rooms"],
  ["Amenities", "/amenities"],
  ["Gallery", "/gallery"],
  ["Location", "/location"],
];

const YOUR_STAY = [
  ["Check Availability", "/booking"],
  ["Book Your Stay", "/booking"],
  ["Enquire Now", "/#enquiry"],
  ["Find Us", "/location"],
];

const linkCls = "inline-flex min-h-[36px] items-center text-sm text-ivory/70 transition-colors hover:text-brass";
const contactCls = "flex min-h-[36px] items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-brass";

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const { whatsapp } = site.contact;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-ivory">
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent 0%, #B69A68 30%, #B69A68 70%, transparent 100%)" }}
        aria-hidden
      />

      <div className="container-lux py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-10">

          {/* Col 1 — Brand */}
          <div>
            <L to="/" aria-label="Villa Modaro home" className="mb-3 inline-flex items-center justify-center">
              <img src={Logo} alt="Villa Modaro Luxury Stay" width="500" height="500" className="h-28 w-28 object-contain brightness-0 invert" />
            </L>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/70">
              An oasis of celebration and calm near Mohand Forest — designed for those who seek both joy and rejuvenation.
            </p>
          </div>

          {/* Col 2 — Explore (thoda right me) */}
          <nav aria-label="Footer navigation — pages" className="lg:pl-10">
            <p className="kicker-lux mb-5 text-ivory/40">EXPLORE</p>
            <ul className="space-y-2">
              {EXPLORE.map(([label, href]) => (
                <li key={label}>
                  <L to={href} className={linkCls}>{label}</L>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 — Your stay */}
          <nav aria-label="Footer navigation — your stay">
            <p className="kicker-lux mb-5 text-ivory/40">YOUR STAY</p>
            <ul className="space-y-2">
              {YOUR_STAY.map(([label, href]) => (
                <li key={label}>
                  <L to={href} className={linkCls}>{label}</L>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4 — Find us */}
          <div>
            <p className="kicker-lux mb-5 text-ivory/40">FIND US</p>
            <address className="not-italic">
              <p className="text-sm leading-7 text-ivory/70">
                {ADDRESS_LINES.map((line, i) => (
                  <span key={line} className={i === 0 ? "block font-medium text-ivory" : "block"}>{line}</span>
                ))}
              </p>
            </address>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[36px] items-center gap-2 text-sm text-brass underline-offset-4 hover:underline"
            >
              📍 Get Directions
            </a>

            <div className="mt-3 space-y-1">
              <a href={PHONE_HREF} aria-label={`Call ${PHONE_LABEL}`} className={contactCls}>
                📞 {PHONE_LABEL}
              </a>
              <a href={`mailto:${EMAIL}`} className={`${contactCls} break-all`}>
                ✉️ {EMAIL}
              </a>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={contactCls}>
                <InstagramIcon /> @modaro__theluxurystay
              </a>
              {whatsapp && (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={contactCls}>
                  💬 Chat on WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-lux flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-ivory/50">
          <p>© {year} Villa Modaro · All rights reserved.</p>
          <p className="tracking-[0.1em]">Built with love in the Himalayas 🏔️</p>
        </div>
      </div>
    </footer>
  );
}