import React from "react";
import { Link } from "react-router-dom";
import { 
  Cookie, CheckCircle2, XCircle, Shield, 
  Globe, Settings, ArrowRight 
} from "lucide-react";
import SeoHead from "../components/SeoHead";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <SeoHead
        title="Cookie Policy - How We Use Data | SnapSizes"
        description="Understand how SnapSizes uses cookies. We only use essential cookies for functionality and third-party cookies via Google AdSense for advertising."
        canonical="https://snapsizes.vercel.app/cookie-policy"
      />

      {/* --- HERO SECTION --- */}
      <header className="bg-slate-900 pt-16 pb-24 px-4 text-center text-white relative overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] bg-amber-500 rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Cookie size={14} className="text-amber-300" /> Transparent Data Practices
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Cookie Policy</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Last Updated: January 30, 2026
          </p>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-225 mx-auto px-4 lg:px-8 -mt-12 relative z-20">
        
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-slate-200/40 border border-slate-200">
          
          {/* Core Approach Callout */}
          <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 mb-12 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <div className="w-16 h-16 bg-white text-amber-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-amber-100">
              <Shield size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3">Our Approach to Cookies</h2>
              <p className="text-slate-700 leading-relaxed m-0">
                Cookies are small text files stored on your device to help websites remember you. At SnapSizes, we keep things incredibly simple and transparent. We only use cookies to keep the site functioning properly and to serve non-intrusive ads that keep our tools free. <strong>We do not use cookies to spy on your files or track your personal identity.</strong>
              </p>
            </div>
          </div>

          {/* 🟢 COOKIE TYPES GRID */}
          <div className="grid md:grid-cols-3 gap-6 py-8 border-y border-slate-100 mb-12">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
              <div className="w-12 h-12 bg-white text-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-sm border border-emerald-100">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Essential Cookies</h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Strictly necessary for the website to function (e.g., remembering your dark mode preference or UI state). These cannot be disabled.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
              <div className="w-12 h-12 bg-white text-amber-500 rounded-xl flex items-center justify-center mb-4 shadow-sm border border-amber-100">
                <Globe size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Advertising (AdSense)</h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Used by Google to serve personalized or non-personalized ads based on your browsing history across the internet.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
              <div className="w-12 h-12 bg-white text-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-sm border border-indigo-100">
                <XCircle size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">No File Tracking</h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                We do <strong>not</strong> use cookies to track the images you process. Your image data is processed in local RAM and never leaves your device.
              </p>
            </div>
          </div>

          <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
            
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">How Google AdSense Uses Cookies</h2>
            <p>
              SnapSizes relies on Google AdSense to display advertisements, which helps us pay for server costs and keep our tools 100% free. 
            </p>
            <ul className="space-y-2 mt-4 mb-8">
              <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.</li>
              <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our site and/or other sites on the Internet.</li>
              <li>These cookies do not contain personally identifiable information (PII) such as your name, address, or email.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mt-12 mb-6 flex items-center gap-3">
              <Settings className="text-slate-500" size={28} /> How to Control Your Cookies
            </h2>
            <p>
              You have complete control over how cookies are stored on your device. Here is how you can manage them:
            </p>
            
            <div className="space-y-6 mt-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">1. Google Ad Settings</h3>
                <p className="text-sm text-slate-700 m-0">
                  You can opt out of personalized advertising completely by visiting the <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-amber-600 font-bold hover:underline">Google Ad Settings</a> page. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://optout.aboutads.info" target="_blank" rel="noreferrer" className="text-amber-600 font-bold hover:underline">www.aboutads.info</a>.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">2. Browser Settings</h3>
                <p className="text-sm text-slate-700 m-0">
                  Most web browsers allow you to control cookies through their settings preferences. You can configure your browser to reject all cookies or to notify you when a cookie is set. However, please note that disabling essential cookies may cause some features of SnapSizes to function improperly.
                </p>
              </div>
            </div>

            {/* CTA Block */}
            <div className="bg-slate-900 text-white rounded-4xl p-8 mt-16 text-center shadow-xl not-prose">
              <h3 className="text-2xl font-bold mb-4 text-white">Still have questions?</h3>
              <p className="text-slate-300 mb-8 max-w-md mx-auto text-sm">
                If you have any questions or concerns regarding our Cookie Policy, please reach out to our support team.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-amber-900/20 hover:bg-amber-400 transition-colors"
              >
                Contact Support <ArrowRight size={18} />
              </Link>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}