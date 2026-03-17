import React from "react";
import { ShieldCheck, Zap, Globe, Heart, ArrowRight, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SeoHead 
        title="About SnapSizes - The Private Alternative to Online Image Editors"
        description="Learn why SnapSizes is the safest choice for image optimization. Compare us with traditional online tools and discover the power of client-side processing."
        canonical="https://snapsizes.vercel.app/about"
      />

      {/* --- HERO SECTION --- */}
      <header className="bg-slate-900 pt-20 pb-24 px-4 text-center text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Our Mission: <span className="text-blue-500">Privacy First.</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            SnapSizes was built by a developer in Patna, India, who was tired of online tools 
            harvesting user data. We believe your images should stay on your device.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-20">
        
        {/* --- THE COMPARISON TABLE (SEO Powerhouse) --- */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">SnapSizes vs. Traditional Online Tools</h2>
            <p className="text-slate-500">How we compare to popular cloud-based image converters.</p>
          </div>

          

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-6 text-sm font-black uppercase tracking-wider text-slate-400">Feature</th>
                  <th className="p-6 text-sm font-black uppercase tracking-wider text-amber-500">SnapSizes</th>
                  <th className="p-6 text-sm font-black uppercase tracking-wider text-slate-400">Others (Cloud-Based)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-6 font-bold">Data Privacy</td>
                  <td className="p-6 text-emerald-600 flex items-center gap-2 font-bold"><Check size={18}/> 100% Local</td>
                  <td className="p-6 text-slate-400 flex items-center gap-2"><X size={18}/> Uploaded to Server</td>
                </tr>
                <tr>
                  <td className="p-6 font-bold">Processing Speed</td>
                  <td className="p-6 text-emerald-600 flex items-center gap-2 font-bold"><Check size={18}/> Instant (No Upload)</td>
                  <td className="p-6 text-slate-400 flex items-center gap-2"><X size={18}/> Slow Upload/Download</td>
                </tr>
                <tr>
                  <td className="p-6 font-bold">Batch Limits</td>
                  <td className="p-6 text-emerald-600 flex items-center gap-2 font-bold"><Check size={18}/> Up to 50 (Free)</td>
                  <td className="p-6 text-slate-400 flex items-center gap-2"><X size={18}/> Limited to 5-10</td>
                </tr>
                <tr>
                  <td className="p-6 font-bold">Login Required?</td>
                  <td className="p-6 text-emerald-600 flex items-center gap-2 font-bold"><Check size={18}/> No account needed</td>
                  <td className="p-6 text-slate-400 flex items-center gap-2"><X size={18}/> Often forced signup</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- TECHNICAL EXPLANATION --- */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight">How it works technically</h2>
            <p className="text-slate-600 leading-relaxed">
              We leverage <strong>Client-Side Processing</strong>. This means when you select an image, 
              our React-based engine creates a virtual canvas inside your browser's RAM.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Using the <strong>HTML5 Canvas API</strong> and optimized JavaScript, we perform the 
              resizing, rotation, and compression locally. Because the file never travels across 
              the internet, it is mathematically impossible for us to "see" your data.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold shadow-sm">
                <Zap size={14} className="text-amber-500" /> WebAssembly Optimized
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold shadow-sm">
                <ShieldCheck size={14} className="text-emerald-500" /> Zero-Telemetry
              </div>
            </div>
          </div>
          <div className="bg-amber-500 rounded-3xl p-10 text-white shadow-2xl shadow-blue-200 relative overflow-hidden group">
             <Globe size={200} className="absolute -right-20 -bottom-20 text-white/10 group-hover:scale-110 transition-transform duration-700" />
             <h3 className="text-2xl font-bold mb-4 relative z-10">Safe for Enterprise</h3>
             <p className="text-blue-100 leading-relaxed relative z-10">
               SnapSizes is the preferred choice for government employees, healthcare workers, 
               and designers handling sensitive NDAs. Your privacy is not a feature; it's our core architecture.
             </p>
          </div>
        </div>

        {/* --- CALL TO ACTION --- */}
        <section className="text-center bg-slate-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
          <div className="relative z-10">
            <Heart className="mx-auto text-rose-500 mb-6" size={48} fill="currentColor" />
            <h2 className="text-3xl font-black mb-4">Support Independent Devs</h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
              SnapSizes is a solo project. If this tool helped you save time and stay secure, 
              consider supporting its continued development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/donate" className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black hover:bg-slate-100 transition-all flex items-center gap-2">
                Buy me a Coffee <ArrowRight size={20}/>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}