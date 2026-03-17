import React from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Globe, CheckCircle2, ServerOff } from "lucide-react";
import SeoHead from "../components/SeoHead";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <SeoHead
        title="Privacy Policy - Zero-Upload Data Security | SnapSizes"
        description="Read the SnapSizes privacy policy. We use client-side processing to ensure your photos never leave your device. Compliant with GDPR, CCPA, and Google AdSense policies."
        canonical="https://snapsizes.vercel.app/privacy-policy"
      />

      {/* --- HERO SECTION --- */}
      <header className="bg-slate-900 pt-16 pb-24 px-4 text-center text-white relative overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] bg-emerald-500 rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Shield size={14} className="text-emerald-300" /> Transparent & Secure
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Last Updated: January 30, 2026
          </p>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-225 mx-auto px-4 lg:px-8 -mt-12 relative z-20">
        
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-slate-200/40 border border-slate-200">
          
          {/* Core Promise Callout */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 mb-12 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <div className="w-16 h-16 bg-white text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
              <ServerOff size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3">Our Core Promise</h2>
              <p className="text-slate-700 leading-relaxed m-0">
                At SnapSizes, privacy is not an option—it is the default. Unlike traditional online tools, we have architected our platform to operate without cloud-based processing for your files. <strong>We cannot see, store, or sell your images because they never touch our servers.</strong>
              </p>
            </div>
          </div>

          <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
            
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mt-12 mb-6">1. Client-Side Processing (Technical Details)</h2>
            <p>
              SnapSizes utilizes modern web technologies like <strong>WebAssembly</strong> and <strong>HTML5 Canvas</strong> to process images directly within your web browser.
            </p>
            <ul className="space-y-3 mt-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={20}/>
                <span><strong>No Uploads:</strong> When you select a file using our tools, it remains entirely in your device's local RAM.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={20}/>
                <span><strong>Zero Retention:</strong> Because we do not use a backend server for image processing, it is physically impossible for us to retain, view, or copy your data.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={20}/>
                <span><strong>Instant Deletion:</strong> All temporary cache data in your browser is wiped instantly when you close the tab or refresh the page.</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mt-12 mb-6">2. Information We Collect</h2>
            <p>
              Because SnapSizes does not require user accounts or registrations, we do not collect personal identifying information such as names, email addresses, or phone numbers. However, to maintain the health and security of our website, we do collect standard non-personal logs:
            </p>
            <ul className="mt-4 mb-8">
              <li><strong>Log Files:</strong> Like almost all websites, we use standard server log files. This includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamps, referring/exit pages, and possibly the number of clicks. This information is used strictly to analyze trends, administer the site, track user movement on the website, and gather demographic information. This data is not linked to any information that is personally identifiable.</li>
            </ul>

            {/* 🟢 CRITICAL ADSENSE SECTION */}
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mt-12 mb-6 flex items-center gap-3">
              <Globe className="text-blue-500" size={28} /> 3. Cookies and Google AdSense
            </h2>
            <p>
              To keep SnapSizes free for everyone, we use third-party advertising companies to serve ads when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
            </p>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 my-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Lock size={18} className="text-slate-500"/> Google DoubleClick DART Cookie
              </h3>
              <p className="text-sm text-slate-700 m-0">
                Google is one of the third-party vendors on our site. It uses cookies, specifically known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. 
                <br/><br/>
                However, visitors may choose to decline the use of DART cookies and opt-out of personalized advertising by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" className="text-amber-500 font-bold hover:underline">policies.google.com/technologies/ads</a>.
              </p>
            </div>

            <p>
              Some of our advertising partners may use cookies and web beacons on our site. Each of our advertising partners has their own Privacy Policy for their policies on user data. We have no access to or control over these cookies that are used by third-party advertisers.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mt-12 mb-6">4. CCPA & GDPR Data Protection Rights</h2>
            <p>
              We want to make sure you are fully aware of all your data protection rights. Under the GDPR and CCPA, every user is entitled to the following:
            </p>
            <ul className="mt-4 mb-8">
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data. <em>(Note: As we do not collect personal data, we hold none to provide.)</em></li>
              <li><strong>The right to erasure ("Right to be forgotten"):</strong> You have the right to request that we erase your personal data under certain conditions. <em>(Again, we hold no personal data, but this right is respected.)</em></li>
              <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
              <li><strong>The right to object to processing:</strong> You have the right to object to our processing of your personal data.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mt-12 mb-6">5. Children's Information</h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p>
              SnapSizes is a privacy-first, client-side application. <strong>We do not knowingly collect any Personal Identifiable Information from children under the age of 13.</strong> Because no data is ever uploaded to our servers, it is physically impossible for us to hold information about children. Parents can rest assured that no "digital footprint" is created when their children use this tool for school projects.
            </p>

            <div className="bg-slate-900 text-white rounded-4xl p-8 mt-16 text-center shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-white">Questions about this policy?</h3>
              <p className="text-slate-300 mb-8 max-w-md mx-auto">
                If you require more information or have any questions about our privacy practices, please do not hesitate to contact us.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-blue-900/20 hover:bg-amber-500 transition-colors"
              >
                Contact Support
              </Link>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}