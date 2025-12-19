export const PLATFORM_PRESETS = [
  /* =====================
     Instagram
  ===================== */
  {
    platform: "Instagram",
    items: [
      {
        key: "ig-post",
        label: "Instagram Post",
        width: 1080,
        height: 1080,
        ratio: 1,
        fitMode: "fill",
        background: "black",
        filename: "instagram-post-1080x1080",
        badge: "Recommended",
      },
      {
        key: "ig-portrait",
        label: "Instagram Portrait",
        width: 1080,
        height: 1350,
        ratio: 4 / 5,
        fitMode: "fill",
        background: "black",
        filename: "instagram-portrait-1080x1350",
      },
      {
        key: "ig-story",
        label: "Instagram Story / Reel",
        width: 1080,
        height: 1920,
        ratio: 9 / 16,
        fitMode: "fit",
        background: "blur",
        filename: "instagram-story-1080x1920",
        badge: "Popular",
      },
    ],
  },

  /* =====================
     YouTube
  ===================== */
  {
    platform: "YouTube",
    items: [
      {
        key: "yt-shorts",
        label: "YouTube Shorts",
        width: 1080,
        height: 1920,
        ratio: 9 / 16,
        fitMode: "fit",
        background: "blur",
        filename: "youtube-shorts-1080x1920",
        badge: "Recommended",
      },
      {
        key: "yt-thumb",
        label: "YouTube Thumbnail",
        width: 1280,
        height: 720,
        ratio: 16 / 9,
        fitMode: "fill",
        background: "black",
        filename: "youtube-thumbnail-1280x720",
      },
    ],
  },

  /* =====================
     WhatsApp
  ===================== */
  {
    platform: "WhatsApp",
    items: [
      {
        key: "wa-dp",
        label: "WhatsApp DP",
        width: 500,
        height: 500,
        ratio: 1,
        fitMode: "fill",
        background: "black",
        filename: "whatsapp-dp-500x500",
      },
      {
        key: "wa-status",
        label: "WhatsApp Status",
        width: 1080,
        height: 1920,
        ratio: 9 / 16,
        fitMode: "fit",
        background: "black",
        filename: "whatsapp-status-1080x1920",
      },
    ],
  },

  /* =====================
     LinkedIn
  ===================== */
  {
    platform: "LinkedIn",
    items: [
      {
        key: "li-post",
        label: "LinkedIn Post",
        width: 1200,
        height: 1200,
        ratio: 1,
        fitMode: "fill",
        background: "black",
        filename: "linkedin-post-1200x1200",
      },
      {
        key: "li-banner",
        label: "LinkedIn Banner",
        width: 1584,
        height: 396,
        ratio: 4,
        fitMode: "fit",
        background: "black",
        filename: "linkedin-banner-1584x396",
      },
    ],
  },

  /* =====================
     X / Twitter
  ===================== */
  {
    platform: "X",
    items: [
      {
        key: "x-post",
        label: "X (Twitter) Post",
        width: 1600,
        height: 900,
        ratio: 16 / 9,
        fitMode: "fill",
        background: "black",
        filename: "x-post-1600x900",
      },
    ],
  },

  /* =====================
     Facebook
  ===================== */
  {
    platform: "Facebook",
    items: [
      {
        key: "fb-post",
        label: "Facebook Post",
        width: 1200,
        height: 630,
        ratio: 1.91,
        fitMode: "fill",
        background: "black",
        filename: "facebook-post-1200x630",
      },
    ],
  },
];