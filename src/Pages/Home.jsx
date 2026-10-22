import { site } from "../data/site";
import { homeSite } from "../data/home";
import { usePageMeta } from "../lib/meta";
import Hero from "../components/Hero";
import { Villa, Story, Experiences, Celebrations, Location, ClosingInvite } from "../components/Sections";
import Chapters from "../components/Chapters";
import Gallery from "../components/Gallery";
import Enquiry from "../components/Enquiry";
import BookingSearch from "../components/BookingSearch";

export default function Home({ type, setType }) {
  usePageMeta(site.meta.title, site.meta.description);
  return (
    <>
      <Hero /><BookingSearch embedded /><Villa /><Chapters /><Story /><Experiences />
      <Celebrations onPlan={() => setType("Celebration")} />
      <Gallery items={homeSite.gallery} title="A first look at Villa Modaro" /><Location /><ClosingInvite /><Enquiry type={type} setType={setType} />
    </>
  );
}
