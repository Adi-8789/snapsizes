import React, { useState } from "react";
import { Share2, Copy, CheckCircle2 } from "lucide-react";

export default function ShareTool({ toolName }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `SnapSizes - ${toolName}`,
          text: `Check out this free tool to ${toolName.toLowerCase()}!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex flex-col items-center py-12 border-t border-slate-100 mt-16 bg-slate-50/50 rounded-4xl">
      <h3 className="text-lg font-bold text-slate-900 mb-2">Help others find this tool</h3>
      <p className="text-xs text-slate-500 mb-6 px-4 text-center">
        If you found the {toolName} useful, consider sharing it with your team.
      </p>
      
      <div className="flex gap-3">
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-2 bg-amber-500! text-white! px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-blue-200 hover:scale-105 transition-all active:scale-95"
        >
          <Share2 size={16} /> Share Tool
        </button>
        
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border transition-all active:scale-95 ${
            copied 
              ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          {copied ? (
            <><CheckCircle2 size={16} /> Copied</>
          ) : (
            <><Copy size={16} /> Copy Link</>
          )}
        </button>
      </div>
    </div>
  );
}