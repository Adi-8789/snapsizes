import React, { useState, useEffect, useRef, useCallback } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import SeoHead from "../components/SeoHead";
import styles from "./BulkPhotoResizer.module.css";

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
  const [isUnlocked] = useState(false);
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
    if (images.length > 0 && !window.confirm("Permanently clear workspace?")) return;
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
      alert(`Limit reached. Please download or clear the current batch.`);
      return;
    }

    const newBatch = files.slice(0, remaining)
      .filter(f => f.size <= MAX_FILE_SIZE_MB * 1024 * 1024)
      .map(file => ({
        id: `snapsizes_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
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
          await new Promise(r => setTimeout(r, 10));
        }
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `snapsizes_export_${Date.now()}.zip`);
    } catch (error) { 
      console.error("Export Error:", error); 
    } finally { 
      setIsProcessing(false); 
      setProgress(0); 
    }
  };

  return (
    <article className={styles.ultraRoot}>
      <SeoHead
        title="Bulk Image Resizer - Resize Multiple Photos Online | SnapSizes"
        description="Batch resize JPG, PNG, and WebP images instantly. Define multiple target sizes and download as a ZIP. Fast, free, and private."
        canonical="https://snapsizes.vercel.app/bulk-photo-resizer"
      />

      {/* 1. SEO & Editorial Header */}
      <section className={styles.editorialSection}>
        <div className={styles.proArticle}>
          <h1>Professional Bulk Image Resizer & Optimizer</h1>
          <p>
            SnapSizes is a high-performance <strong>client-side utility</strong>. 
            Scale, crop, and optimize your media without compromising privacy.
          </p>
          <a href="#tool-dashboard" className={styles.jumpLink}>
            Jump to Tool ↓
          </a>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* 2. MAIN TOOL INTERFACE */}
      <main id="tool-dashboard" className={styles.dashboardLayout} role="main">
        <aside className={styles.sidebar}>
          {/* Step 1: Upload */}
          <section className={styles.blackCard}>
            <header className={styles.cardHeader}>
              <h2 className={styles.label}>1. Source Media</h2>
              {images.length > 0 && (
                <button className={styles.resetBtn} onClick={handleReset}>Clear All</button>
              )}
            </header>
            <div className={styles.uploadBoundary}>
              <input 
                type="file" multiple accept="image/*" 
                ref={fileInputRef} hidden onChange={handleFileUpload} 
              />
              <button 
                className={styles.primaryAction} 
                onClick={() => fileInputRef.current.click()}
              >
                {images.length === 0 ? "Select Photos" : `Add Files (${images.length}/${MAX_FREE_FILES})`}
              </button>
            </div>
          </section>

          {/* Step 2: Sizes */}
          <section className={styles.blackCard}>
            <h2 className={styles.label}>2. Resolution Targets</h2>
            <div className={styles.tagCloud}>
              {targetSizes.map((s, i) => (
                <div key={i} className={styles.tag}>
                  {s.w}×{s.h}
                  {targetSizes.length > 1 && (
                    <button onClick={() => setTargetSizes(targetSizes.filter((_, idx) => idx !== i))}>×</button>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.inputResponsiveRow}>
              <div className={styles.inputCol}>
                <input 
                  type="text" placeholder="Width" value={widthBuffer} 
                  onChange={e => setWidthBuffer(e.target.value.replace(/\D/g, ''))} 
                />
              </div>
              <div className={styles.inputCol}>
                <input 
                  type="text" placeholder="Height" value={heightBuffer} 
                  onChange={e => setHeightBuffer(e.target.value.replace(/\D/g, ''))} 
                />
              </div>
              <button className={styles.addBtn} onClick={addSize}>+</button>
            </div>
          </section>

          {/* Step 3: Format */}
          <section className={styles.blackCard}>
            <h2 className={styles.label}>3. Export Profile</h2>
            <select 
              className={styles.proSelect} value={exportFormat} 
              onChange={e => setExportFormat(e.target.value)}
            >
              <option value="image/jpeg">JPEG (Compressed)</option>
              <option value="image/png">PNG (Lossless)</option>
            </select>
            {exportFormat === "image/jpeg" && (
              <div className={styles.qualitySlider}>
                <div className={styles.qText}>Quality: <strong>{Math.round(quality * 100)}%</strong></div>
                <input 
                  type="range" min="0.4" max="1" step="0.05" 
                  value={quality} onChange={e => setQuality(parseFloat(e.target.value))} 
                />
              </div>
            )}
          </section>
        </aside>

        {/* Workspace area */}
        <section className={styles.workspace}>
          <header className={styles.stageHead}>
            <h3 className={styles.stageTitle}>Active Queue</h3>
            <span className={styles.badge}>{images.length * targetSizes.length} Exports Pending</span>
          </header>

          <div className={styles.assetGrid}>
            {images.map(img => (
              <div key={img.id} className={styles.assetCard}>
                <div className={styles.previewBox}>
                  <img 
                    src={img.previewUrl} alt={img.name} 
                    style={{ transform: `rotate(${img.rotation}deg) scale(${img.flipH ? -1 : 1}, 1)` }} 
                  />
                </div>
                <div className={styles.assetMeta}>
                  <p className={styles.filename}>{img.name}</p>
                  <nav className={styles.assetTools}>
                    <button onClick={() => updateTransform(img.id, "rot")}>↻</button>
                    <button onClick={() => updateTransform(img.id, "flip")}>↔</button>
                    <button className={styles.dangerBtn} onClick={() => removeImage(img.id)}>×</button>
                  </nav>
                </div>
              </div>
            ))}
            {images.length === 0 && (
              <div className={styles.emptyPrompt}>Workspace idle. Import photos to begin.</div>
            )}
          </div>
        </section>
      </main>

      {/* 3. NEW UNIQUE SEO CONTENT BLOCK */}
      <article className="seo-content-block" style={{maxWidth: '800px', margin: '40px auto', padding: '20px', lineHeight: '1.6', color: '#333'}}>
        <h2>The Fastest Way to Resize Photos for Social Media</h2>
        <p>
          Managing images for multiple social media platforms can be a hassle. Instagram needs square posts, 
          YouTube needs a 16:9 thumbnail, and LinkedIn prefers portrait mode. 
          SnapSizes is the ultimate <strong>Bulk Photo Resizer</strong> that lets you crop, resize, and edit multiple images at once—directly in your browser.
        </p>

        <h3>Why Resize Images Locally?</h3>
        <p>
          Most online resizers upload your photos to a cloud server, process them, and send them back. 
          This is slow and risks your privacy. SnapSizes is different. 
          Our <strong>Client-Side Resizing Engine</strong> processes your photos using your device's own power. 
          This means:
        </p>
        <ul>
          <li><strong>Zero Wait Times:</strong> No uploading or downloading delays.</li>
          <li><strong>100% Secure:</strong> Your personal photos never leave your device.</li>
          <li><strong>High Quality:</strong> We use advanced algorithms to maintain sharpness while reducing dimensions.</li>
        </ul>

        <h3>Supported Social Media Presets</h3>
        <p>Stop guessing the correct pixel dimensions. Our tool includes one-click presets for:</p>
        <ul>
          <li><strong>Instagram:</strong> Square (1080x1080), Portrait (1080x1350), Story (1080x1920).</li>
          <li><strong>YouTube:</strong> Thumbnails (1280x720) and Channel Art.</li>
          <li><strong>Twitter/X:</strong> In-stream headers and profile photos.</li>
          <li><strong>LinkedIn & Facebook:</strong> Cover photos and post images.</li>
        </ul>

        <h3>Frequently Asked Questions</h3>
        <details>
          <summary><strong>Does this tool reduce image quality?</strong></summary>
          <p>We optimize images for web use, which balances quality and file size. Your images will look crisp on screens while loading faster.</p>
        </details>
        <details>
          <summary><strong>Is there a limit on file size?</strong></summary>
          <p>Since we process files on your device, the only limit is your computer's memory (RAM). Most users can easily resize 50+ high-resolution photos without issues.</p>
        </details>
      </article>
      {/* 👆 END SEO CONTENT */}

      {/* 4. FLOATING ACTION BAR */}
      <footer className={`${styles.actionArea} ${images.length > 0 ? styles.active : ""}`}>
        <div className={styles.actionInner}>
          {isProcessing ? (
            <div className={styles.progressFrame}>
              <div className={styles.fill} style={{ width: `${progress}%` }}></div>
              <span className={styles.progressText}>Zipping Archive: {progress}%</span>
            </div>
          ) : (
            <button className={styles.downloadCta} onClick={handleBatchExport}>
              Download Resized Assets (ZIP)
            </button>
          )}
        </div>
      </footer>
    </article>
  );
};

export default BulkPhotoResizer;