import { site } from "./site.js";
import { assets } from "./assets.js";
import { homeGalleryPhotos, homePhotoSets } from "./homePhotoLibrary.js";

export const homeSite = {
  ...site,
  images: { ...site.images, villaMain: { ...assets.entry, focus: "center 58%" }, villaSmall: assets.poolside, story: homePhotoSets.story, celebrations: homePhotoSets.closing },
  chapters: site.chapters.map((chapter, i) => ({ ...chapter, img: [assets.dining, assets.pool, assets.pavilion][i] })),
  experiences: site.experiences.map((experience, index) => ({
    ...experience,
    img: homePhotoSets.experiences[index],
  })),
  gallery: homeGalleryPhotos.map((image, index) => ({ ...image, cls: index % 9 === 0 ? "row-span-2" : index % 7 === 0 ? "col-span-2" : "" })),
};
