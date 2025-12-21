import { useEffect } from "react";

export default function SeoHead({ title, description, canonical }) {
  useEffect(() => {
    /* ===============================
       BASIC SEO (Existing Logic)
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
       TRUST + APP SCHEMA (NEW)
    =============================== */
    const schemaId = "snapsizes-app-schema";

    // Remove old schema if exists (SPA safety)
    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "SnapSizes – Free Image Resizer",
      "url": canonical || "https://snapsizes.vercel.app/",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "All",
      "description":
        "SnapSizes is a free online image resizer that processes images locally in your browser. No uploads, no tracking, full privacy.",
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
      },
      "privacyPolicy":
        "https://snapsizes.vercel.app/privacy-policy"
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is SnapSizes free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. SnapSizes is free to use and processes images locally in your browser."
          }
        },
        {
          "@type": "Question",
          "name": "Are images uploaded to a server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "No. All image processing happens locally in your browser. Images are never uploaded."
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
      // Cleanup on route change
      script.remove();
    };
  }, [title, description, canonical]);

  return null;
}