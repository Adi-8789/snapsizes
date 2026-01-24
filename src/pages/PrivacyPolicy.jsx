import React from "react";
import SeoHead from "../components/SeoHead";
import styles from "./Legal.module.css"; // 👈 Apply the professional styling

export default function PrivacyPolicy() {
  return (
    <article className={styles.legalPage}>
      <SeoHead
        title="Privacy Policy - Your Data Stays Private | SnapSizes"
        description="Read the SnapSizes privacy policy to understand our strict no-upload policy and how we handle cookies and advertising securely."
        canonical="https://snapsizes.vercel.app/privacy-policy"
      />

      <h1>Privacy Policy</h1>
      <span className={styles.date}>Last Updated: January 2026</span>

      <section>
        <h2>1. Our Privacy Commitment</h2>
        <p>
          Your privacy is a fundamental priority at SnapSizes. Our platform is designed with a 
          <strong> "Privacy-First" architecture</strong>. We do not collect, store, or view the 
          personal media or images you process on our site.
        </p>
      </section>

      <section>
        <h2>2. Image Processing (Client-Side Only)</h2>
        <p>
          All image processing on SnapSizes happens locally in your browser using 
          HTML5 Canvas and WebAssembly technology. <strong>Your images are never uploaded</strong> 
          to our servers or any third-party cloud. They remain securely on your device at all times.
        </p>
      </section>

      <section>
        <h2>3. Personal Data</h2>
        <p>
          SnapSizes does not require account registration. We do not knowingly collect personally 
          identifiable information (PII) such as names, physical addresses, or phone numbers from our users.
        </p>
      </section>

      <section>
        <h2>4. Cookies & Advertising</h2>
        <p>
          SnapSizes is supported by advertisements provided by <strong>Google AdSense</strong>. 
          Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits 
          to this website or other websites.
        </p>
        <p>
          Google's use of advertising cookies enables it and its partners to serve ads to our users 
          based on their visit to SnapSizes and/or other sites on the Internet.
        </p>
        <p>
          You may opt out of personalized advertising by visiting 
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" style={{color: '#2563eb', textDecoration: 'underline'}}> Google Ad Settings</a>.
        </p>
      </section>

      <section>
        <h2>5. Analytics</h2>
        <p>
          We may use anonymous analytics tools to track general site performance (such as page views 
          and load times). This data is aggregated and does not contain any information that could 
          identify you personally.
        </p>
      </section>

      <section>
        <h2>6. Consent</h2>
        <p>
          By using SnapSizes, you hereby consent to our Privacy Policy and agree to its terms.
        </p>
      </section>
    </article>
  );
}