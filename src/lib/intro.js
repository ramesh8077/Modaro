import { introConfig as c } from "./introConfig";

// Tiny lifecycle store: "initialising" -> "revealing" -> "complete" (monotonic, each reached once).
// Decided at import time so ineligible visits never render the overlay at all.
export const t0 = typeof performance !== "undefined" ? performance.now() : 0;
const order = { initialising: 0, revealing: 1, complete: 2 };
const subs = new Set();

function seen() { try { return !!window.sessionStorage.getItem(c.storageKey); } catch { return false; } }
export function markDone() { try { window.sessionStorage.setItem(c.storageKey, "1"); } catch { /* storage unavailable: intro may replay on reload */ } }

function eligible() {
  if (typeof window === "undefined" || !c.enabled) return false;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { markDone(); return false; }
  if (new URLSearchParams(window.location.search).get("intro") === "replay") return true;
  return !seen();
}

let status = eligible() ? "initialising" : "complete";
export const getIntro = () => status;
export const subscribeIntro = (f) => { subs.add(f); return () => subs.delete(f); };
export function setIntro(next) {
  if (order[next] <= order[status]) return;
  status = next; subs.forEach((f) => f(next));
}
// Runs cb once the page is revealed (or immediately when no intro is running). Returns a cancel function.
export function onIntroReveal(cb) {
  if (status !== "initialising") { cb(); return () => {}; }
  const f = (s) => { if (s !== "initialising") { subs.delete(f); cb(); } };
  subs.add(f);
  return () => subs.delete(f);
}
