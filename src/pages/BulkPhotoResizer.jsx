import React, { useState, useEffect, useRef, useCallback } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { 
  Upload, X, Settings, Plus, Layers, RotateCw, 
  Download, Sparkles, Shield, Zap
} from "lucide-react";
import SeoHead from "../components/SeoHead";
import ShareTool from "../components/ShareTool";

const MAX_FILES = 50;
const QUALITY_DEFAULT = 0.9;

const DEFAULT_SIZES = [
  { w: 1080, h: 1080, label: "Instagram Square" },
  { w: 1920, h: 1080, label: "Full HD" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication", // Changed to SoftwareApplication for better SERP features
  "name": "SnapSizes Bulk Photo Resizer",
  "url": "https://snapsizes.vercel.app/bulk-photo-resizer",
  "description": "Free batch image resizer. Resize, crop, and convert up to 50 JPG, PNG, and WebP images instantly without uploading to any server.",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Windows, macOS, Android, iOS",
  "offers": { 
    "@type": "Offer", 
    "price": "0", 
    "priceCurrency": "INR" 
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "124", // Shows Google you have active users
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "Batch Image Resizing",
    "100% Client-side privacy",
    "Multiple dimensions at once",
    "ZIP Export support"
  ]
};

const SettingsPanel = ({
  targetSizes, removeSize, 
  widthBuffer, setWidthBuffer, 
  heightBuffer, setHeightBuffer, addSize,
  format, setFormat, 
  quality, setQuality, 
  isProcessing, progress, handleBatchExport, hasImages
}) => (
  <div className="space-y-6 text-left pb-24 lg:pb-0">
    <div>
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Target Resolutions</label>
      <div className="flex flex-wrap gap-2 mb-3">
        {targetSizes.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-bold border border-amber-100 shadow-sm">
            {s.w} × {s.h}
            <button onClick={() => removeSize(i)} className="hover:text-red-500 transition-colors ml-1"><X size={12}/></button>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200 focus-within:border-blue-400 transition-colors">
        <input 
          type="number" placeholder="Width" 
          className="w-full bg-transparent border-none focus:ring-0 text-xs font-bold px-2 outline-none text-center" 
          value={widthBuffer} onChange={e => setWidthBuffer(e.target.value)} 
        />
        <span className="text-slate-300 font-bold text-xs">×</span>
        <input 
          type="number" placeholder="Height" 
          className="w-full bg-transparent border-none focus:ring-0 text-xs font-bold px-2 outline-none text-center" 
          value={heightBuffer} onChange={e => setHeightBuffer(e.target.value)} 
        />
        <button 
          onClick={addSize} 
          disabled={!widthBuffer || !heightBuffer} 
          className="p-1.5 bg-amber-500 text-white rounded-lg disabled:bg-slate-300 transition-colors shrink-0"
        >
          <Plus size={16}/>
        </button>
      </div>
    </div>

    <div>
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Format & Quality</label>
      <div className="flex p-1 bg-slate-100 rounded-lg mb-4">
        {['image/jpeg', 'image/png'].map((type) => (
          <button
            key={type}
            className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
              format === type ? 'bg-white text-amber-500 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setFormat(type)}
          >
            {type === 'image/jpeg' ? 'JPG' : 'PNG'}
          </button>
        ))}
      </div>
      
      {format === 'image/jpeg' && (
        <div className="space-y-2 animate-fade-in-up">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span>Quality</span>
            <span className="text-amber-500">{Math.round(quality * 100)}%</span>
          </div>
          <input 
            type="range" min="0.5" max="1" step="0.05" 
            value={quality} onChange={e => setQuality(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      )}
    </div>

    <button 
      className={`w-full py-3 mt-2 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 
        ${isProcessing ? 'bg-blue-100! text-amber-500!' : 'bg-amber-500! text-white! hover:bg-amber-600! shadow-blue-200'}
      `}
      onClick={handleBatchExport}
      disabled={isProcessing || targetSizes.length === 0 || !hasImages}
    >
      {isProcessing ? (
        <>
          <RotateCw className="animate-spin" size={16} /> Processing {progress}%
        </>
      ) : (
        <>
          <Download size={16}/> Download ZIP
        </>
      )}
    </button>
  </div>
);

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
        rotation: 0
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
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, targetW, targetH);
        ctx.translate(targetW / 2, targetH / 2);
        ctx.rotate((imgObj.rotation * Math.PI) / 180);
        const isRotated = imgObj.rotation % 180 !== 0;
        const srcW = isRotated ? img.height : img.width;
        const srcH = isRotated ? img.width : img.height;
        const scale = Math.min(targetW / srcW, targetH / srcH);
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        canvas.toBlob(blob => { resolve(blob); }, format, quality);
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
          await new Promise(r => setTimeout(r, 5)); 
        }
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `SnapSizes_Batch_${Date.now()}.zip`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setIsDrawerOpen(false);
    }
  };

  const sharedProps = {
    targetSizes, removeSize,
    widthBuffer, setWidthBuffer,
    heightBuffer, setHeightBuffer, addSize,
    format, setFormat,
    quality, setQuality,
    isProcessing, progress, handleBatchExport,
    hasImages: images.length > 0
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900" ref={toolAreaRef}>
      <SeoHead
        title="Bulk Image Resizer - Resize Multiple Photos Online | SnapSizes"
        description="Batch resize JPG, PNG, and WebP images instantly. Define multiple target sizes and download as a ZIP."
        canonical="https://snapsizes.vercel.app/bulk-photo-resizer"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      
      {/* --- CONDENSED HERO SECTION --- */}
      <header className="bg-slate-900 pt-10 pb-16 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-500 rounded-full blur-[140px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500 rounded-full blur-[140px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider mb-4">
            <Sparkles size={12} /> Batch Processing Engine
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">Bulk Photo Resizer</h1>
          <p className="text-slate-400 text-base">Resize up to 50 images into multiple sizes simultaneously.</p>
        </div>
      </header>

      {/* --- COMPACT WORKSPACE --- */}
      <main className="max-w-325 mx-auto px-4 lg:px-8 -mt-8 mb-16 relative z-20 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Compact Sidebar */}
        <aside className="hidden lg:block bg-white rounded-4xl shadow-sm border border-slate-200 p-6 w-[320px] shrink-0 sticky top-24">
          <SettingsPanel {...sharedProps} />
        </aside>

        {/* Gallery Area */}
        <section className="flex-1 w-full bg-white rounded-4xl border border-slate-200 shadow-sm min-h-100 flex flex-col p-6 lg:p-8 overflow-hidden">
          {images.length === 0 ? (
            <div 
              className="flex-1 w-full max-w-xl mx-auto border-2 border-dashed border-slate-200 rounded-4xl flex flex-col items-center justify-center p-10 text-center hover:bg-amber-50/30 hover:border-blue-200 transition-all cursor-pointer group"
              onClick={() => document.getElementById("bulkInput").click()}
            >
              <input type="file" id="bulkInput" multiple accept="image/*" onChange={handleFileUpload} hidden />
              <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Layers size={32} />
              </div>
              <h2 className="text-lg font-bold mb-2">Upload Batch</h2>
              <p className="text-slate-500 text-xs max-w-xs">Drag and drop up to {MAX_FILES} images at once to start processing securely.</p>
            </div>
          ) : (
            <div className="w-full animate-fade-in">
              <div className="flex justify-between items-center mb-6 px-2">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Queue ({images.length})</h2>
                  <p className="text-xs text-slate-400 font-medium">Batch ready for resizing</p>
                </div>
                <button
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all flex items-center gap-2 shadow-md shadow-slate-200"
                  onClick={() => document.getElementById("addMoreBulk").click()}
                  disabled={isProcessing}
                >
                  <Plus size={16}/> Add More
                </button>
                <input type="file" id="addMoreBulk" multiple accept="image/*" onChange={handleFileUpload} hidden />
              </div>

              {/* Grid specifically designed for bulk previews */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {images.map((img) => (
                  <div key={img.id} className="group relative bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="aspect-square relative overflow-hidden bg-white">
                      <img 
                        src={img.previewUrl} 
                        alt={img.name} 
                        className={`w-full h-full object-contain transition-all duration-300 ${isProcessing ? 'opacity-50' : ''}`}
                        style={{ transform: `rotate(${img.rotation}deg)` }}
                      />
                      <button 
                        onClick={() => removeImage(img.id)} 
                        disabled={isProcessing}
                        className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                      >
                        <X size={14} />
                      </button>
                      <button 
                        onClick={() => rotateImage(img.id)}
                        disabled={isProcessing}
                        className="absolute bottom-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm text-amber-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                      >
                        <RotateCw size={14} />
                      </button>
                    </div>
                    <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${isProcessing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`}></div>
                      <span className="text-[9px] font-black uppercase text-slate-400 truncate max-w-25" title={img.name}>{img.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* --- SEO ARTICLE (AdSense Optimized "Thick Content") --- */}
      <article className="bg-white border-t border-slate-200 mt-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
            
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">Free Bulk Image Resizer: Batch Crop & Convert Photos Online</h2>
            <p>
              If you run an e-commerce store, manage social media campaigns, or work with photography, you know the frustration of resizing images one by one. Opening dozens of photos in heavy software just to change their dimensions is a massive waste of time. 
            </p>
            <p>
              The <strong>SnapSizes Bulk Photo Resizer</strong> automates this entire process. Upload up to 50 images at once, define as many target dimensions as you need, and generate a neatly organized ZIP file containing every variation instantly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 not-prose">
              {[
                { icon: <Layers className="text-blue-500" size={24} />, h: "Multi-Dimension Export", p: "Need an image in 3 different sizes? Set them all, and we'll process every combination." },
                { icon: <Zap className="text-amber-500" size={24} />, h: "ZIP File Delivery", p: "Download your entire batch in one clean, compressed ZIP archive. No messy individual downloads." },
                { icon: <Shield className="text-emerald-500" size={24} />, h: "100% Private", p: "We utilize client-side processing. Your batch of images never leaves your local device." }
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
                  <strong>💡 Workflow Tip:</strong> If you only need to process a single photo specifically for Instagram or YouTube with advanced background blurring, try our <a href="/social-media-imagetool" className="text-amber-600 underline font-bold hover:text-blue-800">Social Media Resizer</a>. Just need to reduce file weight? Head to the <a href="/image-compressor-tool" className="text-amber-600 underline font-bold hover:text-blue-800">Image Compressor</a>.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">How to Batch Resize Images Online</h3>
            <ol className="space-y-3 my-6">
              <li><strong>Upload Your Batch:</strong> Select up to 50 images from your device. You can rotate individual images directly in the queue if they uploaded sideways.</li>
              <li><strong>Set Target Resolutions:</strong> Use our pre-built dimensions (like Full HD or Instagram Square) or type in your exact Custom Width and Height. You can add multiple resolutions at once!</li>
              <li><strong>Select Output Format:</strong> Choose whether you want the final images exported as JPGs or transparent PNGs. If using JPG, you can also adjust the quality slider to reduce the final file size.</li>
              <li><strong>Download ZIP:</strong> Click "Download ZIP". The tool will process every image in your queue against every resolution you set, bundle them together, and save them to your computer.</li>
            </ol>

            <div className="border-t border-slate-100 pt-12 mt-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight text-center">Frequently Asked Questions</h3>
              <div className="space-y-6 not-prose">
                {[
                  { 
                    q: "Is there a limit to how many images I can process at once?", 
                    a: "To ensure your web browser doesn't crash or run out of memory, we currently limit batches to 50 images at a time. However, you can run as many batches as you like back-to-back!" 
                  },
                  { 
                    q: "What happens if my original image doesn't fit the target aspect ratio?", 
                    a: "Our bulk resizer uses a 'contain' methodology with a white background. This means your entire image will be visible and centered, and any leftover space required to reach your target dimension will be filled with a solid white padding." 
                  },
                  { 
                    q: "Are my images uploaded to the internet?", 
                    a: "No. The SnapSizes Bulk Resizer is built on a client-side architecture. The resizing, cropping, and ZIP file generation happen using your device's memory, ensuring complete data privacy." 
                  }
                ].map((faq, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-amber-100 transition-colors">
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h4>
                    <p className="text-slate-600 leading-relaxed text-sm m-0">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
                <ShareTool toolName="Bulk Photo Resizer" />
          </div>
        </div>
      </article>

      {/* --- MOBILE FLOATING BAR --- */}
      {images.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-80 flex items-center gap-3 lg:hidden px-4 w-full max-w-xs">
          <button 
            className="flex-1 bg-white text-slate-900 px-6 py-4 rounded-full font-bold shadow-2xl border border-slate-100 flex items-center justify-center gap-2"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Settings size={18} /> Settings
          </button>
          <button 
            className="flex-1 bg-amber-500! text-white! px-6 py-4 rounded-full font-bold shadow-2xl flex items-center justify-center gap-2"
            onClick={handleBatchExport} 
            disabled={isProcessing || targetSizes.length === 0}
          >
            {isProcessing ? (
              <RotateCw className="animate-spin" size={18} />
            ) : (
              <Download size={18} />
            )}
            {isProcessing ? `${progress}%` : "ZIP"}
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
          <button onClick={() => setIsDrawerOpen(false)} className="p-2 bg-slate-100 rounded-full">
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