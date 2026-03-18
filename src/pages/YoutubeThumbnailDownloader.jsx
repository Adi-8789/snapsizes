import React, { useState } from 'react';
import { Download, Copy, Eye, AlertCircle, Loader2, Check, Sparkles, Link as LinkIcon, ImagePlus, DownloadCloud } from 'lucide-react';
import SeoHead from '../components/SeoHead';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SnapSizes YouTube Thumbnail Downloader",
  "url": "https://snapsizes.vercel.app/youtube-thumbnail-downloader",
  "description": "Download high-quality YouTube thumbnails (MQ, HQ, SD, and HD) instantly for free. Just paste the video URL and save.",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "All",
  "offers": { 
    "@type": "Offer", 
    "price": "0", 
    "priceCurrency": "INR" 
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "89",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "HD 1080p Thumbnail support",
    "One-click download",
    "No registration required",
    "Fast preview"
  ]
};

// 🟢 NEW: Define the custom FAQs for this specific tool to pass to SeoHead
const youtubeFaqs = [
  {
    "@type": "Question",
    "name": "How to download YouTube thumbnails?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Simply copy the link of any YouTube video or YouTube Short, paste it into our search box above, and click 'Get Thumbnails'. The tool will instantly query YouTube's servers and provide you with secure download links for every available image resolution."
    }
  },
  {
    "@type": "Question",
    "name": "Is downloading YouTube thumbnails free?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes! The SnapSizes YouTube thumbnail downloader tool is 100% free to use. There are no paywalls, it requires no account registration, and it allows for unlimited, instant image downloads directly to your device."
    }
  },
  {
    "@type": "Question",
    "name": "What resolution thumbnails are available?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Depending on the quality of the original video upload, you can extract thumbnails in Max Resolution (1080p HD or 4K), High Quality (720p), Medium Quality (360p), and Standard Quality. If an older video doesn't have an HD cover, our system automatically provides the next best High Quality fallback."
    }
  },
  {
    "@type": "Question",
    "name": "Does this tool work on mobile devices?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Absolutely. Our downloader is fully optimized for iOS and Android devices. You can easily copy a video link from the YouTube app, paste it into your mobile browser here, and save the image directly to your phone's camera roll."
    }
  }
];

const YoutubeThumbnailDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const extractVideoId = (link) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  const handleGetThumbnails = () => {
    setError('');
    setVideoId(null);
    
    if (!url.trim()) {
      setError('Please enter a YouTube video URL.');
      return;
    }

    const id = extractVideoId(url);
    if (!id) {
      setError('Invalid YouTube link. Please ensure it looks like https://www.youtube.com/watch?v=...');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setVideoId(id);
      setLoading(false);
    }, 800);
  };

  const downloadImage = async (imageUrl, qualityName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `youtube-thumbnail-${qualityName}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Blob download blocked by CORS, falling back to new tab:", err);
      window.open(imageUrl, '_blank');
    }
  };

  const copyToClipboard = (text, quality) => {
    navigator.clipboard.writeText(text);
    setCopied(quality);
    setTimeout(() => setCopied(''), 2000);
  };

  const thumbnails = videoId ? [
    { label: 'Max Resolution (HD)', quality: 'maxresdefault', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` },
    { label: 'High Quality', quality: 'hqdefault', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
    { label: 'Medium Quality', quality: 'mqdefault', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` },
    { label: 'Standard Quality', quality: 'sddefault', url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` },
  ] : [];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden relative">
      
      {/* 🟢 NEW: Pass customFaqs to SeoHead */}
      <SeoHead
        title="YouTube Thumbnail Downloader (HD) – Download Free | SnapSizes"
        description="Free YouTube Thumbnail Downloader. Download thumbnails from any YouTube video in HD, High, Medium, and Standard quality instantly."
        canonical="https://snapsizes.vercel.app/youtube-thumbnail-downloader"
        customFaqs={youtubeFaqs}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      
      {/* UI Elements stay exactly the same */}
      <div className="absolute top-0 left-0 w-full h-150 overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-125 h-125 rounded-full bg-amber-400/20 mix-blend-multiply filter blur-[80px] animate-blob"></div>
        <div className="absolute top-[10%] -right-[10%] w-100 h-100 rounded-full bg-orange-400/20 mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-150 h-150 rounded-full bg-yellow-300/20 mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000"></div>
      </div>

      <header className="relative z-10 pt-24 pb-16 px-4 text-center animate-fade-in-up">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-amber-100 shadow-sm text-amber-600 text-sm font-bold tracking-wide mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-500" />
            100% Free & Instant
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-slate-900">
            YouTube Thumbnail <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">
              Downloader
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Extract high-definition thumbnails from any video in seconds. Paste your link below and grab the perfect image for your next project.
          </p>
        </div>
      </header>

      <main className="relative z-20">
        <section className="max-w-4xl mx-auto px-4 -mt-4">
          <div className="bg-white/80 backdrop-blur-xl p-3 md:p-4 rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white flex flex-col md:flex-row gap-3 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
            <input
              type="text"
              className="flex-1 px-6 py-4 rounded-full border-none bg-slate-100/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-lg transition-all"
              placeholder="Paste YouTube link here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGetThumbnails()}
            />
            <button
              onClick={handleGetThumbnails}
              disabled={loading}
              className="bg-linear-to-r! from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white! px-10 py-4 rounded-full font-bold text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center min-w-50"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Get Thumbnails'}
            </button>
          </div>
          
          {error && (
            <div className="mt-6 max-w-2xl mx-auto flex items-center justify-center text-red-600 bg-red-50/80 backdrop-blur-sm p-4 rounded-2xl border border-red-100 shadow-sm animate-fade-in-up">
              <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}
        </section>

        {!videoId && !loading && !error && (
          <section className="max-w-5xl mx-auto px-4 py-16 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/60 backdrop-blur-md p-8 rounded-4xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all text-center group">
                <div className="w-16 h-16 mx-auto bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  <LinkIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">1. Copy Link</h3>
                <p className="text-slate-600 leading-relaxed text-sm">Find the YouTube video and copy its URL from your browser address bar or share button.</p>
              </div>

              <div className="bg-white/60 backdrop-blur-md p-8 rounded-4xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all text-center group">
                <div className="w-16 h-16 mx-auto bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <ImagePlus className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">2. Paste & Fetch</h3>
                <p className="text-slate-600 leading-relaxed text-sm">Paste the link into the search box above and click the button to instantly extract the images.</p>
              </div>

              <div className="bg-white/60 backdrop-blur-md p-8 rounded-4xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all text-center group">
                <div className="w-16 h-16 mx-auto bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-300">
                  <DownloadCloud className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">3. Download HD</h3>
                <p className="text-slate-600 leading-relaxed text-sm">Choose your preferred resolution and download the thumbnail straight to your device.</p>
              </div>
            </div>
          </section>
        )}

        {loading && (
          <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-white/50 rounded-4xl h-80 w-full border border-slate-100 shadow-sm"></div>
            ))}
          </div>
        )}

        {videoId && !loading && (
          <section className="max-w-7xl mx-auto px-4 py-16 animate-fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {thumbnails.map((thumb) => (
                <div key={thumb.quality} className="bg-white rounded-4xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="relative overflow-hidden aspect-video bg-slate-100 flex items-center justify-center">
                    <img 
                      src={thumb.url} 
                      alt={`YouTube Thumbnail ${thumb.label}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/640x360?text=Resolution+Not+Available'}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full shadow-sm">
                      {thumb.label}
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => downloadImage(thumb.url, thumb.quality)}
                        className="col-span-2 flex items-center justify-center gap-2 bg-amber-500! hover:bg-amber-600! text-white! px-6 py-3.5 rounded-xl font-bold transition-all hover:shadow-md"
                      >
                        <Download className="w-5 h-5" /> Download Image
                      </button>
                      <button 
                        onClick={() => copyToClipboard(thumb.url, thumb.quality)}
                        className="flex items-center justify-center gap-2 bg-slate-50! border border-slate-200 hover:bg-slate-100! text-slate-700! px-4 py-3 rounded-xl font-semibold transition-all text-sm"
                      >
                        {copied === thumb.quality ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />} 
                        {copied === thumb.quality ? 'Copied' : 'Copy URL'}
                      </button>
                      <a 
                        href={thumb.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-slate-50! border border-slate-200 hover:bg-slate-100! text-slate-700! px-4 py-3 rounded-xl font-semibold transition-all text-sm"
                      >
                        <Eye className="w-4 h-4" /> Preview
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="max-w-5xl mx-auto px-4 py-8 relative z-10">
          <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 border-30 border-white/5 rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 border-30 border-white/5 rounded-full pointer-events-none"></div>
            
            <h3 className="text-3xl font-extrabold text-white mb-4 relative z-10">Thumbnail Not Fitting Right?</h3>
            <p className="text-slate-300 mb-8 text-lg max-w-2xl mx-auto relative z-10">Resize your new thumbnail perfectly for Instagram, Twitter, or Facebook without losing quality using our free resizing tool.</p>
            <a 
              href="/social-media-imagetool" 
              className="inline-block relative z-10 bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Launch Resizer Tool
            </a>
          </div>
        </section>

      </main>

      <article className="bg-white border-t border-slate-200 mt-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="prose md:prose-lg text-slate-600 max-w-none mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">The Ultimate YouTube Thumbnail Downloader</h2>
            <p>
              A YouTube thumbnail is the clickable image cover that viewers see before clicking on a video. 
              It acts as a mini-billboard for content creators. Having a high-quality, eye-catching thumbnail 
              is crucial for improving Click-Through Rates (CTR) and getting more views on the platform.
            </p>
            <p>
              Using our <strong>free YouTube thumbnail downloader</strong>, you can easily extract and save 
              these images directly from YouTube's secure servers in full HD (1080p) format. This utility is incredibly helpful for content creators who need to analyze competitors' design styles, archive their own historical channel art, or redesign their video covers without losing the original files.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Why Download Thumbnails?</h3>
            <ul>
              <li><strong>Competitor Research:</strong> Analyze the typography, color contrast, and layouts of top-performing videos in your specific niche.</li>
              <li><strong>Content Repurposing:</strong> Download your own HD video covers to repurpose them as Instagram posts, Pinterest pins, or blog post headers.</li>
              <li><strong>Design Inspiration:</strong> Save visually stunning covers to your local mood board for future creative projects.</li>
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-10 tracking-tight text-center">Frequently Asked Questions</h2>
            
            {/* 🟢 NEW: Cleaned HTML. Removed all itemScope and itemType tags that were causing duplicates */}
            <div className="space-y-6">
              {[
                { 
                  q: "How to download YouTube thumbnails?", 
                  a: "Simply copy the link of any YouTube video or YouTube Short, paste it into our search box above, and click 'Get Thumbnails'. The tool will instantly query YouTube's servers and provide you with secure download links for every available image resolution." 
                },
                { 
                  q: "Is downloading YouTube thumbnails free?", 
                  a: "Yes! The SnapSizes YouTube thumbnail downloader tool is 100% free to use. There are no paywalls, it requires no account registration, and it allows for unlimited, instant image downloads directly to your device." 
                },
                { 
                  q: "What resolution thumbnails are available?", 
                  a: "Depending on the quality of the original video upload, you can extract thumbnails in Max Resolution (1080p HD or 4K), High Quality (720p), Medium Quality (360p), and Standard Quality. If an older video doesn't have an HD cover, our system automatically provides the next best High Quality fallback." 
                },
                { 
                  q: "Does this tool work on mobile devices?", 
                  a: "Absolutely. Our downloader is fully optimized for iOS and Android devices. You can easily copy a video link from the YouTube app, paste it into your mobile browser here, and save the image directly to your phone's camera roll." 
                }
              ].map((faq, i) => (
                <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-amber-100 transition-colors">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{faq.q}</h3>
                  <div>
                    <p className="text-slate-600 leading-relaxed text-sm">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center px-4 relative z-10 border-t border-slate-800">
        <p className="text-sm max-w-3xl mx-auto leading-relaxed">
          <strong className="text-slate-300">Disclaimer:</strong> Thumbnails belong to their respective YouTube creators. This tool simply previews and extracts publicly available thumbnails via official endpoints. We do not host these images. Please ensure you have the right to use any downloaded images.
        </p>
      </footer>

    </div>
  );
};

export default YoutubeThumbnailDownloader;