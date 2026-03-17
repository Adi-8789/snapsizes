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
import { 
  Upload, X, RotateCw, GripVertical, Settings, 
  FileText, Shield, Zap, Sparkles, Plus, Loader2 
} from "lucide-react";
import SeoHead from "../components/SeoHead";
import { generatePdf } from "../utils/pdfEngine";

// 🟢 JSON-LD Schema for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SnapSizes Image to PDF Converter",
  "url": "https://snapsizes.vercel.app/image-to-pdf-tool",
  "description": "Free client-side converter. Merge JPG, PNG, and WebP images into a single PDF document securely directly in your browser.",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "featureList": ["Drag and Drop Reordering", "Client-Side Processing", "Custom Page Sizes & Margins"]
};

// 🟢 Premium Sortable Card (Tailwind Styled)
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
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.6 : 1,
    touchAction: "pan-y",
  };

  return (
    <div ref={setNodeRef} style={style} className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Image Preview Area */}
      <div className="aspect-[1/1.4] bg-slate-50 relative flex items-center justify-center p-3 overflow-hidden">
        <img
          src={img.url}
          alt={`Page ${index + 1}`}
          className="max-w-full max-h-full object-contain shadow-sm border border-slate-200 bg-white"
          style={{ transform: `rotate(${img.rotation}deg)`, transition: 'transform 0.3s ease' }}
        />

        {/* Floating Page Badge */}
        <div className="absolute top-2 left-2 bg-slate-900/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
          {index + 1}
        </div>

        {/* Floating Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
          }}
          className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm"
          type="button"
          aria-label="Remove image"
        >
          <X size={14} />
        </button>
      </div>

      {/* Slim Footer for Actions */}
      <div className="p-2 border-t border-slate-100 flex items-center justify-between bg-white">
        <button 
          onClick={() => onRotate(id)} 
          className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors" 
          type="button" 
          title="Rotate"
        >
          <RotateCw size={14} />
        </button>

        <div 
          className="p-1.5 text-slate-300 hover:text-slate-600 cursor-grab active:cursor-grabbing transition-colors" 
          {...attributes} 
          {...listeners} 
          title="Drag to reorder"
        >
          <GripVertical size={16} />
        </div>
      </div>
    </div>
  );
};

// 🟢 Extracted SettingsPanel for DRY code and Compact UI
const SettingsPanel = ({ settings, setSettings, handleExport, isGenerating, progress, hasImages }) => (
  <div className="space-y-6 text-left pb-24 lg:pb-0">
    <div>
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Page Size</label>
      <select
        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-blue-500 transition-colors"
        value={settings.pageSize}
        onChange={(e) => setSettings({ ...settings, pageSize: e.target.value })}
      >
        <option value="a4">A4 Document</option>
        <option value="letter">US Letter</option>
      </select>
    </div>

    <div>
      <div className="flex justify-between items-center mb-3">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Margins</label>
        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-black">{settings.margin}mm</span>
      </div>
      <input
        type="range"
        min="0"
        max="50"
        value={settings.margin}
        onChange={(e) => setSettings({ ...settings, margin: Number(e.target.value) })}
        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>

    <button
      className={`w-full py-3 mt-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 
        ${isGenerating ? 'bg-blue-100! text-amber-500!' : 'bg-amber-500! text-white! hover:bg-amber-600! shadow-blue-200'}
      `}
      onClick={handleExport}
      disabled={!hasImages || isGenerating}
    >
      {isGenerating ? (
        <><Loader2 className="animate-spin" size={16} /> Processing {progress}%</>
      ) : (
        <><FileText size={16} /> Generate PDF</>
      )}
    </button>
  </div>
);

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
      setIsDrawerOpen(false);
    }, 100);
  };

  const sharedProps = {
    settings, setSettings, handleExport, isGenerating, progress, hasImages
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900" ref={toolAreaRef}>
      <SeoHead
        title="JPG to PDF Converter - Convert Images to PDF Free | SnapSizes"
        description="Convert JPG, PNG, and WebP images to a single PDF document securely in your browser."
        canonical="https://snapsizes.vercel.app/image-to-pdf-tool"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* --- CONDENSED HERO SECTION --- */}
      <header className="bg-slate-900 pt-10 pb-16 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-500 rounded-full blur-[140px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500 rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-wider mb-4">
            <Sparkles size={12} /> Smart Document Builder
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">Image to PDF Converter</h1>
          <p className="text-slate-400 text-base">Merge multiple photos into a single PDF document securely.</p>
        </div>
      </header>

      {/* --- COMPACT WORKSPACE --- */}
      <main className="max-w-325 mx-auto px-4 lg:px-8 -mt-8 mb-16 relative z-20 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Compact Sidebar */}
        <aside className="hidden lg:block bg-white rounded-4xl shadow-sm border border-slate-200 p-6 w-[320px] shrink-0 sticky top-24">
          <SettingsPanel {...sharedProps} />
        </aside>

        {/* Gallery/Canvas Area */}
        <section className="flex-1 w-full bg-white rounded-4xl border border-slate-200 shadow-sm min-h-100 flex flex-col p-6 lg:p-8 overflow-hidden">
          {!hasImages ? (
            <div
              className="flex-1 w-full max-w-xl mx-auto border-2 border-dashed border-slate-200 rounded-4xl flex flex-col items-center justify-center p-10 text-center hover:bg-amber-50/30 hover:border-blue-200 transition-all cursor-pointer group"
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
              <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Upload size={32} />
              </div>
              <h2 className="text-lg font-bold mb-2">Drag & Drop Images</h2>
              <p className="text-slate-500 text-xs max-w-xs">Your files stay private and never leave your device.</p>
            </div>
          ) : (
            <div className="w-full animate-fade-in">
              <div className="flex justify-between items-center mb-6 px-2">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Pages ({images.length})</h2>
                  <p className="text-xs text-slate-400 font-medium">Drag to reorder pages</p>
                </div>
                <button
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all flex items-center gap-2 shadow-md shadow-slate-200"
                  onClick={() => document.getElementById("addMorePages").click()}
                  disabled={isGenerating}
                >
                  <Plus size={16} /> Add More
                </button>
                <input
                  id="addMorePages"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFiles(Array.from(e.target.files))}
                  hidden
                />
              </div>

              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={images} strategy={rectSortingStrategy}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
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

      {/* --- SEO ARTICLE (AdSense Optimized "Thick Content") --- */}
      <article className="bg-white border-t border-slate-200 mt-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
            
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">Free Image to PDF Converter – Secure & Instant</h2>
            <p>
              Whether you are submitting expense receipts, compiling a photography portfolio, or turning scanned documents into a single readable file, merging multiple photos into a single PDF shouldn't be complicated. 
              <strong>SnapSizes</strong> provides a fast, free, and secure way to convert your JPG, PNG, and WebP images into a professional PDF document directly in your browser.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 not-prose">
              {[
                { icon: <Shield className="text-emerald-500" size={24} />, h: "100% Private", p: "We use Client-Side Processing. Your personal photos are never uploaded to our servers." },
                { icon: <Zap className="text-amber-500" size={24} />, h: "Lightning Fast", p: "No waiting for uploads or downloads. Your PDF is generated instantly on your device." },
                { icon: <GripVertical className="text-blue-500" size={24} />, h: "Easy Reordering", p: "Simply drag and drop your uploaded images to perfectly organize your document pages." }
              ].map((f, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-4xl border border-slate-100 shadow-sm text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">{f.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-1">{f.h}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed m-0">{f.p}</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border-l-4 border-blue-600 p-6 rounded-2xl my-10 text-slate-800 not-prose">
              <p className="font-medium m-0 text-sm">
                  <strong>💡 Complete Your Workflow:</strong> Are your source images too large? Before converting to PDF, you can reduce their file size with our <a href="/image-compressor-tool" className="text-amber-600 underline font-bold hover:text-blue-800">Image Compressor</a> or change their dimensions using the <a href="/bulk-photo-resizer" className="text-amber-600 underline font-bold hover:text-blue-800">Bulk Photo Resizer</a>.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">How to Convert Images to PDF Online</h3>
            <ol className="space-y-3 my-6">
              <li><strong>Upload Images:</strong> Drag and drop your files or tap the upload box to select photos from your device.</li>
              <li><strong>Arrange Pages:</strong> Click and drag the handle icon on any image to reorder them. The first image will be page 1 of your PDF. You can also rotate images that were uploaded sideways.</li>
              <li><strong>Customize Settings:</strong> Choose your preferred page size (A4 or US Letter) and adjust the white-space margins using the slider in the settings panel.</li>
              <li><strong>Download:</strong> Click "Generate PDF" to instantly compile and save your document.</li>
            </ol>

            <div className="border-t border-slate-100 pt-12 mt-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight text-center">Frequently Asked Questions</h3>
              <div className="space-y-6 not-prose">
                {[
                  { 
                    q: "Is this tool completely free to use?", 
                    a: "Yes, the SnapSizes PDF converter is 100% free. There are no daily limits, paywalls, or hidden watermarks added to your generated files." 
                  },
                  { 
                    q: "Does SnapSizes store my photos on a server?", 
                    a: "No. We operate with a strict privacy-first policy. Your images are processed inside your own browser's memory and are wiped entirely as soon as you close or refresh the tab." 
                  },
                  { 
                    q: "Can I convert PNG and WebP files to PDF?", 
                    a: "Absolutely. Our tool supports all major web image formats including standard JPG/JPEG, transparent PNGs, and modern WebP files." 
                  }
                ].map((faq, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-amber-100 transition-colors">
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h4>
                    <p className="text-slate-600 leading-relaxed text-sm m-0">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </article>

      {/* --- MOBILE FLOATING BAR --- */}
      {hasImages && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-80 flex items-center gap-3 lg:hidden px-4 w-full max-w-90">
          <button
            className="flex-[0.8] bg-white text-slate-900 px-4 py-4 rounded-full font-bold shadow-2xl border border-slate-100 flex items-center justify-center gap-2"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Settings size={18} />
          </button>
          <button
            className="flex-[1.2] bg-amber-500! text-white! px-6 py-4 rounded-full font-bold shadow-2xl flex items-center justify-center gap-2"
            onClick={handleExport}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <>
                <FileText size={18} /> PDF
              </>
            )}
          </button>
          <button
            className="w-14 h-14 bg-red-50 text-red-500 rounded-full font-bold shadow-2xl border border-red-100 flex items-center justify-center shrink-0"
            onClick={() => setImages([])}
            disabled={isGenerating}
            title="Clear all"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* --- MOBILE SETTINGS DRAWER (Forced Sharp) --- */}
      <aside
        className={`
          fixed inset-x-0 bottom-0 z-100 lg:hidden
          bg-white rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.2)] border-t border-slate-200 
          p-8 max-h-[85vh] overflow-y-auto transition-transform duration-500 ease-in-out
          ${isDrawerOpen ? "translate-y-0" : "translate-y-full"}
      `}
        style={{ filter: "none", backdropFilter: "none" }}
      >
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-8 shrink-0" />
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-black">Settings</h3>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 bg-slate-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        <SettingsPanel {...sharedProps} />
      </aside>

      {/* --- DRAWER BACKDROP --- */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-90 lg:hidden animate-fade-in"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  );
}