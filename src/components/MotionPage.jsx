import { useRef } from "react";
import { useMotion } from "../lib/motion";

// The route key must be on this component, not its DOM node. On deletion,
// its layout-effect cleanup restores GSAP pin wrappers before React removes
// the descendant sections. An effect in the persistent App runs too late.
export default function MotionPage({ children }) {
  const root = useRef(null);
  useMotion(root);
  return <div ref={root}>{children}</div>;
}
