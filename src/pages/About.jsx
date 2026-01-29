import React from "react";
import { Shield, Zap, Globe, Code } from "lucide-react";
import SeoHead from "../components/SeoHead";
import styles from "./Legal.module.css"; 

export default function About() {
  return (
    <article className={styles.legalPage}>
      <SeoHead
        title="About SnapSizes - The Developer & The Mission"
        description="Meet the developer behind SnapSizes. A privacy-first, client-side image processing tool built to make the web faster and safer."
        canonical="https://snapsizes.vercel.app/about"
      />

      <header className={styles.aboutHeader}>
        <h1>About SnapSizes</h1>
        <p className={styles.subtitle}>Built for speed. Engineered for privacy.</p>
      </header>

      <section className={styles.storySection}>
        <h2>👋 The Developer's Story</h2>
        <p>
          Hi, I'm the developer behind SnapSizes. I built this platform because I was frustrated with existing online tools. 
          Every time I needed to resize a simple photo or convert a PDF, I was forced to upload my private files to a random server 
          and wait for slow processing.
        </p>
        <p>
          I knew there had to be a better way. Using modern web technologies like <strong>React</strong> and <strong>WebAssembly</strong>, 
          I created SnapSizes to run 100% in your browser. No uploads, no waiting, no privacy risks.
        </p>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.card}>
          <Shield className={styles.icon} size={32} />
          <h3>Privacy First</h3>
          <p>
            We operate on a strict <strong>"Zero-Server-Knowledge"</strong> architecture. 
            Your images are processed locally on your device's CPU/GPU. We physically cannot see your files even if we wanted to.
          </p>
        </div>

        <div className={styles.card}>
          <Zap className={styles.icon} size={32} />
          <h3>Lightning Fast</h3>
          <p>
            By removing the need to upload and download files, SnapSizes is often 10x faster than server-based competitors. 
            Instant results, right on your screen.
          </p>
        </div>

        <div className={styles.card}>
          <Globe className={styles.icon} size={32} />
          <h3>Free Forever</h3>
          <p>
            We believe essential tools should be accessible to everyone. 
            This project is supported by non-intrusive ads (Google AdSense), allowing us to keep the servers running without charging you a cent.
          </p>
        </div>
      </section>

      <section className={styles.techSection}>
        <h2>🛠️ Under the Hood</h2>
        <p>
          For the tech-savvy users, SnapSizes is built as a Progressive Web App (PWA) using the <strong>MERN Stack ecosystem</strong>.
          We utilize high-performance libraries like <code>jspdf</code> and <code>browser-image-compression</code> to deliver desktop-class performance in a mobile browser.
        </p>
      </section>

      <section className={styles.contactCta}>
        <h2>Have a Feature Request?</h2>
        <p>
          SnapSizes is an actively maintained project. If you find a bug or have an idea for a new tool, I'd love to hear from you.
        </p>
        <a href="/contact" className={styles.primaryBtn}>Contact the Developer</a>
      </section>
    </article>
  );
}