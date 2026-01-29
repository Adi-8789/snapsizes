import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly jumps to top when the route (pathname) changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}