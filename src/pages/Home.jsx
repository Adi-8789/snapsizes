import React from "react";
import { Link } from "react-router-dom";
import { 
  Crop, Layers, Minimize2, FileText, Youtube, 
  ShieldCheck, Zap, Lock, ArrowRight, Sparkles, Globe, 
  Type 
} from "lucide-react";
import SeoHead from "../components/SeoHead";

// 🟢 JSON-LD Schema specifically for the Homepage (Crucial for AdSense/SEO)
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "SnapSizes",
      "url": "https://snapsizes.vercel.app/",
      "description": "A privacy-first suite of free online image and text optimization tools including bulk resizers, compressors, and case converters.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://snapsizes.vercel.app/contact?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is SnapSizes really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. SnapSizes is a completely free online utility. There are no premium subscriptions, no account registrations required, and no hidden watermarks applied to your exported images."
          }
        },
        {
          "@type": "Question",
          "name": "Are my images and text stored on your servers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. SnapSizes utilizes a secure, client-side processing architecture. Whether you are compressing a PDF or converting text, all computations happen locally in your web browser. We never upload, store, or view your data."
          }
        }
      ]
    }
  ]
};

const TOOLS = [
  {
    title: "Social Media Resizer",
    desc: "Auto-crop and pad images for Instagram, LinkedIn, and YouTube without losing edges. Includes smart blur backgrounds.",
    icon: <Crop size={28} />,
    path: "/social-media-imagetool",
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    title: "Bulk Photo Resizer",
    desc: "Resize up to 50 images at once. Define multiple target dimensions and download everything in a clean ZIP file.",
    icon: <Layers size={28} />,
    path: "/bulk-photo-resizer",
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  {
    title: "Image Compressor",
    desc: "Reduce file sizes by up to 80% while maintaining crisp visual quality. Perfect for boosting website SEO and load speeds.",
    icon: <Minimize2 size={28} />,
    path: "/image-compressor-tool",
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    title: "Image to PDF",
    desc: "Combine multiple receipts, screenshots, or portfolio photos into a single secure PDF document instantly.",
    icon: <FileText size={28} />,
    path: "/image-to-pdf-tool",
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  {
    title: "YT Thumbnail Downloader",
    desc: "Extract and download high-resolution (HD & 4K) thumbnails directly from any YouTube video instantly.",
    icon: <Youtube size={28} />,
    path: "/youtube-thumbnail-downloader",
    color: "text-red-600",
    bg: "bg-red-50"
  },
  {
    title: "Case Converter",
    desc: "Change text to UPPERCASE, lowercase, or Title Case instantly. Includes a live word and character counter for quick editing.",
    icon: <Type size={28} />,
    path: "/case-converter",
    color: "text-purple-600",
    bg: "bg-purple-50"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <SeoHead
        title="SnapSizes - Free Online Image Tools (Privacy-First)"
        description="Resize, compress, and convert images online for free. SnapSizes is 100% browser-based—no uploads, no signups, and total privacy guaranteed."
        canonical="https://snapsizes.vercel.app/"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* --- HERO SECTION --- */}
      <header className="bg-slate-900 pt-16 pb-24 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-1/2 h-1/2 bg-amber-500 rounded-full blur-[140px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-1/2 h-1/2 bg-emerald-500 rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Sparkles size={14} /> 2026 Pro Suite
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            Professional Image Tools <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">
              Without the Privacy Risk
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            SnapSizes processes your photos entirely on your device. By eliminating server-side uploads, we offer the fastest and most secure image optimization experience on the web.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-bold text-slate-300">
            <span className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700/50"><ShieldCheck size={18} className="text-emerald-400"/> Zero-Upload Architecture</span>
            <span className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700/50"><Zap size={18} className="text-amber-400"/> Browser-Side Processing</span>
          </div>
        </div>
      </header>

      {/* --- TOOL GRID --- */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 -mt-12 relative z-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool, idx) => (
            <Link 
              key={idx} 
              to={tool.path} 
              className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${tool.bg} ${tool.color}`}>
                  {tool.icon}
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">{tool.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-1">
                  {tool.desc}
                </p>
                <div className="flex items-center text-sm font-bold text-amber-500 group-hover:text-amber-600 transition-colors mt-auto">
                  Launch Tool <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* --- SEO ARTICLE (AdSense Optimized "Thick Content") --- */}
      <article className="bg-white border-t border-slate-200 py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight text-center">
              The Complete Suite for Online Image & Text Optimization
            </h2>
            <p className="text-lg text-center max-w-3xl mx-auto mb-16">
              SnapSizes is a comprehensive, free online utility platform designed for the modern web. Instead of navigating between a dozen different websites to format your content, our platform provides a unified dashboard to resize photos, compress web assets, generate PDFs, and format text—all utilizing secure, client-side processing technology.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mb-6">Who is SnapSizes Built For?</h3>
            <p className="mb-12">
              Our tools are specifically engineered to solve daily workflow bottlenecks for a variety of digital professionals:
              <br/><br/>
              <strong>• Digital Marketers & Creators:</strong> Use our <em>Social Media Resizer</em> to automatically adjust image aspect ratios for Instagram, LinkedIn, and YouTube without losing crucial visual information to bad cropping.<br/>
              <strong>• Web Developers & SEO Specialists:</strong> Utilize our high-performance <em>Image Compressor</em> to reduce WebP, PNG, and JPG file weights by up to 80%. This directly improves Core Web Vitals and page load speeds, which are essential for high Google Search rankings.<br/>
              <strong>• Students & Office Professionals:</strong> Quickly batch process up to 50 images at once using the <em>Bulk Photo Resizer</em>, compile sensitive documents with the local <em>Image to PDF Converter</em>, or instantly reformat messy documents using the <em>Case Converter</em>.
            </p>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-16 not-prose">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <Lock className="text-emerald-500 mb-4" size={32} />
                <h3 className="text-xl font-bold text-slate-900 mb-3">100% Client-Side Privacy</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Most online utility sites upload your files to remote cloud servers, leaving your sensitive data vulnerable to breaches or AI training models. SnapSizes operates differently. We leverage <strong>HTML5 Canvas</strong> and browser-native APIs so your data never leaves your device. Total privacy is guaranteed.
                </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <Globe className="text-blue-500 mb-4" size={32} />
                <h3 className="text-xl font-bold text-slate-900 mb-3">No Registration Required</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We believe essential web utilities should be frictionless. You will never hit a paywall, be forced to create an account, or deal with daily usage limits. Simply open the website, select your tool, and get your optimized assets downloaded instantly.
                </p>
              </div>
            </div>

            {/* --- FAQ SECTION (Crucial for AdSense & Google Rich Snippets) --- */}
            <div className="mt-20 border-t border-slate-100 pt-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight text-center">Frequently Asked Questions</h3>
              <div className="grid gap-6 not-prose" itemScope itemType="https://schema.org/FAQPage">
                {[
                  {
                    q: "Is SnapSizes really free to use?",
                    a: "Yes. SnapSizes is a completely free online utility. There are no premium subscriptions, no account registrations required, and no hidden watermarks applied to your exported images or PDFs."
                  },
                  {
                    q: "Are my files stored or uploaded to your servers?",
                    a: "No. SnapSizes utilizes a secure, zero-upload architecture. Whether you are resizing photos or converting text cases, all processing happens locally in your web browser. We never upload, store, or view your data."
                  },
                  {
                    q: "How many images can I resize or compress at once?",
                    a: "Our Bulk Photo Resizer allows you to process up to 50 images in a single batch. This limit ensures high performance and prevents your web browser from crashing during heavy computation tasks."
                  },
                  {
                    q: "Does SnapSizes work on mobile devices?",
                    a: "Absolutely. The entire SnapSizes platform is fully responsive and designed to work seamlessly on Android, iOS, and all modern desktop browsers."
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <h4 className="font-bold text-slate-900 mb-2" itemProp="name">{item.q}</h4>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-sm text-slate-500" itemProp="text">{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}