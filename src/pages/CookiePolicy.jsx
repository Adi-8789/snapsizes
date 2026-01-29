import React from "react";
import { Cookie, Check, XCircle, Shield } from "lucide-react";
import SeoHead from "../components/SeoHead";
import styles from "./Legal.module.css"; 

export default function CookiePolicy() {
  return (
    <article className={styles.legalPage}>
      <SeoHead
        title="Cookie Policy - How We Use Data | SnapSizes"
        description="Understand how SnapSizes uses cookies. We only use essential cookies for functionality and Google AdSense for advertising."
        canonical="https://snapsizes.vercel.app/cookie-policy"
      />

      <header className={styles.aboutHeader}>
        <h1>Cookie Policy</h1>
        <p className={styles.subtitle}>Last Updated: January 29, 2026</p>
      </header>

      <section className={styles.storySection}>
        <h2><Shield size={24} style={{marginRight: '10px'}}/> Our Approach to Cookies</h2>
        <p>
          Cookies are small text files stored on your device. At SnapSizes, we keep things simple. 
          We do not use cookies to spy on your files or track your personal identity.
        </p>
      </section>

      <section className={styles.gridSection}>
        {/* Card 1: Essential */}
        <div className={styles.card}>
          <Check className={styles.icon} size={32} />
          <h3>Essential Cookies</h3>
          <p>
            Strictly necessary for the website to function (e.g., remembering if you closed the settings drawer). These cannot be disabled.
          </p>
        </div>

        {/* Card 2: Advertising */}
        <div className={styles.card}>
          <Cookie className={styles.icon} size={32} />
          <h3>Advertising (AdSense)</h3>
          <p>
            We use <strong>Google AdSense</strong>. Google uses cookies to serve ads based on your prior visits to our website or other sites.
          </p>
        </div>

        {/* Card 3: What we DON'T do */}
        <div className={styles.card}>
          <XCircle className={styles.icon} size={32} />
          <h3>No File Tracking</h3>
          <p>
            We do <strong>not</strong> use cookies to track the images you process. Your file data is processed in RAM and never leaves your device.
          </p>
        </div>
      </section>

      <section>
        <h2>How to Control Cookies</h2>
        <p>
          You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" style={{color: '#2563eb'}}>Google Ad Settings</a>.
        </p>
      </section>
    </article>
  );
}