const API = import.meta.env.VITE_BOOKING_API_URL || "/api";
const json = async (response) => {
  const isJson = response.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await response.json() : null;
  if (response.ok && isJson) return body;
  const message = response.status === 404 || !isJson
    ? "Live availability is temporarily unavailable. Please try again later or contact us to plan your stay."
    : body?.message || "Booking request failed";
  throw Object.assign(new Error(message), { code: body?.code, details: body?.details, status: response.status });
};
const request = (url, options) => fetch(url, options).then(json).catch((error) => {
  if (error instanceof TypeError || error instanceof SyntaxError || error.name === "NetworkError") throw new Error("Live availability is temporarily unavailable. Please try again later or contact us to plan your stay.");
  throw error;
});
export const bookingApi = {
  properties: () => request(`${API}/properties`),
  availability: (params) => request(`${API}/availability?${new URLSearchParams(params)}`),
  hold: (payload) => request(`${API}/holds`, { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": crypto.randomUUID() }, body: JSON.stringify(payload) }),
  booking: (id, token) => request(`${API}/bookings/${id}`, { headers: { "X-Booking-Token": token } }),
  guest: (id, token, payload) => request(`${API}/bookings/${id}/guest`, { method: "POST", headers: { "Content-Type": "application/json", "X-Booking-Token": token }, body: JSON.stringify(payload) }),
  order: (id, token) => request(`${API}/bookings/${id}/order`, { method: "POST", headers: { "Content-Type": "application/json", "X-Booking-Token": token } }),
  simulate: (id, token, outcome) => request(`${API}/bookings/${id}/simulate-payment`, { method: "POST", headers: { "Content-Type": "application/json", "X-Booking-Token": token }, body: JSON.stringify({ outcome }) }),
};
