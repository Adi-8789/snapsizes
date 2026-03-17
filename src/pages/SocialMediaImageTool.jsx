import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Upload, X, Settings, Download, 
  Smartphone, Layout, Monitor, Sparkles, Loader2, Plus, CheckCircle2, Shield 
} from "lucide-react";
import SeoHead from "../components/SeoHead";

const PRESETS = [
  { id: "ig-post", label: "Instagram Post", width: 1080, height: 1080, ratio: "1:1", icon: <Layout size={18}/> },
  { id: "ig-story", label: "IG Story / Reels", width: 1080, height: 1920, ratio: "9:16", icon: <Smartphone size={18}/> },
  { id: "yt-thumb", label: "YouTube Thumb", width: 1280, height: 720, ratio: "16:9", icon: <Monitor size={18}/> },
  { id: "li-post", label: "LinkedIn Post", width: 1200, height: 627, ratio: "1.91:1", icon: <Layout size={18}/> },
  { id: "wa-dp", label: "WhatsApp DP", width: 500, height: 500, ratio: "1:1", icon: <Smartphone size={18}/> },
];

const COLOR_PALETTE = ["#ffffff", "#000000", "#F5F5F5", "#1e293b", "#fce7f3", "#dbeafe", "#fef3c7"];

// 🟢 JSON-LD Schema
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SnapSizes Social Media Image Resizer",
  "url": "https://snapsizes.vercel.app/social-media-imagetool",
  "description": "Free online tool to resize, crop, and pad images for Instagram, YouTube, LinkedIn, and WhatsApp without losing quality.",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "featureList": ["Instagram Post Resizer", "YouTube Thumbnail Cropper", "LinkedIn Post Resizer", "Client-side processing for privacy"]
};

// 🟢 SettingsPanel - COMPACT UI Version
const SettingsPanel = ({ 
  selectedPreset, setSelectedPreset, 
  fitMode, setFitMode, 
  bgColor, setBgColor, 
  handleDownload, isProcessing 
}) => (
  <div className="space-y-5 text-left pb-24 lg:pb-0">
    <div>
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Presets</label>
      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map(p => (
          <button 
            key={p.id}
            className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border-2 transition-all gap-1.5 ${
                selectedPreset.id === p.id ? 'border-blue-600 bg-amber-50 text-amber-600 shadow-sm' : 'border-slate-50 bg-slate-50 text-slate-500 hover:border-slate-200'
            }`}
            onClick={() => setSelectedPreset(p)}
          >
            {p.icon}
            <span className="text-[10px] font-bold">{p.label}</span>
          </button>
        ))}
      </div>
    </div>

    <div>
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Fit Style</label>
      <div className="flex p-1 bg-slate-100 rounded-lg">
        {['blur', 'color', 'cover'].map((mode) => (
          <button
            key={mode}
            className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
              fitMode === mode ? 'bg-white text-amber-500 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setFitMode(mode)}
          >
            <span className="capitalize">{mode}</span>
          </button>
        ))}
      </div>
    </div>

    {fitMode === 'color' && (
      <div className="animate-fade-in-up">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Color Studio</label>
        <div className="flex flex-wrap gap-2 items-center">
          {COLOR_PALETTE.map(c => (
            <button
              key={c}
              className={`w-8 h-8 shrink-0 rounded-full border-2 transition-transform hover:scale-110 ${
                bgColor === c ? 'border-blue-600 scale-110 shadow-md' : 'border-white shadow-sm'
              }`}
              style={{ backgroundColor: c }}
              onClick={() => setBgColor(c)}
              aria-label={`Select background color ${c}`}
            />
          ))}
          <div className="relative w-8 h-8 shrink-0 group">
            <div 
              className={`absolute inset-0 rounded-full border-2 border-dashed flex items-center justify-center transition-all ${
                !COLOR_PALETTE.includes(bgColor) ? 'border-blue-500 shadow-sm' : 'border-slate-300 text-slate-400 hover:border-amber-400 hover:text-blue-500'
              }`}
              style={{ backgroundColor: !COLOR_PALETTE.includes(bgColor) ? bgColor : 'transparent' }}
            >
              <Plus size={14} className={!COLOR_PALETTE.includes(bgColor) ? 'text-white' : ''} />
            </div>
            <input 
              type="color" 
              value={bgColor} 
              onChange={(e) => setBgColor(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Choose custom background color"
            />
          </div>
        </div>
      </div>
    )}

    <button 
      className="w-full bg-amber-500! text-white! py-3 mt-4 rounded-xl font-bold text-base shadow-md hover:bg-amber-600! transition-all flex items-center justify-center gap-2"
      onClick={handleDownload}
      disabled={isProcessing}
    >
      {isProcessing ? <Loader2 className="animate-spin" /> : <><Download size={18}/> Download Image</>}
    </button>
  </div>
);

export default function SocialMediaImageTool() {
  const [sourceImage, setSourceImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [fitMode, setFitMode] = useState("blur"); 
  const [bgColor, setBgColor] = useState("#ffffff");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef(null);
  const toolAreaRef = useRef(null);

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
    };
    img.src = url;
    return () => URL.revokeObjectURL(url);
  };

  const drawCanvas = useCallback(() => {
    if (!sourceImage || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { width, height } = selectedPreset;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = "none";
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    canvas.width = width;
    canvas.height = height;

    if (fitMode === "blur") {
      ctx.save();
      const scale = Math.max(width / sourceImage.width, height / sourceImage.height);
      const w = sourceImage.width * scale;
      const h = sourceImage.height * scale;
      ctx.filter = "blur(40px) brightness(0.85)";
      ctx.drawImage(sourceImage, (width - w)/2, (height - h)/2, w, h);
      ctx.restore();
    } else if (fitMode === "color") {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
    }

    const imgRatio = sourceImage.width / sourceImage.height;
    const canvasRatio = width / height;
    let drawW, drawH, drawX, drawY;

    if (fitMode === "cover") {
      if (imgRatio > canvasRatio) {
        drawH = height; drawW = height * imgRatio;
      } else {
        drawW = width; drawH = width / imgRatio;
      }
    } else {
      if (imgRatio > canvasRatio) {
        drawW = width; drawH = width / imgRatio;
      } else {
        drawH = height; drawW = height * imgRatio;
      }
    }
    drawX = (width - drawW) / 2;
    drawY = (height - drawH) / 2;

    if (fitMode !== "cover") {
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 10;
    }
    ctx.drawImage(sourceImage, drawX, drawY, drawW, drawH);
  }, [sourceImage, selectedPreset, fitMode, bgColor]);

  useEffect(() => { drawCanvas(); }, [drawCanvas]);

  const handleDownload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const link = document.createElement("a");
      link.download = `SnapSizes_${selectedPreset.id}_${fileName}.jpg`;
      link.href = canvasRef.current.toDataURL("image/jpeg", 0.95);
      link.click();
      setIsProcessing(false);
      setIsDrawerOpen(false);
    }, 100);
  };

  const sharedProps = {
    selectedPreset, setSelectedPreset,
    fitMode, setFitMode,
    bgColor, setBgColor,
    handleDownload, isProcessing
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900" ref={toolAreaRef}>
      <SeoHead
        title="Social Media Image Resizer - Crop for Instagram & YouTube"
        description="Free online tool to resize, crop, and pad images for Instagram, YouTube, LinkedIn, and WhatsApp without losing quality."
        canonical="https://snapsizes.vercel.app/social-media-imagetool"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* --- CONDENSED HERO --- */}
      <header className="bg-slate-900 pt-10 pb-16 px-4 text-center text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-wider mb-4">
            <Sparkles size={12} /> Free Image Cropper
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">Social Media Image Resizer</h1>
          <p className="text-slate-400 text-base">Instantly crop and format photos for Instagram, YouTube, and more.</p>
        </div>
      </header>

      {/* --- COMPACT WORKSPACE --- */}
      <main className="max-w-325 mx-auto px-4 lg:px-8 -mt-8 mb-16 relative z-20 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Compact Sidebar */}
        <aside className="hidden lg:block bg-white rounded-4xl shadow-sm border border-slate-200 p-6 w-[320px] shrink-0 sticky top-24">
          <SettingsPanel {...sharedProps} />
        </aside>

        {/* Compact Canvas Area */}
        <section className="flex-1 w-full bg-white rounded-4xl border border-slate-200 shadow-sm min-h-100 flex flex-col items-center justify-center p-6 lg:p-8 overflow-hidden">
          {!sourceImage ? (
            <div 
              className="w-full max-w-sm border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center hover:bg-amber-50/30 hover:border-blue-200 transition-all cursor-pointer group"
              onClick={() => document.getElementById("smInput").click()}
            >
              <input type="file" id="smInput" accept="image/*" onChange={handleFileUpload} hidden />
              <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Upload size={28} />
              </div>
              <h2 className="text-lg font-bold">Upload a Photo</h2>
              <p className="text-slate-500 text-xs mt-2">JPG, PNG, or WebP supported</p>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center animate-fade-in overflow-hidden">
              <div className="relative group max-w-full flex justify-center">
                <canvas 
                  ref={canvasRef} 
                  className="max-w-full max-h-[55vh] w-auto h-auto rounded-lg shadow-xl border border-slate-100 object-contain" 
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Preview: {selectedPreset.width}x{selectedPreset.height}
                </div>
              </div>
              <button onClick={() => setSourceImage(null)} className="mt-6 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-red-500 transition-colors">
                Change Image
              </button>
            </div>
          )}
        </section>
      </main>

      {/* --- SEO ARTICLE (AdSense Optimized "Thick Content") --- */}
      <article className="bg-white border-t border-slate-200 mt-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
            
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">Free Online Social Media Image Resizer: No-Crop Formatting</h2>
            <p>
              Every social media platform demands highly specific image dimensions. A landscape photograph that looks stunning in your camera roll will often get awkwardly chopped off when uploaded as a square <strong>Instagram Post (1080x1080)</strong>, or leave ugly black bars when used as an <strong>Instagram Story (1080x1920)</strong>. 
            </p>
            <p>
              SnapSizes solves this permanently. Our browser-based image resizer instantly formats, crops, or pads your photos to fit perfectly across YouTube, LinkedIn, Instagram, and WhatsApp without losing a single pixel of quality.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 not-prose">
              {[
                { icon: <Layout className="text-blue-500" size={24} />, h: "Platform Presets", p: "1-click aspect ratios for Instagram, YouTube, and LinkedIn." },
                { icon: <Sparkles className="text-emerald-500" size={24} />, h: "Smart Padding", p: "Use professional background blurs or custom brand colors to fill space." },
                { icon: <Shield className="text-indigo-500" size={24} />, h: "Total Privacy", p: "No server uploads. Photos are processed instantly on your device." }
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
                  <strong>💡 Pro Tip:</strong> If your newly resized image has a massive file size, it will slow down your website or fail to upload on some platforms. Run your final output through our <a href="/image-compressor-tool" className="text-amber-600 underline font-bold hover:text-blue-800">Free Image Compressor</a> to reduce its size by 80% without losing visual quality.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">How to Resize Photos Without Cropping the Edges</h3>
            <p>
              Sometimes you have a vertical portrait photo that you desperately want to post as a square on your Instagram feed, but you don't want to crop out the top and bottom. SnapSizes offers three distinct "Fit Styles" to handle this elegantly:
            </p>
            <ul className="space-y-4 my-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                <span><strong>The Blur Effect (Recommended):</strong> Automatically clones your image, enlarges it to fill the background canvas, and applies a deep Gaussian blur. This creates a highly professional, cinematic border that makes your main image pop.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                <span><strong>Color Studio (Brand Matching):</strong> Don't like blurs? Use our Color Studio to pad the empty space with a solid color. Choose from standard neutrals or use the eyedropper tool to perfectly match your company's exact hex code.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                <span><strong>Cover (Standard Crop):</strong> If you simply want the image to stretch and zoom until the entire canvas is filled natively (which will trim the edges), select the Cover option.</span>
              </li>
            </ul>

            <div className="border-t border-slate-100 pt-12 mt-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight text-center">Frequently Asked Questions</h3>
              <div className="space-y-6 not-prose">
                {[
                  { 
                    q: "What is the correct Instagram Post size in 2026?", 
                    a: "The ideal size for a standard square Instagram post remains 1080 x 1080 pixels (a 1:1 aspect ratio). For portrait posts, the standard is 1080 x 1350 pixels." 
                  },
                  { 
                    q: "What dimensions do I need for a YouTube Thumbnail?", 
                    a: "YouTube requires thumbnails to be precisely 1280 x 720 pixels (a 16:9 aspect ratio). Using our tool ensures you won't have black bars on the sides of your video." 
                  },
                  { 
                    q: "Are my personal photos uploaded to your servers?", 
                    a: "Absolutely not. SnapSizes is built with privacy in mind. Our tool utilizes HTML5 technology to resize and crop your images entirely within your own web browser. No data is ever sent to our servers." 
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

      {/* Mobile Floating Action Bar */}
      {sourceImage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-80 flex items-center gap-3 lg:hidden px-4 w-full max-w-xs">
          <button 
            className="flex-1 bg-white text-slate-900 px-6 py-4 rounded-full font-bold shadow-2xl border border-slate-100 flex items-center justify-center gap-2"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Settings size={18} /> Settings
          </button>
          <button 
            className="flex-1 bg-amber-500! text-white! px-6 py-4 rounded-full font-bold shadow-2xl flex items-center justify-center"
            onClick={handleDownload}
            disabled={isProcessing}
          >
            {isProcessing ? <Loader2 className="animate-spin w-5 h-5"/> : <Download size={20} />}
          </button>
        </div>
      )}
      
      {/* Mobile Settings Drawer */}
      <aside className={`
          fixed inset-x-0 bottom-0 z-100 lg:hidden
          bg-white rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.2)] border-t border-slate-200 
          p-8 max-h-[85vh] overflow-y-auto transition-transform duration-500 ease-in-out
          ${isDrawerOpen ? 'translate-y-0' : 'translate-y-full'}
      `}
      style={{ filter: 'none', backdropFilter: 'none' }}
      >
          <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-8 shrink-0" />
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black">Settings</h3>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 bg-slate-100 rounded-full"><X size={20}/></button>
          </div>
          <SettingsPanel {...sharedProps} />
      </aside>

      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-90 lg:hidden animate-fade-in" 
          onClick={() => setIsDrawerOpen(false)} 
        />
      )}
    </div>
  );
}