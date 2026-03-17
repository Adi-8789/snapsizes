import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X, ShieldCheck } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay to make it feel smoother
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-100 animate-fade-in-up">
      <div className="max-w-4xl mx-auto bg-slate-900 text-white p-5 md:p-6 rounded-3xl shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-6 relative">
        
        {/* Icon & Text */}
        <div className="flex items-start gap-4 flex-1">
          {/* 🎨 UI UPDATE: Changed text-blue-400 to text-amber-500 */}
          <div className="hidden md:flex w-12 h-12 bg-amber-500/20 text-amber-500 rounded-2xl items-center justify-center shrink-0">
            <Cookie size={24} />
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg flex items-center justify-center md:justify-start gap-2">
              Cookie Settings <ShieldCheck size={16} className="text-emerald-400" />
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed mt-1">
              We use cookies to enhance your experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies as described in our 
              {/* 🔗 LINK UPDATE: Pointed to the Privacy Policy we just created */}
              <Link to="/privacy-policy" className="text-amber-400 hover:text-amber-300 hover:underline ml-1 transition-colors">Privacy Policy</Link>.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-row items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsVisible(false)}
            className="flex-1 md:flex-none px-6 py-3 text-slate-400 hover:text-white font-bold text-sm transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-amber-900/20 transition-all active:scale-95"
          >
            Accept All
          </button>
        </div>

        {/* Close Button (Mobile Only) */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-300 md:hidden"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}