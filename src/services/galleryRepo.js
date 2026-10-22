import { properties, categories, images } from "../data/gallery";

// The UI only talks to this repository. To go full-stack, replace the body of getGallery with a fetch
// (for example GET /api/properties/:id/gallery) that returns the same { properties, categories, images } shape.
export const galleryRepo = {
  async getGallery() {
    const usedCats = new Set(images.map((i) => i.categoryId)), usedProps = new Set(images.map((i) => i.propertyId));
    return {
      properties: properties.filter((p) => usedProps.has(p.id)).sort((a, b) => a.sortOrder - b.sortOrder),
      categories: categories.filter((c) => usedCats.has(c.id)).sort((a, b) => a.sortOrder - b.sortOrder), // no empty categories
      images: [...images].sort((a, b) => a.sortOrder - b.sortOrder),
    };
  },
};
