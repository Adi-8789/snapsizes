import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ✅ Home Page (Loads Instantly for SEO)
import Home from "./pages/Home"; 

// ⚡ Tools (Lazy Loaded for Speed)
const BulkPhotoResizer = lazy(() => import("./pages/BulkPhotoResizer"));
const SocialMediaImageTool = lazy(() => import("./pages/SocialMediaImageTool"));
const ImageToPdfTool = lazy(() => import("./pages/ImageToPdfTool"));
const ImageCompressorTool = lazy(() => import("./pages/ImageCompressorTool"));

// 📄 Info Pages (Lazy Loaded)
const About = lazy(() => import("./pages/About"));
const Donate = lazy(() => import("./pages/Donate"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));

export default function App() {
  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* 1. Global Navigation */}
      <Navbar />

      {/* 2. Main Content Area */}
      <main style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column" }}>
        
        {/* Suspense shows a loading text while the heavy tool downloads */}
        <Suspense fallback={
          <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh', 
            fontSize: '1.2rem', 
            color: '#666',
            fontWeight: '500'
          }}>
            Loading Tool...
          </div>
        }>
          <Routes>
            {/* --- CORE TOOLS --- */}
            <Route path="/" element={<Home />} />
            <Route path="/bulk-photo-resizer" element={<BulkPhotoResizer />} />
            <Route path="/social-media-Imagetool" element={<SocialMediaImageTool />} />
            <Route path="/image-to-pdf-tool" element={<ImageToPdfTool />} />
            <Route path="/image-compressor-tool" element={<ImageCompressorTool />} />

            {/* --- INFO PAGES --- */}
            <Route path="/about" element={<About />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />

            {/* --- 404 CATCH-ALL --- */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>

      {/* 3. Global Footer */}
      <Footer />
    </div>
  );
}