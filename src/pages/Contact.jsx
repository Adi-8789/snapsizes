import React from "react";
import { Mail, Clock, MapPin } from "lucide-react";
import SeoHead from "../components/SeoHead";
import styles from "./Legal.module.css"; 

export default function Contact() {
  return (
    <article className={styles.legalPage}>
      <SeoHead
        title="Contact SnapSizes - Support & Feedback"
        description="Get in touch with the SnapSizes team. We provide support for our free image resizing and compression tools."
        canonical="https://snapsizes.vercel.app/contact"
      />

      <header className={styles.aboutHeader}>
        <h1>Contact Support</h1>
        <p className={styles.subtitle}>We are here to help.</p>
      </header>

      <section className={styles.storySection}>
        <h2>📩 Get in Touch</h2>
        <p>
          Do you have a feature request, a bug report, or just want to say hello? 
          SnapSizes is a community-focused tool, and your feedback directly influences what we build next.
        </p>
      </section>

      <section className={styles.gridSection}>
        {/* Email Card - Fixed Overflow */}
        <div className={styles.card}>
          <Mail className={styles.icon} size={32} />
          <h3>Email Support</h3>
          <p>For general inquiries and bug reports:</p>
          
          <a 
            href="mailto:shankaraditya980@gmail.com" 
            className={styles.primaryBtn}
            style={{
              marginTop: '10px', 
              width: '100%', 
              textAlign: 'center',
              wordBreak: 'break-all',    /* 🟢 Fixes the overflow */
              whiteSpace: 'normal',      /* 🟢 Allows wrapping */
              lineHeight: '1.4',
              padding: '12px'
            }}
          >
            shankaraditya980@gmail.com
          </a>
        </div>

        {/* Response Time Card */}
        <div className={styles.card}>
          <Clock className={styles.icon} size={32} />
          <h3>Response Time</h3>
          <p>
            We are a small team (of one!). We aim to respond to all genuine inquiries within <strong>24-48 hours</strong>.
          </p>
        </div>

        {/* Location Card */}
        <div className={styles.card}>
          <MapPin className={styles.icon} size={32} />
          <h3>Location</h3>
          <p>
            Developed with ❤️ in<br />
            <strong>Patna, Bihar, India</strong>
          </p>
        </div>
      </section>
    </article>
  );
}