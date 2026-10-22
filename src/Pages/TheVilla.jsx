import { useMemo, useState } from "react";
import { villaPageMeta } from "../data/villaMeta";
import { usePageMeta } from "../lib/meta";
import { sections, realImages, spaceImages, toViewer, galleryData } from "../data/villaTour";
import { TourHero, Overview, TourSection } from "../components/TourSections";
import SpaceNav from "../components/SpaceNav";
import GalleryBrowser from "../components/GalleryBrowser";
import Lightbox from "../components/Lightbox";
import AvailabilityPanel from "../components/AvailabilityPanel";

export default function TheVilla() {
  usePageMeta(villaPageMeta.title, villaPageMeta.description);
  const all = useMemo(() => realImages(), []), gallery = useMemo(() => galleryData(), []);
  const [lb, setLb] = useState({ items: [], index: null });
  const openList = (list, id) => { const items = list.map(toViewer); if (items.length) setLb({ items, index: Math.max(0, items.findIndex((i) => i.id === id)) }); };
  const nav = [{ id: "overview", label: "Overview" }, ...sections.map((s) => ({ id: s.id, label: s.nav })), ...(all.length ? [{ id: "photos", label: "All Photos" }] : [])];
  return (
    <>
      <TourHero count={all.length} openAll={(id) => openList(all, id)} />
      <SpaceNav items={nav} />
      <Overview />
      {sections.map((s) => <TourSection key={s.id} section={s} open={(space, id) => openList(spaceImages(space), id)} />)}
      {all.length > 0 && (
        <section id="photos" data-scroll-extra="56" style={{ scrollMarginTop: 128 }} className="bg-ivory">
          <div className="mx-auto max-w-360 px-6 pt-20 lg:px-12 lg:pt-28"><h2 data-reveal className="h2">All photographs</h2></div>
          <GalleryBrowser data={gallery} onProperty={() => {}} sticky={false} />
        </section>
      )}
      <AvailabilityPanel />
      <Lightbox items={lb.items} index={lb.index} onIndex={(i) => setLb((s) => ({ ...s, index: i }))} onClose={() => setLb((s) => ({ ...s, index: null }))} thumbs label="Villa photographs" />
    </>
  );
}
