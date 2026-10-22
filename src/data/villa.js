import { villaPage as content } from "./site.js";
import { assets } from "./assets.js";

export const villaPage = {
  ...content,
  hero: { ...assets.entry, focus: "center 55%" },
  intro: { ...content.intro, main: assets.poolside, small: assets.pavilion },
  chapters: [
    { ...content.chapters[0], img: assets.pool }, { ...content.chapters[1], img: assets.driveway, img2: assets.pavilion },
    { ...content.chapters[2], img: assets.court, img2: assets.pickleball },
  ],
  gallery: [
    { ...assets.pool, caption: "By the pool", cls: "col-span-2" }, { ...assets.driveway, caption: "A green arrival", cls: "row-span-2" },
    { ...assets.court, caption: "Room to play", cls: "" }, { ...assets.poolside, caption: "Poolside moments", cls: "" },
    { ...assets.dining, caption: "Evenings together", cls: "col-span-2" }, { ...assets.pavilion, caption: "Among the gardens", cls: "" },
  ],
  cta: assets.living,
};
