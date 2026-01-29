import React, { useState, useEffect, useRef, useCallback } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Upload, X, Settings, Plus, Layers, RotateCw } from "lucide-react";
import SeoHead from "../components/SeoHead";
import "./BulkPhotoResizer.css";

const MAX_FILES = 50;
const QUALITY_DEFAULT = 0.9;

const DEFAULT_SIZES = [
  { w: 1080, h: 1080, label: "Instagram Square" },
  { w: 1920, h: 1080, label: "Full HD" },
];

export default function BulkPhotoResizer() {
  const [images, setImages] = useState([]);
  const [targetSizes, setTargetSizes] = useState(DEFAULT_SIZES);
  const [widthBuffer, setWidthBuffer] = useState("");
  const [heightBuffer, setHeightBuffer] = useState("");
  const [format, setFormat] = useState("image/jpeg");
  const [quality, setQuality] = useState(QUALITY_DEFAULT);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const toolAreaRef = useRef(null);

  // Auto-scroll on upload
  useEffect(() => {
    if (images.length > 0 && toolAreaRef.current) {
      toolAreaRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [images.length]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const remaining = MAX_FILES - images.length;
    
    if (remaining <= 0) {
      alert("Limit reached. Please download or clear the current batch.");
      return;
    }

    const newBatch = files.slice(0, remaining)
      .filter(f => f.type.startsWith("image/"))
      .map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        previewUrl: URL.createObjectURL(file),
        name: file.name,
        rotation: 0 // Only Rotate is kept
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

  const rotateImage = (id) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, rotation: (img.rotation + 90) % 360 } : img
    ));
  };

  const addSize = () => {
    const w = parseInt(widthBuffer);
    const h = parseInt(heightBuffer);
    if (!w || !h) return;
    setTargetSizes([...targetSizes, { w, h, label: "Custom" }]);
    setWidthBuffer("");
    setHeightBuffer("");
  };

  const removeSize = (index) => {
    setTargetSizes(prev => prev.filter((_, i) => i !== index));
  };

  const processImage = useCallback(async (imgObj, targetW, targetH) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = targetW;
        canvas.height = targetH;

        // Fill background white
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, targetW, targetH);

        // Move context to center for rotation
        ctx.translate(targetW / 2, targetH / 2);
        ctx.rotate((imgObj.rotation * Math.PI) / 180);

        // Determine effective dimensions based on rotation (Swap W/H if 90 or 270 deg)
        const isRotated = imgObj.rotation % 180 !== 0;
        const srcW = isRotated ? img.height : img.width;
        const srcH = isRotated ? img.width : img.height;

        // Calculate Scale (Contain)
        const scale = Math.min(targetW / srcW, targetH / srcH);
        
        // Draw image centered
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        
        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        
        canvas.toBlob(blob => {
          resolve(blob);
        }, format, quality);
      };
      img.src = imgObj.previewUrl;
    });
  }, [format, quality]);

  const handleBatchExport = async () => {
    if (images.length === 0 || targetSizes.length === 0) return;
    setIsProcessing(true);
    setProgress(0);
    
    const zip = new JSZip();
    let count = 0;
    const totalOps = images.length * targetSizes.length;

    try {
      for (const imgData of images) {
        for (const size of targetSizes) {
          const blob = await processImage(imgData, size.w, size.h);
          if (blob) {
            const ext = format === "image/jpeg" ? "jpg" : "png";
            const safeName = imgData.name.replace(/\.[^/.]+$/, "");
            zip.file(`${safeName}_${size.w}x${size.h}.${ext}`, blob);
          }
          count++;
          setProgress(Math.round((count / totalOps) * 100));
          await new Promise(r => setTimeout(r, 10)); 
        }
      }
      
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `SnapSizes_Batch_${Date.now()}.zip`);
    } catch (error) {
      console.error(error);
      alert("Error processing images.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="snap-container">
      <SeoHead
        title="Bulk Image Resizer - Resize Multiple Photos Online | SnapSizes"
        description="Batch resize JPG, PNG, and WebP images instantly. Define multiple target sizes and download as a ZIP. Fast, free, and private."
        canonical="https://snapsizes.vercel.app/bulk-photo-resizer"
      />

      <header className="page-header">
        <h1>Bulk Photo Resizer</h1>
        <p className="sub-head">Resize dozens of images in seconds.</p>
      </header>

      {images.length > 0 && (
        <button
          className="mobile-settings-fab"
          onClick={() => setIsDrawerOpen(true)}
          type="button"
        >
          <Settings size={18} /> Configure
        </button>
      )}

      {isDrawerOpen && (
        <div className="drawer-backdrop" onClick={() => setIsDrawerOpen(false)} />
      )}

      <main className="tool-workspace" ref={toolAreaRef}>
        <aside className={`tool-sidebar ${isDrawerOpen ? "drawer-open" : ""}`}>
          <div className="drawer-header">
            <h3>Resize Settings</h3>
            <button className="close-drawer" onClick={() => setIsDrawerOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="settings-group">
            <label>Target Sizes</label>
            <div className="size-list">
              {targetSizes.map((s, i) => (
                <div key={i} className="size-tag">
                  <span>{s.w} x {s.h}</span>
                  <button onClick={() => removeSize(i)}><X size={14}/></button>
                </div>
              ))}
            </div>
            
            <div className="add-size-row">
              <input 
                type="number" placeholder="W" 
                value={widthBuffer} onChange={e => setWidthBuffer(e.target.value)}
              />
              <span>x</span>
              <input 
                type="number" placeholder="H" 
                value={heightBuffer} onChange={e => setHeightBuffer(e.target.value)}
              />
              <button className="btn-add" onClick={addSize} disabled={!widthBuffer || !heightBuffer}>
                <Plus size={18}/>
              </button>
            </div>

            <label style={{marginTop: 15}}>Output Format</label>
            <div className="fit-mode-toggle">
              <button 
                className={`mode-btn ${format === 'image/jpeg' ? 'active' : ''}`}
                onClick={() => setFormat('image/jpeg')}
              >
                JPG
              </button>
              <button 
                className={`mode-btn ${format === 'image/png' ? 'active' : ''}`}
                onClick={() => setFormat('image/png')}
              >
                PNG
              </button>
            </div>

            {format === 'image/jpeg' && (
              <div className="quality-control">
                 <label>Quality: {Math.round(quality * 100)}%</label>
                 <input 
                   type="range" min="0.5" max="1" step="0.05" 
                   value={quality} onChange={e => setQuality(parseFloat(e.target.value))}
                 />
              </div>
            )}

            <button 
              className="btn-primary desktop-btn"
              onClick={handleBatchExport}
              disabled={isProcessing || targetSizes.length === 0}
            >
              {isProcessing ? `Processing ${progress}%` : "Resize Batch (ZIP)"}
            </button>
          </div>
        </aside>

        <section className="tool-canvas">
          {images.length === 0 ? (
            <div className="dropzone-container" onClick={() => document.getElementById("bulkInput").click()}>
              <input type="file" id="bulkInput" multiple accept="image/*" onChange={handleFileUpload} hidden />
              <Layers size={48} />
              <h3>Upload Batch</h3>
              <p>Drag & drop up to 50 images.</p>
            </div>
          ) : (
            <div className="grid-layout">
               <div className="grid-toolbar">
                <h2>Queue ({images.length})</h2>
                <button
                  className="btn-secondary"
                  onClick={() => document.getElementById("addMoreBulk").click()}
                  type="button"
                >
                  + Add More
                </button>
                <input type="file" id="addMoreBulk" multiple accept="image/*" onChange={handleFileUpload} hidden />
              </div>

              <div className="image-grid">
                {images.map((img) => (
                  <div key={img.id} className="image-card">
                    <div className="img-preview-wrapper">
                      <img 
                        src={img.previewUrl} 
                        alt={img.name} 
                        style={{ 
                          transform: `rotate(${img.rotation}deg)`,
                          transition: 'transform 0.2s'
                        }}
                      />
                      <button onClick={() => removeImage(img.id)} className="floating-close-btn">
                        <X size={14} />
                      </button>
                    </div>
                    
                    {/* Card Toolbar - Only Rotate & Name */}
                    <div className="card-toolbar">
                       <button onClick={() => rotateImage(img.id)} title="Rotate"><RotateCw size={16}/></button>
                       <span className="file-name">{img.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* SEO Content */}
      <article className="seo-content-section">
        <div className="seo-text-container">
          <h2>The Fastest Way to Resize Photos for Social Media</h2>
          <p>
            Managing images for multiple social media platforms can be a hassle. Instagram needs square posts, 
            YouTube needs a 16:9 thumbnail, and LinkedIn prefers portrait mode. 
            SnapSizes is the ultimate <strong>Bulk Photo Resizer</strong> that lets you crop, resize, and edit multiple images at once—directly in your browser.
          </p>
          <p style={{ marginTop: '15px', padding: '15px', background: '#f0f9ff', borderRadius: '8px', borderLeft: '4px solid #0066cc' }}>
            <strong>💡 Pro Tip:</strong> If you only need to reduce the file size (MB) without changing the dimensions, try our <a href="/image-compressor-tool" style={{color: '#0066cc', textDecoration: 'underline'}}>Image Compressor</a>.
          </p>
          <div className="features-grid">
            <div className="feature-item">
              <h3>⚡ Zero Wait Times</h3>
              <p>No uploading or downloading delays. We process everything locally on your device.</p>
            </div>
            <div className="feature-item">
              <h3>🔒 100% Secure</h3>
              <p>Your personal photos never leave your device. We operate with a strict privacy-first policy.</p>
            </div>
          </div>
        </div>
      </article>

      {/* Mobile Sticky Bar */}
      {images.length > 0 && (
        <div className="mobile-action-bar">
          <button 
            className="btn-primary" 
            onClick={handleBatchExport} 
            disabled={isProcessing || targetSizes.length === 0}
            style={{flex: 2}}
          >
            {isProcessing ? `Working ${progress}%` : "Resize ZIP"}
          </button>
          <button className="btn-outline" onClick={() => setImages([])} style={{flex: 1}}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}