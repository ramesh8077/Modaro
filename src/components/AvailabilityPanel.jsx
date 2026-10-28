import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { property, booking } from "../data/villaTour";
import { site } from "../data/site";

const f = "mt-1 min-h-[44px] w-full border-b border-ivory/50 bg-transparent py-2 text-ivory [color-scheme:dark]";
const lab = "text-xs uppercase tracking-[0.2em]";

// Dates + guests for this property. No booking engine exists yet: unless booking.searchPath is set, it prepares an honest
// enquiry summary (with the property id). Prefills from ?checkIn=&checkOut=&guests= when arriving from a search.
export default function AvailabilityPanel() {
  const q = new URLSearchParams(useLocation().search), nav = useNavigate();
  const [v, setV] = useState({ checkIn: q.get("checkIn") || "", checkOut: q.get("checkOut") || "", guests: q.get("guests") || "" });
  const [err, setErr] = useState({}), [summary, setSummary] = useState(""), [copied, setCopied] = useState(false);
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  const a = (k) => ({ id: k, "aria-invalid": !!err[k], "aria-describedby": err[k] ? `${k}-e` : undefined });
  const E = ({ id }) => err[id] && <p id={`${id}-e`} className="mt-1 text-sm text-[#9a3b2a]">{err[id]}</p>;

  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (!v.checkIn || v.checkIn < today) x.checkIn = "Please choose a check-in date that has not passed.";
    if (!v.checkOut || v.checkOut <= v.checkIn) x.checkOut = "Check-out must be after check-in.";
    if (!/^[1-9]\d{0,2}$/.test(v.guests)) x.guests = "Please enter the number of guests.";
    setErr(x); setCopied(false);
    const first = Object.keys(x)[0];
    if (first) { setSummary(""); setTimeout(() => document.getElementById(first)?.focus(), 0); return; }
    const p = new URLSearchParams({ propertyId: property.id, ...v });
    if (booking.searchPath) return nav(`${booking.searchPath}?${p}`);
    setSummary([`Villa Modaro stay enquiry`, `Property: ${property.name} (${property.id})`, `Check-in: ${v.checkIn}`, `Check-out: ${v.checkOut}`, `Guests: ${v.guests}`, "(Enquiry only. Availability is not checked or confirmed.)"].join("\n"));
  };
  const copy = async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); } catch { /* select manually */ } };

  return (
    <section id="enquiry" data-scroll-extra="56" style={{ scrollMarginTop: 128 }} className="bg-ivory px-6 py-10 text-charcoal sm:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto max-w-4xl border border-charcoal bg-[#111111] p-6 text-ivory shadow-[0_24px_60px_rgba(0,0,0,.18)] sm:p-10 lg:p-14">
        <h2 className="h2 !text-[clamp(2rem,4vw,3rem)]">Plan Your Stay</h2>
        <p className="mt-3 max-w-md">Choose your dates and party size for {property.name}.</p>
        <form onSubmit={submit} noValidate className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-3">
          <div><label htmlFor="checkIn" className={lab}>Check-in</label><input {...a("checkIn")} type="date" min={today} value={v.checkIn} onChange={set("checkIn")} className={f} /><E id="checkIn" /></div>
          <div><label htmlFor="checkOut" className={lab}>Check-out</label><input {...a("checkOut")} type="date" min={v.checkIn || today} value={v.checkOut} onChange={set("checkOut")} className={f} /><E id="checkOut" /></div>
          <div><label htmlFor="guests" className={lab}>Guests</label><input {...a("guests")} inputMode="numeric" value={v.guests} onChange={set("guests")} className={f} /><E id="guests" /></div>
          <div className="sm:col-span-3"><button className="btn min-h-11 justify-center border border-ivory/60 !bg-transparent px-8 text-xs tracking-widest !text-ivory hover:border-brass hover:!bg-transparent hover:!text-brass">Check Availability</button></div>
          {summary && (
            <div role="status" className="border border-ivory/30 p-4 sm:col-span-3">
              <p className="mb-2 text-sm font-medium text-ivory">Not sent, and no availability was checked. Booking isn't connected yet, so copy this summary and send it to the villa.</p>
              <textarea readOnly rows={5} value={summary} aria-label="Enquiry summary" className="w-full bg-transparent text-sm" />
              <div className="mt-3 flex flex-wrap gap-3">
                <button type="button" onClick={copy} className="btn border border-ivory/60 !bg-transparent !text-ivory hover:border-brass hover:!bg-transparent hover:!text-brass">{copied ? "Copied" : "Copy summary"}</button>
                {site.contact.email && <a className="btn border border-ivory/60 !bg-transparent !text-ivory hover:border-brass hover:!bg-transparent hover:!text-brass" href={`mailto:${site.contact.email}?subject=Villa Modaro stay enquiry&body=${encodeURIComponent(summary)}`}>Open in email app</a>}
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
