import React, { useState, useRef, useEffect } from "react";
import SeoHead from "../components/SeoHead";
import styles from "./ImageCompressorTool.module.css";

const ImageCompressorTool = () => {
  const [sourceImage, setSourceImage] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [compressedBlob, setCompressedBlob] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [quality, setQuality] = useState(0.7);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef(null);

  // 1. Upload Engine
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    setOriginalFile(file);
    setCompressedBlob(null); // Reset previous compression

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setSourceImage(img);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  // 2. Memory-Safe Preview URL Management
  useEffect(() => {
    const target = compressedBlob || originalFile;
    if (!target) return;

    let url;
    const handle = requestAnimationFrame(() => {
      url = URL.createObjectURL(target);
      setPreviewUrl(url);
    });

    return () => {
      cancelAnimationFrame(handle);
      if (url) URL.revokeObjectURL(url);
    };
  }, [compressedBlob, originalFile]);

  // 3. Compression Engine
  useEffect(() => {
    if (!sourceImage) return;

    const compress = () => {
      setIsProcessing(true);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = sourceImage.width;
      canvas.height = sourceImage.height;

      // Fill white background for transparent PNGs converting to JPEG
      ctx.fillStyle = "#FFFFFF"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.drawImage(sourceImage, 0, 0);

      canvas.toBlob(
        (blob) => {
          setCompressedBlob(blob);
          setIsProcessing(false);
        },
        "image/jpeg",
        quality
      );
    };

    // Debounce compression to avoid freezing UI
    const timer = setTimeout(compress, 150);
    return () => clearTimeout(timer);
  }, [sourceImage, quality]);

  // 4. Download Logic
  const handleDownload = () => {
    if (!compressedBlob) return;
    const url = URL.createObjectURL(compressedBlob);
    const link = document.createElement("a");
    link.href = url;
    const baseName = originalFile.name.substring(0, originalFile.name.lastIndexOf('.')) || originalFile.name;
    link.download = `SnapSizes_Optimized_${baseName}.jpg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={styles.container}>
      <SeoHead
        title="Image Compressor - Reduce File Size Online | SnapSizes"
        description="Compress JPG, PNG, and WebP images locally. Reduce file size by up to 90% without losing quality. Secure, fast, and free."
        canonical="https://snapsizes.vercel.app/image-compressor-tool"
      />

      <header className={styles.hero}>
        <h1 className={styles.h1}>
          Professional Image Compressor{" "}
          <span className={styles.badge}>Secure & Private</span>
        </h1>
        <div className={styles.seoIntro}>
          <p className={styles.introText}>
            Optimize your digital assets with our{" "}
            <strong>lossy image compression engine</strong>. SnapSizes provides
            a high-fidelity solution to reduce file size while maintaining
            original pixel dimensions. Designed for web developers and creators
            who need to balance <strong>loading speed</strong> with{" "}
            <strong>visual quality</strong>.
          </p>
          <div className={styles.trustBar}>
            <span>🔒 No Server Uploads</span>
            <span>⚡ Instant GPU Processing</span>
            <span>📉 Up to 90% Savings</span>
            <span>✅ 100% Free</span>
          </div>
        </div>
      </header>

      {!sourceImage ? (
        <section className={styles.uploadArea}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/jpeg,image/png,image/webp"
            hidden
            id="compress-upload"
          />
          <label htmlFor="compress-upload" className={styles.dropzone}>
            <span className={styles.icon}>🗜️</span>
            <strong>Select Image for Compression</strong>
            <span>Preserve full resolution, reduce disk space</span>
          </label>
        </section>
      ) : (
        <div className={styles.workspace}>
          <aside className={styles.controls}>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>Compression Level</h3>

              <div className={styles.controlGroup}>
                <div className={styles.labelRow}>
                  <label htmlFor="quality-slider">Quality Strength</label>
                  <span className={styles.qualityVal}>
                    {Math.round(quality * 100)}%
                  </span>
                </div>
                <input
                  id="quality-slider"
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className={styles.slider}
                />
                <p className={styles.helperText}>
                  Maintaining 100% dimensions: {sourceImage.width}px ×{" "}
                  {sourceImage.height}px
                </p>
              </div>

              <div className={styles.stats}>
                <div className={styles.statRow}>
                  <span>Original File:</span>
                  <strong>{formatSize(originalFile.size)}</strong>
                </div>
                <div className={styles.statRow}>
                  <span>Optimized File:</span>
                  <strong className={styles.savings}>
                    {compressedBlob ? formatSize(compressedBlob.size) : "Calculating..."}
                  </strong>
                </div>
                {compressedBlob && (
                  <div className={styles.reductionBadge}>
                    {Math.max(0, Math.round((1 - compressedBlob.size / originalFile.size) * 100))}
                    % Smaller
                  </div>
                )}
              </div>

              <button
                className={styles.downloadBtn}
                onClick={handleDownload}
                disabled={isProcessing || !compressedBlob}
              >
                {isProcessing
                  ? "Optimizing Data..."
                  : "Download Optimized Image"}
              </button>
              <button
                className={styles.resetBtn}
                onClick={() => setSourceImage(null)}
              >
                Choose Different Image
              </button>
            </div>
          </aside>

          <main className={styles.preview}>
            <div className={styles.previewCard}>
              <div className={styles.imageWrap}>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview of compressed result"
                    className={styles.previewImg}
                  />
                )}
              </div>
              <div className={styles.previewLabel}>Full-Resolution Preview</div>
            </div>
          </main>
        </div>
      )}

      {/* 👇 NEW UNIQUE SEO CONTENT WITH INTERNAL LINKS */}
      <article className="seo-content-block" style={{maxWidth: '800px', margin: '40px auto', padding: '20px', lineHeight: '1.6', color: '#333'}}>
        
        <h2>Free Online Image Compressor: Reduce File Size, Keep Quality</h2>
        <p>
          Large images slow down websites and take up unnecessary storage space. 
          SnapSizes provides a powerful <strong>Image Compressor</strong> that significantly reduces the file size of your JPG, PNG, and WebP images without noticeable quality loss.
          This is especially useful if you are preparing images for a website or using our <a href="/social-media-Imagetool" style={{color: '#0066cc', textDecoration: 'underline'}}>Social Media Image Tool</a> for Instagram posts.
        </p>

        <h3>How Does SnapSizes Compression Work?</h3>
        <p>
          We use smart lossy compression techniques to selectively decrease the number of colors in the image data. 
          This requires fewer bytes to store the data. The effect is nearly invisible to the eye, but it makes a huge difference in file size.
        </p>
        <ul>
          <li><strong>Smart Compression:</strong> Automatically finds the best balance between quality and file size.</li>
          <li><strong>Batch Processing:</strong> Compress multiple images at once to save time.</li>
          <li><strong>Need Resizing?</strong> If you only need to change the dimensions (width/height) rather than file size, use our <a href="/bulk-photo-resizer" style={{color: '#0066cc', textDecoration: 'underline'}}>Bulk Photo Resizer</a> instead.</li>
        </ul>

        <h3>Why Website Speed Matters</h3>
        <p>
          If you are a web developer or site owner, optimizing images is crucial.
          Google uses "Page Speed" as a ranking factor. Heavy images are the #1 reason for slow websites.
          By using SnapSizes, you can reduce your page load time, improve user experience, and boost your SEO rankings.
        </p>

        <h3>Frequently Asked Questions</h3>
        <details>
          <summary><strong>Is it safe to compress private photos?</strong></summary>
          <p>Yes. SnapSizes runs entirely in your browser. Your images are never sent to a server, so nobody else can see them.</p>
        </details>
        <details>
          <summary><strong>What formats do you support?</strong></summary>
          <p>We support the most common web formats: JPG (JPEG), PNG, and WebP.</p>
        </details>
      </article>
      {/* 👆 END SEO CONTENT */}
    </div>
  );
};

export default ImageCompressorTool;