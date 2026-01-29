import React, { useState, useRef, useEffect, useCallback } from "react";
import { Upload, X, Settings, Download, Image as ImageIcon, Smartphone, Layout, Monitor, Palette, Droplet } from "lucide-react";
import SeoHead from "../components/SeoHead";
import "./SocialMediaImageTool.css";

const PRESETS = [
  { id: "ig-post", label: "Instagram Post", width: 1080, height: 1080, ratio: "1:1", icon: <Layout size={18}/> },
  { id: "ig-story", label: "IG Story / Reels", width: 1080, height: 1920, ratio: "9:16", icon: <Smartphone size={18}/> },
  { id: "yt-thumb", label: "YouTube Thumb", width: 1280, height: 720, ratio: "16:9", icon: <Monitor size={18}/> },
  { id: "li-post", label: "LinkedIn Post", width: 1200, height: 627, ratio: "1.91:1", icon: <Layout size={18}/> },
  { id: "wa-dp", label: "WhatsApp DP", width: 500, height: 500, ratio: "1:1", icon: <Smartphone size={18}/> },
];

// Popular background colors for social media
const COLOR_PALETTE = [
  "#ffffff", // White
  "#000000", // Black
  "#F5F5F5", // Off-White
  "#1e293b", // Slate
  "#fce7f3", // Pastel Pink
  "#dbeafe", // Pastel Blue
  "#fef3c7", // Pastel Yellow
];

export default function SocialMediaImageTool() {
  const [sourceImage, setSourceImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  
  // New States for Background Logic
  const [fitMode, setFitMode] = useState("blur"); // 'blur' | 'color' | 'cover'
  const [bgColor, setBgColor] = useState("#ffffff");
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef(null);
  const toolAreaRef = useRef(null);

  // Auto-scroll on upload
  useEffect(() => {
    if (sourceImage && toolAreaRef.current) {
      toolAreaRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [sourceImage]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    setFileName(file.name.split(".")[0]);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setSourceImage(img);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const drawCanvas = useCallback(() => {
    if (!sourceImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { width, height } = selectedPreset;

    canvas.width = width;
    canvas.height = height;

    // --- 1. Draw Background ---
    if (fitMode === "blur") {
      ctx.save();
      const scale = Math.max(width / sourceImage.width, height / sourceImage.height);
      const w = sourceImage.width * scale;
      const h = sourceImage.height * scale;
      // Strong blur for professional look
      ctx.filter = "blur(40px) brightness(0.85)";
      ctx.drawImage(sourceImage, (width - w)/2, (height - h)/2, w, h);
      ctx.restore();
    } else if (fitMode === "color") {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
    } else {
      // 'cover' mode needs no background fill usually, but let's fill white just in case
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
    }

    // --- 2. Draw Image ---
    const imgRatio = sourceImage.width / sourceImage.height;
    const canvasRatio = width / height;
    let drawW, drawH, drawX, drawY;

    if (fitMode === "cover") {
      // Zoom to fill
      if (imgRatio > canvasRatio) {
        drawH = height; drawW = height * imgRatio;
      } else {
        drawW = width; drawH = width / imgRatio;
      }
    } else {
      // Fit inside (Contain) - used for both 'blur' and 'color' modes
      if (imgRatio > canvasRatio) {
        drawW = width; drawH = width / imgRatio;
      } else {
        drawH = height; drawW = height * imgRatio;
      }
    }

    drawX = (width - drawW) / 2;
    drawY = (height - drawH) / 2;

    // Optional: Add slight shadow to image in 'color' or 'blur' mode for depth
    if (fitMode !== "cover") {
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 10;
    } else {
      ctx.shadowColor = "transparent";
    }

    ctx.drawImage(sourceImage, drawX, drawY, drawW, drawH);
  }, [sourceImage, selectedPreset, fitMode, bgColor]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleDownload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const link = document.createElement("a");
      link.download = `SnapSizes_${selectedPreset.id}_${fileName}.jpg`;
      link.href = canvasRef.current.toDataURL("image/jpeg", 0.95);
      link.click();
      setIsProcessing(false);
    }, 100);
  };

  return (
    <div className="snap-container">
      <SeoHead
        title="Social Media Image Resizer - Crop for Instagram, YouTube & More"
        description="Resize and crop images for Instagram, YouTube, LinkedIn, and WhatsApp. Use preset sizes or custom dimensions. Free online tool."
        canonical="https://snapsizes.vercel.app/social-media-imagetool"
      />

      <header className="page-header">
        <h1>Social Media Resizer</h1>
        <p className="sub-head">Perfect crop for every platform.</p>
      </header>

      {sourceImage && (
        <button
          className="mobile-settings-fab"
          onClick={() => setIsDrawerOpen(true)}
          type="button"
        >
          <Settings size={18} /> Edit
        </button>
      )}

      {isDrawerOpen && (
        <div className="drawer-backdrop" onClick={() => setIsDrawerOpen(false)} />
      )}

      <main className="tool-workspace" ref={toolAreaRef}>
        <aside className={`tool-sidebar ${isDrawerOpen ? "drawer-open" : ""}`}>
          <div className="drawer-header">
            <h3>Crop Settings</h3>
            <button className="close-drawer" onClick={() => setIsDrawerOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="settings-group">
            <label>Platform Preset</label>
            <div className="preset-grid">
              {PRESETS.map(p => (
                <button 
                  key={p.id}
                  className={`preset-btn ${selectedPreset.id === p.id ? 'active' : ''}`}
                  onClick={() => setSelectedPreset(p)}
                >
                  {p.icon}
                  <span>{p.label}</span>
                </button>
              ))}
            </div>

            <label style={{marginTop: 15}}>Background Style</label>
            <div className="fit-mode-toggle">
              <button
                  className={`mode-btn ${fitMode === 'blur' ? 'active' : ''}`}
                  onClick={() => setFitMode('blur')}
                >
                  <Droplet size={16}/> Blur
              </button>
              <button
                  className={`mode-btn ${fitMode === 'color' ? 'active' : ''}`}
                  onClick={() => setFitMode('color')}
                >
                  <Palette size={16}/> Color
              </button>
              <button
                  className={`mode-btn ${fitMode === 'cover' ? 'active' : ''}`}
                  onClick={() => setFitMode('cover')}
                >
                  <ImageIcon size={16}/> Cover
              </button>
            </div>

            {/* 🟢 NEW: Color Studio (Only shows if 'Color' mode is active) */}
            {fitMode === 'color' && (
              <div className="color-studio">
                <div className="color-grid">
                  {COLOR_PALETTE.map(c => (
                    <button
                      key={c}
                      className={`color-swatch ${bgColor === c ? 'active' : ''}`}
                      style={{backgroundColor: c}}
                      onClick={() => setBgColor(c)}
                      aria-label={`Select color ${c}`}
                    />
                  ))}
                  {/* Custom Picker */}
                  <div className="custom-color-wrapper">
                     <input 
                      type="color" 
                      value={bgColor} 
                      onChange={(e) => setBgColor(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            <button 
              className="btn-primary desktop-btn"
              onClick={handleDownload}
            >
              <Download size={18} style={{marginRight: 8}}/> Download Image
            </button>
          </div>
        </aside>

        <section className="tool-canvas">
          {!sourceImage ? (
            <div className="dropzone-container" onClick={() => document.getElementById("smInput").click()}>
              <input type="file" id="smInput" accept="image/*" onChange={handleFileUpload} hidden />
              <ImageIcon size={48} />
              <h3>Upload Image</h3>
              <p>Auto-crop for Instagram, YouTube, etc.</p>
            </div>
          ) : (
            <div className="canvas-wrapper">
              <canvas ref={canvasRef} className="preview-canvas" />
              <div className="canvas-meta">
                {selectedPreset.width} x {selectedPreset.height} • {selectedPreset.ratio}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* 🚀 SEO CONTENT */}
      <article className="seo-content-section">
        <div className="seo-text-container">
          <h2>All-in-One Social Media Image Maker</h2>
          <p>
            Every social media platform requires different image dimensions. A post that looks great on Instagram might get cropped awkwardly on Twitter.
            SnapSizes simplifies this with a dedicated <strong>Social Media Image Tool</strong>. 
          </p>

          <p style={{ marginTop: '15px', padding: '15px', background: '#f0f9ff', borderRadius: '8px', borderLeft: '4px solid #0066cc' }}>
            <strong>💡 Pro Tip:</strong> If your final image is still too large in file size (MB), run it through our <a href="/image-compressor-tool" style={{color: '#0066cc', textDecoration: 'underline'}}>Image Compressor</a>. Need to resize dozens of images at once? Use the <a href="/bulk-photo-resizer" style={{color: '#0066cc', textDecoration: 'underline'}}>Bulk Photo Resizer</a>.
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <h3>📱 Platform Ready</h3>
              <p>Instantly crop for Instagram Stories (9:16), YouTube Thumbnails (16:9), and LinkedIn Headers without guessing dimensions.</p>
            </div>
            <div className="feature-item">
              <h3>✨ Smart Backgrounds</h3>
              <p>Choose between professional <strong>Gaussian Blur</strong>, solid brand colors, or custom hex codes to fill the empty space.</p>
            </div>
          </div>

          <h3>Supported Platforms (2026 Standards)</h3>
          <ul>
            <li><strong>Instagram:</strong> Posts (1:1), Portraits (4:5), and Stories (9:16).</li>
            <li><strong>YouTube:</strong> Thumbnails (1280x720).</li>
            <li><strong>LinkedIn:</strong> Professional headers and posts.</li>
            <li><strong>WhatsApp:</strong> Profile pictures (Square).</li>
          </ul>

          <h3>FAQ</h3>
          <div className="faq-section">
            <details>
              <summary>Do I need to sign up?</summary>
              <p>No. SnapSizes is completely free and requires no account.</p>
            </details>
            <details>
              <summary>Does it reduce quality?</summary>
              <p>No, we export at high-quality JPEG settings to ensure your posts look crisp on retina screens.</p>
            </details>
          </div>
        </div>
      </article>

      {/* Mobile Sticky Bar */}
      {sourceImage && (
        <div className="mobile-action-bar">
          <button className="btn-primary" onClick={handleDownload} disabled={isProcessing} style={{flex: 2}}>
            {isProcessing ? "Saving..." : "Download"}
          </button>
          <button className="btn-outline" onClick={() => setSourceImage(null)} style={{flex: 1}}>
            New
          </button>
        </div>
      )}
    </div>
  );
}