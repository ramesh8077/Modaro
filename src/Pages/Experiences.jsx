import { experiencesPage as e } from "../data/site";
import { usePageMeta } from "../lib/meta";
import { ExpHero, ExpIntro, Pool, Garden, Pickle, Together, GuestNotes, DayRow, ExpClosing } from "../components/ExpSections";
import Explorer from "../components/Explorer";
import Gallery from "../components/Gallery";
import Enquiry from "../components/Enquiry";

export default function Experiences({ type, setType }) {
  usePageMeta(e.meta.title, e.meta.description);
  return (
    <>
      <ExpHero setType={setType} />
      <div data-tones className="bg-ivory text-charcoal">
        <ExpIntro /><GuestNotes /><Explorer setType={setType} /><Pool /><Garden /><Pickle />
        <Together setType={setType} /><DayRow />
        <div data-tone="ivory"><Gallery items={e.gallery} title="Moments worth keeping" /></div>
        <ExpClosing setType={setType} />
      </div>
      <Enquiry type={type} setType={setType} />
    </>
  );
}
