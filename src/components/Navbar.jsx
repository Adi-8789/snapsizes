import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const TOOLS = [
  { name: "Image Resizer", path: "/social-media-imagetool" },
  { name: "Bulk Photo Resizer", path: "/bulk-photo-resizer" },
  { name: "Image Compressor", path: "/image-compressor-tool" },
  { name: "PDF Converter", path: "/image-to-pdf-tool" },
  { name: "YT Thumbnail Downloader", path: "/youtube-thumbnail-downloader" },
  { name: "Case Converter", path: "/case-converter" }, 
  { name: "Merge PDF", path: "/merge-pdf" },
];

export default function Navbar() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleNavClick = () => {
    setToolsOpen(false);
    setIsMobileOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Brand Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-slate-900 hover:opacity-90 transition-opacity flex items-center gap-2"
            onClick={handleNavClick}
          >
            <img src="/logo.svg" alt="SnapSizes Logo" className="w-8 h-8" />
            Snap<span className="text-amber-500">Sizes</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/"
              onClick={handleNavClick}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                isActive("/")
                  ? "bg-amber-50 text-amber-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              Home
            </Link>

            {/* Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  toolsOpen || TOOLS.some((tool) => isActive(tool.path))
                    ? "bg-amber-50 text-amber-600"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                Tools
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${toolsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Content */}
              <div
                className={`absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 py-3 transition-all duration-200 origin-top-right ${
                  toolsOpen
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible"
                }`}
              >
                {TOOLS.map((tool) => (
                  <Link
                    key={tool.name}
                    to={tool.path}
                    onClick={handleNavClick}
                    className={`block px-5 py-2.5 text-sm font-medium transition-colors ${
                      isActive(tool.path)
                        ? "text-amber-500 bg-amber-50/50"
                        : "text-slate-600 hover:bg-slate-50 hover:text-amber-500"
                    }`}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/donate"
              onClick={handleNavClick}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                isActive("/donate")
                  ? "bg-amber-50 text-amber-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              Donate
            </Link>

            <Link
              to="/about"
              onClick={handleNavClick}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                isActive("/about")
                  ? "bg-amber-50 text-amber-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={handleNavClick}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                isActive("/contact")
                  ? "bg-amber-50 text-amber-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Hamburger Toggle (Animated) */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none z-50 relative"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle navigation"
          >
            <span
              className={`h-0.5 w-6 bg-slate-800 rounded-full transition-all duration-300 ${isMobileOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-slate-800 rounded-full transition-all duration-300 ${isMobileOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-slate-800 rounded-full transition-all duration-300 ${isMobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 flex flex-col gap-2">
          <Link
            to="/"
            onClick={handleNavClick}
            className={`p-3 rounded-xl font-semibold ${isActive("/") ? "bg-amber-50 text-amber-600" : "text-slate-700"}`}
          >
            Home
          </Link>

          <div className="flex flex-col gap-1 border-y border-slate-100 py-3 my-1">
            <span className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Tools
            </span>
            {TOOLS.map((tool) => (
              <Link
                key={tool.name}
                to={tool.path}
                onClick={handleNavClick}
                className={`p-3 rounded-xl text-sm font-medium pl-6 ${isActive(tool.path) ? "bg-amber-50 text-amber-600" : "text-slate-600"}`}
              >
                {tool.name}
              </Link>
            ))}
          </div>

          <Link
            to="/donate"
            onClick={handleNavClick}
            className={`p-3 rounded-xl font-semibold ${isActive("/donate") ? "bg-amber-50 text-amber-600" : "text-slate-700"}`}
          >
            Donate
          </Link>
          <Link
            to="/about"
            onClick={handleNavClick}
            className={`p-3 rounded-xl font-semibold ${isActive("/about") ? "bg-amber-50 text-amber-600" : "text-slate-700"}`}
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={handleNavClick}
            className={`p-3 rounded-xl font-semibold ${isActive("/contact") ? "bg-amber-50 text-amber-600" : "text-slate-700"}`}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
