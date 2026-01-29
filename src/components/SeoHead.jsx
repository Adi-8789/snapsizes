import { useEffect } from "react";

export default function SeoHead({ title, description, canonical }) {
  useEffect(() => {
    /* ===============================
       1. BASIC SEO (Meta Tags)
    =============================== */
    if (title) document.title = title;

    if (description) {
      let meta = document.querySelector("meta[name='description']");
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }

    if (canonical) {
      let link = document.querySelector("link[rel='canonical']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    /* ===============================
       2. DYNAMIC JSON-LD SCHEMA (The "Rich Snippet" Magic)
    =============================== */
    const schemaId = "snapsizes-app-schema";

    // Clean up old schema to prevent duplicates
    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": title || "SnapSizes – Free Image Tools", // 🟢 Now Dynamic!
      "url": canonical || "https://snapsizes.vercel.app/",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "All",
      "description": description || "SnapSizes is a free online image toolsuite.",
      "browserRequirements": "Requires JavaScript",
      "isAccessibleForFree": true,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "SnapSizes"
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is this tool free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. SnapSizes is 100% free and processes files locally."
          }
        },
        {
          "@type": "Question",
          "name": "Is my data safe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We use client-side processing, so your files are never uploaded to a server."
          }
        }
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = schemaId;
    script.textContent = JSON.stringify([schema, faqSchema]);

    document.head.appendChild(script);

    return () => {
      // Cleanup on page change
      script.remove();
    };
  }, [title, description, canonical]);

  return null;
}