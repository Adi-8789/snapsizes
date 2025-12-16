import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import ImageUpload from "./components/ImageUpload";
import CropTool from "./tools/CropTool";
import SeoText from "./components/SeoText";
import SeoHead from "./components/SeoHead";

import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import InstagramResizer from "./pages/InstagramResizer";
import YouTubeShortsResizer from "./pages/YouTubeShortsResizer";
import LinkedInResizer from "./pages/LinkedInResizer";
import TwitterResizer from "./pages/TwitterResizer";

export default function App() {
  const [image, setImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      {/* ===== Navbar ===== */}
      <header className="navbar">
        <div className="nav-inner">
          <Link to="/" className="brand">
            SnapSizes
          </Link>

          {/* Desktop links */}
          <nav className="nav-links desktop-only">
            <Link to="/">Home</Link>
            <Link to="/instagram-image-resizer">Instagram</Link>
            <Link to="/youtube-shorts-image-resizer">YouTube Shorts</Link>
            <Link to="/linkedin-image-resizer">LinkedIn</Link>
            <Link to="/twitter-image-resizer">Twitter / X</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="menu-btn mobile-only"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <>
            {/* Overlay */}
            <div className="menu-overlay" onClick={() => setMenuOpen(false)} />

            {/* Menu */}
            <nav className="mobile-menu">
              <Link onClick={() => setMenuOpen(false)} to="/">
                Home
              </Link>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/instagram-image-resizer"
              >
                Instagram
              </Link>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/youtube-shorts-image-resizer"
              >
                YouTube Shorts
              </Link>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/linkedin-image-resizer"
              >
                LinkedIn
              </Link>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/twitter-image-resizer"
              >
                Twitter / X
              </Link>
              <Link onClick={() => setMenuOpen(false)} to="/about">
                About
              </Link>
              <Link onClick={() => setMenuOpen(false)} to="/privacy-policy">
                Privacy
              </Link>
              <Link onClick={() => setMenuOpen(false)} to="/contact">
                Contact
              </Link>
            </nav>
          </>
        )}
      </header>

      {/* ===== Main ===== */}
      <main className="container">
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <SeoHead
                  title="SnapSizes – Free Image Resizer for Social Media"
                  description="Resize images for Instagram, YouTube Shorts, LinkedIn & more. Free online image resizer with perfect sizes and no quality loss."
                  canonical="https://snapsizes.vercel.app/"
                />

                <section className="tool-card">
                  <h2 className="tool-title">Resize Image Instantly</h2>
                  <p className="tool-subtitle">
                    Upload once and resize for all social media platforms
                  </p>

                  <ImageUpload onImageSelect={setImage} />
                  {image && <CropTool image={image} />}
                </section>

                <section className="seo-section">
                  <h2>Popular Image Resizing Tools</h2>
                  <ul>
                    <li>
                      <Link to="/instagram-image-resizer">
                        Instagram Image Resizer
                      </Link>
                    </li>
                    <li>
                      <Link to="/youtube-shorts-image-resizer">
                        YouTube Shorts Image Resizer
                      </Link>
                    </li>
                  </ul>
                </section>

                <section className="seo-section">
                  <SeoText />
                </section>
              </>
            }
          />

          {/* SEO TOOL PAGES */}
          <Route
            path="/instagram-image-resizer"
            element={<InstagramResizer image={image} />}
          />
          <Route
            path="/youtube-shorts-image-resizer"
            element={<YouTubeShortsResizer image={image} />}
          />
          <Route
            path="/linkedin-image-resizer"
            element={<LinkedInResizer image={image} />}
          />
          <Route
            path="/twitter-image-resizer"
            element={<TwitterResizer image={image} />}
          />

          {/* TRUST PAGES */}
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* ===== Footer ===== */}
      <footer className="footer">
        © {new Date().getFullYear()} SnapSizes · Free Image Resizer
      </footer>
    </div>
  );
}
