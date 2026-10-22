import { useCallback, useEffect, useState } from "react";
import { galleryRepo } from "../services/galleryRepo";

// status: "loading" | "loaded" | "error". No artificial delay: a local repo resolves immediately.
export function useGallery() {
  const [s, setS] = useState({ status: "loading" });
  const load = useCallback(() => {
    let live = true;
    setS({ status: "loading" });
    galleryRepo.getGallery().then((d) => live && setS({ status: "loaded", ...d })).catch(() => live && setS({ status: "error" }));
    return () => { live = false; };
  }, []);
  useEffect(() => load(), [load]);
  return { ...s, reload: load };
}
