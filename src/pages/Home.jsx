import React from "react";
import { Link } from "react-router-dom";
import { Crop, Layers, Minimize2, FileText, CheckCircle, Shield, Zap } from "lucide-react";
import SeoHead from "../components/SeoHead";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.homeWrapper}>
      <SeoHead
        title="SnapSizes - Free Online Image Tools (Privacy-First)"
        description="Resize, optimize, and convert images online using SnapSizes. 100% browser-based, no upload, no signup required."
        canonical="https://snapsizes.vercel.app/"
      />

      {/* 2. HERO SECTION */}
      <header className={styles.hero}>
        <div className={styles.heroBadge}>✨ v2.0 Now Live</div>
        <h1 className={styles.heroTitle}>
          Image Tools for the{" "}
          <span className={styles.highlight}>Privacy Conscious</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Process images directly in your browser. No server uploads. No file limits. 
          Just secure, instant editing.
        </p>
        
        <div className={styles.trustBadges}>
          <span className={styles.badge}><Shield size={16}/> Zero-Upload</span>
          <span className={styles.badge}><Zap size={16}/> Client-Side Speed</span>
          <span className={styles.badge}><CheckCircle size={16}/> Free Forever</span>
        </div>
      </header>

      {/* 3. MAIN TOOLS GRID */}
      <section className={styles.toolSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Suite of Tools</h2>
          <p className={styles.sectionDesc}>Select a utility to start processing your files securely.</p>
        </div>

        <div className={styles.toolGrid}>
          {/* Tool 1: Social Media Resizer */}
          <Link to="/social-media-imagetool" className={styles.toolCard}>
            <div className={styles.iconWrapper}><Crop size={32} /></div>
            <div className={styles.cardContent}>
              <h3>Social Media Resizer</h3>
              <p>Auto-crop images for Instagram, LinkedIn, and YouTube. Includes blur backgrounds.</p>
              <span className={styles.fakeLink}>Launch Tool →</span>
            </div>
          </Link>

          {/* Tool 2: Bulk Resizer */}
          <Link to="/bulk-photo-resizer" className={styles.toolCard}>
            <div className={styles.iconWrapper}><Layers size={32} /></div>
            <div className={styles.cardContent}>
              <h3>Bulk Photo Resizer</h3>
              <p>Resize 50+ images at once. Define multiple targets and download as a ZIP.</p>
              <span className={styles.fakeLink}>Launch Tool →</span>
            </div>
          </Link>

          {/* Tool 3: Compressor */}
          <Link to="/image-compressor-tool" className={styles.toolCard}>
            <div className={styles.iconWrapper}><Minimize2 size={32} /></div>
            <div className={styles.cardContent}>
              <h3>Image Compressor</h3>
              <p>Reduce file size by up to 80% without visible quality loss. Supports JPG, PNG, WebP.</p>
              <span className={styles.fakeLink}>Launch Tool →</span>
            </div>
          </Link>

          {/* Tool 4: PDF Converter */}
          <Link to="/image-to-pdf-tool" className={styles.toolCard}>
            <div className={styles.iconWrapper}><FileText size={32} /></div>
            <div className={styles.cardContent}>
              <h3>Image to PDF</h3>
              <p>Combine multiple receipts, screenshots, or photos into a single secure PDF document.</p>
              <span className={styles.fakeLink}>Launch Tool →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. SEO & TRUST CONTENT */}
      <article className={styles.seoContent}>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <h2>Why Developers Trust SnapSizes</h2>
            <p>
              Traditional online converters upload your files to a cloud server to process them. 
              This creates a privacy risk—you never know if they keep a copy.{" "} 
              <strong>SnapSizes</strong> uses WebAssembly to run complex image algorithms 
              right on your device (Client-Side), ensuring your data never leaves your computer.
            </p>
          </div>
          <div className={styles.infoItem}>
            <h2>Built for the Modern Web</h2>
            <p>
              Whether you are optimizing assets for a website, preparing documents for a government application, 
              or just resizing a profile picture, our tools are optimized for{" "} 
              <strong>retina displays</strong> and high-DPI screens.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}