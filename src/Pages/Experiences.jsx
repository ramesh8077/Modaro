import { experiencesPage as e } from "../data/site";
import { usePageMeta } from "../lib/meta";
import { ExpHero, ExpIntro, Pool, Garden, Pickle, Together, GuestNotes, DayRow, ExpClosing } from "../components/ExpSections";
import Explorer from "../components/Explorer";
import Gallery from "../components/Gallery";

export default function Experiences() {
  usePageMeta(e.meta.title, e.meta.description);
  return (
    <>
      <ExpHero />
      <div data-tones className="bg-ivory text-charcoal">
        <ExpIntro /><GuestNotes /><Explorer /><Pool /><Garden /><Pickle />
        <Together /><DayRow />
        <div data-tone="ivory"><Gallery items={e.gallery} title="Moments worth keeping" /></div>
        <ExpClosing />
      </div>
    </>
  );
}
