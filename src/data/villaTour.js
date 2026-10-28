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

// Title Case helper: har word ka pehla letter capital (space, hyphen aur dash ke baad).
const tc = (s = "") => s.replace(/(^|[\s\-–(])([a-z])/g, (m, a, b) => a + b.toUpperCase());

export const property = {
  id: "villa-modaro",
  name: "Villa Modaro",
  location: tc("Along the Balupur–Paonta Sahib Expressway, near Mohand Forest"),
  intro: tc("Three bedrooms welcome six guests plus kids, with a poolside lounge and bar, drawing-cum-dining room and kitchen. Near Mohand Forest, enjoy a plunge pool, pickleball and bonfire lawn."),
  overview: tc("The idea of Villa Modaro was born during the lockdown years, a time when celebrations felt at risk and the joy of gathering seemed distant. Out of that longing came the vision for a place where friends and families could reconnect freely, without disturbance or restriction. In 2020, a parcel of land was discovered along the Balupur–Paonta Sahib Expressway, offering both accessibility and seclusion. Years of dedication and effort transformed it into today's oasis of celebration: a villa designed for uninterrupted moments of joy. Surrounded by nature, with fewer restrictions on music and gatherings, Villa Modaro is the perfect setting for poolside parties, intimate anniversaries, birthdays and cherished get-togethers. It is more than a villa: it is an outhouse-style retreat shaped with passion, built to host life's milestones in harmony with nature and the clean Himalayan surroundings near Mohand Forest."),
  details: tc("The villa has three bedrooms for six guests plus kids, a lounge and bar near the poolside, a drawing-cum-dining room and a kitchen with refrigerator. Highlights include a plunge pool, pickleball court, live bar and bonfire lawn. Amenities and services include parking, Wi-Fi, security, CCTV, B&B features, a clean and hygienic setup, and housekeeping. Nearby: Mohand Forest Trail."),
  bookingType: null,
  bedrooms: 3,
  bathrooms: null,
  guestCapacity: "6 + Kids",
  amenities: ["Plunge Pool", "Pickleball Court", "Live Bar", "Bonfire Lawn", "Parking", "Wi-Fi", "Kitchen & Refrigerator", "Security", "CCTV", "B&B Features", "Clean And Hygienic Setup", "Housekeeping"],
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
  const brandedAlt = alt.startsWith("Villa Modaro") ? alt : `Villa Modaro — ${alt}`;
  IMAGES[id] = { id, category, alt: brandedAlt, caption: tc(caption), src: image.src, w: image.w, h: image.h, focus: image.focus || "center" };
};

add("exterior-1", "exterior", assets.entry, assets.entry.alt, "The Villa Entrance");
add("exterior-2", "exterior", assets.driveway, assets.driveway.alt, "The Tree-Lined Arrival");
add("bed-1", "bedrooms", assets.bedroomOne, assets.bedroomOne.alt, "A Warmly Lit Bedroom");
add("bed-2", "bedrooms", assets.bedroomTwo, assets.bedroomTwo.alt, "Bedroom Seating And Garden Light");
add("bed-3", "bedrooms", assets.bedroomThree, assets.bedroomThree.alt, "Bedroom With A Reading Chair");
add("bed-4", "bedrooms", assets.bedroomPortrait, assets.bedroomPortrait.alt, "Bedroom Doorways");
add("bed-5", "bedrooms", { src: bedroomWindow, w: 1536, h: 1024 }, "Bedroom with a wide window", "A Bedroom At Dusk");
add("bed-6", "bedrooms", { src: bedroomDetail, w: 1536, h: 1024 }, "Bedroom console and television", "A Quiet Bedroom Corner");
add("bed-7", "bedrooms", { src: bedroomBedWide, w: 1536, h: 1024 }, "Bedroom with timber furnishings", "A Spacious Bedroom View");
add("bed-8", "bedrooms", { src: bedroomDesk, w: 1536, h: 1024 }, "Bedroom writing desk and chair", "A Quiet Place To Work");
add("bed-9", "bedrooms", { src: bedroomTelevision, w: 1536, h: 1024 }, "Bedroom window and television", "A Bedroom At Night");
add("bed-10", "bedrooms", { src: bedroomWardrobe, w: 1024, h: 1536 }, "Timber bedroom wardrobe", "A Timber Wardrobes");
add("bath-1", "bathrooms", { src: bathPhoto, w: 1536, h: 1024 }, "Bathroom with a vessel sink and toilet", "Bathroom");
add("living-1", "living", assets.living, assets.living.alt, "The Living Room");
add("living-2", "living", assets.livingDetail, assets.livingDetail.alt, "The Living Room In Warm Evening Light");
add("living-3", "living", { src: livingWide, w: 1536, h: 1024 }, "Living room seating", "A Generous Living Room");
add("living-4", "living", { src: livingHall, w: 1536, h: 1024 }, "Hallway beside the living room", "A Light-Filled Passage");
add("bar-1", "bar", assets.bar, assets.bar.alt, "Friends Gathered Around The Bar");
add("bar-2", "bar", { src: barCounter, w: 1536, h: 1024 }, "Guests at the villa bar", "The Bar Counter");
add("bar-3", "bar", { src: barPool, w: 1536, h: 1024 }, "Guests playing pool", "Pool Table And Bar");
add("bar-4", "bar", { src: barDetail, w: 1536, h: 1024 }, "Pool balls on the table", "An Evening At The Pool Table");
add("dining-1", "dining", assets.dining, assets.dining.alt, "Friends Sharing Dinner");
add("dining-2", "dining", assets.diningEmpty, assets.diningEmpty.alt, "A Set Dining Table");
add("dining-3", "dining", { src: diningFireplace, w: 1536, h: 1024 }, "Dining table beside the fireplace", "A Welcoming Dining Room");
add("kitchen-1", "kitchen", assets.kitchen, assets.kitchen.alt, "The Villa Kitchen");
add("kitchen-2", "kitchen", { src: kitchenWide, w: 1536, h: 1024 }, "Kitchen with a garden view", "The Kitchen Windows");
add("kitchen-3", "kitchen", { src: kitchenAngle, w: 1536, h: 1024 }, "Kitchen worktops and appliances", "A Bright Kitchen Corner");
add("pool-1", "pool", assets.pool, assets.pool.alt, "The Swimming Pool");
add("pool-2", "pool", assets.poolside, assets.poolside.alt, "Shaded Seating Beside The Pool");
add("pool-3", "pool", assets.poolDinner, assets.poolDinner.alt, "Dinner Beside The Pool");
add("pool-4", "pool", assets.outdoorSeating, assets.outdoorSeating.alt, "Poolside Lounge Seating");
add("garden-1", "gardens", assets.pavilion, assets.pavilion.alt, "The Garden Pavilion");
add("garden-2", "gardens", assets.driveway, assets.driveway.alt, "The Landscaped Arrival");
add("garden-3", "gardens", assets.outdoorDining, assets.outdoorDining.alt, "Covered Outdoor Dining");
add("garden-4", "gardens", { src: gardenPavilion, w: 1536, h: 1024 }, "The pavilion across the lawn", "Garden Pavilion And Lawn");
add("pickle-1", "pickleball", assets.court, assets.court.alt, "The Pickleball Court");
add("pickle-2", "pickleball", assets.pickleball, assets.pickleball.alt, "A Game On The Court");
add("pickle-3", "pickleball", assets.yoga, assets.yoga.alt, "Yoga Beside The Court");

export const hero = { main: "exterior-1", previews: ["living-1", "pool-1"] };
export const overview = { images: ["exterior-2", "garden-1"] };

export const sections = [
  {
    id: "bedrooms", nav: "Bedrooms", title: "Restful Bedrooms",
    intro: "Three Bedrooms Offer Restful Spaces For Up To Six Guests Plus Kids.",
    spaces: [{ id: "bedrooms", layout: "narrow", features: ["3 Bedrooms", "6 Guests + Kids", "Housekeeping", "Clean And Hygienic Setup"], images: ["bed-1", "bed-2", "bed-3", "bed-4", "bed-5", "bed-6", "bed-7", "bed-8", "bed-9", "bed-10"] }],
  },
  {
    id: "living", nav: "Living", title: "Warm Living Spaces",
    spaces: [{ id: "living", layout: "editorial", cta: "View Living Photos", intro: "A Lounge And Bar Beside The Pool, With A Drawing-Cum-Dining Room For Time Together.", features: ["Poolside Lounge & Bar", "Drawing-Cum-Dining Room", "B&B Features"], images: ["living-1", "living-2", "living-3", "living-4"] }],
  },
  {
    id: "bar-dining", nav: "Bar & Dining", title: "Gather, Play & Dine",
    intro: "From Relaxed Games To Lingering Meals, These Shared Rooms Bring Everyone Together.",
    spaces: [
      { id: "bar", layout: "strip", cta: "View Bar Photos", features: ["Live Bar", "Lounge Beside The Pool"], images: ["bar-1", "bar-2", "bar-3", "bar-4"] },
      { id: "dining", title: "Shared Dining", layout: "narrow", cta: "View Dining Photos", intro: "Shared Meals Around A Generous Dining Table", features: [], images: ["dining-1", "dining-2", "dining-3"] },
    ],
  },
  {
    id: "kitchen", nav: "Kitchen", title: "A Bright Kitchen",
    spaces: [{ id: "kitchen", layout: "editorial", cta: "View Kitchen Photos", intro: "A Bright, Practical Kitchen With A Refrigerator, Connected To The Villa's Shared Living Areas.", features: ["Kitchen", "Refrigerator"], images: ["kitchen-1", "kitchen-2", "kitchen-3"] }],
  },
  {
    id: "outdoors", nav: "Outdoors", title: "Pool, Gardens & Open Air",
    intro: "A Plunge Pool, Landscaped Gardens And Open-Air Spaces For Time Together.",
    spaces: [
      { id: "pool", layout: "strip", parallax: true, cta: "View Pool Photos", features: ["Plunge Pool", "Bonfire Lawn", "Parking", "Wi-Fi", "Security", "CCTV"], images: ["pool-1", "pool-2", "pool-3", "pool-4"] },
      { id: "gardens", title: "Landscaped Gardens", layout: "editorial", cta: "View Garden Photos", intro: "Landscaped Grounds With Room To Wander And Gather", features: [], images: ["garden-1", "garden-2", "garden-3", "garden-4"] },
      { id: "pickleball", title: "Pickleball & Wellness", layout: "narrow", cta: "View Activity Photos", intro: "A Court Among The Gardens, With Space For An Easy Morning Practice", features: [], images: ["pickle-1", "pickle-2", "pickle-3"] },
    ],
  },
  {
    id: "bathrooms", nav: "Bathrooms", title: "Refined Bathrooms",
    spaces: [{ id: "bathrooms", layout: "masonry", cta: "View Bathroom Photo", intro: "A Considered Bathroom Detail From The Villa", features: [], images: ["bath-1"] }],
  },
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