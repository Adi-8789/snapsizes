import React from "react";
import { Heart, Coffee, Smartphone } from "lucide-react";
import SeoHead from "../components/SeoHead";
import styles from "./Legal.module.css"; 

export default function Donate() {
  return (
    <article className={styles.legalPage}>
      <SeoHead
        title="Support SnapSizes - Buy us a Coffee"
        description="Support SnapSizes through optional donations. SnapSizes remains free to use, and donations are voluntary."
        canonical="https://snapsizes.vercel.app/donate"
      />

      <header className={styles.aboutHeader}>
        <h1>Support SnapSizes <Heart className={styles.icon} style={{display: 'inline', width: '30px', height: '30px', color: '#ef4444', background: 'none', padding: 0}} /></h1>
        <p className={styles.subtitle}>Help us keep the servers running.</p>
      </header>

      <section className={styles.storySection}>
        <h2><Coffee size={24} style={{marginRight: '10px'}}/> Why Donate?</h2>
        <p>
          SnapSizes is a free, privacy-focused tool built to help creators save time. 
          We do not charge subscriptions, we do not require accounts, and we never sell your data.
        </p>
        <p>
          We rely on ads and community support to cover hosting costs. If these tools helped you finish a project today, 
          consider buying us a coffee!
        </p>
      </section>

      {/* Donation Card - Centered */}
      <section style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <div className={styles.card} style={{ maxWidth: '400px', width: '100%', border: '2px dashed #cbd5e1' }}>
          
          <Smartphone className={styles.icon} size={40} style={{ color: '#0284c7', background: '#e0f2fe' }} />
          
          <h3>Donate via UPI</h3>
          <p style={{marginBottom: '20px'}}>Scan using GPay, PhonePe, or Paytm</p>

          {/* UPI ID Badge */}
          <div style={{ 
            background: "#f1f5f9", 
            padding: "10px", 
            borderRadius: "8px", 
            marginBottom: "20px",
            fontFamily: "monospace",
            color: "#334155",
            fontWeight: "bold",
            border: "1px solid #e2e8f0"
          }}>
            shankaraditya980-4@okaxis
          </div>

          {/* QR Code */}
          <div style={{ background: 'white', padding: '10px', display: 'inline-block', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <img
              src="/upi-qr.jpg" 
              alt="Scan to Donate via UPI"
              style={{ 
                width: "100%", 
                maxWidth: "180px", 
                height: "auto",
                display: "block"
              }}
            />
          </div>

          <p style={{ marginTop: "20px", fontSize: "0.85rem", color: "#94a3b8" }}>
            Donations are 100% optional.<br/>
            Thank you for your support! ❤️
          </p>
        </div>
      </section>
    </article>
  );
}