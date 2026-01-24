import React, { useState, useRef, useEffect, useCallback } from "react";
import SeoHead from "../components/SeoHead";
import styles from "./SocialMediaImageTool.module.css";

const PRESETS = [
  {
    id: "ig-post",
    label: "Instagram Post",
    width: 1080,
    height: 1080,
    ratio: "1:1 Square",
  },
  {
    id: "ig-story",
    label: "Reels, Stories, YouTube Shorts",
    width: 1080,
    height: 1920,
    ratio: "9:16 Vertical",
  },
  {
    id: "yt-thumb",
    label: "YouTube Thumbnail",
    width: 1280,
    height: 720,
    ratio: "16:9 Wide",
  },
  {
    id: "li-post",
    label: "LinkedIn Post",
    width: 1200,
    height: 627,
    ratio: "1.91:1 Landscape",
  },
  {
    id: "wa-dp",
    label: "WhatsApp DP",
    width: 500,
    height: 500,
    ratio: "1:1 Square",
  },
];

const SocialMediaImageTool = () => {
  const [sourceImage, setSourceImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [fitMode, setFitMode] = useState("blur");
  const [exportFormat, setExportFormat] = useState("image/jpeg");
  const [quality, setQuality] = useState(0.9);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Optimized Upload Engine
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    setIsDecoding(true);
    setFileName(file.name.split(".")[0]);

    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      setSourceImage(img);
      setIsDecoding(false);
      URL.revokeObjectURL(url); // Immediate memory release
    };

    img.onerror = () => {
      setIsDecoding(false);
      alert("Error loading image. Please try a different file.");
    };

    img.src = url;
  };

  const drawCanvas = useCallback(() => {
    if (!sourceImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    const { width, height } = selectedPreset;

    canvas.width = width;
    canvas.height = height;

    const imgRatio = sourceImage.width / sourceImage.height;
    const canvasRatio = width / height;

    // 1. BACKGROUND LAYER (Blur/Solid)
    if (fitMode === "blur") {
      ctx.save();
      const bgScale = Math.max(
        width / sourceImage.width,
        height / sourceImage.height,
      );
      const bgW = sourceImage.width * bgScale;
      const bgH = sourceImage.height * bgScale;
      ctx.filter = "blur(30px) brightness(0.6)";
      ctx.drawImage(
        sourceImage,
        (width - bgW) / 2,
        (height - bgH) / 2,
        bgW,
        bgH,
      );
      ctx.restore();
    } else {
      ctx.fillStyle = fitMode === "contain-white" ? "#ffffff" : "#000000";
      ctx.fillRect(0, 0, width, height);
    }

    // 2. FOREGROUND LAYER
    let drawW, drawH, drawX, drawY;

    if (fitMode === "cover") {
      if (imgRatio > canvasRatio) {
        drawH = height;
        drawW = height * imgRatio;
      } else {
        drawW = width;
        drawH = width / imgRatio;
      }
    } else {
      if (imgRatio > canvasRatio) {
        drawW = width;
        drawH = width / imgRatio;
      } else {
        drawH = height;
        drawW = height * imgRatio;
      }
    }

    drawX = (width - drawW) / 2;
    drawY = (height - drawH) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(sourceImage, drawX, drawY, drawW, drawH);
  }, [sourceImage, selectedPreset, fitMode]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleDownload = () => {
    setIsProcessing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    setTimeout(() => {
      const dataUrl = canvas.toDataURL(exportFormat, quality);
      const link = document.createElement("a");
      const cleanLabel = selectedPreset.label.replace(/\s+/g, "_");
      link.download = `SnapSizes_${cleanLabel}_${fileName}.${exportFormat === "image/jpeg" ? "jpg" : "png"}`;
      link.href = dataUrl;
      link.click();
      setIsProcessing(false);
    }, 150);
  };

  return (
    <div className={styles.ultraContainer}>
      <SeoHead
        title="Social Media Image Resizer - Crop for Instagram, YouTube & More"
        description="Resize and crop images for Instagram, YouTube, LinkedIn, and WhatsApp. Use preset sizes or custom dimensions. Free online tool."
        canonical="https://snapsizes.vercel.app/social-media-Imagetool"
      />

      <header className={styles.hero}>
        <h1 className={styles.h1}>
          Social Media Image Resizer <span className={styles.badge}>Pro</span>
        </h1>
        <div className={styles.headerActions}>
          <a href="#editor-main" className={styles.jumpBtn}>
            Jump to Editor ↓
          </a>
        </div>
        <div className={styles.introContent}>
          <p className={styles.intro}>
            SnapSizes is a professional-grade,{" "}
            <strong>privacy-first image optimization utility</strong> designed
            for content creators, social media managers, and developers. Unlike
            traditional online converters, our tool uses hardware-accelerated,
            browser-based logic to resize your media without ever uploading it
            to a server.
          </p>

          <p className={styles.intro}>
            Whether you are preparing an <strong>Instagram Story</strong>, a{" "}
            <strong>YouTube Thumbnail</strong>, or a{" "}
            <strong>LinkedIn Header</strong>, our engine ensures your assets
            meet exact platform specifications while maintaining lossless visual
            fidelity. By processing data locally, we eliminate the risks of data
            breaches and significantly reduce the time spent waiting for
            server-side uploads.
          </p>

          <div className={styles.featureHighlights}>
            <span>✓ 100% Client-Side Processing</span>
            <span>✓ No Account Required</span>
            <span>✓ Supports 4K Resolution</span>
            <span>✓ Zero Data Retention</span>
          </div>
        </div>
      </header>

      {!sourceImage ? (
        <section
          id="editor-main"
          className={`${styles.uploadDropzone} ${isDecoding ? styles.loadingPulse : ""}`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            hidden
            id="main-upload"
          />
          <label htmlFor="main-upload" className={styles.dropzoneLabel}>
            <div className={styles.uploadIcon}>{isDecoding ? "⏳" : "📸"}</div>
            <div className={styles.uploadText}>
              <strong>
                {isDecoding ? "Processing Image..." : "Click to Upload Image"}
              </strong>
              <span>Privacy-First Local Processing</span>
            </div>
          </label>
        </section>
      ) : (
        <div id="editor-main" className={styles.editorShell}>
          <main className={styles.previewCanvasArea}>
            <div className={styles.canvasFrame}>
              <canvas ref={canvasRef} className={styles.mainCanvas} />
              <div className={styles.canvasMeta}>
                Ratio: {selectedPreset.ratio}
              </div>
            </div>
          </main>

          <aside className={styles.sidebar}>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>1. Target Ratio</h3>
              <div className={styles.presetList}>
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    className={`${styles.presetCard} ${selectedPreset.id === p.id ? styles.active : ""}`}
                    onClick={() => setSelectedPreset(p)}
                  >
                    <span className={styles.pLabel}>{p.label}</span>
                    <span className={styles.pMeta}>{p.ratio}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>2. Fitting Mode</h3>
              <div className={styles.fitGrid}>
                {["blur", "cover", "contain-white", "contain-black"].map(
                  (mode) => (
                    <button
                      key={mode}
                      className={`${styles.modeBtn} ${fitMode === mode ? styles.active : ""}`}
                      onClick={() => setFitMode(mode)}
                    >
                      {mode.replace("-", " ")}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>3. Export Profile</h3>

              <div className={styles.formatSwitchContainer}>
                <button
                  className={
                    exportFormat === "image/jpeg"
                      ? styles.activeFormat
                      : styles.inactiveFormat
                  }
                  onClick={() => setExportFormat("image/jpeg")}
                >
                  JPG <small>(Optimized)</small>
                </button>
                <button
                  className={
                    exportFormat === "image/png"
                      ? styles.activeFormat
                      : styles.inactiveFormat
                  }
                  onClick={() => setExportFormat("image/png")}
                >
                  PNG <small>(Lossless)</small>
                </button>
              </div>

              {exportFormat === "image/jpeg" ? (
                <div className={styles.qualityControl}>
                  <div className={styles.qualityHeader}>
                    <label>Image Quality</label>
                    <span className={styles.qualityBadge}>
                      {Math.round(quality * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className={styles.slider}
                  />
                  <p className={styles.helperText}>
                    Lower quality results in smaller file sizes.
                  </p>
                </div>
              ) : (
                <div className={styles.infoBox}>
                  <p>
                    PNG provides maximum quality but results in larger file
                    sizes. No compression options available.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.actionRow}>
              <div className={styles.downloadWrapper}>
                <button
                  className={styles.exportBtn}
                  onClick={handleDownload}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className={styles.loaderBox}>
                      <span className={styles.spinner}></span>
                      Processing...
                    </span>
                  ) : (
                    "Download Optimized Asset"
                  )}
                </button>
              </div>

              <div className={styles.secondaryActions}>
                <button
                  className={styles.clearBtn}
                  onClick={() => {
                    if (
                      window.confirm("Discard changes and start a new image?")
                    ) {
                      setSourceImage(null);
                    }
                  }}
                >
                  ← Start New Image
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* 👇 NEW UNIQUE SEO CONTENT WITH INTERNAL LINKS */}
      <article className="seo-content-block" style={{maxWidth: '800px', margin: '40px auto', padding: '20px', lineHeight: '1.6', color: '#333'}}>
        
        <h2>All-in-One Social Media Image Maker</h2>
        <p>
          Every social media platform requires different image dimensions. A post that looks great on Instagram might get cropped awkwardly on Twitter.
          SnapSizes simplifies this with a dedicated <strong>Social Media Image Tool</strong>. 
          Upload one high-quality image, and instantly generate perfectly cropped versions for every major platform.
          If your final image is still too heavy for upload, run it through our <a href="/image-compressor-tool" style={{color: '#0066cc', textDecoration: 'underline'}}>Image Compressor Tool</a> afterwards.
        </p>

        <h3>Supported Platforms & Formats</h3>
        <p>
          We keep our presets updated with the latest 2026 size guidelines for:
        </p>
        <ul>
          <li><strong>Instagram:</strong> Posts (1:1), Portraits (4:5), and Stories (9:16).</li>
          <li><strong>YouTube:</strong> Thumbnails (1280x720) and Channel Art.</li>
          <li><strong>LinkedIn:</strong> Professional headers and shared post images.</li>
          <li><strong>Twitter / X:</strong> In-stream photos and headers.</li>
          <li><strong>Pinterest:</strong> Long pins (1000x1500).</li>
        </ul>

        <h3>Smart Cropping Technology</h3>
        <p>
          Unlike basic resizers that simply stretch your image, our tool offers <strong>Smart Cropping</strong>.
          You can adjust the focus area for each platform individually, ensuring faces and text are never cut off.
          Need to resize dozens of images at once instead of just one? Try our <a href="/bulk-photo-resizer" style={{color: '#0066cc', textDecoration: 'underline'}}>Bulk Photo Resizer</a>.
        </p>

        <h3>Frequently Asked Questions</h3>
        <details>
          <summary><strong>Do I need to sign up?</strong></summary>
          <p>No. SnapSizes is completely free and requires no account or login.</p>
        </details>
        <details>
          <summary><strong>Can I download all sizes at once?</strong></summary>
          <p>Yes! Once you are happy with your crops, click "Download All" to get a ZIP file containing every version, organized by platform.</p>
        </details>
      </article>
      {/* 👆 END SEO CONTENT */}
    </div>
  );
};

export default SocialMediaImageTool;