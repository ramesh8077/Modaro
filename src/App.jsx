import { useEffect } from "react";
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
import Amenities from "./Pages/Amenities";
import GalleryPage from "./Pages/GalleryPage";
import Location from "./Pages/Location";
import BookingSearch from "./components/BookingSearch";

export default function App() {
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
  return (
    <>
    <Preloader />
    <div id="app-root">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ivory focus:p-3">Skip to content</a>
      <Nav />
      <main id="main">
        <MotionPage key={pathname}>
        <Routes>
          {/* Retained public routes only; Rooms uses its existing section anchor, and Book Now uses /booking. */}
          <Route path="/" element={<Home />} />
          <Route path="/the-villa" element={<TheVilla />} />
          {/* Rooms is the existing Bedrooms section on The Villa page. */}
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/gallery" element={<GalleryPage />} />
          {/* Location is a dedicated page using the existing Location section layout. */}
          <Route path="/location" element={<Location />} />
          <Route path="/booking" element={<BookingSearch />} />
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
