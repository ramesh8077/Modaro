const API = import.meta.env.VITE_BOOKING_API_URL || "/api";
const json = (response) => response.json().then((body) => {
  if (response.ok) return body;
  const message = response.status === 404
    ? `Booking API route was not found at ${API}. Check the server service rewrite.`
    : body.message || "Booking request failed";
  return Promise.reject(Object.assign(new Error(message), { code: body.code, details: body.details, status: response.status }));
});
const request = (url, options) => fetch(url, options).then(json).catch((error) => {
  if (error instanceof TypeError || error.name === "NetworkError") throw new Error(`Booking service is unavailable at ${API}. Check the server deployment and database configuration.`);
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
