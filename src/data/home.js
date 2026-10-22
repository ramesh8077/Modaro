import { site } from "./site.js";
import { assets } from "./assets.js";

export const homeSite = {
  ...site,
  images: { ...site.images, villaMain: { ...assets.entry, focus: "center 58%" }, villaSmall: assets.poolside, story: assets.driveway, celebrations: assets.outdoorDining },
  chapters: site.chapters.map((chapter, i) => ({ ...chapter, img: [assets.dining, assets.pool, assets.pavilion][i] })),
  experiences: site.experiences.map((experience, i) => ({ ...experience, img: [assets.pool, assets.pickleball, assets.driveway, assets.living][i] })),
  gallery: [
    { ...assets.bedroomOne, cls: "row-span-2" }, { ...assets.entry, cls: "col-span-2" }, { ...assets.pavilion, cls: "" }, { ...assets.pickleball, cls: "" },
    { ...assets.outdoorDining, cls: "col-span-2" }, { ...assets.driveway, cls: "row-span-2" }, { ...assets.pool, cls: "" }, { ...assets.living, cls: "" },
  ],
};
