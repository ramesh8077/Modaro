// Central config: edit copy, images and contact details here.
// Images: set `src` to a file in /public (e.g. "/images/hero.jpg") or an import. Empty src shows a placeholder.
import { assets } from "./assets.js";
import outdoorEvening from "../assets/OutdoorIMG/2.png";
import outdoorGathering from "../assets/OutdoorIMG/4.png";
import barCounter from "../assets/BarIMG/2 (8).png";
const img = (alt, focus = "center", w = 1600, h = 1066) => ({ src: "", alt, focus, w, h });

export const site = {
  name: "Villa Modaro",
  tagline: "An Oasis of Celebration & Calm",
  conceptImagery: false,
  contact: {
    email: "stay@villamodaro.com", // client-provided placeholder; replace if the final address changes
    phone: "",    // verified phone -> shown in footer
    whatsapp: "", // full https://wa.me/... URL, only when verified
    instagram: "",
    mapUrl: "",   // exact Google Maps URL -> enables "Get directions"
  },
  // Footer allowlist mirrors the approved header items (Home and Book Now are separate controls).
  nav: [
    ["The Villa", "/the-villa"], ["Rooms", "/the-villa#bedrooms"],
    ["Amenities", "/amenities"], ["Gallery", "/gallery"], ["Location", "/location"],
  ],
  images: {
    hero: img("Villa Modaro surrounded by greenery", "center 60%", 2000, 1200),
    villaMain: img("The villa and its landscaped grounds", "center", 1200, 1500),
    villaSmall: img("A quiet corner of the villa", "center", 900, 900),
    story: img("Greenery along the expressway site", "center", 1200, 1500),
    celebrations: img("A gathering at the villa", "center", 1800, 1200),
  },
  chapters: [
    { title: "Celebrate", text: "Bring friends and family together for birthdays, intimate anniversaries and gatherings in a private setting made for sharing life's milestones.", img: img("Guests gathered for a celebration", "center", 1400, 1000) },
    { title: "Unwind", text: "Spend a slow afternoon by the plunge pool, wander the landscaped gardens or enjoy a quiet getaway near Mohand Forest.", img: img("The pool in afternoon light", "center", 1400, 1000) },
    { title: "Reconnect", text: "Three bedrooms, a lounge and bar, a drawing-cum-dining room and kitchen make space for six guests plus kids to reconnect and enjoy time together.", img: img("Garden path among greenery", "center", 1400, 1000) },
  ],
  experiences: [
    { title: "Poolside living", text: "Slow afternoons and easy gatherings by the water.", category: "Pool", img: img("Poolside seating", "center", 1400, 1000), span: "lg:col-span-7" },
    { title: "Pickleball and play", text: "Friendly games, shared between friends and family.", category: "Activities", img: img("Pickleball court", "center", 900, 1200), span: "lg:col-span-5 lg:mt-24" },
    { title: "Garden escapes", text: "Landscaped paths for quiet walks among the greenery.", category: "Nature", img: img("Landscaped gardens", "center", 900, 1200), span: "lg:col-span-5" },
    { title: "Time together", text: "Easy conversation and nowhere else to be.", category: "Social", img: img("Friends and family together", "center", 1400, 1000), span: "lg:col-span-7 lg:mt-24" },
  ],
  gallery: [
    { ...img("Villa exterior", "center", 1200, 1600), cls: "row-span-2" },
    { ...img("Pool area", "center", 1600, 1066), cls: "col-span-2" },
    { ...img("Garden path", "center", 1200, 1200), cls: "" },
    { ...img("Pickleball court", "center", 1200, 1200), cls: "" },
    { ...img("Evening gathering", "center", 1600, 1066), cls: "col-span-2" },
    { ...img("Greenery near the villa", "center", 1200, 1600), cls: "row-span-2" },
    { ...img("Poolside detail", "center", 1200, 1200), cls: "" },
    { ...img("Outdoor seating", "center", 1200, 1200), cls: "" },
  ],
  meta: {
    title: "Villa Modaro — Luxury Stay in Uttarakhand",
    description: "Book Villa Modaro — an oasis of celebration & calm near Mohand Forest. Pool, pickleball, bonfire, live bar & bespoke celebrations.",
  },
};


// ---- Our Story page (/our-story). 2020 = year the land was discovered, NOT an opening date. ----
const si = (alt, focus = "center", w = 1600, h = 1066, caption) => ({ src: "", alt, focus, w, h, caption });
export const storyPage = {
  meta: {
    title: "Our Story · Villa Modaro",
    description: "Discover how a wish to gather during the lockdown years led to Villa Modaro, a private retreat found along the Balupur–Paonta Sahib Expressway near Mohand Forest.",
  },
  hero: si("Greenery surrounding Villa Modaro", "center 55%", 2000, 1300),
  longing: {
    title: "A wish to gather again.",
    text: "The idea of Villa Modaro was born during the lockdown years, a time when celebrations felt at risk and the joy of gathering seemed distant. Out of that longing came the vision for a place where friends and families could reconnect freely, without disturbance or restriction.",
  },
  discovery: {
    title: "A place for the possibility.",
    text: "In 2020, a parcel of land was discovered along the Balupur–Paonta Sahib Expressway. It offered a rare balance: close to the road, yet set apart, near Mohand Forest and wrapped in greenery. It was not yet a villa. It was a possibility, and it held the promise of the place we had been imagining.",
    img: si("Greenery on the grounds of Villa Modaro", "center", 1200, 1500, "The grounds of Villa Modaro today"),
    img2: si("Trees near the villa", "center", 900, 900),
  },
  stage: [
    { label: "Arrive with ease", text: "On-site parking is available for guests arriving at Villa Modaro. Stay connected throughout your time at the villa with Wi-Fi.", img: si("Villa Modaro driveway and guest parking", "center", 1400, 1000) },
    { label: "Everyday comforts", text: "A kitchen and refrigerator are available for practical needs during your stay, with the comforts of a clean and thoughtfully maintained setup.", img: si("Villa Modaro kitchen with refrigerator", "center", 1400, 1000) },
    { label: "Peace of mind", text: "Security arrangements are in place at the property, with CCTV included as part of Villa Modaro's security setup.", img: si("Villa Modaro property entrance and security", "center", 1400, 1000) },
  ],
  transformation: {
    title: "Shaped with patience. Made for people.",
    text: "Years of dedication transformed the land into an outhouse-style retreat shaped with passion and built to host life's milestones. Surrounded by nature and clean Himalayan air near Mohand Forest, Villa Modaro makes room for celebration, connection and unhurried time outdoors.",
    img: si("Villa Modaro today", "center", 1400, 1000, "The villa today"),
    img2: si("Time outdoors at the villa", "center", 900, 1100, "Time outdoors"),
  },
  values: [
    { title: "Togetherness", text: "Time with the people who matter." },
    { title: "Celebration", text: "A setting for personal milestones." },
    { title: "Calm", text: "Space to slow down and enjoy the outdoors." },
  ],
  today: {
    title: "Today, the story continues with you.",
    items: ["Quiet rooms to recharge", "Pickleball and outdoor play", "Slow mornings on the lawn", "Time together in shared spaces"],
    imgs: [si("Poolside afternoon", "center", 1000, 1300), si("Garden moment", "center", 1000, 1300), si("A game of pickleball", "center", 1000, 1300)],
  },
};

// ---- Experiences page (/experiences). Suggested moments only: no packages, prices or confirmed services. ----
const ei = (alt, focus = "center", w = 1600, h = 1066, caption) => ({ src: "", alt, focus, w, h, caption });
export const experiencesPage = {
  meta: {
    title: "Experiences · Villa Modaro",
    description: "Poolside afternoons, landscaped gardens, pickleball and celebrations: discover the experiences at Villa Modaro, a private retreat along the Balupurâ€“Paonta Sahib Expressway near Mohand Forest.",
  },
  // Demo content for the carousel only; replace with verified guest feedback before launch.
  testimonials: [
    { id: "sample-01", quote: "A beautifully calm setting for time together, with every corner inviting us to slow down", name: "Sample guest review", detail: "Demo content · replace before launch", image: null },
    { id: "sample-02", quote: "The pool, gardens and shared spaces made it easy to spend the whole day together", name: "Sample guest review", detail: "Demo content · replace before launch", image: null },
    { id: "sample-03", quote: "A thoughtful retreat for an unhurried celebration with the people who matter most", name: "Sample guest review", detail: "Demo content · replace before launch", image: null },
    { id: "sample-04", quote: "The villa gave our group the space to reconnect, relax and enjoy the day at our own pace", name: "Sample guest review", detail: "Demo content · replace before launch", image: null },
    { id: "sample-05", quote: "From quiet garden walks to evenings together, the setting made every moment feel easy", name: "Sample guest review", detail: "Demo content · replace before launch", image: null },
    { id: "sample-06", quote: "A warm and private place to gather, with thoughtful spaces for both celebration and calm", name: "Sample guest review", detail: "Demo content · replace before launch", image: null },
  ],
  hero: ei("The pool at Villa Modaro with gardens beyond", "center 55%", 2000, 1300),
  intro: {
    title: "Some days deserve a different rhythm.",
    text: "At Villa Modaro, a day can move at whatever pace you choose. Spend it in the water, wander the gardens, join a game of pickleball, or simply sit with the people you love. Relaxation, play and connection share the same grounds here, and nothing asks you to hurry.",
    img: ei("A quiet corner of the grounds", "center", 1000, 1300),
  },
  explorer: [
    { id: "unwind", label: "Unwind", title: "Poolside relaxation", text: "Refreshing dips and unhurried afternoons by the water, with nowhere else to be.", accent: "#6E9AA6", type: "Stay", cta: "Enquire About a Stay", img: ei("Relaxing by the pool", "center", 1600, 1100) },
    { id: "wander", label: "Wander", title: "Landscaped gardens", text: "Greenery, gentle paths and outdoor walks, with room for quiet conversation.", accent: "#7C8F5E", type: "Stay", cta: "Enquire About a Stay", img: ei("Landscaped garden path", "center", 1600, 1100) },
    { id: "play", label: "Play", title: "Pickleball", text: "A friendly game shared with friends and family, and plenty of laughter between points.", accent: "#B69A68", type: "Stay", cta: "Enquire About a Stay", img: ei("A game of pickleball", "center", 1600, 1100) },
    { id: "gather", label: "Gather", title: "Friends, family and celebrations", text: "Birthdays, intimate anniversaries and family get-togethers, in a private setting made for being together.", accent: "#D8C3A0", type: "Celebration", cta: "Plan a Gathering", img: ei("Friends and family together", "center", 1600, 1100) },
  ],
  pool: {
    title: "Let the afternoon linger.",
    text: "Slip into the water for a refreshing dip, then settle back and let the hours slow. The pool is where conversation drifts, where afternoons stretch, and where time together feels easy.",
    img: ei("Wide view of the pool", "center", 2200, 1100), detail: ei("Water detail by the pool", "center", 900, 1125),
  },
  garden: {
    title: "A little closer to nature.",
    text: "Landscaped greenery surrounds the villa, inviting peaceful walks and outdoor conversations. Wander without a plan, or find a quiet spot and let the green do the rest.",
    img: ei("Garden foliage", "center", 900, 1200), img2: ei("A garden path", "center", 900, 1200),
  },
  pickle: {
    title: "A little play. A lot of connection.",
    text: "Pickleball turns a free afternoon into something shared. Pick your partners, trade a few rallies, and let the easy competition bring everyone closer.",
    img: ei("Friends playing pickleball", "center", 1400, 1050), img2: ei("Pickleball detail", "center", 900, 1200),
  },
  together: {
    title: "The best moments have company.",
    text: "Whatever the occasion, Villa Modaro offers a private setting to share it. Enquire to talk through what you have in mind.",
    img: ei("An evening together at the villa", "center", 1600, 1200),
    items: [["Birthdays", "A day marked with your people."], ["Intimate anniversaries", "Quiet time, set apart."], ["Family gatherings", "Everyone together, outdoors."], ["Time with friends", "Easy hours with no agenda."]],
  },
  day: [
    { time: "Morning", text: "Quiet moments in the gardens.", img: ei("Morning in the gardens", "center", 800, 1000) },
    { time: "Afternoon", text: "Poolside relaxation and a game of pickleball.", img: ei("Afternoon by the pool", "center", 800, 1000) },
    { time: "Evening", text: "Time together.", img: ei("Evening at the villa", "center", 800, 1000) },
  ],
  gallery: [
    { ...ei("The pool", "center", 1600, 1066, "The pool"), cls: "col-span-2" },
    { ...ei("Garden greenery", "center", 1200, 1600, "Garden greenery"), cls: "row-span-2" },
    { ...ei("Pickleball", "center", 1200, 1200, "Pickleball"), cls: "" },
    { ...ei("Poolside detail", "center", 1200, 1200, "Poolside detail"), cls: "" },
    { ...ei("Gathering outdoors", "center", 1600, 1066, "Time together"), cls: "col-span-2" },
    { ...ei("Garden path", "center", 1200, 1600, "Garden path"), cls: "row-span-2" },
    { ...ei("Evening light", "center", 1200, 1200, "Evening light"), cls: "" },
    { ...ei("Outdoor seating", "center", 1200, 1200, "Outdoor seating"), cls: "" },
  ],
};


// ---- Celebrations page (/celebrations). Intimate occasions only: no packages, capacities, services or prices. ----
// `src` empty = a designed abstract plate (components/Plate.jsx) is shown instead of a photo. Add real paths to replace them.
const pl = (alt, tone, variant, w = 1600, h = 1066, focus = "center") => ({ src: "", alt, tone, variant, w, h, focus });
export const celebrationsPage = {
  meta: {
    title: "Celebrations · Villa Modaro",
    description: "Birthdays, intimate anniversaries and family get-togethers at Villa Modaro, a private retreat with a pool, landscaped gardens and pickleball, along the Balupurâ€“Paonta Sahib Expressway near Mohand Forest.",
  },
  hero: {
    label: "CELEBRATIONS AT MODARO",
    lines: ["Make room for", "remarkable", "moments."],
    text: "Birthdays, anniversaries, and the simple joy of bringing your favourite people together.",
    photoA: pl("A garden moment at Villa Modaro", "olive", "arch", 900, 1200),
    photoB: pl("Poolside at Villa Modaro", "charcoal", "lines", 1200, 900),
    invite: { kicker: "YOU ARE INVITED", monogram: "M", line: "Together, beautifully.", name: "VILLA MODARO" },
  },
  chapters: [
    { n: "01", title: "Birthdays", text: "A little more joy. A lot more together.", tone: "#183B32", img: pl("Birthday atmosphere", "olive", "arch", 1200, 1440) },
    { n: "02", title: "Anniversaries", text: "For the moments you choose to celebrate again.", tone: "#4A5139", img: pl("Anniversary atmosphere", "forest", "rings", 1200, 1440) },
    { n: "03", title: "Gatherings", text: "Your favourite people. A setting to reconnect.", tone: "#242824", img: pl("Gathering atmosphere", "charcoal", "frame", 1200, 1440) },
  ],
  interlude: {
    title: "From sunlit afternoons to evenings worth remembering.",
    text: "The pool and landscaped gardens set the mood from the first sunlit hour, and the same setting is just as welcoming as the day winds down.",
    main: pl("The pool and gardens", "forest", "lines", 1800, 1125),
    a: pl("Garden greenery", "olive", "arch", 900, 1125), b: pl("Poolside detail", "sand", "rings", 900, 900),
  },
  setting: {
    title: "A setting for your kind of celebration.",
    items: [
      { title: "Poolside moments", text: "Afternoons by the water, easy conversation, and nowhere else to be.", img: pl("Poolside", "sand", "lines", 1500, 1000) },
      { title: "Garden gatherings", text: "Landscaped greenery for slow walks and conversations between moments.", img: pl("The gardens", "olive", "arch", 1000, 1250) },
      { title: "Time together", text: "The simple joy of having your favourite people in one place.", img: pl("Time together", "forest", "frame", 1200, 1200) },
    ],
  },
  closing: {
    title: "What are we celebrating?",
    text: "Tell us a little about the occasion you have in mind.",
    options: ["Birthday", "Anniversary", "Family Gathering", "Other"],
  },
};

// Client photography mapping: each page uses distinct photographs within its own composition.
const photoRecord = (record, alt = record.alt, caption = record.caption) => ({ ...record, alt, caption: caption || alt });
const importedPhoto = (src, alt, w = 1536, h = 1024, focus = "center", caption = alt) => ({ src, alt, w, h, focus, caption });

Object.assign(storyPage, {
  hero: photoRecord(assets.entry, "Villa Modaro surrounded by landscaped lawns", "The villa today"),
  longing: { ...storyPage.longing, img: photoRecord(assets.living, "Friends sharing time in the villa living room", "Shared time at Villa Modaro") },
  discovery: { ...storyPage.discovery, img: photoRecord(assets.driveway, "Tree-lined driveway leading to Villa Modaro", "The grounds of Villa Modaro today"),  },
  stage: [
    { ...storyPage.stage[0], img: photoRecord(assets.driveway, "Villa Modaro driveway and guest parking", "Parking and arrival") },
    { ...storyPage.stage[1], img: photoRecord(assets.kitchen, "Villa Modaro kitchen with refrigerator", "Kitchen and refrigerator") },
    { ...storyPage.stage[2], img: photoRecord(assets.entry, "Villa Modaro property entrance and security", "Security and CCTV") },
  ],
  transformation: { ...storyPage.transformation, img: photoRecord(assets.outdoorDining, "Covered outdoor dining area prepared for a gathering", "The villa today"), img2: photoRecord(assets.outdoorSeating, "Poolside lounge seating under a garden umbrella", "Time outdoors") },
  today: { ...storyPage.today, imgs: [photoRecord(assets.bedroomOne, "Warmly lit villa bedroom with a double bed", "A quiet room"), photoRecord(assets.pickleball, "Guests playing pickleball on the garden court", "A game together"), photoRecord(assets.yoga, "Yoga mats on the lawn beside the pickleball court", "A slower morning")] },
});

Object.assign(experiencesPage, {
  hero: photoRecord(assets.pool, "Blue-tiled swimming pool framed by palms and greenery", "Poolside afternoons"),
  guestNotesImage: photoRecord(assets.entry, "Villa Modaro entrance with landscaped lawns and trees", "Arriving at Villa Modaro"),
  intro: { ...experiencesPage.intro, img: photoRecord(assets.pavilion, "Open garden pavilion surrounded by lawn and greenery", "A quiet corner of the grounds") },
  explorer: experiencesPage.explorer.map((item, i) => ({ ...item, img: [
    photoRecord(assets.poolside, "Shaded seating beside the villa pool", "Unhurried poolside time"),
    photoRecord(assets.driveway, "Tree-lined driveway leading to Villa Modaro", "A walk through the grounds"),
    photoRecord(assets.court, "Outdoor pickleball court set among the gardens", "A friendly game"),
    photoRecord(assets.dining, "Guests sharing dinner around the villa dining table", "Time together"),
  ][i] })),
  pool: { ...experiencesPage.pool, img: photoRecord(assets.poolDinner, "Guests sharing an evening meal at an outdoor table", "An outdoor dinner together"), detail: photoRecord(assets.outdoorSeating, "Outdoor dining table beside the pool under a garden umbrella", "Shaded poolside dining") },
  garden: { ...experiencesPage.garden, img: photoRecord(assets.pavilion, "Open garden pavilion surrounded by lawn and greenery", "The garden pavilion"), img2: photoRecord(importedPhoto(outdoorGathering, "Friends sharing dinner outdoors at Villa Modaro"), "Friends sharing dinner outdoors at Villa Modaro", "An evening outdoors") },
  pickle: { ...experiencesPage.pickle, img: photoRecord(assets.pickleball, "Guests playing pickleball on the garden court", "The court"), img2: photoRecord(assets.yoga, "Yoga mats on the lawn beside the pickleball court", "A slower start") },
  together: { ...experiencesPage.together, img: photoRecord(assets.living, "Friends relaxing together in the villa living room", "The best moments have company") },
  day: [
    { ...experiencesPage.day[0], img: photoRecord(assets.bedroomTwo, "Villa bedroom with a double bed and lounge chair", "Morning quiet") },
    { ...experiencesPage.day[1], img: photoRecord(assets.pool, "Blue-tiled swimming pool framed by palms and greenery", "An afternoon by the pool") },
    { ...experiencesPage.day[2], img: photoRecord(assets.bar, "Guests gathered around the villa bar and pool table", "Evening together") },
  ],
  gallery: [
    { ...photoRecord(assets.bedroomPortrait, "Vertical view of a villa bedroom doorway", "A quiet room"), cls: "row-span-2" },
    { ...photoRecord(assets.diningEmpty, "Villa dining table set for an evening meal", "Dinner together"), cls: "col-span-2" },
    { ...photoRecord(assets.kitchenDetail, "Kitchen worktop and breakfast preparation area", "A bright kitchen"), cls: "" },
    { ...photoRecord(importedPhoto(barCounter, "Guests at the villa bar"), "Guests at the villa bar", "A relaxed evening"), cls: "" },
    { ...photoRecord(assets.livingDetail, "Warm living room with sofa seating and a television", "A comfortable stay"), cls: "col-span-2" },
    { ...photoRecord(assets.bedroomThree, "Villa bedroom with television and reading chair", "A room to retreat to"), cls: "row-span-2" },
    { ...photoRecord(importedPhoto(outdoorEvening, "Friends sharing an evening outdoors at Villa Modaro"), "Friends sharing an evening outdoors at Villa Modaro", "Shared meals"), cls: "" },
    { ...photoRecord(assets.bedroomOne, "Warmly lit villa bedroom with a double bed", "A quiet room"), cls: "" },
  ],
});

Object.assign(celebrationsPage, {
  hero: { ...celebrationsPage.hero, photoA: photoRecord(assets.pavilion, "Open garden pavilion surrounded by lawn and greenery", "A garden setting"), photoB: photoRecord(assets.outdoorDining, "Covered outdoor dining area prepared for a gathering", "An outdoor table at dusk") },
  chapters: [
    { ...celebrationsPage.chapters[0], img: photoRecord(assets.dining, "Guests sharing dinner around the villa dining table", "Birthdays around the table") },
    { ...celebrationsPage.chapters[1], img: photoRecord(assets.poolDinner, "Outdoor dinner setting beside the pool", "An anniversary by the pool") },
    { ...celebrationsPage.chapters[2], img: photoRecord(assets.living, "Friends relaxing together in the villa living room", "A gathering made for conversation") },
  ],
  interlude: { ...celebrationsPage.interlude, main: photoRecord(assets.pool, "Blue-tiled swimming pool framed by palms and greenery", "From afternoon into evening"), a: photoRecord(assets.driveway, "Tree-lined driveway leading to Villa Modaro", "The green arrival"), b: photoRecord(assets.poolside, "Shaded seating beside the villa pool", "Poolside detail") },
  setting: { ...celebrationsPage.setting, items: [
    { ...celebrationsPage.setting.items[0], img: photoRecord(assets.outdoorSeating, "Poolside lounge seating under a garden umbrella", "Poolside moments") },
    { ...celebrationsPage.setting.items[1], img: photoRecord(importedPhoto(outdoorGathering, "Friends gathered outdoors at Villa Modaro"), "Friends gathered outdoors at Villa Modaro", "Garden gatherings") },
    { ...celebrationsPage.setting.items[2], img: photoRecord(importedPhoto(outdoorEvening, "Friends sharing an evening outdoors at Villa Modaro"), "Friends sharing an evening outdoors at Villa Modaro", "Time together") },
  ] },
});

