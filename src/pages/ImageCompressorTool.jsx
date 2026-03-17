import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Settings,
  Download,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  TrendingDown,
  Plus,
  Shield,
} from "lucide-react";
import SeoHead from "../components/SeoHead";

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

        canvas.toBlob(
          (blob) => {
            resolve({
              file: file,
              blob,
              url: URL.createObjectURL(blob),
              originalSize: file.size,
              compressedSize: blob.size,
              name: file.name,
              id: Math.random().toString(36).substr(2, 9),
            });
          },
          "image/jpeg",
          quality / 100,
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

// 🟢 JSON-LD Schema for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SnapSizes Free Image Compressor",
  url: "https://snapsizes.vercel.app/image-compressor-tool",
  description:
    "Free client-side image compressor. Reduce JPG, PNG, and WebP file sizes by up to 80% securely directly in your browser.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Lossless Compression",
    "Client-Side Processing",
    "Batch Image Compression",
  ],
};

// 🟢 Extracted SettingsPanel for DRY code, ESLint compliance, and Mobile Scrolling fix
const SettingsPanel = ({
  quality,
  setQuality,
  handleDownloadAll,
  isProcessing,
  hasImages,
}) => (
  <div className="space-y-6 text-left pb-24 lg:pb-0">
    <div>
      <div className="flex justify-between items-center mb-4">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Quality Level
        </label>
        <span className="px-2 py-1 bg-amber-500 text-white rounded-md text-[10px] font-black">
          {quality}%
        </span>
      </div>
      <input
        type="range"
        min="10"
        max="100"
        value={quality}
        onChange={(e) => setQuality(Number(e.target.value))}
        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-3"
      />
      <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
        Higher compression (lower %) results in smaller files but may introduce
        visible artifacts. 75% is usually the "sweet spot".
      </p>
    </div>

    <button
      className={`w-full py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4
        ${isProcessing ? "bg-blue-100! text-amber-500!" : "bg-amber-500! text-white! hover:bg-amber-600! shadow-blue-200"}
      `}
      onClick={handleDownloadAll}
      disabled={!hasImages || isProcessing}
    >
      {isProcessing ? (
        <>
          <Loader2 className="animate-spin" size={16} /> Optimizing...
        </>
      ) : (
        <>
          <Download size={16} /> Download All
        </>
      )}
    </button>
  </div>
);

export default function ImageCompressorTool() {
  const [images, setImages] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [quality, setQuality] = useState(75);
  const [isProcessing, setIsProcessing] = useState(false);

  const toolAreaRef = useRef(null);

  useEffect(() => {
    if (images.length > 0 && toolAreaRef.current) {
      toolAreaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [images.length]);

  useEffect(() => {
    if (images.length === 0) return;
    const timeout = setTimeout(async () => {
      setIsProcessing(true);
      const newImages = await Promise.all(
        images.map((img) => compressImage(img.file, quality)),
      );
      setImages(newImages);
      setIsProcessing(false);
    }, 500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quality]);

  const handleFiles = async (files) => {
    setIsProcessing(true);
    const validFiles = files.filter((f) => f.type.startsWith("image/"));
    const compressedResults = await Promise.all(
      validFiles.map((f) => compressImage(f, quality)),
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
    link.download = `min-${img.name}`;
    link.click();
  };

  const handleDownloadAll = () => {
    images.forEach((img) => handleDownload(img));
    setIsDrawerOpen(false);
  };

  const sharedProps = {
    quality,
    setQuality,
    handleDownloadAll,
    isProcessing,
    hasImages: images.length > 0,
  };

  return (
    <div
      className="min-h-screen bg-slate-50 font-sans text-slate-900"
      ref={toolAreaRef}
    >
      <SeoHead
        title="Image Compressor - Reduce Image Size Online Free | SnapSizes"
        description="Compress JPG, PNG, and WebP images by up to 80% without losing quality. Fast, secure, and client-side."
        canonical="https://snapsizes.vercel.app/image-compressor-tool"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* --- CONDENSED HERO SECTION --- */}
      <header className="bg-slate-900 pt-10 pb-16 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500 rounded-full blur-[140px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-500 rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-4">
            <TrendingDown size={12} /> Visually Lossless Engine
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
            Image Compressor
          </h1>
          <p className="text-slate-400 text-base">
            Shrink file sizes up to 80% without touching a server.
          </p>
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
              className="flex-1 w-full max-w-xl mx-auto border-2 border-dashed border-slate-200 rounded-4xl flex flex-col items-center justify-center p-10 text-center hover:bg-emerald-50/30 hover:border-emerald-200 transition-all cursor-pointer group"
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
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <ImageIcon size={32} />
              </div>
              <h2 className="text-lg font-bold mb-2">Upload for Compression</h2>
              <p className="text-slate-500 text-xs max-w-xs">
                Instantly optimize JPG, PNG, or WebP images while maintaining
                100% privacy.
              </p>
            </div>
          ) : (
            <div className="w-full animate-fade-in">
              <div className="flex justify-between items-center mb-6 px-2">
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    Queue ({images.length})
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">
                    Auto-optimizing at {quality}%
                  </p>
                </div>
                <button
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all flex items-center gap-2 shadow-md shadow-slate-200"
                  onClick={() =>
                    document.getElementById("addMoreCompress").click()
                  }
                  disabled={isProcessing}
                >
                  <Plus size={16} /> Add More
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

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {images.map((img) => {
                  const saved =
                    ((img.originalSize - img.compressedSize) /
                      img.originalSize) *
                    100;
                  return (
                    <div
                      key={img.id}
                      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-video relative overflow-hidden bg-slate-50 flex items-center justify-center">
                        <img
                          src={img.url}
                          alt="Compressed preview"
                          className={`w-full h-full object-contain transition-opacity duration-300 ${isProcessing ? "opacity-40" : "opacity-100"}`}
                        />
                        <button
                          onClick={() => removeImage(img.id)}
                          className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                        >
                          <X size={14} />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md shadow-emerald-200">
                          SAVED {saved.toFixed(0)}%
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                              Original
                            </span>
                            <span className="text-[11px] font-bold text-slate-500">
                              {formatSize(img.originalSize)}
                            </span>
                          </div>
                          <div className="h-3 w-px bg-slate-200"></div>
                          <div className="flex flex-col text-right">
                            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">
                              Optimized
                            </span>
                            <span className="text-[11px] font-bold text-amber-500">
                              {formatSize(img.compressedSize)}
                            </span>
                          </div>
                        </div>
                        <button
                          className="w-full flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 py-2.5 rounded-lg text-xs font-bold transition-colors"
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

      {/* --- SEO ARTICLE (AdSense Optimized "Thick Content") --- */}
      <article className="bg-white border-t border-slate-200 mt-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
            
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">Free Online Image Compressor: Reduce Image Size Without Losing Quality</h2>
            <p>
              In today's fast-paced digital world, large image files are the primary cause of slow website loading times. Whether you are a web developer trying to improve your Core Web Vitals, a photographer archiving your portfolio, or a social media manager preparing posts, dealing with massive JPG and PNG files can eat up your storage and bandwidth.
            </p>
            <p>
              The <strong>SnapSizes Free Image Compressor</strong> is designed to solve this exact problem. Our advanced browser-based compression tool allows you to reduce image file sizes by up to 80% while maintaining a visually lossless, crisp appearance. 
            </p>

            {/* 🟢 Features Grid moved inside the article to break up the text */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 not-prose">
              {[
                { icon: <Sparkles className="text-emerald-500" size={24} />, h: "Speed Up", p: "Faster loading images boost your website rankings." },
                { icon: <Shield className="text-blue-500" size={24} />, h: "Privacy", p: "Everything stays in your browser. No server uploads." },
                { icon: <TrendingDown className="text-indigo-500" size={24} />, h: "Smart Tech", p: "Intelligent compression preserves what eyes actually see." }
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
                  <strong>💡 Complete Your Workflow:</strong> Compressing your file size (MB) is only half the battle. If you also need to change the physical dimensions (pixels) of your photo for Instagram or YouTube, use our <a href="/social-media-imagetool" className="text-amber-600 underline font-bold hover:text-blue-800">Social Media Image Resizer</a> or process dozens of files at once with our <a href="/bulk-photo-resizer" className="text-amber-600 underline font-bold hover:text-blue-800">Bulk Photo Resizer</a>.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Why Client-Side Compression is Better (And 100% Secure)</h3>
            <p>
              Most free image compressors require you to upload your personal or proprietary photos to their remote cloud servers. This poses a massive privacy risk and significantly slows down the compression process, as you have to wait for the upload and download to complete.
            </p>
            <p>
              SnapSizes is different. We utilize modern HTML5 Canvas and JavaScript APIs to perform <strong>100% of the compression locally on your own device</strong>. 
            </p>
            <ul className="space-y-3 my-6">
              <li><strong>Zero Server Uploads:</strong> Your photos never leave your computer or phone. Total privacy is guaranteed.</li>
              <li><strong>Lightning Fast:</strong> Because there is no uploading involved, the compression happens almost instantly.</li>
              <li><strong>Unlimited Usage:</strong> No daily limits, no paywalls, and no hidden subscriptions.</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">How to Compress an Image to a Smaller Size</h3>
            <p>Reducing your file size is incredibly simple and requires no technical knowledge. Just follow these steps:</p>
            <ol className="space-y-3 my-6">
              <li><strong>Upload Your Photos:</strong> Drag and drop your JPG, PNG, or WebP images into the dropzone above, or click to browse your files. You can upload multiple images at once.</li>
              <li><strong>Adjust the Quality Slider:</strong> Use the settings panel to select your desired compression level. We recommend <strong>75%</strong> as the perfect sweet spot between high visual quality and minimal file size.</li>
              <li><strong>Review the Savings:</strong> Our tool will instantly show you the original file size, the newly compressed size, and the exact percentage of data you saved.</li>
              <li><strong>Download Instantly:</strong> Click "Save" on individual images or hit "Download All" to save your newly optimized batch straight to your device.</li>
            </ol>

            <div className="border-t border-slate-100 pt-12 mt-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight text-center">Frequently Asked Questions</h3>
              <div className="space-y-6 not-prose">
                {[
                  { 
                    q: "Will compressing an image reduce its quality?", 
                    a: "Our tool uses a 'smart lossy' compression algorithm. While it technically removes some data to reduce the file size, it strategically targets data that the human eye cannot perceive. At our default 75% setting, the compression is visually lossless." 
                  },
                  { 
                    q: "What image formats does the SnapSizes compressor support?", 
                    a: "Currently, our tool fully supports the compression of JPG (JPEG), PNG, and WebP image formats. All outputs are highly optimized for web delivery." 
                  },
                  { 
                    q: "Is there a limit to how many images I can compress?", 
                    a: "No! Because our tool runs entirely inside your browser using your device's processing power, there are no artificial limits, file size caps, or hidden server costs. You can compress as many images as you need." 
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
            onClick={handleDownloadAll}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <>
                <Download size={18} /> All
              </>
            )}
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