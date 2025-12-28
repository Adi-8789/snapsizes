import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

// Components
import ImageUpload from "./components/ImageUpload";
import SeoHead from "./components/SeoHead";
import SeoText from "./components/SeoText";

// Tools
import CropTool from "./tools/CropTool";

// Pages
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import BulkPhotoResizer from "./pages/BulkPhotoResizer";

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

          <nav className="nav-links desktop-only">
            <Link to="/">Home</Link>
            <Link to="/bulk-photo-resizer">Bulk Resizer</Link>
            <Link to="/donate">Donate</Link>
            <Link to="/about">About</Link>
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <button
            className="menu-btn mobile-only"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <>
            <div className="menu-overlay" onClick={() => setMenuOpen(false)} />

            <nav className="mobile-menu">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link to="/bulk-photo-resizer" onClick={() => setMenuOpen(false)}>
                Bulk Resizer
              </Link>
              <Link to="/donate" onClick={() => setMenuOpen(false)}>
                Donate
              </Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
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
          <Route
            path="/"
            element={
              <>
                <SeoHead
                  title="SnapSizes – Free Image Resizer Online (No Upload)"
                  description="Resize images online for social media and custom pixel sizes. Free, fast, and privacy-friendly image resizer. No signup required."
                  canonical="https://snapsizes.vercel.app/"
                />

                {/* ================= HERO ================= */}
                <section className="hero">
                  <h1 className="hero-title">Free Online Image Resizer</h1>

                  <p className="hero-subtitle">
                    Resize, crop, and export images instantly in your browser.
                    <br />
                    <strong>No upload · No signup · 100% private</strong>
                  </p>

                  <div className="hero-actions">
                    <a href="#upload" className="hero-primary-btn">
                      Upload Image
                    </a>

                    <Link
                      to="/bulk-photo-resizer"
                      className="hero-secondary-btn"
                    >
                      Bulk Photo Resizer →
                    </Link>
                  </div>

                  <div className="hero-trust">
                    <span>🔒 Local Processing</span>
                    <span>⚡ Fast</span>
                    <span>📱 Mobile Friendly</span>
                  </div>
                </section>

                {/* ================= CONTENT CLARITY BLOCK (NEW) ================= */}
                <section className="about-intro">
                  <h2>About SnapSizes Image Resizer</h2>
                  <p>
                    SnapSizes is a free online image resizing tool designed for
                    creators, developers, and everyday users who need quick and
                    accurate image sizes without compromising privacy. The tool
                    works entirely inside your browser, which means your images
                    are processed locally on your device and are never uploaded
                    to any external server.
                  </p>
                  <p>
                    Whether you are preparing images for Instagram posts,
                    WhatsApp status updates, YouTube thumbnails, LinkedIn
                    banners, or custom website layouts, SnapSizes helps you
                    resize and crop images instantly while preserving quality.
                    The interface is intentionally simple so you can focus on
                    your work instead of learning complex software.
                  </p>
                  <p>
                    SnapSizes does not require account creation, subscriptions,
                    or downloads. It is built to be fast, mobile-friendly, and
                    accessible on modern desktop and mobile browsers. By keeping
                    all processing local, SnapSizes ensures better performance,
                    enhanced security, and full user control over uploaded
                    images.
                  </p>
                </section>

                {/* ================= MAIN TOOL ================= */}
                <section className="tool-card" id="upload">
                  <h2 className="tool-title">Resize Image Instantly</h2>

                  <p className="tool-subtitle">
                    Upload an image and resize it for Instagram, WhatsApp,
                    YouTube thumbnails, websites, or custom pixel sizes.
                  </p>

                  <ImageUpload onImageSelect={setImage} />
                  {image && <CropTool image={image} />}
                </section>

                {/* ================= SEO SECTION ================= */}
                <section className="seo-section">
                  <h2>Why Use SnapSizes Image Resizer?</h2>
                  <p>
                    SnapSizes is a free online image resizer that works entirely
                    inside your browser. Your photos are never uploaded to any
                    server, making it fast, secure, and privacy-friendly.
                  </p>

                  <h3>Bulk Image Resizing</h3>
                  <p>
                    Need to resize multiple images at once? Try our{" "}
                    <Link to="/bulk-photo-resizer">Bulk Photo Resizer</Link> to
                    resize multiple images into different sizes in one click.
                  </p>

                  <h3>Supported Use Cases</h3>
                  <ul>
                    <li>Resize images for Instagram, Facebook, and WhatsApp</li>
                    <li>Create YouTube thumbnails</li>
                    <li>Resize photos for websites and blogs</li>
                    <li>Custom pixel resizing for developers and designers</li>
                  </ul>

                  <SeoText />
                </section>
              </>
            }
          />

          <Route path="/bulk-photo-resizer" element={<BulkPhotoResizer />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} SnapSizes · <Link to="/about">About</Link>{" "}
        · <Link to="/privacy-policy">Privacy</Link> ·{" "}
        <Link to="/contact">Contact</Link> · <Link to="/donate">Donate</Link>
      </footer>
    </div>
  );
}
