import React from "react";
import SeoHead from "../components/SeoHead";
import styles from "./Legal.module.css"; 

export default function About() {
  return (
    <article className={styles.legalPage}>
      <SeoHead
        title="About SnapSizes - Privacy-First Image Tools"
        description="Learn about SnapSizes' mission to provide secure, client-side image processing tools. We prioritize speed, privacy, and zero-server uploads."
        canonical="https://snapsizes.vercel.app/about"
      />

      <h1>About SnapSizes</h1>
      <p className={styles.subtitle}>Privacy-First Image Processing for the Modern Web.</p>

      <section>
        <h2>Our Mission</h2>
        <p>
          SnapSizes was founded with a simple goal: to provide professional-grade image 
          manipulation tools that respect user privacy. We believe that you shouldn't have 
          to upload your personal or professional media to a remote server just to resize 
          a photo for social media.
        </p>
      </section>

      <section>
        <h2>How It Works</h2>
        <p>
          Unlike 99% of online converters, SnapSizes operates entirely on the <strong>Client-Side</strong>. 
          When you "upload" a photo to our tool, it never actually leaves your computer. 
          We use <strong>HTML5 Canvas</strong> and <strong>WebAssembly</strong> technology 
          to process the pixels directly in your browser's memory.
        </p>
      </section>

      <section>
        <h2>Why "Browser-Based" Matters</h2>
        <ul>
          <li><strong>Speed:</strong> No waiting for uploads or downloads from a server.</li>
          <li><strong>Security:</strong> Your data is never stored, never seen, and never sold.</li>
          <li><strong>Offline Access:</strong> Once the page is loaded, the tools can often work even if you lose your connection.</li>
        </ul>
      </section>

      <section>
        <h2>Our Commitment to Transparency</h2>
        <p>
          We support the development of SnapSizes through non-intrusive advertising via 
          <strong> Google AdSense</strong>. This allows us to keep our core tools free for 
          everyone while maintaining a high standard of service and security.
        </p>
      </section>
    </article>
  );
}