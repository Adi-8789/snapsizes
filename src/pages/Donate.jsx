import React, { useState } from "react";
import { 
  Heart, Coffee, Smartphone, Copy, CheckCircle2, 
  ShieldCheck, Zap, Server, Globe, Lock 
} from "lucide-react";
import SeoHead from "../components/SeoHead";

export default function Donate() {
  const [copied, setCopied] = useState(false);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText("shankaraditya980-4@okaxis");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SeoHead
        title="Support SnapSizes - Keep Our Image Tools Free"
        description="Support SnapSizes through voluntary donations. Help us cover server costs and keep our privacy-first image tools 100% free for everyone."
        canonical="https://snapsizes.vercel.app/donate"
      />

      {/* --- HERO SECTION --- */}
      <header className="bg-slate-900 pt-16 pb-24 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] bg-pink-500 rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Heart size={14} className="fill-pink-300" /> Community Supported
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Support Our Mission</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            SnapSizes is built by an independent developer from Patna. Your support helps pay for servers and keeps these tools free, fast, and secure.
          </p>
        </div>
      </header>

      {/* --- MAIN CONTENT (Split Layout) --- */}
      <main className="max-w-275 mx-auto px-4 lg:px-8 -mt-12 mb-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT COLUMN: The Story & Transparency */}
          <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-sm">
                <Coffee size={24} />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Why We Need You</h2>
            </div>
            
            <div className="prose prose-slate text-slate-600 mb-8 leading-relaxed">
              <p>
                SnapSizes was created with a simple goal: to provide creators, developers, and photographers with high-quality image utility tools that don't compromise their privacy. 
              </p>
              <p>
                Unlike corporate platforms that force you into expensive monthly subscriptions or silently harvest your uploaded photos to train AI models, we process everything locally on your device. However, running a fast, globally available website isn't free.
              </p>
            </div>

            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Where Your Money Goes</h3>
            <div className="space-y-4 mb-8">
              {[
                { icon: <Server size={20} className="text-blue-500"/>, title: "Hosting & Infrastructure", desc: "Keeping the website online 24/7 without downtime." },
                { icon: <Globe size={20} className="text-emerald-500"/>, title: "Global CDN", desc: "Ensuring the site loads instantly no matter where you are." },
                { icon: <Zap size={20} className="text-amber-500"/>, title: "Development Time", desc: "Funding the late nights spent coding new features and bug fixes." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: The Payment Card */}
          <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-blue-900/5 border border-slate-200 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-4xl flex items-center justify-center mb-6 shadow-inner">
              <Smartphone size={40} />
            </div>
            
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Buy Me a Coffee</h3>
            <div className="flex items-center justify-center gap-1.5 text-slate-500 mb-8 text-sm font-medium">
              <Lock size={14} className="text-emerald-500"/> Secure UPI Transfer
            </div>

            {/* QR Code Frame */}
            <div className="bg-white p-4 rounded-3xl border-2 border-dashed border-slate-200 shadow-sm mb-8 inline-block relative group">
              <img
                src="/upi-qr.jpg" 
                alt="Scan to Donate via UPI using GPay, PhonePe, or Paytm"
                className="w-full max-w-45 h-auto rounded-xl mx-auto mix-blend-multiply"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
                Scan with any App
              </div>
            </div>

            {/* Copyable UPI ID */}
            <div className="w-full max-w-sm mt-4">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-left">Or Pay to UPI ID</label>
              <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 focus-within:border-blue-400 transition-colors">
                <code className="flex-1 text-slate-700 font-bold text-sm bg-transparent px-3 py-2 select-all overflow-hidden text-ellipsis">
                  shankaraditya980-4@okaxis
                </code>
                <button 
                  onClick={handleCopyUPI}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shrink-0 ${
                    copied ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                  aria-label="Copy UPI ID"
                >
                  {copied ? <><CheckCircle2 size={16}/> Copied</> : <><Copy size={16}/> Copy</>}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* --- ADSense Required Legal Disclaimer --- */}
        <div className="mt-12 text-center max-w-2xl mx-auto px-4">
          <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
            <strong>Disclaimer:</strong> SnapSizes is operated by an independent developer. By sending money via the QR code or UPI ID above, you acknowledge that you are making a voluntary gift to support the website's maintenance. These contributions are not tax-deductible charitable donations, and no goods or services will be provided in exchange. We appreciate your generosity!
          </p>
        </div>

      </main>
    </div>
  );
}