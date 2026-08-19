import { useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { MobileNav } from "./components/MobileNav/MobileNav";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { normalizePath } from "./data/navigation";
import { usePageAnalytics } from "./hooks/usePageAnalytics";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { GetInvolvedPage } from "./pages/GetInvolvedPage";
import { HomePage } from "./pages/HomePage";
import { ImpactPage } from "./pages/ImpactPage";
import { LegacyPage } from "./pages/LegacyPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OurStoryPage } from "./pages/OurStoryPage";
import { OurWorkPage } from "./pages/OurWorkPage";
import { PressPage } from "./pages/PressPage";
import { WomenAtCrossroadsPage } from "./pages/WomenAtCrossroadsPage";
import "./App.css";

function App() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const isHome = normalizePath(pathname) === "/";

  // Belt and braces for the mobile menu: the nav links close it themselves,
  // but a back/forward gesture changes the route without touching them.
  // Adjusted during render rather than in an effect, so the menu is never
  // painted over the incoming page.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  const { isScrolled, scrollProgress } = useScrollProgress(pathname);

  useRevealOnScroll(pathname);
  usePageAnalytics(pathname);

  return (
    <div className="site-shell">
      <ScrollToTop />
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />
      <Header
        scrolled={isScrolled || !isHome}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
      />

      {/* Kept as the header's immediate sibling: `.header-scrolled +
          .mobile-nav` positions the open menu under the shrunken header. */}
      {menuOpen && <MobileNav onNavigate={() => setMenuOpen(false)} />}

      <main className={isHome ? "page-home" : "inner-page"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/legacy" element={<LegacyPage />} />
          <Route path="/our-work" element={<OurWorkPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route
            path="/women-at-crossroads"
            element={<WomenAtCrossroadsPage />}
          />
          <Route path="/press" element={<PressPage />} />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isHome && <Footer />}
    </div>
  );
}

export default App;
