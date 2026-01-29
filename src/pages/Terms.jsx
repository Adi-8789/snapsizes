import React from "react";
import { FileText, AlertTriangle, CheckCircle, Scale } from "lucide-react";
import SeoHead from "../components/SeoHead";
import styles from "./Legal.module.css"; 

export default function Terms() {
  return (
    <article className={styles.legalPage}>
      <SeoHead
        title="Terms of Service - Usage Guidelines | SnapSizes"
        description="Read the Terms of Service for SnapSizes. Understanding your rights and responsibilities when using our free image tools."
        canonical="https://snapsizes.vercel.app/terms"
      />

      <header className={styles.aboutHeader}>
        <h1>Terms of Service</h1>
        <p className={styles.subtitle}>Last Updated: January 29, 2026</p>
      </header>

      <section className={styles.storySection}>
        <h2><Scale size={24} style={{marginRight: '10px'}}/> Agreement to Terms</h2>
        <p>
          By accessing or using SnapSizes (the "Service"), you agree to be bound by these Terms of Service. 
          If you disagree with any part of the terms, you may not access the Service.
        </p>
      </section>

      <section>
        <h2>1. Service Description & Usage</h2>
        <p>SnapSizes provides browser-based image processing tools (compression, resizing, conversion). By using these tools, you acknowledge that:</p>
        <ul>
          <li><strong>Local Processing:</strong> All file modifications happen on your device. We do not store your files.</li>
          <li><strong>Lawful Use:</strong> You agree not to use the Service to process illegal content or material you do not have the rights to.</li>
        </ul>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.card}>
          <AlertTriangle className={styles.icon} size={32} />
          <h3>Disclaimer of Warranties</h3>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. SnapSizes makes no warranties regarding the reliability or accuracy of the tools.
          </p>
        </div>

        <div className={styles.card}>
          <FileText className={styles.icon} size={32} />
          <h3>Limitation of Liability</h3>
          <p>
            In no event shall SnapSizes be liable for any indirect, incidental, or consequential damages resulting from your use of the Service.
          </p>
        </div>

        <div className={styles.card}>
          <CheckCircle className={styles.icon} size={32} />
          <h3>Modifications</h3>
          <p>
            We reserve the right to modify or replace these Terms at any time. Continued use of the Service constitutes acceptance of the new Terms.
          </p>
        </div>
      </section>

      <section>
        <h2>2. Intellectual Property</h2>
        <p>
          The Service and its original content (excluding images processed by you), features, and functionality are and will remain the exclusive property of SnapSizes.
        </p>
      </section>

      <section className={styles.contactCta}>
        <h2>Questions about these terms?</h2>
        <a href="/contact" className={styles.primaryBtn}>Contact Us</a>
      </section>
    </article>
  );
}