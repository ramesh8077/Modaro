import { storyPage as s } from "../data/site";
import { usePageMeta } from "../lib/meta";
import { StoryHero, StoryBanner, Longing, Discovery, Stage, Transformation, Values, Today } from "../components/StorySections";

export default function OurStory({ type, setType }) {
  usePageMeta(s.meta.title, s.meta.description);
  return (
    <>
      <StoryHero /><StoryBanner /><Longing /><Discovery /><Stage /><Transformation />
     <Today />
    </>
  );
}
