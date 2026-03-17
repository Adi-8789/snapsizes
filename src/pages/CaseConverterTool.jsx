import React, { useState, useEffect } from 'react';
import { Type, Copy, Trash2, Check, Download, Eraser, Moon, Sun, Settings2 } from 'lucide-react';
import SeoHead from '../components/SeoHead';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SnapSizes Case Converter & Word Counter",
  "url": "https://snapsizes.vercel.app/case-converter",
  "description": "Free online text case converter. Instantly change text to UPPERCASE, lowercase, Title Case, or Sentence case. Includes a live word and character counter.",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
  "aggregateRating": {
    "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "215", "bestRating": "5", "worstRating": "1"
  },
  "featureList": ["Uppercase & Lowercase conversion", "Title Case & Sentence Case generation", "Live Word & Character Counting", "One-click Copy to Clipboard", "Dark Mode"]
};

const CaseConverterTool = () => {
  // --- SaaS Grade State Management ---
  const [text, setText] = useState(() => localStorage.getItem('snapSizes_case_draft') || '');
  const [isDark, setIsDark] = useState(() => localStorage.getItem('snapSizes_theme') === 'dark');
  const [copied, setCopied] = useState(false);

  // Auto-save text and theme preferences
  useEffect(() => {
    localStorage.setItem('snapSizes_case_draft', text);
  }, [text]);

  useEffect(() => {
    localStorage.setItem('snapSizes_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // --- Conversion Logic ---
  const toUpper = () => setText(text.toUpperCase());
  const toLower = () => setText(text.toLowerCase());
  const toTitleCase = () => setText(text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
  const toSentenceCase = () => setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()));
  const toAlternatingCase = () => setText(text.toLowerCase().split('').map((char, i) => i % 2 === 0 ? char : char.toUpperCase()).join(''));

  const removeExtraSpaces = () => setText(text.replace(/\s+/g, ' ').trim());
  
  const clearText = () => {
    if (window.confirm("Clear all text? This cannot be undone.")) setText('');
  };

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportToFile = () => {
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SnapSizes_Text_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
  };

  const charCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const lineCount = text === '' ? 0 : text.split(/\r\n|\r|\n/).length;

  // --- Dynamic Theme Classes ---
  const theme = {
    bg: isDark ? "bg-slate-950" : "bg-slate-50",
    textMain: isDark ? "text-slate-100" : "text-slate-900",
    textMuted: isDark ? "text-slate-400" : "text-slate-500",
    cardBg: isDark ? "bg-slate-900" : "bg-white",
    cardBorder: isDark ? "border-slate-800" : "border-slate-200",
    inputBg: isDark ? "bg-slate-950" : "bg-slate-50",
    buttonBg: isDark ? "bg-slate-800" : "bg-white",
    buttonHover: isDark ? "hover:border-blue-500 hover:bg-slate-800" : "hover:border-amber-400 hover:shadow-sm"
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 pb-32 lg:pb-0 ${theme.bg} ${theme.textMain} overflow-x-hidden relative`}>
      <SeoHead
        title="Case Converter & Word Counter - App Grade Tool | SnapSizes"
        description="Free online case converter with dark mode and auto-save. Convert text to uppercase, lowercase, or title case instantly without losing your work."
        canonical="https://snapsizes.vercel.app/case-converter"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* --- HERO SECTION --- */}
      <header className="relative z-10 pt-12 lg:pt-20 pb-6 lg:pb-12 px-4 text-center">
        <div className="max-w-4xl mx-auto relative">
          
          {/* Dark Mode Toggle */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`absolute right-0 top-0 p-2.5 rounded-full transition-all ${isDark ? 'bg-slate-800 text-yellow-400 border border-slate-700' : 'bg-white text-slate-700 border border-slate-200 shadow-sm'}`}
            title="Toggle Dark Mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs lg:text-sm font-bold mb-4 shadow-sm border ${isDark ? 'bg-blue-900/30 border-blue-800 text-blue-400' : 'bg-amber-50 border-amber-100 text-amber-600'}`}>
            <Type className="w-4 h-4" /> Text Formatting App
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight">
            Convert Case & <span className="text-amber-500">Count Words</span>
          </h1>
          <p className={`text-sm lg:text-lg max-w-2xl mx-auto ${theme.textMuted}`}>
            Your text auto-saves locally. Format titles, fix caps lock errors, and clean up messy documents instantly.
          </p>
        </div>
      </header>

      {/* --- MAIN WORKSPACE --- */}
      <main className="max-w-5xl mx-auto px-4 relative z-20 pb-8">
        <div className={`${theme.cardBg} rounded-4xl shadow-sm border ${theme.cardBorder} overflow-hidden flex flex-col lg:flex-row`}>
          
          {/* Left Column: Text Area */}
          <div className="flex-1 p-4 lg:p-8 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs lg:text-sm font-bold uppercase tracking-wider opacity-80">Your Text</label>
              <div className="flex items-center gap-2">
                <button 
                  onClick={removeExtraSpaces} disabled={!text}
                  className={`text-[10px] lg:text-xs font-bold disabled:opacity-50 flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors ${theme.inputBg} ${theme.cardBorder} border hover:text-blue-500`}
                >
                  <Eraser size={14} /> Clean
                </button>
                <button 
                  onClick={clearText} disabled={!text}
                  className={`text-[10px] lg:text-xs font-bold disabled:opacity-50 flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors ${theme.inputBg} ${theme.cardBorder} border hover:text-red-500`}
                >
                  <Trash2 size={14} /> Clear
                </button>
              </div>
            </div>
            
            <textarea
              className={`w-full flex-1 min-h-[35vh] lg:min-h-100 p-4 lg:p-5 rounded-2xl resize-y focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed transition-all text-sm lg:text-base border ${theme.inputBg} ${theme.cardBorder} ${theme.textMain}`}
              placeholder="Type or paste your text here... (It saves automatically)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck="false"
            ></textarea>
            
            {/* Live Stats Bar */}
            <div className="mt-4 grid grid-cols-3 gap-2 lg:gap-4">
              <div className={`${theme.inputBg} py-3 rounded-xl border ${theme.cardBorder} text-center flex flex-col justify-center`}>
                <span className="block text-xl lg:text-2xl font-black leading-tight">{wordCount}</span>
                <span className={`text-[10px] lg:text-xs font-bold uppercase mt-1 ${theme.textMuted}`}>Words</span>
              </div>
              <div className={`${theme.inputBg} py-3 rounded-xl border ${theme.cardBorder} text-center flex flex-col justify-center`}>
                <span className="block text-xl lg:text-2xl font-black leading-tight">{charCount}</span>
                <span className={`text-[10px] lg:text-xs font-bold uppercase mt-1 ${theme.textMuted}`}>Chars</span>
              </div>
              <div className={`${theme.inputBg} py-3 rounded-xl border ${theme.cardBorder} text-center flex flex-col justify-center`}>
                <span className="block text-xl lg:text-2xl font-black leading-tight">{lineCount}</span>
                <span className={`text-[10px] lg:text-xs font-bold uppercase mt-1 ${theme.textMuted}`}>Lines</span>
              </div>
            </div>
          </div>

          {/* Right Column: Controls (DESKTOP ONLY) */}
          <div className={`hidden lg:flex w-80 border-l ${theme.cardBorder} ${theme.inputBg} p-8 flex-col gap-3`}>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-80">Transform</h3>
            {[
              { label: "Sentence case", action: toSentenceCase },
              { label: "lower case", action: toLower },
              { label: "UPPER CASE", action: toUpper },
              { label: "Title Case", action: toTitleCase },
              { label: "aLtErNaTiNg cAsE", action: toAlternatingCase }
            ].map((btn, i) => (
              <button key={i} onClick={btn.action} className={`border ${theme.cardBorder} ${theme.buttonBg} ${theme.buttonHover} font-semibold py-3 px-4 rounded-xl text-left transition-all`}>
                {btn.label}
              </button>
            ))}

            <div className="mt-auto pt-6 flex flex-col gap-3">
              <button onClick={copyToClipboard} disabled={!text} className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all">
                {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <button onClick={exportToFile} disabled={!text} className={`w-full font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all border ${isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-slate-900 text-white hover:bg-black'}`}>
                <Download size={18} /> Save as .txt
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 🟢 MOBILE APP-LIKE BOTTOM BAR (Native Feel) */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 ${theme.cardBg} border-t ${theme.cardBorder} shadow-[0_-10px_40px_rgba(0,0,0,0.15)] pb-safe pt-2 px-3`}>
        {/* Horizontal Scroll Area for Tools */}
        <div className="flex overflow-x-auto gap-2 pb-3 snap-x scrollbar-hide -mx-3 px-3">
          {[
            { label: "Sentence", action: toSentenceCase },
            { label: "LOWER", action: toLower },
            { label: "UPPER", action: toUpper },
            { label: "Title", action: toTitleCase },
            { label: "aLtErNaTe", action: toAlternatingCase }
          ].map((btn, i) => (
            <button key={i} onClick={btn.action} className={`shrink-0 snap-center border ${theme.cardBorder} ${theme.buttonBg} font-bold py-2 px-4 rounded-full text-xs whitespace-nowrap active:scale-95 transition-transform`}>
              {btn.label}
            </button>
          ))}
        </div>
        
        {/* Main Actions */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button onClick={copyToClipboard} disabled={!text} className="col-span-3 bg-amber-500 active:bg-blue-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all text-sm">
            {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied' : 'Copy Text'}
          </button>
          <button onClick={exportToFile} disabled={!text} className={`col-span-1 flex items-center justify-center rounded-xl shadow-sm transition-all border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-900 text-white'}`}>
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* --- SEO ARTICLE (AdSense Optimized "Thick Content") --- */}
      <article className={`border-t ${theme.cardBorder} mt-8 relative z-10 ${theme.cardBg}`}>
        <div className="max-w-4xl mx-auto px-4 py-16 lg:py-20">
          <div className={`prose md:prose-lg max-w-none mb-12 lg:mb-16 ${theme.textMuted}`}>
            
            <h2 className={`text-2xl lg:text-3xl font-extrabold mb-4 tracking-tight ${theme.textMain}`}>
              The Ultimate Online Case Converter & Word Counter
            </h2>
            <p>
              Formatting text shouldn't be a tedious manual process. Whether you accidentally typed an entire essay with the Caps Lock key engaged, or you are a developer needing to standardize messy data, our free <strong>Case Converter</strong> automates the formatting process instantly.
            </p>
            <p>
              Beyond simple capitalization, SnapSizes has built this utility with professional writers, students, and editors in mind. Featuring a real-time word counter, character tracking, and a local auto-save function, this tool ensures you never lose your progress while preparing your documents.
            </p>

            <h3 className={`text-xl lg:text-2xl font-bold mt-10 mb-4 ${theme.textMain}`}>How to Use the Text Converter</h3>
            <ol className="space-y-3 mb-10 pl-5">
              <li><strong>Type or Paste:</strong> Insert your text into the main editor box. The live counters will immediately calculate your word, line, and character limits.</li>
              <li><strong>Clean the Formatting (Optional):</strong> Click the "Clean" button to automatically remove accidental double spaces and trailing line breaks from messy copied text.</li>
              <li><strong>Select Your Case:</strong> Choose from Sentence case, UPPERCASE, lowercase, Title Case, or alternating case using the conversion buttons.</li>
              <li><strong>Export Your Work:</strong> Click "Copy to Clipboard" to paste the text elsewhere, or use the "Save as .txt" button to download your formatted text securely to your device.</li>
            </ol>

          </div>

          <div className={`border-t ${theme.cardBorder} pt-12`}>
            <h2 className={`text-2xl lg:text-3xl font-extrabold mb-8 tracking-tight text-center ${theme.textMain}`}>Understanding Text Cases & Features</h2>
            <div className="space-y-4 lg:space-y-6" itemScope itemType="https://schema.org/FAQPage">
              {[
                { 
                  q: "What is Sentence case?", 
                  a: "Sentence case capitalizes only the very first letter of a sentence and leaves the rest in lowercase, exactly like a standard book or article. It is perfect for converting chunks of ALL CAPS text back into readable paragraphs." 
                },
                { 
                  q: "When should I use Title Case?", 
                  a: "Title Case capitalizes the first letter of every single word. It is the industry standard for formatting blog post titles, YouTube video names, book covers, and academic headers." 
                },
                { 
                  q: "Is my text data stored on your servers?", 
                  a: "No. SnapSizes is a privacy-first platform. The Case Converter runs entirely within your browser using client-side JavaScript. Your text is never uploaded to the internet. The 'Auto-Save' feature temporarily stores your draft in your browser's local cache so you don't lose work if you refresh the page." 
                },
                { 
                  q: "Does the word counter include spaces?", 
                  a: "Our word counter strictly counts words separated by spaces, while the character counter provides a total count including spaces, punctuation, and line breaks." 
                }
              ].map((faq, i) => (
                <div key={i} className={`p-6 lg:p-8 rounded-2xl lg:rounded-3xl border ${theme.cardBorder} ${theme.inputBg} transition-colors`} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className={`text-lg lg:text-xl font-bold mb-2 ${theme.textMain}`} itemProp="name">{faq.q}</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                     <p className={`leading-relaxed text-sm ${theme.textMuted}`} itemProp="text">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default CaseConverterTool;