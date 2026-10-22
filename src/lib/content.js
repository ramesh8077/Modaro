const preserve = new Set(["src", "thumbnailSrc", "focus", "cls", "id", "propertyId", "detailPath", "mapUrl", "email", "phone", "whatsapp", "instagram"]);

export function stripFullStops(value, key = "") {
  if (typeof value === "string") return preserve.has(key) ? value : value.replace(/\./g, "");
  if (Array.isArray(value)) { value.forEach((item, index) => { value[index] = stripFullStops(item, key); }); return value; }
  if (value && typeof value === "object") { Object.keys(value).forEach((child) => { value[child] = stripFullStops(value[child], child); }); }
  return value;
}
