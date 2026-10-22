// Frontend-only for now. When the booking backend exists, replace `submitEnquiry` with a real API call;
// the payload shape below is what the form already produces.
export function prepareEnquiry(kind, values) {
  return { kind, status: "not_sent", preparedAt: new Date().toISOString(), ...values };
}
export function enquirySummary(p) {
  return [
    `Villa Modaro ${p.kind} enquiry`, `Occasion: ${p.occasion}`, p.preferredDate && `Preferred date: ${p.preferredDate}`,
    `Name: ${p.name}`, `Email: ${p.email}`, p.message && `Plans: ${p.message}`,
    "(Enquiry only. Availability and arrangements are not confirmed.)",
  ].filter(Boolean).join("\n");
}
export async function submitEnquiry() { // not connected yet: never report success
  return { ok: false, reason: "not_connected" };
}
