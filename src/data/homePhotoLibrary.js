const imageModules = import.meta.glob("../assets/**/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
});

// Several files in the source folders are duplicate exports of the same photo.
// Keep one representative of each repeated scene so the home page never repeats it.
const duplicateExports = new Set([
  "../assets/BedroomIMG/1 (6).png", "../assets/BedroomIMG/1 (5).png", "../assets/BedroomIMG/1 (9).png",
  "../assets/BedroomIMG/2 (6).png", "../assets/BedroomIMG/2 (5).png", "../assets/BedroomIMG/2 (9).png",
  "../assets/BedroomIMG/3 (6).png", "../assets/BedroomIMG/3 (5).png", "../assets/BedroomIMG/3 (9).png",
  "../assets/BedroomIMG/4 (6).png",
  "../assets/DinningIMG/1 (4).png", "../assets/DinningIMG/2 (4).png", "../assets/DinningIMG/3 (4).png",
  "../assets/KitchenIMG/1 (3).png", "../assets/KitchenIMG/2 (3).png", "../assets/KitchenIMG/3 (3).png", "../assets/KitchenIMG/4 (9).png",
  "../assets/LivingRoomIMG/3 (2).png",
  "../assets/OutdoorIMG/1 (1).png", "../assets/OutdoorIMG/1 (13).png",
  "../assets/OutdoorIMG/10 (1).png", "../assets/OutdoorIMG/10 (2).png",
  "../assets/OutdoorIMG/2 (13).png", "../assets/OutdoorIMG/2 (14).png",
  "../assets/OutdoorIMG/3 (1).png", "../assets/OutdoorIMG/3 (13).png", "../assets/OutdoorIMG/3 (14).png", "../assets/OutdoorIMG/4 (7).png", "../assets/OutdoorIMG/4 (8).png",
  "../assets/OutdoorIMG/5 (3).png", "../assets/OutdoorIMG/5.png",
  "../assets/OutdoorIMG/6 (1).png", "../assets/OutdoorIMG/6 (2).png",
  "../assets/OutdoorIMG/7 (1).png", "../assets/OutdoorIMG/7 (2).png",
  "../assets/OutdoorIMG/8 (1).png", "../assets/OutdoorIMG/8 (2).png",
  "../assets/OutdoorIMG/9 (1).png", "../assets/OutdoorIMG/9 (2).png",
]);

const availablePaths = Object.keys(imageModules)
  .filter((path) => !path.endsWith("ModeroLogo.png") && !duplicateExports.has(path))
  .sort();
const assignedPaths = new Set();

function photo(path, alt) {
  const key = `../assets/${path}`;
  const src = imageModules[key];
  if (!src) throw new Error(`Home page image is missing: ${path}`);
  if (assignedPaths.has(key)) throw new Error(`Home page image is assigned more than once: ${path}`);
  assignedPaths.add(key);
  const portrait = path === "BedroomIMG/4 (4).png";
  const jpeg = path.startsWith("ModeroIMG/");
  const brandedAlt = alt.startsWith("Villa Modaro") ? alt : `Villa Modaro — ${alt}`;
  return { src, alt: brandedAlt, w: portrait ? 1024 : jpeg ? 1600 : 1536, h: portrait ? 1536 : jpeg ? 1200 : 1024 };
}

export const homePhotoSets = {
  story: photo("HouseEntryIMG/1 (2).png", "The Villa Modaro entrance and landscaped grounds"),
  interior: [
    photo("LivingRoomIMG/1 (2).png", "The villa living room with warm wood and soft seating"),
    photo("BedroomIMG/1 (7).png", "A warmly lit Villa Modaro bedroom"),
    photo("KitchenIMG/3 (15).png", "The bright villa kitchen with garden-facing windows"),
  ],
  amenities: [
    photo("OutdoorIMG/2 (1).png", "Poolside seating beneath a garden umbrella"),
    photo("OutdoorIMG/4.png", "Guests sharing dinner beneath the garden lights"),
    photo("OutdoorIMG/8.png", "Guests playing pickleball on the garden court"),
    photo("DinningIMG/3 (12).png", "Guests sharing a meal around the dining table"),
    photo("OutdoorIMG/10.png", "The tree-lined driveway leading to the villa"),
    photo("BedroomIMG/2 (7).png", "A second view of a comfortable villa bedroom"),
    photo("OutdoorIMG/3.png", "A group sharing dinner outdoors at the villa"),
    photo("OutdoorIMG/9.png", "A quiet yoga moment on the villa lawn"),
  ],
  offers: [
    photo("ModeroIMG/WhatsApp Image 2026-10-05 at 12.12.51 PM (1).jpeg", "A welcoming shared living and dining space"),
    photo("OutdoorIMG/5 (2).png", "The blue-tiled pool framed by palms"),
    photo("BarIMG/2 (8).png", "Guests gathering for a relaxed celebration"),
    photo("OutdoorIMG/7.png", "The outdoor pickleball court at Villa Modaro"),
    photo("OutdoorIMG/1 (14).png", "A garden table ready for an outdoor meal"),
    photo("OutdoorIMG/6.png", "The open-air pavilion surrounded by lawn"),
  ],
  browse: [
    photo("ModeroIMG/WhatsApp Image 2026-10-05 at 12.13.00 PM (1).jpeg", "A garden pavilion at Villa Modaro"),
    photo("ModeroIMG/WhatsApp Image 2026-10-05 at 12.12.58 PM (2).jpeg", "An outdoor seating area in the evening"),
    photo("BarIMG/1 (8).png", "Guests relaxing together in the villa lounge"),
    photo("BarIMG/3 (8).png", "The villa games room with a pool table"),
  ],
  editorial: [
    photo("DinningIMG/1 (12).png", "A shared dining table in the villa living area"),
    photo("OutdoorIMG/4 (1).png", "A shaded outdoor dining table beside the pool"),
    photo("ModeroIMG/WhatsApp Image 2026-10-05 at 12.13.00 PM (2).jpeg", "A view of the pickleball court and gardens"),
    photo("LivingRoomIMG/4 (2).png", "Friends spending time together in the living room"),
  ],
  experiences: [
    photo("OutdoorIMG/5.png", "The blue-tiled swimming pool framed by palms"),
    photo("OutdoorIMG/8 (1).png", "Guests playing pickleball on the garden court"),
    photo("OutdoorIMG/6 (1).png", "The garden pavilion surrounded by lawn and greenery"),
    photo("LivingRoomIMG/2 (2).png", "A quiet seating corner in the villa living room"),
  ],
  moments: [
    photo("OutdoorIMG/3 (1).png", "Shaded seating beside the swimming pool"),
    photo("DinningIMG/2 (12).png", "A shared meal beside the dining room fireplace"),
    photo("ModeroIMG/WhatsApp Image 2026-10-05 at 12.12.56 PM (3).jpeg", "A welcoming lounge for time together"),
    photo("ModeroIMG/WhatsApp Image 2026-10-05 at 12.12.59 PM (1).jpeg", "A pool table ready for a friendly game"),
  ],
  dining: photo("OutdoorIMG/1.png", "A thoughtfully set outdoor dining table at the villa"),
  closing: photo("ModeroIMG/WhatsApp Image 2026-10-05 at 12.12.54 PM (1).jpeg", "A restful bedroom at Villa Modaro"),
};

const galleryLabels = {
  BarIMG: "A social moment in the villa games room",
  BedroomIMG: "A bedroom detail at Villa Modaro",
  DinningIMG: "A dining space at Villa Modaro",
  KitchenIMG: "A detail from the villa kitchen",
  LivingRoomIMG: "A living space at Villa Modaro",
  ModeroIMG: "A candid view inside Villa Modaro",
  OutdoorIMG: "A view of the villa grounds and outdoor spaces",
};

const specificGalleryLabels = {
  "BarIMG/1 (8).png": "Guests sharing a meal at the villa bar",
  "BarIMG/2 (8).png": "Guests chatting at the villa bar counter",
  "BarIMG/3 (8).png": "Guests playing pool at the villa",
  "BarIMG/4 (5).png": "A guest lining up a shot on the pool table",
  "BedroomIMG/3 (10).png": "Villa bathroom with a vessel sink and toilet",
  "LivingRoomIMG/5 (1).png": "Plant-lined hallway inside Villa Modaro",
};

export const homeGalleryPhotos = availablePaths
  .filter((path) => !assignedPaths.has(path))
  .map((path) => {
    const category = path.split("/")[2];
    const portrait = path === "../assets/BedroomIMG/4 (4).png";
    const jpeg = path.startsWith("../assets/ModeroIMG/");
    return {
      src: imageModules[path],
      alt: (() => {
        const label = specificGalleryLabels[path.replace("../assets/", "")] || galleryLabels[category] || "photo";
        return label.startsWith("Villa Modaro") ? label : `Villa Modaro — ${label}`;
      })(),
      w: portrait ? 1024 : jpeg ? 1600 : 1536,
      h: portrait ? 1536 : jpeg ? 1200 : 1024,
    };
  });
