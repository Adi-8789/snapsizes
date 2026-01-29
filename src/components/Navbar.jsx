import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const TOOLS = [
  { name: "Image Resizer", path: "/social-media-imagetool", status: "active" }, // 🟢 Fixed lowercase 'i'
  { name: "Bulk Photo Resizer", path: "/bulk-photo-resizer", status: "active" },
  { name: "Image Compressor", path: "/image-compressor-tool", status: "active" },
  { name: "PDF Converter", path: "/image-to-pdf-tool", status: "active" },
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand} onClick={handleNavClick}>
          Snap<span>Sizes</span>
        </Link>

        {/* Hamburger Toggle */}
        <button
          className={styles.hamburger}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle navigation"
        >
          <span
            className={`${styles.bar} ${isMobileOpen ? styles.bar1 : ""}`}
          ></span>
          <span
            className={`${styles.bar} ${isMobileOpen ? styles.bar2 : ""}`}
          ></span>
          <span
            className={`${styles.bar} ${isMobileOpen ? styles.bar3 : ""}`}
          ></span>
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${styles.navMenu} ${isMobileOpen ? styles.mobileOpen : ""}`}
        >
          <ul className={styles.navList}>
            <li>
              <Link
                to="/"
                className={`${styles.navLink} ${location.pathname === "/" ? styles.active : ""}`}
                onClick={handleNavClick}
              >
                Home
              </Link>
            </li>

            <li className={styles.dropdownWrapper} ref={dropdownRef}>
              <button
                className={`${styles.toolsTrigger} ${toolsOpen ? styles.open : ""}`}
                onClick={() => setToolsOpen(!toolsOpen)}
              >
                Tools <span className={styles.chevron}>▾</span>
              </button>

              {toolsOpen && (
                <ul className={styles.dropdownMenu}>
                  {TOOLS.map((tool) => (
                    <li key={tool.name}>
                      <Link
                        to={tool.path}
                        className={styles.dropdownItem}
                        onClick={handleNavClick}
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/donate"
                className={`${styles.navLink} ${location.pathname === "/donate" ? styles.active : ""}`}
                onClick={handleNavClick}
              >
                Donate
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                // 🟢 Fixed: Changed "/About" to "/about" to match URL standard
                className={`${styles.navLink} ${location.pathname === "/about" ? styles.active : ""}`}
                onClick={handleNavClick}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                // 🟢 Fixed: Changed "/Contact" to "/contact"
                className={`${styles.navLink} ${location.pathname === "/contact" ? styles.active : ""}`}
                onClick={handleNavClick}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}