import { useMemo, useState } from "react";
import { villaPageMeta } from "../data/villaMeta";
import { usePageMeta } from "../lib/meta";
import { sections, realImages, spaceImages, toViewer } from "../data/villaTour";
import { TourHero, Overview, TourSection } from "../components/TourSections";
import SpaceNav from "../components/SpaceNav";
import Lightbox from "../components/Lightbox";
import AvailabilityPanel from "../components/AvailabilityPanel";

export default function TheVilla() {
  usePageMeta(villaPageMeta.title, villaPageMeta.description);

  const all = useMemo(() => realImages(), []);
  const [lb, setLb] = useState({ items: [], index: null });

  const openList = (list, id) => {
    const items = list.map(toViewer);
    if (items.length)
      setLb({ items, index: Math.max(0, items.findIndex((i) => i.id === id)) });
  };

  const nav = [
    { id: "overview", label: "Overview" },
    ...sections.map((s) => ({ id: s.id, label: s.nav })),
  ];

  return (
    <>
      <TourHero count={all.length} openAll={(id) => openList(all, id)} />
      <SpaceNav items={nav} />
      <Overview />

      {sections.map((s, index) => (
        <TourSection
          key={s.id}
          section={s}
          tone={index % 2 ? "white" : "ivory"}
          open={(space, id) => openList(spaceImages(space), id)}
        />
      ))}

      <AvailabilityPanel />

      <Lightbox
        items={lb.items}
        index={lb.index}
        onIndex={(i) => setLb((s) => ({ ...s, index: i }))}
        onClose={() => setLb((s) => ({ ...s, index: null }))}
        thumbs
        label="Villa photographs"
      />
    </>
  );
}