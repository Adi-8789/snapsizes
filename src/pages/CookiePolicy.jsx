import React from "react";
import SeoHead from "../components/SeoHead";
import styles from "./Legal.module.css";

export default function CookiePolicy() {
  return (
    <article className={styles.legalPage}>
      <SeoHead
        title="Cookie Policy - SnapSizes"
        description="Read our Cookie Policy to understand how SnapSizes and Google AdSense use cookies to personalize content and ads."
        canonical="https://snapsizes.vercel.app/cookie-policy"
      />

      <h1>Cookie Policy</h1>
      <span className={styles.date}>Last Updated: January 2026</span>

      <section>
        <h2>1. What are Cookies?</h2>
        <p>Cookies are small text files stored on your device that help websites function properly and provide a better user experience.</p>
      </section>

      <section>
        <h2>2. How We Use Cookies</h2>
        <p>SnapSizes uses cookies for the following purposes:</p>
        <ul>
          <li><strong>Essential:</strong> To remember your preferences within our tools.</li>
          <li><strong>Advertising:</strong> We use Google AdSense to serve advertisements. Google uses cookies to serve ads based on your previous visits.</li>
        </ul>
      </section>

      <section>
        <h2>3. Google AdSense (Third-Party Cookies)</h2>
        <p>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to SnapSizes and/or other sites on the Internet.</p>
      </section>

      <section>
        <h2>4. How to Opt-Out</h2>
        <p>Users may opt out of personalized advertising by visiting Google's <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Ad Settings</a>.</p>
      </section>
    </article>
  );
}