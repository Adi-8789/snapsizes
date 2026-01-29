import React from "react";
import { Shield, Lock, EyeOff, FileText, Globe } from "lucide-react";
import SeoHead from "../components/SeoHead";
import styles from "./Legal.module.css"; 

export default function PrivacyPolicy() {
  return (
    <article className={styles.legalPage}>
      <SeoHead
        title="Privacy Policy - Zero-Upload Data Security | SnapSizes"
        description="Read the SnapSizes privacy policy. We use client-side processing to ensure your photos never leave your device."
        canonical="https://snapsizes.vercel.app/privacy-policy"
      />

      <header className={styles.aboutHeader}>
        <h1>Privacy Policy</h1>
        <p className={styles.subtitle}>Last Updated: January 30, 2026</p>
      </header>

      <section className={styles.storySection}>
        <h2><Shield size={24} style={{marginRight: '10px'}}/> Our Core Promise</h2>
        <p>
          At SnapSizes, privacy is not an option—it is the default. Unlike traditional online tools, 
          we have architected our platform to operate without cloud-based processing for your files. 
          <strong>We cannot see, store, or sell your images because they never touch our servers.</strong>
        </p>
      </section>

      <section>
        <h2>1. Client-Side Processing (The Technical Details)</h2>
        <p>
          SnapSizes utilizes <strong>WebAssembly</strong> and <strong>HTML5 Canvas</strong> to process images directly within your web browser.
        </p>
        <ul>
          <li><strong>No Uploads:</strong> When you select a file, it remains in your device's RAM.</li>
          <li><strong>Zero Retention:</strong> Since we do not have a backend server for image processing, it is physically impossible for us to retain your data.</li>
          <li><strong>Instant Deletion:</strong> All temporary data in your browser is wiped instantly when you close the tab or refresh the page.</li>
        </ul>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>Since we do not require accounts, we do not collect personal data like names, emails, or phone numbers. However, we do collect standard non-personal logs:</p>
        <ul>
          <li><strong>Log Files:</strong> Like most websites, we use standard log files. This includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, and referring/exit pages. This data is not linked to any information that is personally identifiable.</li>
        </ul>
      </section>

      <section>
        <h2>3. Cookies and Google AdSense</h2>
        <p>
          SnapSizes allows third-party vendors, including <strong>Google</strong>, to use cookies to serve ads based on your prior visits to our website or other websites.
        </p>
        <div className={styles.card} style={{textAlign: 'left', marginTop: '15px'}}>
          <h3><Lock size={20} style={{marginRight: '8px', display: 'inline'}}/> Advertising Disclosure</h3>
          <p>
            Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to SnapSizes and/or other sites on the Internet.
            <br/><br/>
            You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" style={{color: '#2563eb'}}>Google Ad Settings</a>.
          </p>
        </div>
      </section>

      <section>
        <h2>4. CCPA & GDPR Data Protection Rights</h2>
        <p>
          We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
        </p>
        <ul>
          <li><strong>The right to access:</strong> You have the right to request copies of your personal data (we hold none).</li>
          <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data (we hold none, but this right stands).</li>
          <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
        </ul>
      </section>

      <section>
        <h2>5. Children's Information</h2>
        <p>
          SnapSizes is a privacy-first, client-side application. 
          <strong> We do not collect, store, or process any personal data </strong> from any user, 
          regardless of age.
        </p>
        <p>
          Because no data is ever uploaded to our servers, it is physically impossible for 
          us to hold information about children under the age of 13. 
          Parents can rest assured that no "digital footprint" is created when their 
          children use this tool for school projects or other needs.
        </p>
      </section>

      <section className={styles.contactCta} style={{marginTop: '40px'}}>
        <h2>Questions about this policy?</h2>
        <p>
          If you have any questions about our privacy practices, please contact us.
        </p>
        <a href="/contact" className={styles.primaryBtn}>Contact Support</a>
      </section>
    </article>
  );
}