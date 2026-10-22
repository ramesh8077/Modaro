import { site } from "../data/site";
import L from "./NavLink";
export default function Footer() {
  const { phone, instagram, whatsapp, email } = site.contact;
  const ext = [[phone && `tel:${phone}`, phone], [email && `mailto:${email}`, email], [whatsapp, "WhatsApp"], [instagram, "Instagram"]].filter(([h]) => h);
  return (
    <footer className="border-t border-ivory/15 bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-16 lg:grid-cols-[1.2fr_.8fr_1fr] lg:px-12">
        <div><p className="text-[11px] uppercase tracking-[0.28em] text-brass">Villa Modaro</p><p className="mt-3 font-display text-4xl tracking-[0.2em]">MODARO</p><p className="mt-3 max-w-xs text-sm text-ivory/70">Where celebration meets calm — a private retreat near Mohand Forest.</p><a href="#booking" className="btn mt-6 border border-ivory/30 hover:border-brass hover:text-brass">Check availability</a></div>
        <nav aria-label="Footer"><ul className="grid grid-cols-2 gap-x-6">{site.nav.map(([l, h]) => <li key={h}><L className="inline-flex min-h-[44px] items-center text-sm hover:text-brass" to={h}>{l}</L></li>)}</ul></nav>
        <div className="text-sm text-ivory/70"><p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-brass">Find us</p><p className="max-w-xs">Balupur–Paonta Sahib Expressway<br />Near Mohand Forest</p>
          {ext.map(([h, l]) => <a key={l} href={h} className="mr-4 inline-flex min-h-[44px] items-center hover:text-brass">{l}</a>)}
          <p>© {new Date().getFullYear()} Villa Modaro</p>
        </div>
      </div>
    </footer>
  );
}
