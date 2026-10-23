// Footer.jsx — Luxury 4-column footer
// Inspired by: Four Seasons (4-col structure), Roseate Hotels (brand-forward footer)
import { site } from "../data/site";
import L from "./NavLink";

export default function Footer() {
  const { phone, instagram, whatsapp, email } = site.contact;

  const year = new Date().getFullYear();

  // Social links only if configured
  const socials = [
    instagram && { href: instagram, label: "Instagram", icon: "📷" },
    whatsapp && { href: whatsapp, label: "WhatsApp", icon: "💬" },
    email && { href: `mailto:${email}`, label: "Email", icon: "✉️" },
    phone && { href: `tel:${phone}`, label: phone, icon: "📞" },
  ].filter(Boolean);

  return (
    <footer className="bg-[#183b32] text-ivory">
      {/* Gold top border */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #B69A68 30%, #B69A68 70%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* Main footer grid */}
      <div className="container-lux py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Col 1 — Brand */}
          <div>
            <p className="kicker-lux mb-2 text-ivory/40">VILLA MODARO</p>
            <p className="font-display text-4xl tracking-[0.2em] text-ivory">MODARO</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/70">
              Where celebration meets calm — a private retreat near Mohand
              Forest, Uttarakhand.
            </p>

            {/* Social links */}
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

            <a
              href="#booking"
              className="btn mt-6 inline-flex border border-ivory/30 text-ivory hover:border-brass hover:text-brass"
            >
              Check availability
            </a>
          </div>

          {/* Col 2 — Quick links */}
          <nav aria-label="Footer navigation — pages">
            <p className="kicker-lux mb-5 text-ivory/40">EXPLORE</p>
            <ul className="space-y-2">
              {[["Home", "/"], ...site.nav].map(([label, href]) => (
                <li key={href}>
                  <L
                    to={href}
                    className="inline-flex min-h-[36px] items-center text-sm text-ivory/70 transition-colors hover:text-brass"
                  >
                    {label}
                  </L>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 — Experiences */}
          <nav aria-label="Footer navigation — experiences">
            <p className="kicker-lux mb-5 text-ivory/40">EXPERIENCES</p>
            <ul className="space-y-2">
              {[
                ["Poolside Living", "#villa"],
                ["Gardens & Nature", "#experiences"],
                ["Celebrations", "/celebrations"],
                ["Dining", "#dining"],
                ["Gallery", "/gallery"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-flex min-h-[36px] items-center text-sm text-ivory/70 transition-colors hover:text-brass"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4 — Contact */}
          <div>
            <p className="kicker-lux mb-5 text-ivory/40">FIND US</p>
            <address className="not-italic">
              <p className="text-sm leading-relaxed text-ivory/70">
                Balupur–Paonta Sahib Expressway
                <br />
                Near Mohand Forest Reserve
                <br />
                Uttarakhand, India
              </p>
            </address>

            {phone && (
              <a
                href={`tel:${phone}`}
                className="mt-4 inline-flex min-h-[36px] items-center gap-2 text-sm text-ivory/70 hover:text-brass transition-colors"
              >
                📞 {phone}
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="mt-2 flex min-h-[36px] items-center gap-2 text-sm text-ivory/70 hover:text-brass transition-colors"
              >
                ✉️ {email}
              </a>
            )}
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex min-h-[36px] items-center gap-2 text-sm text-ivory/70 hover:text-brass transition-colors"
              >
                💬 Chat on WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/10">
        <div className="container-lux flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-ivory/50">
          <p>© {year} Villa Modaro · All rights reserved.</p>
          <p className="tracking-[0.1em]">
            Built with love in the Himalayas 🏔️
          </p>
        </div>
      </div>
    </footer>
  );
}
