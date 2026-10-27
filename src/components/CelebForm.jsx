import { useState } from "react";
import { site, celebrationsPage as c } from "../data/site";
import { prepareEnquiry, enquirySummary } from "../services/enquiryService";

const field = "mt-1 min-h-[44px] w-full border-b border-charcoal/50 bg-transparent py-2";
const lab = "text-xs uppercase tracking-[0.2em]";

// Frontend-only enquiry: validates, prepares a payload (ready for a future backend) and shows a copyable summary.
// It never claims anything was sent or confirmed.
export default function CelebClosing() {
  const k = c.closing;
  const [v, setV] = useState({ occasion: "", date: "", name: "", email: "", message: "" });
  const [err, setErr] = useState({}), [prepared, setPrepared] = useState(null), [copied, setCopied] = useState(false);
  const set = (key) => (e) => setV({ ...v, [key]: e.target.value });
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const a = (key) => ({ id: key, "aria-invalid": !!err[key], "aria-describedby": err[key] ? `${key}-e` : undefined });
  const E = ({ id }) => err[id] && <p id={`${id}-e`} className="mt-1 text-sm text-[#9a3b2a]">{err[id]}</p>;

  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (!v.occasion) x.occasion = "Please choose an occasion.";
    if (v.date && v.date < today) x.date = "Please choose a date that has not passed.";
    if (!v.name.trim()) x.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(v.email)) x.email = "Please enter a valid email address.";
    setErr(x); setCopied(false);
    const first = Object.keys(x)[0];
    if (first) { setPrepared(null); setTimeout(() => document.getElementById(first)?.focus(), 0); return; }
    setPrepared(prepareEnquiry("celebration", { occasion: v.occasion, preferredDate: v.date, name: v.name.trim(), email: v.email, message: v.message.trim() }));
  };
  const summary = prepared ? enquirySummary(prepared) : "";
  const copy = async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); } catch { /* select manually */ } };

  return (
    <section id="enquiry" className="bg-forest px-6 py-24 text-ivory lg:px-12 lg:py-36">
      <div className="mx-auto max-w-5xl [perspective:1400px]">
        <div data-panel className="relative bg-ivory p-6 text-charcoal sm:p-10 lg:p-16" style={{ boxShadow: "0 40px 80px -30px rgba(0,0,0,.6)" }}>
          <div aria-hidden className="pointer-events-none absolute inset-3 border border-brass/70" />
          <div className="relative">
            <p className="mb-4 text-xs tracking-[0.3em] text-forest/80">YOUR NEXT MEMORY STARTS HERE</p>
            <h2 className="h2">{k.title}</h2>
            <p className="mt-4 max-w-md">{k.text}</p>
            <form onSubmit={submit} noValidate className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <fieldset id="occasion" tabIndex={-1} aria-describedby={err.occasion ? "occasion-e" : undefined} className="sm:col-span-2">
                <legend className={lab}>Occasion</legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {k.options.map((o) => (
                    <label key={o} className="cursor-pointer">
                      <input type="radio" name="occasion" value={o} checked={v.occasion === o} onChange={set("occasion")} className="peer sr-only" />
                      <span className="inline-flex min-h-[44px] items-center border border-charcoal/40 px-5 text-sm transition-colors duration-200 peer-checked:border-forest peer-checked:bg-forest peer-checked:text-ivory peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brass">{o}</span>
                    </label>
                  ))}
                </div>
                <E id="occasion" />
              </fieldset>
              <div><label htmlFor="date" className={lab}>Preferred date (optional)</label><input {...a("date")} type="date" min={today} value={v.date} onChange={set("date")} className={field} /><E id="date" /></div>
              <div><label htmlFor="name" className={lab}>Name</label><input {...a("name")} value={v.name} onChange={set("name")} autoComplete="name" required className={field} /><E id="name" /></div>
              <div className="sm:col-span-2"><label htmlFor="email" className={lab}>Email</label><input {...a("email")} type="email" value={v.email} onChange={set("email")} autoComplete="email" required className={field} /><E id="email" /></div>
              <div className="sm:col-span-2"><label htmlFor="message" className={lab}>Anything you'd like us to know? (optional)</label><textarea id="message" rows={3} value={v.message} onChange={set("message")} className={`${field} border`} /></div>
              <button className="btn w-fit bg-forest text-ivory hover:bg-charcoal">Enquire About a Celebration</button>
              <p className="self-center text-sm opacity-75 sm:col-span-1">Preview only: nothing is sent from this page yet.</p>
              {prepared && (
                <div role="status" className="border border-forest/40 p-4 sm:col-span-2">
                  <p className="mb-2 text-sm font-medium text-forest">Not sent. This site isn't connected to a booking system yet, so copy this summary and send it to the villa. Nothing is confirmed.</p>
                  <textarea readOnly rows={7} value={summary} aria-label="Enquiry summary" className="w-full bg-transparent text-sm" />
                  <div className="mt-3 flex flex-wrap gap-3">
                    <button type="button" onClick={copy} className="btn border border-charcoal/60 hover:bg-charcoal hover:text-ivory">{copied ? "Copied" : "Copy summary"}</button>
                    {site.contact.email && <a className="btn border border-charcoal/60" href={`mailto:${site.contact.email}?subject=Villa Modaro celebration enquiry&body=${encodeURIComponent(summary)}`}>Open in email app</a>}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
