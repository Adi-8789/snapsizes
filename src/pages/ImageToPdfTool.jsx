import React, { useState, useEffect, useRef } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
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
import { Upload, X, RotateCw, GripVertical } from "lucide-react";
import SeoHead from "../components/SeoHead";
import { generatePdf } from "../utils/pdfEngine";
import "./ImageToPdfTool.css";

// ❌ Removed SeoContent import (No longer needed)

// --- Sub-Component: Dropzone ---
const Dropzone = ({ onFilesAdded }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onFilesAdded(files);
  };
  const handleChange = (e) => onFilesAdded(Array.from(e.target.files));

  return (
    <div
      className="dropzone"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        id="fileInput"
        hidden
      />
      <div className="icon-wrapper">
        <Upload size={48} />
      </div>
      <h3>Drag & Drop Images Here</h3>
      <p>
        or{" "}
        <label htmlFor="fileInput" className="text-link">
          browse files
        </label>
      </p>
    </div>
  );
};

// --- Sub-Component: Sortable Image Item ---
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
  };

  return (
    <div ref={setNodeRef} style={style} className="image-card">
      <div className="card-header">
        <span className="badge">Page {index + 1}</span>
        <button onClick={() => onRemove(index)} className="btn-icon">
          <X size={14} />
        </button>
      </div>

      <div className="img-preview-box">
        <img
          src={img.url}
          alt={`Page ${index + 1}`}
          style={{ transform: `rotate(${img.rotation}deg)` }}
        />
      </div>

      <div className="card-actions">
        <button onClick={() => onRotate(index)} className="btn-text">
          <RotateCw size={14} /> Rotate
        </button>
        <div className="drag-handle" {...attributes} {...listeners}>
          <GripVertical size={16} style={{ cursor: "grab" }} />
        </div>
      </div>
    </div>
  );
};

// --- Main Application ---
export default function ImageToPdf() {
  const [images, setImages] = useState([]);
  const [settings, setSettings] = useState({
    pageSize: "a4",
    orientation: "portrait",
    margin: 10,
    fitMode: "fit",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const imagesRef = useRef([]);
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
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
    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const removeImage = (index) => {
    const copy = [...images];
    URL.revokeObjectURL(copy[index].url);
    copy.splice(index, 1);
    setImages(copy);
  };

  const rotateImage = (index) => {
    setImages((prev) => {
      const copy = [...prev];
      copy[index].rotation = (copy[index].rotation + 90) % 360;
      return copy;
    });
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
      } catch (error) {
        console.error("PDF Generation failed:", error);
        alert("Error generating PDF. Please check the console.");
      }
      setIsGenerating(false);
      setProgress(100);
    }, 100);
  };

  return (
    <div className="snap-container">
      <SeoHead
        title="JPG to PDF Converter - Convert Images to PDF Free | SnapSizes"
        description="Convert JPG, PNG, and WebP images to a single PDF document. Drag and drop, reorder pages, and download instantly. Secure client-side processing."
        canonical="https://snapsizes.vercel.app/image-to-pdf-tool"
      />

      <header className="page-header">
        <h1>SnapSizes – Image to PDF</h1>
        <p className="sub-head">Secure, Client-Side, Free.</p>
      </header>

      <main className="tool-workspace">
        <aside className="tool-sidebar">
          <div className="settings-group">
            <h3>Document Settings</h3>
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
              className="btn-primary"
              onClick={handleExport}
              disabled={images.length === 0 || isGenerating}
            >
              {isGenerating ? `Processing ${progress}%` : "Convert to PDF"}
            </button>
          </div>
        </aside>

        <section className="tool-canvas">
          {images.length === 0 ? (
            <Dropzone onFilesAdded={handleFiles} />
          ) : (
            <div className="grid-layout">
              <div className="grid-toolbar">
                <h2>Pages ({images.length})</h2>
                <button
                  className="btn-secondary"
                  onClick={() => document.getElementById("addMore").click()}
                >
                  + Add Images
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

      {/* 👇 NEW UNIQUE CONTENT (REPLACES SeoContent) */}
      <article className="seo-content-block" style={{maxWidth: '800px', margin: '40px auto', padding: '20px', lineHeight: '1.6', color: '#333'}}>
        <h2>How to Convert Images to PDF for Free</h2>
        <p>
          Merging multiple images into a single PDF document shouldn't be complicated. 
          SnapSizes offers a secure, client-side <strong>JPG to PDF converter</strong> that works instantly in your browser. 
          Whether you have a collection of scanned documents, receipts, or photos, you can compile them into a professional PDF file in seconds.
        </p>

        <h3>Why use SnapSizes Image to PDF Tool?</h3>
        <ul>
          <li><strong>100% Privacy:</strong> Unlike other tools, we do not upload your photos to a server. All processing happens locally on your device using WebAssembly technology.</li>
          <li><strong>No Limits:</strong> Combine as many JPG, PNG, or WebP images as you need.</li>
          <li><strong>Perfect Formatting:</strong> Need all your images to be the same size before converting? Use our <a href="/bulk-photo-resizer" style={{color: '#0066cc', textDecoration: 'underline'}}>Bulk Photo Resizer</a> first to standardize dimensions.</li>
        </ul>

        <h3>Step-by-Step Guide</h3>
        <ol>
          <li><strong>Upload Images:</strong> Drag and drop your image files into the box above. We support JPG, PNG, and WebP formats.</li>
          <li><strong>Arrange Pages:</strong> Drag the images to reorder them. The order they appear here is the order they will be in the PDF.</li>
          <li><strong>Customize:</strong> Use the settings panel to change the page orientation (Portrait/Landscape) or adjust the margins.</li>
          <li><strong>Download:</strong> Click "Convert to PDF" to generate and save your document instantly.</li>
        </ol>

        <h3>Frequently Asked Questions</h3>
        <details>
          <summary><strong>Is my data safe?</strong></summary>
          <p>Yes. Since SnapSizes operates entirely in your browser, your personal images never leave your computer. This makes it safe for sensitive documents.</p>
        </details>
        <details>
          <summary><strong>Can I convert PNG to PDF?</strong></summary>
          <p>Absolutely. Our tool supports PNG, JPEG, and WebP formats, preserving transparency where possible or converting it to a white background for standard PDF compatibility.</p>
        </details>
      </article>
      {/* 👆 END NEW CONTENT */}
    </div>
  );
}