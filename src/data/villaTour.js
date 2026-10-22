// Verified client photography and content for The Villa page
import { assets } from "./assets";
import bathPhoto from "../assets/BedroomIMG/3 (10).png";
import barCounter from "../assets/BarIMG/2 (8).png";
import barPool from "../assets/BarIMG/3 (8).png";
import barDetail from "../assets/BarIMG/4 (5).png";
import bedroomWindow from "../assets/BedroomIMG/1 (11).png";
import bedroomDetail from "../assets/BedroomIMG/2 (10).png";
import bedroomBedWide from "../assets/BedroomIMG/1 (10).png";
import bedroomDesk from "../assets/BedroomIMG/2 (11).png";
import bedroomTelevision from "../assets/BedroomIMG/3 (11).png";
import bedroomWardrobe from "../assets/BedroomIMG/4 (6).png";
import livingWide from "../assets/LivingRoomIMG/2 (2).png";
import livingHall from "../assets/LivingRoomIMG/5 (1).png";
import diningFireplace from "../assets/DinningIMG/2 (12).png";
import gardenPavilion from "../assets/OutdoorIMG/6.png";
import kitchenWide from "../assets/KitchenIMG/2 (15).png";
import kitchenAngle from "../assets/KitchenIMG/4 (3).png";

export const property = {
  id: "villa-modaro",
  name: "Villa Modaro",
  location: "Along the Balupur–Paonta Sahib Expressway, near Mohand Forest",
  intro: "A private retreat set among landscaped gardens, with a pool, pickleball and room to gather",
  bookingType: null,
  bedrooms: null,
  bathrooms: null,
  guestCapacity: null,
  amenities: ["Swimming pool", "Landscaped gardens", "Pickleball"],
};

export const booking = { searchPath: null };

export const CATEGORIES = {
  exterior: { label: "Villa & Exterior", tone: "forest", variant: "frame" },
  bedrooms: { label: "Bedrooms", tone: "olive", variant: "arch" },
  bathrooms: { label: "Bathrooms", tone: "sand", variant: "rings" },
  living: { label: "Living", tone: "forest", variant: "arch" },
  bar: { label: "Bar & Games", tone: "charcoal", variant: "frame" },
  dining: { label: "Dining", tone: "olive", variant: "lines" },
  kitchen: { label: "Kitchen", tone: "sand", variant: "frame" },
  pool: { label: "Poolside", tone: "forest", variant: "lines" },
  gardens: { label: "Gardens", tone: "olive", variant: "arch" },
  pickleball: { label: "Pickleball & Wellness", tone: "charcoal", variant: "rings" },
};

export const IMAGES = {};
const add = (id, category, image, alt, caption = alt) => {
  IMAGES[id] = { id, category, alt, caption, src: image.src, w: image.w, h: image.h, focus: image.focus || "center" };
};

add("exterior-1", "exterior", assets.entry, assets.entry.alt, "The villa entrance");
add("exterior-2", "exterior", assets.driveway, assets.driveway.alt, "The tree-lined arrival");
add("bed-1", "bedrooms", assets.bedroomOne, assets.bedroomOne.alt, "A warmly lit bedroom");
add("bed-2", "bedrooms", assets.bedroomTwo, assets.bedroomTwo.alt, "Bedroom seating and garden light");
add("bed-3", "bedrooms", assets.bedroomThree, assets.bedroomThree.alt, "Bedroom with a reading chair");
add("bed-4", "bedrooms", assets.bedroomPortrait, assets.bedroomPortrait.alt, "Bedroom doorway detail");
add("bed-5", "bedrooms", { src: bedroomWindow, w: 1536, h: 1024 }, "Bedroom with a wide window", "A bedroom at dusk");
add("bed-6", "bedrooms", { src: bedroomDetail, w: 1536, h: 1024 }, "Bedroom console and television", "A quiet bedroom corner");
add("bed-7", "bedrooms", { src: bedroomBedWide, w: 1536, h: 1024 }, "Bedroom with timber furnishings", "A spacious bedroom view");
add("bed-8", "bedrooms", { src: bedroomDesk, w: 1536, h: 1024 }, "Bedroom writing desk and chair", "A quiet place to work");
add("bed-9", "bedrooms", { src: bedroomTelevision, w: 1536, h: 1024 }, "Bedroom window and television", "A bedroom at night");
add("bed-10", "bedrooms", { src: bedroomWardrobe, w: 1024, h: 1536 }, "Timber bedroom wardrobe", "A timber wardrobe detail");
add("bath-1", "bathrooms", { src: bathPhoto, w: 1536, h: 1024 }, "Bathroom with a vessel sink and toilet", "Bathroom detail");
add("living-1", "living", assets.living, assets.living.alt, "Friends sharing the living room");
add("living-2", "living", assets.livingDetail, assets.livingDetail.alt, "The living room in warm evening light");
add("living-3", "living", { src: livingWide, w: 1536, h: 1024 }, "Living room seating", "A generous living room");
add("living-4", "living", { src: livingHall, w: 1536, h: 1024 }, "Hallway beside the living room", "A light-filled passage");
add("bar-1", "bar", assets.bar, assets.bar.alt, "Friends gathered around the bar");
add("bar-2", "bar", { src: barCounter, w: 1536, h: 1024 }, "Guests at the villa bar", "The bar counter");
add("bar-3", "bar", { src: barPool, w: 1536, h: 1024 }, "Guests playing pool", "Pool table and bar");
add("bar-4", "bar", { src: barDetail, w: 1536, h: 1024 }, "Pool balls on the table", "An evening at the pool table");
add("dining-1", "dining", assets.dining, assets.dining.alt, "Friends sharing dinner");
add("dining-2", "dining", assets.diningEmpty, assets.diningEmpty.alt, "A set dining table");
add("dining-3", "dining", { src: diningFireplace, w: 1536, h: 1024 }, "Dining table beside the fireplace", "A welcoming dining room");
add("kitchen-1", "kitchen", assets.kitchen, assets.kitchen.alt, "The villa kitchen");
add("kitchen-2", "kitchen", { src: kitchenWide, w: 1536, h: 1024 }, "Kitchen with a garden view", "The kitchen windows");
add("kitchen-3", "kitchen", { src: kitchenAngle, w: 1536, h: 1024 }, "Kitchen worktops and appliances", "A bright kitchen corner");
add("pool-1", "pool", assets.pool, assets.pool.alt, "The swimming pool");
add("pool-2", "pool", assets.poolside, assets.poolside.alt, "Shaded seating beside the pool");
add("pool-3", "pool", assets.poolDinner, assets.poolDinner.alt, "Dinner beside the pool");
add("pool-4", "pool", assets.outdoorSeating, assets.outdoorSeating.alt, "Poolside lounge seating");
add("garden-1", "gardens", assets.pavilion, assets.pavilion.alt, "The garden pavilion");
add("garden-2", "gardens", assets.driveway, assets.driveway.alt, "The landscaped arrival");
add("garden-3", "gardens", assets.outdoorDining, assets.outdoorDining.alt, "Covered outdoor dining");
add("garden-4", "gardens", { src: gardenPavilion, w: 1536, h: 1024 }, "The pavilion across the lawn", "Garden pavilion and lawn");
add("pickle-1", "pickleball", assets.court, assets.court.alt, "The pickleball court");
add("pickle-2", "pickleball", assets.pickleball, assets.pickleball.alt, "A game on the court");
add("pickle-3", "pickleball", assets.yoga, assets.yoga.alt, "Yoga beside the court");

export const hero = { main: "exterior-1", previews: ["living-1", "pool-1"] };
export const overview = { images: ["exterior-2", "garden-1"] };

export const sections = [
  { id: "bedrooms", nav: "Bedrooms", title: "Bedrooms", spaces: [{ id: "bedrooms", layout: "narrow", cta: "View Room Photos", intro: "Warm timber, soft lighting and quiet corners for a restful stay", features: [], images: ["bed-1", "bed-2", "bed-3", "bed-4", "bed-5", "bed-6", "bed-7", "bed-8", "bed-9", "bed-10"] }] },
  { id: "bathrooms", nav: "Bathrooms", title: "Bathroom detail", spaces: [{ id: "bathrooms", layout: "masonry", cta: "View Bathroom Photo", intro: "A considered bathroom detail from the villa", features: [], images: ["bath-1"] }] },
  { id: "living", nav: "Living", title: "Living spaces", spaces: [{ id: "living", layout: "editorial", cta: "View Living Photos", intro: "Comfortable shared spaces made for slow afternoons and time together", features: [], images: ["living-1", "living-2", "living-3", "living-4"] }] },
  { id: "bar-dining", nav: "Bar & Dining", title: "Bar & dining", dark: true, spaces: [
    { id: "bar", title: "Bar & games", layout: "strip", cta: "View Bar Photos", intro: "An easygoing room for drinks, conversation and a game of pool", features: [], images: ["bar-1", "bar-2", "bar-3", "bar-4"] },
    { id: "dining", title: "Dining", layout: "narrow", cta: "View Dining Photos", intro: "Shared meals around a generous dining table", features: [], images: ["dining-1", "dining-2", "dining-3"] },
  ] },
  { id: "kitchen", nav: "Kitchen", title: "The kitchen", spaces: [{ id: "kitchen", layout: "editorial", cta: "View Kitchen Photos", intro: "A bright, practical space connected to the villa's shared living areas", features: [], images: ["kitchen-1", "kitchen-2", "kitchen-3"] }] },
  { id: "outdoors", nav: "Outdoors", title: "Outdoors", spaces: [
    { id: "pool", title: "Pool & poolside", layout: "strip", parallax: true, cta: "View Pool Photos", intro: "Poolside afternoons, shaded seating and outdoor dinners", features: [], images: ["pool-1", "pool-2", "pool-3", "pool-4"] },
    { id: "gardens", title: "Gardens", layout: "editorial", cta: "View Garden Photos", intro: "Landscaped grounds with room to wander and gather", features: [], images: ["garden-1", "garden-2", "garden-3", "garden-4"] },
    { id: "pickleball", title: "Pickleball & wellness", layout: "narrow", cta: "View Activity Photos", intro: "A court among the gardens, with space for an easy morning practice", features: [], images: ["pickle-1", "pickle-2", "pickle-3"] },
  ] },
];

export const hasSrc = (id) => !!IMAGES[id]?.src;
export const realImages = () => Object.values(IMAGES).filter((i) => i.src);
export const spaceImages = (space) => space.images.map((id) => IMAGES[id]).filter((i) => i?.src);
export const plateImg = (id) => { const i = IMAGES[id] || {}, c = CATEGORIES[i.category] || CATEGORIES.exterior; return { ...i, tone: c.tone, variant: c.variant }; };
export const toViewer = (i) => ({ id: i.id, src: i.src, thumb: i.src, alt: i.alt, caption: i.caption, w: i.w, h: i.h, property: "" });
export function galleryData() {
  const imgs = realImages(), used = [...new Set(imgs.map((i) => i.category))];
  return {
    properties: [{ id: property.id, name: property.name, description: property.location, detailPath: "/the-villa", sortOrder: 1 }],
    categories: Object.entries(CATEGORIES).filter(([k]) => used.includes(k)).map(([id, c], n) => ({ id, label: c.label, sortOrder: n })),
    images: imgs.map((i, n) => ({ id: i.id, propertyId: property.id, categoryId: i.category, src: i.src, thumbnailSrc: "", width: i.w, height: i.h, alt: i.alt, caption: i.caption, sortOrder: n, isFeatured: n < 2 })),
  };
}
