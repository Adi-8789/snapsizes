import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-amber-50 text-amber-500 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
        Error 404
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">Page Not Found</h1>
      <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
        The tool or page you are looking for doesn't exist or has been moved. 
        Don't worry, your images are still safe!
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/" 
          className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-black transition-all"
        >
          <Home size={18} /> Back to Home
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-all"
        >
          <ArrowLeft size={18} /> Go Back
        </button>
      </div>
    </div>
  );
}