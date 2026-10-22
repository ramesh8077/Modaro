import { storyPage as s } from "../data/site";
import { usePageMeta } from "../lib/meta";
import { StoryHero, Longing, Discovery, Stage, Transformation, Values, Today, Closing } from "../components/StorySections";
import Enquiry from "../components/Enquiry";

export default function OurStory({ type, setType }) {
  usePageMeta(s.meta.title, s.meta.description);
  return (
    <>
      <StoryHero /><Longing /><Discovery /><Stage /><Transformation />
      <Values /><Today /><Closing setType={setType} />
      <Enquiry type={type} setType={setType} />
    </>
  );
}
