import React, { useState, useEffect, useRef } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Upload, X, RotateCw, GripVertical, Settings } from "lucide-react";
import SeoHead from "../components/SeoHead";
import { generatePdf } from "../utils/pdfEngine";
import "./ImageToPdfTool.css";

// 🟢 NEW: Premium Sortable Card with Overlay UI
const SortableImageCard = ({ id, img, index, onRemove, onRotate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
    opacity: isDragging ? 0.5 : 1,
    touchAction: "pan-y",
  };

  return (
    <div ref={setNodeRef} style={style} className="image-card">
      {/* Image Preview Area with Floating Overlays */}
      <div className="img-preview-wrapper">
        <img
          src={img.url}
          alt={`Page ${index + 1}`}
          style={{ transform: `rotate(${img.rotation}deg)` }}
        />

        {/* Floating Page Badge */}
        <div className="floating-badge">
          {index + 1}
        </div>

        {/* Floating Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents dragging when clicking delete
            onRemove(id);
          }}
          className="floating-close-btn"
          type="button"
          aria-label="Remove image"
        >
          <X size={14} />
        </button>
      </div>

      {/* Slim Footer for Actions */}
      <div className="card-footer">
        <button 
          onClick={() => onRotate(id)} 
          className="footer-btn" 
          type="button" 
          title="Rotate"
        >
          <RotateCw size={16} />
        </button>

        <div 
          className="drag-handle-slim" 
          {...attributes} 
          {...listeners} 
          title="Drag to reorder"
        >
          <GripVertical size={18} />
        </div>
      </div>
    </div>
  );
};

export default function ImageToPdf() {
  const [images, setImages] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [settings, setSettings] = useState({
    pageSize: "a4",
    orientation: "portrait",
    margin: 10,
    fitMode: "fit",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const toolAreaRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);
  useEffect(() => {
    return () =>
      imagesRef.current.forEach((img) => URL.revokeObjectURL(img.url));
  }, []);

  const hasImages = images.length > 0;

  useEffect(() => {
    if (hasImages && toolAreaRef.current) {
      toolAreaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [hasImages]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleFiles = (files) => {
    const newImages = files
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({
        id: Math.random().toString(36).substr(2, 9),
        file: f,
        url: URL.createObjectURL(f),
        rotation: 0,
      }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((img) => img.id !== id);
    });
  };

  const rotateImage = (id) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, rotation: (img.rotation + 90) % 360 } : img,
      ),
    );
  };

  const handleExport = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);
    setProgress(10);
    setTimeout(async () => {
      try {
        const pdfBlob = await generatePdf(images, settings, setProgress);
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `SnapSizes-${new Date().toISOString().slice(0, 10)}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("PDF Error:", error);
      }
      setIsGenerating(false);
      setProgress(100);
    }, 100);
  };

  return (
    <div className="snap-container">
      <SeoHead
        title="JPG to PDF Converter - Convert Images to PDF Free | SnapSizes"
        description="Convert JPG, PNG, and WebP images to a single PDF document securely in your browser."
        canonical="https://snapsizes.vercel.app/image-to-pdf-tool"
      />

      <header className="page-header">
        <h1>SnapSizes – Image to PDF</h1>
        <p className="sub-head">Secure, Client-Side, Free.</p>
      </header>

      {hasImages && (
        <button
          className="mobile-settings-fab"
          onClick={() => setIsDrawerOpen(true)}
          type="button"
        >
          <Settings size={18} /> Settings
        </button>
      )}

      {/* Backdrop moved outside for Z-index clarity */}
      {isDrawerOpen && (
        <div
          className="drawer-backdrop"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <main className="tool-workspace" ref={toolAreaRef}>
        <aside className={`tool-sidebar ${isDrawerOpen ? "drawer-open" : ""}`}>
          <div className="drawer-header">
            <h3>Settings</h3>
            <button
              className="close-drawer"
              onClick={() => setIsDrawerOpen(false)}
              type="button"
            >
              <X size={20} />
            </button>
          </div>
          <div className="settings-group">
            <label>Page Size</label>
            <select
              value={settings.pageSize}
              onChange={(e) =>
                setSettings({ ...settings, pageSize: e.target.value })
              }
            >
              <option value="a4">A4</option>
              <option value="letter">Letter</option>
            </select>
            <label>Margins ({settings.margin}mm)</label>
            <input
              type="range"
              min="0"
              max="50"
              value={settings.margin}
              onChange={(e) =>
                setSettings({ ...settings, margin: Number(e.target.value) })
              }
            />
            <button
              className="btn-primary desktop-btn"
              onClick={handleExport}
              disabled={!hasImages || isGenerating}
            >
              {isGenerating ? `Processing ${progress}%` : "Convert to PDF"}
            </button>
          </div>
        </aside>

        <section className="tool-canvas">
          {!hasImages ? (
            <div
              className="dropzone-container"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <input
                type="file"
                id="fileInput"
                multiple
                accept="image/*"
                onChange={(e) => handleFiles(Array.from(e.target.files))}
                hidden
              />
              <Upload size={48} />
              <h3>Drag & Drop or Browse</h3>
              <p>Your files stay private and never leave your device.</p>
            </div>
          ) : (
            <div className="grid-layout">
              <div className="grid-toolbar">
                <h2>Pages ({images.length})</h2>
                <button
                  className="btn-secondary"
                  onClick={() => document.getElementById("addMore").click()}
                  type="button"
                >
                  + Add More
                </button>
                <input
                  id="addMore"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFiles(Array.from(e.target.files))}
                  hidden
                />
              </div>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={images} strategy={rectSortingStrategy}>
                  <div className="image-grid">
                    {images.map((img, index) => (
                      <SortableImageCard
                        key={img.id}
                        id={img.id}
                        img={img}
                        index={index}
                        onRemove={removeImage}
                        onRotate={rotateImage}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}
        </section>
      </main>

      {/* 🚀 SEO CONTENT BLOCK (Updated with Internal Links) */}
      <article className="seo-content-section">
        <div className="seo-text-container">
          <h2>Free Image to PDF Converter – Secure & Instant</h2>
          <p>
            Merging multiple photos into a single document shouldn't be complicated. 
            <strong>SnapSizes</strong> provides a fast, free, and secure way to convert your 
            JPG, PNG, and WebP images into a professional PDF file directly in your browser.
          </p>

          {/* 👇 NEW INTERNAL LINKS BOX */}
          <p style={{ marginTop: '15px', padding: '15px', background: '#f0f9ff', borderRadius: '8px', borderLeft: '4px solid #0066cc' }}>
            <strong>💡 Pro Tip:</strong> Are your images too large? Before converting to PDF, you can reduce their file size with our <a href="/image-compressor-tool" style={{color: '#0066cc', textDecoration: 'underline'}}>Image Compressor</a> or change their dimensions using the <a href="/bulk-photo-resizer" style={{color: '#0066cc', textDecoration: 'underline'}}>Bulk Photo Resizer</a>.
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <h3>🔒 100% Private & Secure</h3>
              <p>
                Unlike other converters, we use <strong>Client-Side Processing</strong>. 
                Your personal photos are never uploaded to our servers. All conversion happens 
                locally on your device, ensuring your data remains completely private.
              </p>
            </div>
            <div className="feature-item">
              <h3>⚡ Lightning Fast</h3>
              <p>
                No waiting for uploads or downloads. Since the processing happens in your browser, 
                your PDF is generated instantly, even with high-resolution images.
              </p>
            </div>
            <div className="feature-item">
              <h3>📱 Mobile Optimized</h3>
              <p>
                Whether you're on an iPhone, Android, or desktop, our responsive tool adapts 
                to your screen. Use our drag-and-drop interface or simple touch controls to 
                organize your document easily.
              </p>
            </div>
          </div>

          <h3>How to Convert Images to PDF Online</h3>
          <ol className="step-list">
            <li><strong>Upload Images:</strong> Drag and drop your files or tap "Browse" to select photos from your gallery.</li>
            <li><strong>Arrange Pages:</strong> Drag images to reorder them. The first image will be page 1 of your PDF.</li>
            <li><strong>Customize Settings:</strong> Choose your preferred page size (A4 or Letter) and adjust margins using the slider.</li>
            <li><strong>Download:</strong> Click "Convert to PDF" to instantly save your document.</li>
          </ol>

          <h3>Frequently Asked Questions</h3>
          <div className="faq-section">
            <details>
              <summary>Is this tool free to use?</summary>
              <p>Yes, SnapSizes is 100% free. There are no daily limits, paywalls, or watermarks on your generated files.</p>
            </details>
            <details>
              <summary>Does SnapSizes store my photos?</summary>
              <p>No. We operate with a strict privacy-first policy. Your images are processed in your browser's memory and are wiped as soon as you close or refresh the tab.</p>
            </details>
            <details>
              <summary>Can I convert PNG and WebP files?</summary>
              <p>Absolutely. Our tool supports all major web image formats including JPG/JPEG, PNG, and WebP.</p>
            </details>
          </div>
        </div>
      </article>

      {hasImages && (
        <div className="mobile-action-bar">
          <button
            className="btn-primary"
            onClick={handleExport}
            disabled={isGenerating}
            style={{ flex: 2 }}
          >
            {isGenerating ? `Saving ${progress}%` : `Convert PDF`}
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