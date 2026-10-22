import { useRef } from "react";
import { celebrationsPage as c } from "../data/site";
import { usePageMeta } from "../lib/meta";
import { useCelebMotion } from "../lib/celebMotion";
import { CelebHero, Stage, Interlude, Setting } from "../components/CelebSections";
import CelebClosing from "../components/CelebForm";

export default function Celebrations() {
  usePageMeta(c.meta.title, c.meta.description);
  const root = useRef(null);
  useCelebMotion(root);
  return (
    <div ref={root}>
      <CelebHero /><Stage /><Interlude /><Setting /><CelebClosing />
    </div>
  );
}
