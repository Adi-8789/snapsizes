import React from "react";
import SeoHead from "../components/SeoHead";
import styles from "./Legal.module.css"; // 👈 Reuse the clean layout

export default function Donate() {
  return (
    <article className={styles.legalPage}>
      <SeoHead
        title="Support SnapSizes (Optional Donations)"
        description="Support SnapSizes through optional donations. SnapSizes remains free to use, and donations are voluntary."
        canonical="https://snapsizes.vercel.app/donate"
      />

      <h1>Support SnapSizes ❤️</h1>
      <p className={styles.subtitle}>Help us keep the servers running.</p>

      <section>
        <h2>Why Donate?</h2>
        <p>
          SnapSizes is a free, privacy-focused tool built to help creators save time.
          We don't charge subscriptions, and we don't sell your data. 
          If this tool helped you, consider buying us a coffee!
        </p>
      </section>

      <section>
        <div style={{
          marginTop: "20px",
          padding: "30px",
          background: "#f8fafc",
          border: "2px dashed #e2e8f0",
          borderRadius: "16px",
          textAlign: "center"
        }}>
          <h3 style={{ marginTop: 0 }}>Donate via UPI</h3>

          <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
            <strong>UPI ID:</strong> <br />
            <span style={{ 
              background: "#e0f2fe", 
              color: "#0284c7", 
              padding: "5px 10px", 
              borderRadius: "6px", 
              fontFamily: "monospace" 
            }}>
              shankaraditya980-4@okaxis
            </span>
          </p>

          {/* QR Code Image - Ensure this file exists in your /public folder */}
          <img
            src="/upi-qr.png.jpeg" 
            alt="Scan to Donate via UPI"
            style={{ 
              maxWidth: "200px", 
              borderRadius: "12px", 
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" 
            }}
          />

          <p style={{ marginTop: "20px", fontSize: "0.85rem", color: "#64748b" }}>
            Donations are 100% optional. <br />
            We use Google Ads to cover basic hosting costs.
          </p>
        </div>
      </section>
    </article>
  );
}