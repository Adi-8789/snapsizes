import React from "react";
import SeoHead from "../components/SeoHead";
import styles from "./Legal.module.css"; // 👈 Reuse the nice styling

export default function Contact() {
  return (
    <article className={styles.legalPage}>
      <SeoHead
        title="Contact SnapSizes - Support & Feedback"
        description="Get in touch with the SnapSizes team. We provide support for our free image resizing and compression tools."
        canonical="https://snapsizes.vercel.app/contact"
      />

      <h1>Contact Us</h1>
      <p className={styles.subtitle}>We'd love to hear from you.</p>

      <section>
        <h2>Get in Touch</h2>
        <p>
          Do you have a feature request, bug report, or just want to say hello? 
          SnapSizes is a community-focused tool, and your feedback helps us improve.
        </p>
        
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          background: '#f8fafc', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px' 
        }}>
          <p style={{ margin: 0, fontSize: '1.1rem' }}>
            📧 Support Email: <br />
            <a href="mailto:shankaraditya980@gmail.com" style={{ color: '#2563eb', fontWeight: 'bold' }}>
              shankaraditya980@gmail.com
            </a>
          </p>
        </div>
      </section>

      <section>
        <h2>Response Time</h2>
        <p>
          We aim to respond to genuine inquiries within <strong>24-48 hours</strong>. 
          Please note that we cannot provide support for third-party scripts or 
          unrelated technical issues.
        </p>
      </section>
    </article>
  );
}