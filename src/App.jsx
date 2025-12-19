import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

// Components
import ImageUpload from "./components/ImageUpload";
import SeoHead from "./components/SeoHead";
import SeoText from "./components/SeoText";
import AdPlaceholder from "./components/AdPlaceholder";

// Tools
import CropTool from "./tools/CropTool";

// Pages
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";

export default function App() {
  const [image, setImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="nav-inner">
          <Link to="/" className="brand">
            SnapSizes
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-links desktop-only">
            <Link to="/">Home</Link>
            <Link to="/donate">Donate</Link>
            <Link to="/about">About</Link>
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="menu-btn mobile-only"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {menuOpen && (
          <>
            <div
              className="menu-overlay"
              onClick={() => setMenuOpen(false)}
            />

            <nav className="mobile-menu">
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/donate" onClick={() => setMenuOpen(false)}>Donate</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
              <Link to="/privacy-policy" onClick={() => setMenuOpen(false)}>
                Privacy
              </Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </nav>
          </>
        )}
      </header>

      {/* ================= MAIN ================= */}
      <main className="container">
        <Routes>
          {/* ================= HOME ================= */}
          <Route
            path="/"
            element={
              <>
                <SeoHead
                  title="SnapSizes – Free Image Resizer Online"
                  description="Resize images online for social media and custom pixel sizes. Free, fast, and privacy-friendly image resizer."
                  canonical="https://snapsizes.vercel.app/"
                />

                {/* MAIN TOOL */}
                <section className="tool-card">
                  <h1 className="tool-title">Resize Image Instantly</h1>
                  <p className="tool-subtitle">
                    Upload an image and resize it instantly
                  </p>

                  <ImageUpload onImageSelect={setImage} />
                  {image && <CropTool image={image} />}
                </section>

                {/* ✅ ADSENSE SAFE AD SLOT */}
                <AdPlaceholder position="home-inline" />

                {/* SEO CONTENT */}
                <section className="seo-section">
                  <SeoText />
                </section>
              </>
            }
          />

          {/* ================= STATIC PAGES ================= */}
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        © {new Date().getFullYear()} SnapSizes ·{" "}
        <Link to="/about">About</Link> ·{" "}
        <Link to="/privacy-policy">Privacy</Link> ·{" "}
        <Link to="/contact">Contact</Link> ·{" "}
        <Link to="/donate">Donate</Link>
      </footer>
    </div>
  );
}