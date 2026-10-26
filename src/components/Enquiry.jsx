import { useState } from "react";
import { site } from "../data/site";
const field = "mt-2 min-h-[52px] w-full border border-ivory/20 bg-white/[0.045] px-4 text-ivory outline-none transition duration-200 placeholder:text-ivory/35 hover:border-ivory/40 focus:border-brass focus:bg-white/[0.08] focus:ring-2 focus:ring-brass/20";

export default function Enquiry({ type, setType, property }) {
  const [v, setV] = useState({ name: "", email: "", phone: "", date: "", message: "" });
  const [err, setErr] = useState({});
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState(false);
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (!v.name.trim()) x.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(v.email)) x.email = "Please enter a valid email address.";
    if (v.phone && !/^[+\d][\d\s()-]{6,}$/.test(v.phone)) x.phone = "Please enter a valid phone number, or leave it blank.";
    setErr(x); setCopied(false);
    if (Object.keys(x).length) return setSummary("");
    setSummary([`Villa Modaro enquiry (${type})`, property && `Property: ${property.name} (${property.id})`, `Name: ${v.name}`, `Email: ${v.email}`, v.phone && `Phone: ${v.phone}`, v.date && `Preferred date: ${v.date}`, v.message && `Message: ${v.message}`].filter(Boolean).join("\n"));
  };
  const copy = async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); } catch { /* user can select text manually */ } };
  const Err = ({ k }) => err[k] && <p id={`${k}-e`} className="mt-1 text-sm text-brass">{err[k]}</p>;
  const a = (k) => ({ "aria-invalid": !!err[k], "aria-describedby": err[k] ? `${k}-e` : undefined });

  return (
    <section id="enquiry" className="relative overflow-hidden bg-charcoal text-ivory">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full border border-brass/10" />
      <div className="relative mx-auto grid max-w-[1440px] items-start gap-12 px-6 py-20 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:col-span-4">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-brass"><span className="h-px w-8 bg-brass" /> A note to Modaro</p>
          <h2 className="h2 max-w-lg">Make room for your next memory.</h2>
          <p className="mt-6 max-w-sm leading-7 text-ivory/65">Tell us what you have in mind. Share a few details and we’ll help you shape a stay worth looking forward to.</p>
          <div className="mt-10 flex items-center gap-4 border-t border-ivory/15 pt-6">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-brass/50 text-lg text-brass" aria-hidden="true">✳</span>
            <p className="max-w-[220px] text-xs leading-5 text-ivory/55">Your details stay in this page until you prepare the enquiry summary.</p>
          </div>
        </div>
        <form onSubmit={submit} noValidate className="grid gap-x-6 gap-y-6 rounded-none border border-ivory/10 bg-white/[0.035] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:grid-cols-2 sm:p-9 lg:col-span-7 lg:col-start-6 lg:p-11">
          <div className="mb-1 border-b border-ivory/15 pb-5 sm:col-span-2"><p className="text-xl font-display">Tell us a little about your plans</p><p className="mt-2 text-sm text-ivory/50"><span className="text-brass">*</span> Required fields</p></div>
          <label className="block text-sm text-ivory/80">Name <span className="text-brass">*</span><input className={field} placeholder="Your full name" value={v.name} onChange={set("name")} autoComplete="name" required {...a("name")} /><Err k="name" /></label>
          <label className="block text-sm text-ivory/80">Email <span className="text-brass">*</span><input type="email" className={field} placeholder="you@example.com" value={v.email} onChange={set("email")} autoComplete="email" required {...a("email")} /><Err k="email" /></label>
          <label className="block text-sm text-ivory/80">Phone <span className="text-ivory/40">(optional)</span><input type="tel" className={field} placeholder="+91 00000 00000" value={v.phone} onChange={set("phone")} autoComplete="tel" {...a("phone")} /><Err k="phone" /></label>
          <label className="block text-sm text-ivory/80">Preferred date<input type="date" className={`${field} [color-scheme:dark]`} value={v.date} onChange={set("date")} /></label>
          <label className="block text-sm text-ivory/80 sm:col-span-2">Enquiry type
            <select className={`${field} [color-scheme:dark]`} value={type} onChange={(e) => setType(e.target.value)}>
              {["Stay", "Celebration", "General"].map((o) => <option key={o} className="text-charcoal">{o}</option>)}
            </select></label>
          <label className="block text-sm text-ivory/80 sm:col-span-2">Message <span className="text-ivory/40">(optional)</span><textarea rows={4} placeholder="Tell us what would make this stay special…" className={`${field} min-h-32 resize-y py-3`} value={v.message} onChange={set("message")} /></label>
          <div className="flex flex-wrap items-center gap-4 border-t border-ivory/15 pt-6 sm:col-span-2"><button className="btn min-h-12 bg-brass px-6 text-charcoal transition hover:bg-ivory">Prepare enquiry summary <span aria-hidden="true" className="ml-2">↗</span></button><span className="text-xs text-ivory/45">No booking is confirmed at this step.</span></div>
          {summary && (
            <div role="status" className="border border-brass/60 p-4 sm:col-span-2">
              <p className="mb-2 text-sm text-brass">Not sent yet. Copy this summary and send it to the villa.</p>
              <textarea readOnly rows={6} value={summary} className="w-full bg-transparent text-sm" aria-label="Enquiry summary" />
              <div className="mt-3 flex flex-wrap gap-3">
                <button type="button" onClick={copy} className="btn border border-ivory/60 hover:bg-ivory hover:text-charcoal">{copied ? "Copied" : "Copy summary"}</button>
                {site.contact.email && <a className="btn border border-ivory/60" href={`mailto:${site.contact.email}?subject=Villa Modaro enquiry&body=${encodeURIComponent(summary)}`}>Open in email app</a>}
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
