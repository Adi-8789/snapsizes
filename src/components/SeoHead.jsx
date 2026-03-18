import { useEffect } from "react";

export default function SeoHead({ title, description, canonical, customFaqs }) {
  const siteName = "SnapSizes";
  const fullTitle = title ? `${title} | ${siteName}` : "SnapSizes – Free Privacy-First Image Tools";

  useEffect(() => {
    /* ===============================
       1. BASIC & SOCIAL SEO (Meta Tags)
    =============================== */
    if (fullTitle) document.title = fullTitle;

    const metaData = [
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical || window.location.href },
      { property: "og:site_name", content: siteName },
      { property: "og:image", content: "https://snapsizes.vercel.app/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "https://snapsizes.vercel.app/og-image.png" },
    ];

    const appliedMetas = [];

    metaData.forEach(({ name, property, content }) => {
      if (!content) return;
      const selector = name ? `meta[name='${name}']` : `meta[property='${property}']`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement("meta");
        if (name) element.name = name;
        if (property) element.property = property;
        document.head.appendChild(element);
      }
      
      const prevContent = element.content;
      element.content = content;
      appliedMetas.push({ element, prevContent });
    });

    let link = document.querySelector("link[rel='canonical']");
    const prevHref = link ? link.href : null;
    if (canonical) {
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    /* ===============================
       2. DYNAMIC JSON-LD SCHEMA
    =============================== */
    const schemaId = "snapsizes-dynamic-schema";
    let script = document.getElementById(schemaId);
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = schemaId;
      document.head.appendChild(script);
    }

    // Default FAQs that appear on every page
    const defaultFaqs = [
      {
        "@type": "Question",
        "name": "Is SnapSizes really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, SnapSizes is a 100% free web-based utility for creators."
        }
      },
      {
        "@type": "Question",
        "name": "Are my images uploaded to a server?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. All image processing happens client-side in your browser. Your data stays on your device."
        }
      }
    ];

    // Combine default FAQs with any custom ones passed from the specific tool page
    const allFaqs = customFaqs ? [...defaultFaqs, ...customFaqs] : defaultFaqs;

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "name": fullTitle,
          "url": canonical || window.location.href,
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "All",
          "description": description,
          "isAccessibleForFree": true,
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        },
        {
          "@type": "FAQPage",
          "mainEntity": allFaqs // This ensures only ONE FAQPage object exists!
        }
      ]
    };

    script.textContent = JSON.stringify(schema);

    return () => {
      appliedMetas.forEach(({ element, prevContent }) => {
        if (prevContent) element.content = prevContent;
        else element.remove();
      });
      if (link && !prevHref) link.remove();
      else if (link) link.href = prevHref;
    };
  }, [fullTitle, description, canonical, customFaqs]);

  return null;
}