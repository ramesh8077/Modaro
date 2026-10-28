// Footer.jsx — Luxury 4-column footer
import { site } from "../data/site";
import Logo from "../assets/ModeroLogo.png";
import L from "./NavLink";

const EMAIL = "modarotheluxuryvilla@gmail.com";

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

export default function Footer() {
  const { phone, instagram, whatsapp } = site.contact;
  const email = EMAIL;
  const year = new Date().getFullYear();

  const socials = [
    instagram && { href: instagram, label: "Instagram", icon: "📷" },
    whatsapp && { href: whatsapp, label: "WhatsApp", icon: "💬" },
    email && { href: `mailto:${email}`, label: "Email", icon: "✉️" },
    phone && { href: `tel:${phone}`, label: phone, icon: "📞" },
  ].filter(Boolean);

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

            {socials.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {socials.map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-ivory/15 px-4 text-xs text-ivory/70 transition-all hover:border-brass hover:text-brass"
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <span aria-hidden="true">{icon}</span>
                    {label}
                  </a>
                ))}
              </div>
            )}

            <a href="/booking" className="btn mt-6 inline-flex border border-ivory/30 text-ivory hover:border-brass hover:text-brass">
              Book Now
            </a>
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
              {phone && (
                <a href={`tel:${phone}`} className="flex min-h-[36px] items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-brass">
                  📞 {phone}
                </a>
              )}
              <a href={`mailto:${email}`} className="flex min-h-[36px] items-center gap-2 break-all text-sm text-ivory/70 transition-colors hover:text-brass">
                ✉️ {email}
              </a>
              {whatsapp && (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-[36px] items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-brass">
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