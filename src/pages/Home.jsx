import React from "react";
import { Link } from "react-router-dom";
import {
  Crop,
  Layers,
  Minimize2,
  FileText,
  Youtube,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  Sparkles,
  Globe,
  Type,
  Combine,
  Heart,
  Users, // 🟢 Added 'Users' and ensured others are here
} from "lucide-react";
import SeoHead from "../components/SeoHead";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SnapSizes",
  url: "https://snapsizes.vercel.app/",
  description:
    "A privacy-first suite of free online image and text optimization tools including bulk resizers, compressors, and biodata makers.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://snapsizes.vercel.app/contact?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const homeFaqs = [
  {
    "@type": "Question",
    name: "How many images can I resize or compress at once?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Our Bulk Photo Resizer allows you to process up to 50 images in a single batch. This limit ensures high performance and prevents your web browser from crashing during heavy computation tasks.",
    },
  },
  {
    "@type": "Question",
    name: "Does SnapSizes work on mobile devices?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Absolutely. The entire SnapSizes platform is fully responsive and designed to work seamlessly on Android, iOS, and all modern desktop browsers.",
    },
  },
  {
    "@type": "Question",
    name: "Is the Biodata Maker private?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. Like all SnapSizes tools, the Biodata Maker processes your personal information locally in your browser. No data is ever uploaded to our servers or stored in any database.",
    },
  },
];

const TOOLS = [
  {
    title: "Marriage Biodata Maker",
    desc: "Create stunning Indian marriage biodata with premium Ganesha and Minimalist templates. 100% private and instant PDF download.",
    icon: <Heart size={28} />,
    path: "/biodata-maker",
    color: "text-rose-500",
    bg: "bg-rose-50",
    badge: "New",
  },
  {
    title: "Social Media Resizer",
    desc: "Auto-crop and pad images for Instagram, LinkedIn, and YouTube without losing edges. Includes smart blur backgrounds.",
    icon: <Crop size={28} />,
    path: "/social-media-imagetool",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    title: "Bulk Photo Resizer",
    desc: "Resize up to 50 images at once. Define multiple target dimensions and download everything in a clean ZIP file.",
    icon: <Layers size={28} />,
    path: "/bulk-photo-resizer",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    title: "Image Compressor",
    desc: "Reduce file sizes by up to 80% while maintaining crisp visual quality. Perfect for boosting website SEO and load speeds.",
    icon: <Minimize2 size={28} />,
    path: "/image-compressor-tool",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Image to PDF",
    desc: "Combine multiple receipts, screenshots, or portfolio photos into a single secure PDF document instantly.",
    icon: <FileText size={28} />,
    path: "/image-to-pdf-tool",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "YT Thumbnail Downloader",
    desc: "Extract and download high-resolution (HD & 4K) thumbnails directly from any YouTube video instantly.",
    icon: <Youtube size={28} />,
    path: "/youtube-thumbnail-downloader",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    title: "Case Converter",
    desc: "Change text to UPPERCASE, lowercase, or Title Case instantly. Includes a live word and character counter for quick editing.",
    icon: <Type size={28} />,
    path: "/case-converter",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    title: "Merge PDF",
    desc: "Securely combine multiple PDF files into one document instantly. 100% offline processing.",
    icon: <Combine size={28} />,
    path: "/merge-pdf",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <SeoHead
        title="SnapSizes - Free Online Image Tools (Privacy-First)"
        description="Resize, compress, and convert images online for free. Create professional marriage biodata instantly. 100% browser-based privacy."
        canonical="https://snapsizes.vercel.app/"
        customFaqs={homeFaqs}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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
            Professional Web Tools <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">
              Without the Privacy Risk
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            SnapSizes processes your data entirely on your device. Whether
            resizing photos or creating a sensitive marriage biodata, your
            information never leaves your browser.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-bold text-slate-300">
            <span className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700/50">
              <ShieldCheck size={18} className="text-emerald-400" /> Zero-Upload
              Architecture
            </span>
            <span className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700/50">
              <Zap size={18} className="text-amber-400" /> Browser-Side
              Processing
            </span>
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

              {tool.badge && (
                <div className="absolute top-4 right-4 bg-amber-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded-md z-20 shadow-sm">
                  {tool.badge}
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${tool.bg} ${tool.color}`}
                >
                  {tool.icon}
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3 uppercase tracking-tight">
                  {tool.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-1 font-medium">
                  {tool.desc}
                </p>
                <div className="flex items-center text-sm font-bold text-amber-500 group-hover:text-amber-600 transition-colors mt-auto uppercase tracking-wider">
                  Launch Tool{" "}
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* --- SEO ARTICLE & PERSONA GRID --- */}
      <article className="bg-white border-t border-slate-200 py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight text-center uppercase">
              The Complete Suite for Online Optimization & Utility
            </h2>
            <p className="text-lg text-center max-w-3xl mx-auto mb-20 font-medium">
              SnapSizes is a comprehensive, free online utility platform. Format
              images for social media, compress web assets, or generate a
              professional marriage biodata—all using secure, 100% client-side
              technology.
            </p>

            {/* 🟢 THE UPGRADED "BUILT FOR" GRID (REPLACED GENERIC BULLETS) */}
            <section className="mb-24 not-prose">
              <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight text-center uppercase">
                Engineered for the Modern Digital Workflow
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Persona 1: Privacy Seekers */}
                <div className="bg-rose-50/50 p-8 rounded-[2.5rem] border border-rose-100 transition-all hover:shadow-md">
                  <div className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Users size={24} />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-3 uppercase tracking-tight">
                    Privacy-First Families
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-bold opacity-80">
                    Designed for families who need a <em>Marriage Biodata</em>{" "}
                    without the risk of data leakage. Our zero-upload
                    architecture ensures your details never leave your device.
                  </p>
                </div>

                {/* Persona 2: Creators */}
                <div className="bg-amber-50/50 p-8 rounded-[2.5rem] border border-amber-100 transition-all hover:shadow-md">
                  <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Zap size={24} />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-3 uppercase tracking-tight">
                    Content Creators
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-bold opacity-80">
                    Built for YouTubers demand precision. Auto-crop images to
                    exact platform aspect ratios bypassing the slow processing
                    times of cloud-based editors.
                  </p>
                </div>

                {/* Persona 3: Technical SEOs */}
                <div className="bg-indigo-50/50 p-8 rounded-[2.5rem] border border-indigo-100 transition-all hover:shadow-md">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <ShieldCheck size={24} />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-3 uppercase tracking-tight">
                    SEO Specialists
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-bold opacity-80">
                    Optimized for developers aiming for{" "}
                    <strong>100/100 Core Web Vitals</strong>. Reduce payload
                    weights by up to 80% ensuring lightning-fast load speeds.
                  </p>
                </div>
              </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <div className="mt-20 border-t border-slate-100 pt-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight text-center uppercase">
                Frequently Asked Questions
              </h3>
              <div className="grid gap-6 not-prose">
                {[
                  {
                    q: "Is SnapSizes really free to use?",
                    a: "Yes. SnapSizes is a completely free online utility. No hidden costs or watermarks.",
                  },
                  {
                    q: "Is the Marriage Biodata Maker secure?",
                    a: "Absolutely. Your personal details are never uploaded. We use local JavaScript processing, so your data stays on your device.",
                  },
                  {
                    q: "Does SnapSizes work on mobile devices?",
                    a: "Yes. The entire SnapSizes platform is fully responsive and designed to work on all modern mobile and desktop browsers.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
                  >
                    <h4 className="font-bold text-slate-900 mb-2">{item.q}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      {item.a}
                    </p>
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
