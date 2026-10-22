import { useState } from "react";
import { site } from "../data/site";
const field = "mt-1 min-h-[44px] w-full border border-ivory/40 bg-transparent px-3 text-ivory placeholder:text-ivory/50";

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
    <section id="enquiry" className="bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 lg:grid-cols-12 lg:px-12 lg:py-36">
        <div className="lg:col-span-5"><h2 className="h2">Make room for your next memory.</h2>
          <p className="mt-6 max-w-sm text-ivory/80">Tell us what you have in mind. This form prepares a summary you can copy; nothing is sent from this page.</p></div>
        <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          <label className="block">Name<input className={field} value={v.name} onChange={set("name")} autoComplete="name" required {...a("name")} /><Err k="name" /></label>
          <label className="block">Email<input type="email" className={field} value={v.email} onChange={set("email")} autoComplete="email" required {...a("email")} /><Err k="email" /></label>
          <label className="block">Phone (optional)<input type="tel" className={field} value={v.phone} onChange={set("phone")} autoComplete="tel" {...a("phone")} /><Err k="phone" /></label>
          <label className="block">Preferred date<input type="date" className={`${field} [color-scheme:dark]`} value={v.date} onChange={set("date")} /></label>
          <label className="block sm:col-span-2">Enquiry type
            <select className={field} value={type} onChange={(e) => setType(e.target.value)}>
              {["Stay", "Celebration", "General"].map((o) => <option key={o} className="text-charcoal">{o}</option>)}
            </select></label>
          <label className="block sm:col-span-2">Message<textarea rows={4} className={field} value={v.message} onChange={set("message")} /></label>
          <button className="btn w-fit bg-brass text-charcoal hover:bg-ivory">Prepare enquiry summary</button>
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
