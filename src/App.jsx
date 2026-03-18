import React, { Suspense, lazy, useEffect } from "react"; 
import { Routes, Route, useLocation } from "react-router-dom"; 
import ReactGA from "react-ga4"; 

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner";

// ✅ Home Page
import Home from "./pages/Home";

// ⚡ Tools (Lazy Loaded)
const BulkPhotoResizer = lazy(() => import("./pages/BulkPhotoResizer"));
const SocialMediaImageTool = lazy(() => import("./pages/SocialMediaImageTool"));
const ImageToPdfTool = lazy(() => import("./pages/ImageToPdfTool"));
const ImageCompressorTool = lazy(() => import("./pages/ImageCompressorTool"));
const YoutubeThumbnailDownloader = lazy(() => import("./pages/YoutubeThumbnailDownloader"));
const PdfMergeTool = lazy(() => import("./pages/PdfMergeTool"));

// 📄 Info Pages
const About = lazy(() => import("./pages/About"));
const Donate = lazy(() => import("./pages/Donate"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CaseConverterTool = lazy(() => import("./pages/CaseConverterTool"));

// 🟢 INITIALIZE GA4 (Use your specific ID)
ReactGA.initialize("G-HSHVL7TBBP");

export default function App() {
  const location = useLocation(); // 🟢 Listen for URL changes

  useEffect(() => {
    // 🟢 Send pageview to Google Analytics whenever location changes
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search 
    });
  }, [location]);

  return (
    <div
      className="app-container"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <ScrollToTop />

      <Navbar />

      <main
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Suspense
          fallback={
            <div
              className="flex justify-center items-center h-[50vh] text-slate-500 font-medium"
            >
              Loading Tool...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bulk-photo-resizer" element={<BulkPhotoResizer />} />
            <Route path="/social-media-imagetool" element={<SocialMediaImageTool />} />
            <Route path="/image-to-pdf-tool" element={<ImageToPdfTool />} />
            <Route path="/image-compressor-tool" element={<ImageCompressorTool />} />
            <Route path="/youtube-thumbnail-downloader" element={<YoutubeThumbnailDownloader />} />
            <Route path="/merge-pdf" element={<PdfMergeTool />} />
            <Route path="/about" element={<About />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/case-converter" element={<CaseConverterTool />} />

            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </Suspense>
      </main>

      <Footer />

      <CookieBanner /> 
    </div>
  );
}