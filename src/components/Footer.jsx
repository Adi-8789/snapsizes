import React from "react";
import { Link } from "react-router-dom";
import { Shield, Heart, Zap } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-800 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-block text-3xl font-extrabold text-white tracking-tight mb-4 hover:opacity-90 transition-opacity"
            >
              Snap<span className="text-amber-500">Sizes</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm mb-6">
              Fast, secure, and privacy-focused image tools. All processing
              happens locally in your browser to ensure your data never leaves
              your device.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 shadow-sm">
                <Shield size={14} className="text-emerald-500" /> 100% Secure
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-400 shadow-sm">
                <Zap size={14} className="text-amber-500" /> Client-Side
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-rose-400 shadow-sm">
                <Heart size={14} className="text-rose-500" /> Free Forever
              </span>
            </div>
          </div>

          {/* Tools Links */}
          <div>
            <h4 className="text-white font-bold tracking-wide text-sm uppercase mb-5">
              Tools
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/social-media-imagetool"
                  className="text-sm hover:text-amber-400 hover:translate-x-1 inline-block transition-all"
                >
                  Social Image Resizer
                </Link>
              </li>
              <li>
                <Link
                  to="/bulk-photo-resizer"
                  className="text-sm hover:text-amber-400 hover:translate-x-1 inline-block transition-all"
                >
                  Bulk Photo Resizer
                </Link>
              </li>
              <li>
                <Link
                  to="/image-compressor-tool"
                  className="text-sm hover:text-amber-400 hover:translate-x-1 inline-block transition-all"
                >
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link
                  to="/image-to-pdf-tool"
                  className="text-sm hover:text-amber-400 hover:translate-x-1 inline-block transition-all"
                >
                  Image to PDF Converter
                </Link>
              </li>
              {/* 🟢 NEW TOOL ADDED HERE */}
              <li>
                <Link
                  to="/merge-pdf"
                  className="text-sm hover:text-amber-400 hover:translate-x-1 inline-block transition-all"
                >
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link
                  to="/youtube-thumbnail-downloader"
                  className="text-sm hover:text-amber-400 hover:translate-x-1 inline-block transition-all font-medium text-slate-300"
                >
                  YT Thumbnail Downloader
                </Link>
              </li>
              <li>
                <Link
                  to="/case-converter"
                  className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block text-sm"
                >
                  Case Converter
                </Link>
              </li>
              <li>
                <Link
                  to="/biodata-maker"
                  className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block text-sm"
                >
                  Biodata Maker
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold tracking-wide text-sm uppercase mb-5">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm hover:text-amber-400 hover:translate-x-1 inline-block transition-all"
                >
                  About Us{" "}
                  <span className="text-[10px] bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded ml-1 font-black">
                    Comparison
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm hover:text-amber-400 hover:translate-x-1 inline-block transition-all"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  to="/donate"
                  className="text-sm hover:translate-x-1 inline-block transition-all text-rose-400 hover:text-rose-300 font-medium"
                >
                  Support the Dev
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-bold tracking-wide text-sm uppercase mb-5">
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sm hover:text-amber-400 hover:translate-x-1 inline-block transition-all"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm hover:text-amber-400 hover:translate-x-1 inline-block transition-all"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  className="text-sm hover:text-amber-400 hover:translate-x-1 inline-block transition-all"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {currentYear} SnapSizes. Built for privacy and speed.
          </p>
          <div className="text-xs font-medium px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Designed in Patna, India 🇮🇳
          </div>
        </div>
      </div>
    </footer>
  );
}