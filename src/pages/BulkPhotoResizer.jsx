import React, { useState, useEffect, useRef, useCallback } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import styles from "./BulkPhotoResizer.module.css";

/**
 * SNAPSIZES ENTERPRISE - UX & SEO REFINED
 * Version: 2026.1.1
 * Core: Hardware-Accelerated Client-Side Processing
 */

const MAX_FREE_FILES = 12;
const MAX_PRO_FILES = 60;
const MAX_FILE_SIZE_MB = 25;
const QUALITY_DEFAULT = 0.85;

const DEFAULT_SIZES = [
  { w: 1080, h: 1080 },
  { w: 1920, h: 1080 },
];

const BulkPhotoResizer = () => {
  const [images, setImages] = useState([]);
  const [targetSizes, setTargetSizes] = useState(DEFAULT_SIZES);
  const [widthBuffer, setWidthBuffer] = useState("1200");
  const [heightBuffer, setHeightBuffer] = useState("1200");
  const [exportFormat, setExportFormat] = useState("image/jpeg");
  const [quality, setQuality] = useState(QUALITY_DEFAULT);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const fileInputRef = useRef(null);
  const imagesRef = useRef(images);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    return () => {
      if (imagesRef.current) {
        imagesRef.current.forEach(img => {
          if (img.previewUrl) URL.revokeObjectURL(img.previewUrl);
        });
      }
    };
  }, []);

  const handleReset = () => {
    if (images.length > 0 && !window.confirm("Permanently clear workspace and local image cache?")) return;
    images.forEach(img => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const limit = isUnlocked ? MAX_PRO_FILES : MAX_FREE_FILES;
    const remaining = limit - images.length;

    if (remaining <= 0) {
      if (!isUnlocked) setIsUnlocked(false);
      alert(`Limit reached. Please download or clear the current batch.`);
      return;
    }

    const newBatch = files.slice(0, remaining)
      .filter(f => f.size <= MAX_FILE_SIZE_MB * 1024 * 1024)
      .map(file => ({
        id: `snapsizes_job_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        name: file.name,
        rotation: 0,
        flipH: false
      }));

    setImages(prev => [...prev, ...newBatch]);
    e.target.value = "";
  };

  const removeImage = (id) => {
    setImages(prev => {
      const target = prev.find(img => img.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter(img => img.id !== id);
    });
  };

  const updateTransform = (id, type) => {
    setImages(prev => prev.map(img => {
      if (img.id !== id) return img;
      return type === "rot" ? { ...img, rotation: (img.rotation + 90) % 360 } : { ...img, flipH: !img.flipH };
    }));
  };

  const addSize = () => {
    const w = parseInt(widthBuffer, 10);
    const h = parseInt(heightBuffer, 10);
    if (!w || !h || w < 10 || h < 10) return;
    if (targetSizes.length >= 6) return;
    if (!targetSizes.find(s => s.w === w && s.h === h)) setTargetSizes([...targetSizes, { w, h }]);
  };

  const processImage = useCallback(async (imgObj, width, height) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) { resolve(null); return; }
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
        ctx.translate(width / 2, height / 2);
        ctx.rotate((imgObj.rotation * Math.PI) / 180);
        ctx.scale(imgObj.flipH ? -1 : 1, 1);
        const scale = Math.max(width / img.width, height / img.height);
        ctx.drawImage(img, -(img.width * scale) / 2, -(img.height * scale) / 2, img.width * scale, img.height * scale);
        canvas.toBlob(blob => {
          canvas.width = 0; canvas.height = 0;
          resolve(blob);
        }, exportFormat, quality);
      };
      img.src = imgObj.previewUrl;
    });
  }, [exportFormat, quality]);

  const handleBatchExport = async () => {
    if (images.length === 0 || isProcessing) return;
    setIsProcessing(true);
    setProgress(0);
    const zip = new JSZip();
    let count = 0;
    try {
      for (const imgData of images) {
        for (const size of targetSizes) {
          const blob = await processImage(imgData, size.w, size.h);
          if (blob) {
            const ext = exportFormat.split("/")[1];
            const safeName = imgData.name.replace(/[^\w.-]/gi, '_').split('.')[0];
            zip.file(`${safeName}_${size.w}x${size.h}.${ext}`, blob);
          }
          count++;
          setProgress(Math.round((count / (images.length * targetSizes.length)) * 100));
          await new Promise(r => setTimeout(r, 15));
        }
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `snapsizes_batch_${Date.now()}.zip`);
    } catch (error) { 
      console.error("Batch operation encountered an error:", error); 
    } finally { 
      setIsProcessing(false); 
      setProgress(0); 
    }
  };

  return (
    <article className={styles.ultraRoot}>
      <section className={styles.editorialSection}>
        <article className={styles.proArticle}>
          <h1>Professional Bulk Image Resizer & Optimizer</h1>
          <p>
            SnapSizes is a high-performance, <strong>client-side utility</strong> designed for photographers, 
            developers, and social media managers. Our secure architecture allows you to scale, crop, and 
            optimize hundreds of images simultaneously without compromising your data privacy.
          </p>

          <section className={styles.benefitRow}>
            <div className={styles.benefitCol}>
              <h3>Private & Secure</h3>
              <p>
                Unlike traditional cloud converters, our <strong>Privacy-First Architecture</strong> processes 
                all media locally in your browser. Your private photos never transit over the network 
                and are never stored on external servers.
              </p>
            </div>
            <div className={styles.benefitCol}>
              <h3>Lossless Fidelity</h3>
              <p>
                Utilizing hardware-accelerated <strong>HTML5 Canvas technology</strong>, our engine 
                ensures maximum sharpness and color accuracy during resolution scaling for 
                Instagram, LinkedIn, and Web standards.
              </p>
            </div>
          </section>
        </article>
      </section>

      <hr className={styles.divider} />

      <main className={styles.dashboardLayout} role="main">
        <aside className={styles.sidebar}>
          <section className={styles.blackCard} aria-labelledby="controls-media">
            <header className={styles.cardHeader}>
              <h2 id="controls-media" className={styles.label}>1. Source Media</h2>
              {images.length > 0 && (
                <button className={styles.resetBtn} onClick={handleReset} aria-label="Clear workspace">
                  Clear All
                </button>
              )}
            </header>
            <div className={styles.uploadBoundary}>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                ref={fileInputRef} 
                hidden 
                onChange={handleFileUpload} 
              />
              <button 
                className={styles.primaryAction} 
                onClick={() => fileInputRef.current.click()} 
                aria-label="Upload images from your device"
              >
                {images.length === 0 ? "Select Photos" : `Add Files (${images.length}/${MAX_FREE_FILES})`}
              </button>
            </div>
          </section>

          <section className={styles.blackCard} aria-labelledby="controls-resize">
            <h2 id="controls-resize" className={styles.label}>2. Resolution Targets</h2>
            <div className={styles.tagCloud} role="list">
              {targetSizes.map((s, i) => (
                <div key={i} className={styles.tag} role="listitem">
                  {s.w}×{s.h}
                  {targetSizes.length > 1 && (
                    <button 
                      onClick={() => setTargetSizes(targetSizes.filter((_, idx) => idx !== i))} 
                      aria-label={`Remove ${s.w} by ${s.h} size`}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.inputResponsiveRow}>
              <div className={styles.inputCol}>
                <label htmlFor="w-input">Width (px)</label>
                <input 
                  id="w-input"
                  type="text" 
                  value={widthBuffer} 
                  onChange={e => setWidthBuffer(e.target.value.replace(/\D/g, ''))} 
                />
              </div>
              <div className={styles.inputCol}>
                <label htmlFor="h-input">Height (px)</label>
                <input 
                  id="h-input"
                  type="text" 
                  value={heightBuffer} 
                  onChange={e => setHeightBuffer(e.target.value.replace(/\D/g, ''))} 
                />
              </div>
              <button 
                className={styles.addBtn} 
                onClick={addSize} 
                aria-label="Add custom resolution"
              >
                +
              </button>
            </div>
          </section>

          <section className={styles.blackCard} aria-labelledby="controls-export">
            <h2 id="controls-export" className={styles.label}>3. Export Profile</h2>
            <div className={styles.configControls}>
              <label htmlFor="format-select" className={styles.hiddenLabel}>Select Format</label>
              <select 
                id="format-select"
                className={styles.proSelect} 
                value={exportFormat} 
                onChange={e => setExportFormat(e.target.value)}
              >
                <option value="image/jpeg">JPEG (Compressed)</option>
                <option value="image/png">PNG (Lossless)</option>
              </select>
              {exportFormat === "image/jpeg" && (
                <div className={styles.qualitySlider}>
                  <div className={styles.qText}>Output Quality: <strong>{Math.round(quality * 100)}%</strong></div>
                  <input 
                    type="range" 
                    min="0.4" 
                    max="1" 
                    step="0.05" 
                    value={quality} 
                    onChange={e => setQuality(parseFloat(e.target.value))} 
                    aria-label="JPEG Fidelity range"
                  />
                </div>
              )}
            </div>
          </section>
        </aside>

        <section className={styles.workspace} aria-labelledby="active-queue">
          <header className={styles.stageHead}>
            <h3 id="active-queue" className={styles.stageTitle}>Active Queue</h3>
            <span className={styles.badge}>{images.length * targetSizes.length} Total Exports</span>
          </header>

          <div className={styles.assetGrid} role="list">
            {images.map(img => (
              <div key={img.id} className={styles.assetCard} role="listitem">
                <div className={styles.previewBox}>
                  <img 
                    src={img.previewUrl} 
                    alt={`Preview of ${img.name}`} 
                    loading="lazy" 
                    style={{ transform: `rotate(${img.rotation}deg) scale(${img.flipH ? -1 : 1}, 1)` }} 
                  />
                </div>
                <div className={styles.assetMeta}>
                  <p className={styles.filename}>{img.name}</p>
                  <nav className={styles.assetTools}>
                    <button onClick={() => updateTransform(img.id, "rot")} aria-label="Rotate clockwise">↻</button>
                    <button onClick={() => updateTransform(img.id, "flip")} aria-label="Flip horizontal">↔</button>
                    <button className={styles.dangerBtn} onClick={() => removeImage(img.id)} aria-label="Remove image">×</button>
                  </nav>
                </div>
              </div>
            ))}
            {images.length === 0 && (
              <div className={styles.emptyPrompt}>
                Workspace idle. Import photos to begin your batch optimization.
              </div>
            )}
          </div>
        </section>
      </main>

      <section className={styles.faqAreaSection}>
        <article className={styles.faqInner}>
          <h2>Technical Performance FAQ</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <strong>How many images can I process at once?</strong>
              <p>Standard users can process up to 12 images with 6 resolution variations per batch, resulting in 72 unique assets.</p>
            </div>
            <div className={styles.faqItem}>
              <strong>Does it support high-resolution RAW files?</strong>
              <p>We support files up to 25MB each. Our sequential queue ensures your browser remains stable during heavy processing.</p>
            </div>
          </div>
        </article>
      </section>

      <footer className={`${styles.actionArea} ${images.length > 0 ? styles.active : ""}`}>
        <div className={styles.actionInner}>
          {isProcessing ? (
            <div className={styles.progressFrame}>
              <div className={styles.fill} style={{ width: `${progress}%` }}></div>
              <span className={styles.progressText}>Processing Archive: {progress}%</span>
            </div>
          ) : (
            <button 
              className={styles.downloadCta} 
              onClick={handleBatchExport} 
              aria-label="Generate and download ZIP archive"
            >
              Download Resized Assets (ZIP)
            </button>
          )}
        </div>
      </footer>
    </article>
  );
};

export default BulkPhotoResizer;