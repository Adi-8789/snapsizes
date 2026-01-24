import React from "react";
import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import SeoText from "../components/SeoText";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.homeWrapper}>
      <SeoHead
        title="SnapSizes – Free Online Image Tools (Privacy-First)"
        description="Resize, optimize, and convert images online using SnapSizes. 100% browser-based, no upload, no signup."
        canonical="https://snapsizes.vercel.app/"
      />

      {/* 2. HERO SECTION */}
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>Professional Online Image Tools</h1>
        <p className={styles.heroSubtitle}>
          Fast, secure, and 100% browser-based. Your images never leave your
          device.
        </p>
        <div className={styles.trustBadges}>
          <span>✓ No Upload</span>
          <span>✓ Privacy First</span>
          <span>✓ No Signup</span>
        </div>
      </header>

      {/* 3. MAIN TOOLS GRID */}
      <section className={styles.toolSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Available Tools</h2>
          <p>Choose a utility to begin processing your files instantly.</p>
        </div>

        <div className={styles.toolGrid}>
          <Link to="/social-media-Imagetool" className={styles.toolCard}>
            <div className={styles.toolIcon}>🖼️</div>
            <h3>Image Resizer</h3>
            <p>
              Resize single images with custom dimensions and aspect ratios.
            </p>
            <span className={styles.btnPrimary}>Open Tool</span>
          </Link>

          <Link to="/bulk-photo-resizer" className={styles.toolCard}>
            <div className={styles.toolIcon}>📁</div>
            <h3>Bulk Photo Resizer</h3>
            <p>Process multiple images at once for social media and web.</p>
            <span className={styles.btnPrimary}>Process Bulk</span>
          </Link>

          <Link to="/image-compressor-tool" className={styles.toolCard}>
            <div className={styles.toolIcon}>📉</div>
            <h3>Image Compressor</h3>
            <p>
              Reduce file size without losing quality.Preserve full resolution
            </p>
            <span className={styles.btnPrimary}>Open Compressor</span>
          </Link>

          <Link to="/image-to-pdf-tool" className={styles.toolCard}>
            <div className={styles.toolIcon}>📄</div>
            <h3>PDF Converter</h3>
            <p>Convert images to high-quality PDF documents instantly.</p>
            <span className={styles.btnPrimary}> Open PDF Converter</span>
          </Link>
        </div>
      </section>

      <article className={styles.seoContent}>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <h2>Why Choose SnapSizes?</h2>
            <p>
              SnapSizes is built for developers, designers, and social media
              managers who value
              <strong> speed and security</strong>. Unlike traditional online
              tools, we don't upload your files to a server. Everything happens
              locally in your browser.
            </p>
          </div>
          <div className={styles.infoItem}>
            <h2>Privacy by Design</h2>
            <p>
              Since we use Client-Side processing, your data remains yours. This
              approach eliminates the risk of data breaches and makes processing
              large batches significantly faster.
            </p>
          </div>
        </div>

        {/* LONG-FORM TEXT BLOCK */}
        <div className={styles.seoTextWrapper}>
          <SeoText />
        </div>
      </article>
    </div>
  );
}
