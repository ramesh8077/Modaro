import { assets } from "./assets.js";
import { realImages } from "./villaTour.js";
import { stripFullStops } from "../lib/content.js";

export const properties = [{ id: "villa-modaro", name: "Villa Modaro", description: "A private retreat along the Balupur–Paonta Sahib Expressway, near Mohand Forest.", detailPath: "/the-villa", sortOrder: 1 }];
export const categories = [
  { id: "architecture", label: "Villa & Architecture", sortOrder: 1 }, { id: "interiors", label: "Interiors", sortOrder: 2 },
  { id: "poolside", label: "Poolside", sortOrder: 3 }, { id: "gardens", label: "Gardens", sortOrder: 4 },
  { id: "pickleball", label: "Pickleball", sortOrder: 5 }, { id: "celebrations", label: "Celebrations", sortOrder: 6 },
];
const P = "villa-modaro";
const im = (id, categoryId, sortOrder, photo, caption, isFeatured = false) => ({ id, propertyId: P, categoryId, sortOrder, src: photo.src, thumbnailSrc: "", width: photo.w, height: photo.h, alt: photo.alt, caption, isFeatured });
const categoryMap = { exterior: "architecture", bedrooms: "interiors", bathrooms: "interiors", living: "interiors", bar: "interiors", dining: "interiors", kitchen: "interiors", pool: "poolside", gardens: "gardens", pickleball: "pickleball" };
const captions = { exterior: "The villa and its grounds", bedrooms: "A restful bedroom", bathrooms: "Bathroom detail", living: "Life inside the villa", bar: "An evening around the bar", dining: "Set for dinner", kitchen: "The villa kitchen", pool: "Poolside moments", gardens: "Among the gardens", pickleball: "Room to play" };
const seen = new Set();
export const images = realImages().reduce((all, photo, index) => {
  if (!photo.src || seen.has(photo.src)) return all;
  seen.add(photo.src);
  all.push(im(photo.id, categoryMap[photo.category] || "interiors", index + 1, photo, photo.caption || captions[photo.category] || photo.alt, index < 2));
  return all;
}, []);
export const galleryPage = {
  meta: { title: "Gallery · Villa Modaro", description: "Explore photographs of Villa Modaro: the villa, interiors, poolside, landscaped gardens and pickleball near Mohand Forest." },
  hero: { ...assets.entry, focus: "center 56%" }, bookingPath: null,
};

stripFullStops(properties);
stripFullStops(images);
stripFullStops(galleryPage);
