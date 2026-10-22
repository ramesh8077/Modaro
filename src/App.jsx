import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { scrollToTarget, resetScroll, getHashTarget } from "./lib/motion";
import MotionPage from "./components/MotionPage";
import { site } from "./data/site";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Home from "./Pages/Home";
import TheVilla from "./Pages/TheVilla";
import OurStory from "./Pages/OurStory";
import Experiences from "./Pages/Experiences";
import Celebrations from "./Pages/Celebrations";
import GalleryPage from "./Pages/GalleryPage";
import BookingSearch from "./components/BookingSearch";
import Admin from "./Pages/Admin";

export default function App() {
  const [type, setType] = useState("Stay");
  const { pathname, hash } = useLocation();
  // Route changes: jump to the hash target (e.g. "/#story") or back to the top.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const t = getHashTarget(hash);
      if (t) scrollToTarget(t, true);
      else resetScroll();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);
  useEffect(() => {
    const cleanText = () => {
      const root = document.getElementById("app-root");
      if (!root) return;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      let node;
      while ((node = walker.nextNode())) nodes.push(node);
      nodes.forEach((textNode) => {
        if (textNode.parentElement?.closest("script,style,textarea,input")) return;
        if (textNode.nodeValue.includes(".")) textNode.nodeValue = textNode.nodeValue.replace(/\./g, "");
      });
    };
    cleanText();
    const observer = new MutationObserver(cleanText);
    observer.observe(document.getElementById("app-root"), { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, []);
  const p = { type, setType };
  return (
    <>
    <Preloader />
    <div id="app-root">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ivory focus:p-3">Skip to content</a>
      <Nav />
      <main id="main">
        <MotionPage key={pathname}>
        <Routes>
          <Route path="/" element={<Home {...p} />} />
          <Route path="/the-villa" element={<TheVilla {...p} />} />
          <Route path="/our-story" element={<OurStory {...p} />} />
          <Route path="/experiences" element={<Experiences {...p} />} />
          <Route path="/celebrations" element={<Celebrations />} />
          <Route path="/gallery" element={<GalleryPage {...p} />} />
          <Route path="/booking" element={<BookingSearch />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </MotionPage>
      </main>
      <Footer />
      <Cursor />
      {site.conceptImagery && !["/", "/the-villa"].includes(pathname) && <p className="fixed bottom-3 left-3 z-30 bg-charcoal/80 px-3 py-1 text-[11px] text-ivory">Concept preview: photos are placeholders</p>}
    </div>
    </>
  );
}
