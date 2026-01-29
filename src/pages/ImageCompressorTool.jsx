import React, { useState, useEffect, useRef } from "react";
import { Upload, X, Settings, Download, Image as ImageIcon, CheckCircle, Loader2 } from "lucide-react";
import SeoHead from "../components/SeoHead";
import "./ImageCompressorTool.css";

// --- Utility: Client-Side Compression ---
const compressImage = (file, quality) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        // Compress using JPEG format (works best for compression)
        canvas.toBlob(
          (blob) => {
            resolve({
              file: file, // Store original file for re-compression
              blob,
              url: URL.createObjectURL(blob),
              originalSize: file.size,
              compressedSize: blob.size,
              name: file.name,
              id: Math.random().toString(36).substr(2, 9),
            });
          },
          "image/jpeg",
          quality / 100 // Convert 0-100 to 0.0-1.0
        );
      };
    };
  });
};

const formatSize = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export default function ImageCompressorTool() {
  const [images, setImages] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [quality, setQuality] = useState(75); // Default 75% quality
  const [isProcessing, setIsProcessing] = useState(false);

  const toolAreaRef = useRef(null);

  // Auto-scroll when images are added
  useEffect(() => {
    if (images.length > 0 && toolAreaRef.current) {
      toolAreaRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // 🟢 FIXED: Removed the unused eslint-disable comment here
  }, [images.length]);

  // Re-compress when quality changes
  useEffect(() => {
    if (images.length === 0) return;
    
    // Debounce to prevent freezing while sliding
    const timeout = setTimeout(async () => {
      setIsProcessing(true);
      
      // Re-compress all images using their original file
      const newImages = await Promise.all(
        images.map(img => compressImage(img.file, quality))
      );
      
      setImages(newImages);
      setIsProcessing(false);
    }, 500);

    return () => clearTimeout(timeout);
    
  // We disable the dependency warning here because adding 'images' 
  // would cause an infinite loop (since we setImages inside).
  // We only want this to run when 'quality' changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quality]);

  const handleFiles = async (files) => {
    setIsProcessing(true);
    const validFiles = files.filter((f) => f.type.startsWith("image/"));
    
    const compressedResults = await Promise.all(
      validFiles.map((f) => compressImage(f, quality))
    );
    
    setImages((prev) => [...prev, ...compressedResults]);
    setIsProcessing(false);
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((img) => img.id !== id);
    });
  };

  const handleDownload = (img) => {
    const link = document.createElement("a");
    link.href = img.url;
    link.download = `min-${img.name}`; // Prefix with 'min-'
    link.click();
  };

  const handleDownloadAll = () => {
    images.forEach((img) => handleDownload(img));
  };

  return (
    <div className="snap-container">
      <SeoHead
        title="Image Compressor - Reduce Image Size Online Free | SnapSizes"
        description="Compress JPG, PNG, and WebP images by up to 80% without losing quality. Fast, secure, and client-side."
        canonical="https://snapsizes.vercel.app/image-compressor-tool"
      />

      <header className="page-header">
        <h1>SnapSizes – Image Compressor</h1>
        <p className="sub-head">Reduce file size, not quality.</p>
      </header>

      {images.length > 0 && (
        <button
          className="mobile-settings-fab"
          onClick={() => setIsDrawerOpen(true)}
          type="button"
        >
          <Settings size={18} /> Settings
        </button>
      )}

      {isDrawerOpen && (
        <div className="drawer-backdrop" onClick={() => setIsDrawerOpen(false)} />
      )}

      <main className="tool-workspace" ref={toolAreaRef}>
        {/* Sidebar / Drawer */}
        <aside className={`tool-sidebar ${isDrawerOpen ? "drawer-open" : ""}`}>
          <div className="drawer-header">
            <h3>Compression Settings</h3>
            <button
              className="close-drawer"
              onClick={() => setIsDrawerOpen(false)}
              type="button"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="settings-group">
            <div className="quality-display">
              <label>Quality Level</label>
              <span className="badge-primary">{quality}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => {
                setQuality(Number(e.target.value));
              }}
            />
            <p className="hint-text">Lower quality = Smaller file size.</p>

            <button
              className="btn-primary desktop-btn"
              onClick={handleDownloadAll}
              disabled={images.length === 0 || isProcessing}
            >
              {isProcessing ? (
                 <>
                   <Loader2 className="animate-spin" size={18} style={{ marginRight: 8 }} /> Optimizing...
                 </>
              ) : (
                 <>
                   <Download size={18} style={{ marginRight: 8 }} /> Download All
                 </>
              )}
            </button>
          </div>
        </aside>

        {/* Canvas Area */}
        <section className="tool-canvas">
          {images.length === 0 ? (
            <div
              className="dropzone-container"
              onClick={() => document.getElementById("compressInput").click()}
            >
              <input
                type="file"
                id="compressInput"
                multiple
                accept="image/*"
                onChange={(e) => handleFiles(Array.from(e.target.files))}
                hidden
              />
              <ImageIcon size={48} />
              <h3>Drag & Drop Images</h3>
              <p>Compress JPG, PNG, WebP instantly.</p>
            </div>
          ) : (
            <div className="grid-layout">
              <div className="grid-toolbar">
                <h2>Images ({images.length})</h2>
                <button
                  className="btn-secondary"
                  onClick={() => document.getElementById("addMoreCompress").click()}
                  type="button"
                  disabled={isProcessing}
                >
                  + Add More
                </button>
                <input
                  id="addMoreCompress"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFiles(Array.from(e.target.files))}
                  hidden
                />
              </div>

              <div className="image-grid">
                {images.map((img) => {
                  const saved = ((img.originalSize - img.compressedSize) / img.originalSize) * 100;
                  return (
                    <div key={img.id} className="image-card compress-card">
                      <div className="img-preview-wrapper">
                        <img src={img.url} alt="Compressed preview" style={{ opacity: isProcessing ? 0.5 : 1 }} />
                        <button
                          onClick={() => removeImage(img.id)}
                          className="floating-close-btn"
                          type="button"
                        >
                          <X size={14} />
                        </button>
                        <div className="savings-badge">
                          ⬇ {saved.toFixed(0)}%
                        </div>
                      </div>
                      
                      <div className="compress-details">
                        <div className="size-row">
                          <span className="old-size">{formatSize(img.originalSize)}</span>
                          <span className="arrow">→</span>
                          <span className="new-size">{formatSize(img.compressedSize)}</span>
                        </div>
                        <button 
                          className="btn-download-mini" 
                          onClick={() => handleDownload(img)}
                          disabled={isProcessing}
                        >
                          <Download size={14} /> Save
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* 🚀 SEO CONTENT BLOCK (AdSense Optimized + Internal Links) */}
      <article className="seo-content-section">
        <div className="seo-text-container">
          <h2>Reduce Image Size Online – Free & Secure</h2>
          <p>
            Large images slow down websites and take up unnecessary storage space. 
            <strong>SnapSizes Image Compressor</strong> allows you to shrink photo file sizes 
            by up to 80% while maintaining excellent visual quality.
          </p>
          
          <p style={{ marginTop: '15px', padding: '15px', background: '#f0f9ff', borderRadius: '8px', borderLeft: '4px solid #0066cc' }}>
            <strong>💡 Pro Tip:</strong> If you need to crop images for Instagram or change dimensions (width/height) instead of file size, 
            try our <a href="/social-media-imagetool" style={{color: '#0066cc', textDecoration: 'underline'}}>Social Media Image Tool</a> or 
            the <a href="/bulk-photo-resizer" style={{color: '#0066cc', textDecoration: 'underline'}}>Bulk Photo Resizer</a>.
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <h3>⚡ Boost Website Speed</h3>
              <p>
                Compressed images load faster, improving your SEO rankings and user experience. 
                Perfect for bloggers, developers, and social media managers.
              </p>
            </div>
            <div className="feature-item">
              <h3>🔒 Secure Client-Side Compression</h3>
              <p>
                Your photos never leave your device. Our advanced browser-based compression engine 
                processes everything locally, ensuring 100% privacy.
              </p>
            </div>
            <div className="feature-item">
              <h3>📉 Smart Compression Algorithm</h3>
              <p>
                We use intelligent lossy compression to reduce file size significantly while 
                keeping the parts of the image that the human eye actually sees.
              </p>
            </div>
          </div>

          <h3>How to Compress Images for Free</h3>
          <ol className="step-list">
            <li><strong>Upload:</strong> Select your JPG, PNG, or WebP images.</li>
            <li><strong>Adjust:</strong> Use the quality slider to find the perfect balance between size and quality.</li>
            <li><strong>Preview:</strong> See the "Before" and "After" file sizes instantly.</li>
            <li><strong>Download:</strong> Save your optimized images individually or all at once.</li>
          </ol>

          <h3>FAQ</h3>
          <div className="faq-section">
            <details>
              <summary>Will I lose image quality?</summary>
              <p>Our tool aims for "visually lossless" compression. This means we remove data you can't see, reducing file size without noticeable blurriness.</p>
            </details>
            <details>
              <summary>What formats are supported?</summary>
              <p>We support all modern web formats including JPEG, PNG, and WebP.</p>
            </details>
            <details>
              <summary>Is this better than resizing?</summary>
              <p>Compression reduces file size (KB/MB) without changing dimensions. If you need to change the pixel width, use our <a href="/bulk-photo-resizer" style={{color: '#2563eb'}}>Bulk Resizer</a>.</p>
            </details>
          </div>
        </div>
      </article>

      {/* Sticky Mobile Action Bar */}
      {images.length > 0 && (
        <div className="mobile-action-bar">
          <button
            className="btn-primary"
            onClick={handleDownloadAll}
            style={{ flex: 2 }}
            disabled={isProcessing}
          >
            {isProcessing ? "Optimizing..." : "Download All"}
          </button>
          <button
            className="btn-outline"
            onClick={() => setImages([])}
            style={{ flex: 1 }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}