import React from "react";
import SeoHead from "../components/SeoHead"; // 👈 Import SEO Component
import styles from "./Legal.module.css";

export default function Terms() {
  return (
    <article className={styles.legalPage}>
      {/* 👇 ADD SEO HEAD */}
      <SeoHead
        title="Terms of Service - SnapSizes"
        description="Read the Terms of Service for SnapSizes. Understanding your rights and responsibilities when using our free image tools."
        canonical="https://snapsizes.vercel.app/terms"
      />
      {/* 👆 END SEO HEAD */}

      <h1>Terms of Service</h1>
      <span className={styles.date}>Last Updated: January 2026</span>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing SnapSizes, you agree to be bound by these Terms of Service. If you do not agree, please do not use our tools.</p>
      </section>

      <section>
        <h2>2. Description of Service</h2>
        <p>SnapSizes provides browser-based image processing tools. All processing is done locally on the user's device. We do not store or upload your images to any servers.</p>
      </section>

      <section>
        <h2>3. Use of Tools</h2>
        <p>You agree to use our tools for lawful purposes only. You are responsible for any content you process using SnapSizes.</p>
      </section>

      <section>
        <h2>4. Disclaimer of Warranties</h2>
        <p>Our tools are provided "as is" without any warranties. SnapSizes is not responsible for any data loss or damage resulting from the use of our services.</p>
      </section>
    </article>
  );
}