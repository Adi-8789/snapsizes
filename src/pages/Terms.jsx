import React from "react";
import { Link } from "react-router-dom";
import { 
  Scale, AlertTriangle, FileText, CheckCircle2, 
  Globe, ArrowRight 
} from "lucide-react";
import SeoHead from "../components/SeoHead";

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <SeoHead
        title="Terms of Service - Usage Guidelines | SnapSizes"
        description="Read the Terms of Service for SnapSizes. Understanding your rights, responsibilities, and our liability limitations when using our free image tools."
        canonical="https://snapsizes.vercel.app/terms"
      />

      {/* --- HERO SECTION --- */}
      <header className="bg-slate-900 pt-16 pb-24 px-4 text-center text-white relative overflow-hidden">
        {/* 🎨 UI UPDATE: Subtle background ambient glow updated to Amber */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] bg-amber-500 rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Scale size={14} className="text-amber-300" /> Legal Agreement
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Last Updated: January 30, 2026
          </p>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-225 mx-auto px-4 lg:px-8 -mt-12 relative z-20">
        
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-slate-200/40 border border-slate-200">
          
          <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
            
            <p className="lead text-xl text-slate-800 font-medium mb-8">
              By accessing or using the SnapSizes website (the "Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mt-12 mb-6">1. Service Description & Acceptable Use</h2>
            <p>
              SnapSizes provides free, browser-based image processing utilities, including resizing, cropping, and compression tools. By utilizing our Service, you agree to the following conditions:
            </p>
            <ul className="space-y-3 mt-4 mb-8">
              <li className="flex items-start gap-3">
                {/* 🎨 UI UPDATE: Icons updated to Amber */}
                <CheckCircle2 className="text-amber-500 shrink-0 mt-1" size={20}/>
                <span><strong>Local Processing Acknowledgment:</strong> All file modifications occur locally on your device hardware (Client-Side). We are not responsible for any data loss, browser crashes, or hardware issues that occur during processing.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-amber-500 shrink-0 mt-1" size={20}/>
                <span><strong>Lawful Use:</strong> You agree not to use the Service to process, generate, or distribute illegal content, malware, or material that infringes on the intellectual property rights of others.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-amber-500 shrink-0 mt-1" size={20}/>
                <span><strong>No Automated Abuse:</strong> You agree not to use automated scripts, bots, or scrapers to access the Service in a way that disrupts the experience for human users.</span>
              </li>
            </ul>

            <div className="grid md:grid-cols-3 gap-6 py-8 not-prose">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <div className="w-12 h-12 bg-white text-amber-600 rounded-xl flex items-center justify-center mb-4 shadow-sm border border-amber-100">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Disclaimer of Warranties</h3>
                <p className="text-xs text-slate-600 leading-relaxed m-0">
                  The Service is provided on an "AS IS" and "AS AVAILABLE" basis. SnapSizes makes no warranties, expressed or implied, regarding the reliability, accuracy, or availability of the tools.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <div className="w-12 h-12 bg-white text-red-600 rounded-xl flex items-center justify-center mb-4 shadow-sm border border-red-100">
                  <FileText size={24} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Limitation of Liability</h3>
                <p className="text-xs text-slate-600 leading-relaxed m-0">
                  In no event shall SnapSizes, nor its developers, be liable for any indirect, incidental, special, or consequential damages resulting from your use or inability to use the Service.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <div className="w-12 h-12 bg-white text-amber-500 rounded-xl flex items-center justify-center mb-4 shadow-sm border border-amber-100">
                  <Globe size={24} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Modifications</h3>
                <p className="text-xs text-slate-600 leading-relaxed m-0">
                  We reserve the right to modify or replace these Terms at any time without prior notice. Your continued use of the Service constitutes acceptance of the new Terms.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mt-12 mb-6">2. User Content & Intellectual Property</h2>
            <p>
              SnapSizes does not claim ownership of any images, photographs, or documents you process using our tools. Because processing is handled client-side, you retain 100% of your copyrights and intellectual property rights to your original and processed files.
            </p>
            <p>
              However, the Service itself—including its original code, design, features, and functionality—is and will remain the exclusive property of SnapSizes and its developers.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mt-12 mb-6">3. External Links & Third-Party Ads</h2>
            <p>
              Our Service may contain links to third-party web sites or services that are not owned or controlled by SnapSizes (including advertisements served by Google AdSense). SnapSizes has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. 
            </p>
            <p>
              For more information on how third-party vendors use data on our site, please read our <Link to="/privacy-policy" className="text-amber-600 font-bold hover:underline">Privacy Policy</Link>.
            </p>

            {/* CTA Block */}
            <div className="bg-slate-900 text-white rounded-4xl p-8 mt-16 text-center shadow-xl not-prose">
              <h3 className="text-2xl font-bold mb-4 text-white">Questions about these terms?</h3>
              <p className="text-slate-300 mb-8 max-w-md mx-auto text-sm">
                If you have any questions or concerns regarding our Terms of Service, please reach out to our support team.
              </p>
              <Link 
                to="/contact" 
                
                className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-amber-900/20 hover:bg-amber-400 transition-colors"
              >
                Contact Us <ArrowRight size={18} />
              </Link>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}