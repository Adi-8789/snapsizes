import React from "react";
import "./SeoContent.css";

export const SeoContent = () => {
  return (
    <article className="seo-container">
      {/* 1. Intro & How-To */}
      <section className="content-block">
        <h2>How to Convert Images to PDF for Free</h2>
        <p>
          SnapSizes offers a secure, client-side solution to convert your photos into professional PDF documents. 
          Whether you are merging receipts for an <strong>expense report</strong>, compiling a <strong>design portfolio</strong>, 
          or creating a single document from multiple scans, our tool handles it all directly in your browser.
        </p>
        <ol className="step-list">
          <li>
            <strong>Upload your images:</strong> Drag and drop your JPG, PNG, or WebP files into the dropzone. 
            We support high-resolution images and batch uploading for fast processing.
          </li>
          <li>
            <strong>Arrange and Sort:</strong> Use our drag-and-drop editor to reorder pages. 
            The order you see on the screen is exactly how they will appear in the final document.
          </li>
          <li>
            <strong>Customize Layout:</strong> Adjust page settings including standard A4/Letter sizing, 
            margins, and image orientation (Portrait/Landscape) to fit your needs.
          </li>
          <li>
            <strong>Download Instantly:</strong> Click "Convert to PDF" to generate your file. 
            Since there is no server upload, the process is instant, private, and secure.
          </li>
        </ol>
      </section>

      {/* 2. Trust Signals (Critical for AdSense) */}
      <section className="features-grid">
        <div className="feature-card">
          <h3>🔒 100% Private & Secure</h3>
          <p>
            Your privacy is our priority. Unlike other converters, SnapSizes operates entirely client-side. 
            Your sensitive files (IDs, contracts, photos) never leave your device.
          </p>
        </div>
        <div className="feature-card">
          <h3>⚡ Works Offline</h3>
          <p>
            Traveling? No problem. Once this page loads, the tool works without an internet connection. 
            Convert images to PDF on airplanes, in remote areas, or without using data.
          </p>
        </div>
        <div className="feature-card">
          <h3>📄 Business-Ready Formatting</h3>
          <p>
            Stop struggling with alignment. Our engine automatically centers your images and handles 
            DPI scaling to ensure your PDFs look crisp on any screen or printer.
          </p>
        </div>
      </section>

      {/* 3. Enhanced FAQ (AdSense Optimized) */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        
        {/* Use Divs instead of <details> for better initial visibility */}
        <div className="faq-item">
          <h5>Is there a file size limit?</h5>
          <p>
            No. Because we process files locally on your device, you are only limited by your computer's memory (RAM), 
            not our servers. You can combine dozens of high-quality images without restriction.
          </p>
        </div>

        <div className="faq-item">
          <h5>Is my data safe?</h5>
          <p>
            Yes. We do not store, view, or upload your images. All processing happens in your browser's "sandbox," 
            making this tool safe for sensitive documents like bank statements or legal forms.
          </p>
        </div>

        <div className="faq-item">
          <h5>Does it support PNG transparency?</h5>
          <p>
            Yes. PNG images with transparent backgrounds are rendered correctly onto the white PDF pages, 
            ensuring a clean look for logos and graphics.
          </p>
        </div>
      </section>
    </article>
  );
};