import React, { useState, useEffect, useRef } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import styles from "./BulkPhotoResizer.module.css";

// --- CONFIGURATION ---
const MAX_FREE_FILES = 6;
const MAX_PRO_FILES = 10;
const MAX_FILE_SIZE_MB = 25; // Safety limit
const QUALITY_DEFAULT = 0.8;

const DEFAULT_SIZES = [
  { w: 1080, h: 1080, label: "IG Square" },
  { w: 1920, h: 1080, label: "Full HD" },
];

const BulkPhotoResizer = () => {
  // --- STATE ---
  const [images, setImages] = useState([]);
  const [targetSizes, setTargetSizes] = useState(DEFAULT_SIZES);
  const [customSize, setCustomSize] = useState({ w: 800, h: 800 });
  const [exportFormat, setExportFormat] = useState("image/jpeg");
  const [quality, setQuality] = useState(QUALITY_DEFAULT);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const fileInputRef = useRef(null);

  // FIX 1: Use a Ref to track images for cleanup so we don't delete them while viewing
  const imagesRef = useRef(images);

  // Keep the Ref synced with state
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  // Cleanup memory ONLY when the component unmounts (page reload/close)
  useEffect(() => {
    return () => {
      if (imagesRef.current) {
        imagesRef.current.forEach((img) => URL.revokeObjectURL(img.previewUrl));
      }
    };
  }, []);

  // --- HANDLERS ---

  const handleReset = () => {
    if (
      images.length > 0 &&
      !window.confirm("Clear all images and start over?")
    ) {
      return;
    }
    // Clean up memory before clearing state
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const limit = isUnlocked ? MAX_PRO_FILES : MAX_FREE_FILES;
    const remainingSlots = limit - images.length;

    if (remainingSlots <= 0) {
      alert(`Limit reached! You can process up to ${limit} images at once.`);
      return;
    }

    // Safety Filter: Check file size
    const validFiles = files.filter((file) => {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(
          `Skipped ${file.name}: File too large (Max ${MAX_FILE_SIZE_MB}MB)`
        );
        return false;
      }
      return true;
    });

    const newImages = validFiles.slice(0, remainingSlots).map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
      // Transformation State
      rotation: 0,
      flipH: false,
      flipV: false,
    }));

    setImages((prev) => [...prev, ...newImages]);
    e.target.value = ""; // Reset input to allow re-selecting same files
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) {
        // Revoke URL specifically for the removed image
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const updateTransform = (id, type) => {
    setImages((prev) =>
      prev.map((img) => {
        if (img.id !== id) return img;
        switch (type) {
          case "rot-left":
            return { ...img, rotation: (img.rotation - 90 + 360) % 360 };
          case "rot-right":
            return { ...img, rotation: (img.rotation + 90) % 360 };
          case "flip-h":
            return { ...img, flipH: !img.flipH };
          case "flip-v":
            return { ...img, flipV: !img.flipV };
          default:
            return img;
        }
      })
    );
  };

  const addCustomSize = () => {
    const exists = targetSizes.find(
      (s) => s.w === customSize.w && s.h === customSize.h
    );
    if (!exists && targetSizes.length < 4) {
      setTargetSizes([...targetSizes, { ...customSize, label: "Custom" }]);
    }
  };

  const removeSize = (index) => {
    if (targetSizes.length > 1) {
      setTargetSizes(targetSizes.filter((_, i) => i !== index));
    }
  };

  // --- CORE ENGINE: ROBUST CANVAS MATH ---
  const processSingleImage = async (imgData, targetW, targetH) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");

        // 1. Fill Background (White)
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, targetW, targetH);

        // 2. Move Origin to Center
        ctx.translate(targetW / 2, targetH / 2);

        // 3. Apply Transforms
        ctx.rotate((imgData.rotation * Math.PI) / 180);
        ctx.scale(imgData.flipH ? -1 : 1, imgData.flipV ? -1 : 1);

        // 4. Calculate "Cover" Fit
        const isRotatedSides = imgData.rotation % 180 !== 0;
        const srcW = isRotatedSides ? img.height : img.width;
        const srcH = isRotatedSides ? img.width : img.height;

        const scale = Math.max(targetW / srcW, targetH / srcH);
        const drawW = img.width * scale;
        const drawH = img.height * scale;

        // 5. Draw Centered
        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);

        // 6. Export
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Canvas export failed"));
          },
          exportFormat,
          quality
        );
      };
      img.onerror = reject;
      img.src = imgData.previewUrl;
    });
  };

  // --- FIX 2: Safer Single Download Handler ---
  const handleSingleDownload = async (imgData) => {
    try {
      // Safety check: If user deleted all sizes, default to 1080x1080
      const size =
        targetSizes.length > 0 ? targetSizes[0] : { w: 1080, h: 1080 };

      const blob = await processSingleImage(imgData, size.w, size.h);
      const ext = exportFormat.split("/")[1];
      const fileName = `${imgData.name.split(".")[0]}_${size.w}x${
        size.h
      }.${ext}`;
      saveAs(blob, fileName);
    } catch (e) {
      console.error(e);
      alert("Error processing image. Please try again.");
    }
  };

  // --- Batch Download Handler ---
  const handleBatchDownload = async () => {
    if (targetSizes.length === 0) {
      alert("Please select at least one output size.");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    const zip = new JSZip();
    const totalOps = images.length * targetSizes.length;
    let completedOps = 0;

    try {
      for (const imgData of images) {
        for (const size of targetSizes) {
          const blob = await processSingleImage(imgData, size.w, size.h);
          const ext = exportFormat.split("/")[1];
          const nameClean =
            imgData.name.substring(0, imgData.name.lastIndexOf(".")) ||
            imgData.name;
          const fileName = `${nameClean}_${size.w}x${size.h}.${ext}`;

          zip.file(fileName, blob);

          completedOps++;
          setProgress(Math.round((completedOps / totalOps) * 100));
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "resized_photos_batch.zip");
    } catch (error) {
      console.error("Batch error", error);
      alert("An error occurred. Please try fewer images.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <article className={styles.container}>
      {/* HEADER & TRUST SIGNALS */}
      <header className={styles.header}>
        <h1 className={styles.h1}>Bulk Photo Resizer</h1>
        <p className={styles.trustBadge}>
          🔒 Processed locally in your browser. No server uploads.
        </p>
      </header>

      {/* ADSENSE TOP (Min Height reserved) */}
      <div className={styles.adContainerTop} aria-hidden="true">
        <span className={styles.adLabel}>Advertisement</span>
        <div className={styles.adPlaceholder}></div>
      </div>

      <main className={styles.main}>
        {/* SECTION 1: SETTINGS (Accordion) */}
        <details className={styles.accordion} open>
          <summary className={styles.accordionHeader}>
            <h2 className={styles.h2}>⚙️ Output Settings</h2>
            <span className={styles.chevron}>▼</span>
          </summary>

          <div className={styles.accordionContent}>
            <div className={styles.sizeTags}>
              {targetSizes.map((size, idx) => (
                <div key={idx} className={styles.sizeTag}>
                  <span>
                    {size.w}×{size.h}
                  </span>
                  {targetSizes.length > 1 && (
                    <button
                      onClick={() => removeSize(idx)}
                      aria-label="Remove size"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="number"
                placeholder="W"
                value={customSize.w}
                onChange={(e) =>
                  setCustomSize({
                    ...customSize,
                    w: parseInt(e.target.value) || 0,
                  })
                }
              />
              <span>×</span>
              <input
                type="number"
                placeholder="H"
                value={customSize.h}
                onChange={(e) =>
                  setCustomSize({
                    ...customSize,
                    h: parseInt(e.target.value) || 0,
                  })
                }
              />
              <button className={styles.secondaryBtn} onClick={addCustomSize}>
                Add Size
              </button>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.row}>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className={styles.select}
              >
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
              </select>

              {exportFormat === "image/jpeg" && (
                <div className={styles.sliderGroup}>
                  <label>Quality: {Math.round(quality * 100)}%</label>
                  <input
                    type="range"
                    min="0.6"
                    max="1"
                    step="0.05"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                  />
                </div>
              )}
            </div>
          </div>
        </details>

        {/* SECTION 2: UPLOAD & LIMITS */}
        <section className={styles.uploadSection}>
          <div className={styles.uploadCard}>
            {/* Header with Start Over Button */}
            <div className={styles.uploadHeader}>
              <h2 className={styles.h2}>Upload Images</h2>
              {images.length > 0 && (
                <button className={styles.resetBtn} onClick={handleReset}>
                  ↻ Start Over
                </button>
              )}
            </div>

            <p className={styles.limitText}>
              {images.length} / {isUnlocked ? MAX_PRO_FILES : MAX_FREE_FILES}{" "}
              slots used
            </p>

            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              hidden
              onChange={handleFileUpload}
            />

            <button
              className={styles.primaryBtn}
              onClick={() => fileInputRef.current.click()}
              disabled={
                images.length >= (isUnlocked ? MAX_PRO_FILES : MAX_FREE_FILES)
              }
            >
              Select Images
            </button>

            {!isUnlocked && (
              <button
                className={styles.adUnlockBtn}
                onClick={() => setIsUnlocked(true)}
              >
                <span> Higher usage limits may be available</span>
              </button>
            )}
          </div>
        </section>

        {/* SECTION 3: IMAGE GRID (Mobile Optimized) */}
        <section className={styles.grid}>
          {images.map((img) => (
            <div key={img.id} className={styles.imgCard}>
              <div className={styles.previewBox}>
                <img
                  src={img.previewUrl}
                  alt={img.name}
                  style={{
                    transform: `rotate(${img.rotation}deg) scale(${
                      img.flipH ? -1 : 1
                    }, ${img.flipV ? -1 : 1})`,
                  }}
                />
              </div>

              <div className={styles.cardMeta}>
                <div className={styles.filename} title={img.name}>
                  {img.name}
                </div>

                {/* Editor Controls */}
                <div className={styles.editorToolbar}>
                  <button
                    onClick={() => updateTransform(img.id, "rot-left")}
                    aria-label="Rotate Left"
                  >
                    ↺
                  </button>
                  <button
                    onClick={() => updateTransform(img.id, "rot-right")}
                    aria-label="Rotate Right"
                  >
                    ↻
                  </button>
                  <button
                    onClick={() => updateTransform(img.id, "flip-h")}
                    aria-label="Flip Horizontal"
                  >
                    ↔
                  </button>
                  <button
                    onClick={() => updateTransform(img.id, "flip-v")}
                    aria-label="Flip Vertical"
                  >
                    ↕
                  </button>
                </div>

                {/* Action Row with Single Download */}
                <div className={styles.actionRow}>
                  <button
                    className={styles.singleDownloadBtn}
                    onClick={() => handleSingleDownload(img)}
                    title="Download this image only"
                  >
                    ⬇ Save
                  </button>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeImage(img.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* SECTION 4: SEO CONTENT */}
        <section className={styles.seoContent}>
          <h3>Frequently Asked Questions</h3>

          <div className={styles.faqItem}>
            <strong>Is it free?</strong>
            <p>
              Yes. You can resize all the images for free at no cost.
            </p>
          </div>

          <div className={styles.faqItem}>
            <strong>Is my data safe?</strong>
            <p>
              Absolutely. Your photos are processed entirely in your browser
              using JavaScript. They are never uploaded to our servers.
            </p>
          </div>

          {/* COLLAPSIBLE SEO CONTENT */}

          <summary>
            <strong>About the Bulk Photo Resizer Tool</strong>
          </summary>

          <p>
            SnapSizes Bulk Photo Resizer is a free, browser-based tool designed
            to help users resize multiple images quickly and securely. It allows
            creators, marketers, and everyday users to generate images in
            popular sizes such as Instagram posts, Full HD images, and custom
            pixel dimensions without installing any software.
          </p>

          <p>
            All image processing is performed locally inside your browser using
            modern JavaScript and canvas technology. Your images are never
            uploaded to any server, ensuring full privacy and fast performance.
          </p>

          <p>
            The bulk resizer supports JPG and PNG formats, adjustable output
            quality, and batch downloads as a ZIP file. Higher usage limits may
            be available depending on usage patterns.
          </p>

          <p>
            Whether you are preparing images for social media, websites, or
            presentations, SnapSizes provides a clean, reliable, and
            privacy-friendly bulk image resizing solution.
          </p>
        </section>
      </main>

      {/* MOBILE STICKY FOOTER */}
      <footer
        className={`${styles.stickyFooter} ${
          images.length > 0 ? styles.visible : ""
        }`}
      >
        <div className={styles.footerInner}>
          {isProcessing ? (
            <div className={styles.progressBar}>
              <div style={{ width: `${progress}%` }}></div>
              <span>Processing... {progress}%</span>
            </div>
          ) : (
            <button
              className={styles.downloadBtn}
              onClick={handleBatchDownload}
            >
              Download ZIP ({images.length * targetSizes.length} files)
            </button>
          )}
        </div>
      </footer>

      {/* ADSENSE BOTTOM */}
      <div className={styles.adContainerBottom} aria-hidden="true">
        <span className={styles.adLabel}>Advertisement</span>
        <div className={styles.adPlaceholder}></div>
      </div>
    </article>
  );
};

export default BulkPhotoResizer;
