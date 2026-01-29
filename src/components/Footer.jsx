import React from "react";
import { Link } from "react-router-dom";
import { Shield, Heart } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand Column */}
        <div className={styles.brandSection}>
          <Link to="/" className={styles.footerLogo}>
            Snap<span>Sizes</span>
          </Link>
          <p className={styles.tagline}>
            Fast, secure, and privacy-focused image tools. All processing
            happens locally in your browser to ensure your data never leaves your device.
          </p>
          <div className={styles.socialBadges}>
            <span className={styles.badge}><Shield size={14}/> Secure</span>
            <span className={styles.badge}><Heart size={14}/> Free</span>
          </div>
        </div>

        {/* Links Grid */}
        <div className={styles.linksGrid}>
          <div className={styles.linkGroup}>
            <h4>Tools</h4>
            <Link to="/social-media-imagetool">Social Image Resizer</Link>
            <Link to="/bulk-photo-resizer">Bulk Photo Resizer</Link>
            <Link to="/image-compressor-tool">Image Compressor</Link>
            <Link to="/image-to-pdf-tool">Image to PDF Converter</Link>
          </div>

          <div className={styles.linkGroup}>
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Support</Link>
            <Link to="/donate">Support the Dev</Link>
          </div>

          <div className={styles.linkGroup}>
            <h4>Legal</h4>
            {/* These links are vital for AdSense approval */}
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookie-policy">Cookie Policy</Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>© {currentYear} SnapSizes. Built for privacy and speed.</p>
          <div className={styles.madeWith}>
            Designed in Patna, India 🇮🇳
          </div>
        </div>
      </div>
    </footer>
  );
}