import { usePageMeta } from "../lib/meta";
import { StoryHero, StoryBanner, Longing, Discovery, Stage, Transformation, Today } from "../components/StorySections";
import AmenitiesGrid from "../components/AmenitiesGrid";

export default function Amenities() {
  usePageMeta("Amenities | Villa Modaro", "Explore Villa Modaro's story and the thoughtful essentials available during your stay.");

  return (
    <>
      {/* The complete Our Story sequence is moved here unchanged, above the existing amenities content. */}
      <StoryHero />
      <StoryBanner />
      <Longing />
      <Discovery />
      <Stage />
      <Transformation />
      <Today />

      {/* Preserve the existing AmenitiesGrid below the moved story sections. */}
      <AmenitiesGrid />
    </>
  );
}
