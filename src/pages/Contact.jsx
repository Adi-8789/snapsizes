import React, { useState } from "react";
import { 
  Mail, Clock, MapPin, MessageSquare, 
  Copy, CheckCircle2, Send, Bug, Lightbulb 
} from "lucide-react";
import SeoHead from "../components/SeoHead";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "shankaraditya980@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SeoHead
        title="Contact SnapSizes - Support & Feedback"
        description="Get in touch with the SnapSizes team. We provide support, accept feature requests, and fix bugs for our free image resizing and compression tools."
        canonical="https://snapsizes.vercel.app/contact"
      />

      {/* --- HERO SECTION --- */}
      <header className="bg-slate-900 pt-16 pb-24 px-4 text-center text-white relative overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] bg-amber-500 rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
            <MessageSquare size={14} className="text-blue-300" /> We're Here to Help
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Contact Support</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Have a feature request, a bug report, or just want to say hello? Drop us a line.
          </p>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-275 mx-auto px-4 lg:px-8 -mt-12 mb-20 relative z-20">
        
        {/* Intro Block */}
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-slate-200 mb-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-4">
            How can we assist you today?
          </h2>
          <p className="text-slate-600 leading-relaxed">
            SnapSizes is a community-focused tool built by an independent developer. Your feedback directly influences what we build next. Whether you are struggling to compress a specific file or have an amazing idea for a new utility, we want to hear from you.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          {/* Email Card (Interactive) */}
          <div className="bg-white p-8 rounded-4xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-amber-100">
              <Mail size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Email Support</h3>
            <p className="text-sm text-slate-500 mb-6">For general inquiries and bug reports.</p>
            
            <div className="w-full space-y-3 mt-auto">
              <a 
                href={`mailto:${emailAddress}`}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white px-4 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-amber-600 transition-colors"
              >
                <Send size={16} /> Open Email App
              </a>
              <button 
                onClick={handleCopyEmail}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm border transition-colors ${
                  copied 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {copied ? <><CheckCircle2 size={16}/> Address Copied!</> : <><Copy size={16}/> Copy Address</>}
              </button>
            </div>
          </div>

          {/* Response Time Card */}
          <div className="bg-white p-8 rounded-4xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-amber-100">
              <Clock size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Response Time</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We are a small, independent team. We read every single email and aim to respond to all genuine inquiries within <strong>24 to 48 hours</strong> during standard business days.
            </p>
          </div>

          {/* Location Card */}
          <div className="bg-white p-8 rounded-4xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
              <MapPin size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Location</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Developed, maintained, and operated with ❤️ in:
            </p>
            <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 font-bold text-slate-800 text-sm mt-auto">
              Patna, Bihar, India
            </div>
          </div>

        </div>

        {/* Support Guidelines (Boosts Word Count for AdSense) */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-6">What to include in your message</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-blue-300 flex items-center gap-2 mb-3">
                  <Bug size={20} /> Reporting a Bug
                </h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Which tool were you using? (e.g., Bulk Resizer)</li>
                  <li>• What device and browser are you on? (e.g., Chrome on Android)</li>
                  <li>• A brief description of what went wrong.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2 mb-3">
                  <Lightbulb size={20} /> Requesting a Feature
                </h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• What new tool or feature would make your life easier?</li>
                  <li>• Are there specific social media dimensions we are missing?</li>
                  <li>• How would you use this feature in your workflow?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}