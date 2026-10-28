import { usePageMeta } from "../lib/meta";
import { StoryHero, StoryBanner, Longing, Discovery, Stage, Transformation } from "../components/StorySections";
import AmenitiesGrid from "../components/AmenitiesGrid";

export default function Amenities() {
  usePageMeta("Amenities | Villa Modaro", "Explore Villa Modaro's story and the thoughtful essentials available during your stay.");

  return (
    <>
      <StoryHero />
      <StoryBanner />
      <Longing />
      <Discovery />
      <Stage />
      <Transformation />

      <AmenitiesGrid />
    </>
  );
}