import { jsPDF } from "jspdf";

export const PAGE_SIZES = {
  a4: { w: 210, h: 297 },
  letter: { w: 215.9, h: 279.4 },
  legal: { w: 215.9, h: 355.6 },
};

/**
 * Generates the PDF Blob
 * @param {Array} images - Array of image objects { src, rotation, width, height }
 * @param {Object} config - { pageSize, margin, orientation, fitMode }
 * @param {Function} onProgress - Callback for progress bar
 */
export const generatePdf = async (images, config, onProgress) => {
  const format = config.pageSize || "a4";
  const doc = new jsPDF({
    orientation: config.orientation || "portrait",
    unit: "mm",
    format: format,
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = config.margin || 0;

  // Printable area
  const availW = pageWidth - margin * 2;
  const availH = pageHeight - margin * 2;

  for (let i = 0; i < images.length; i++) {
    if (i > 0) doc.addPage();
    
    const imgItem = images[i];
    
    // Create an offscreen image to get dimensions if not present
    // In production, we'd cache these dimensions on upload
    const imgProps = await getImageProperties(imgItem.url); 
    
    let renderW = imgProps.width;
    let renderH = imgProps.height;
    
    // Calculate Aspect Ratios
    const imgRatio = renderW / renderH;
    const pageRatio = availW / availH;

    let finalW, finalH;

    // FIT (Contain) Logic
    if (config.fitMode === "fit") {
      if (imgRatio > pageRatio) {
        finalW = availW;
        finalH = availW / imgRatio;
      } else {
        finalH = availH;
        finalW = availH * imgRatio;
      }
    } 
    // FILL (Cover) Logic - Simplified for PDF (usually means max width)
    else if (config.fitMode === "fill") {
       finalW = availW;
       finalH = availW / imgRatio;
    }
    // ORIGINAL Logic
    else {
      // Convert px to mm (assuming 96 DPI for screen consistency)
      finalW = renderW * 0.264583; 
      finalH = renderH * 0.264583;
      
      // Safety cap
      if (finalW > availW) {
        finalW = availW;
        finalH = availW / imgRatio;
      }
    }

    // Centering Logic
    const x = margin + (availW - finalW) / 2;
    const y = margin + (availH - finalH) / 2;

    // Handle Rotation (Advanced)
    // jsPDF rotation rotates around a point. We need to handle this carefully.
    // For MVP, we pass the image rotated via Canvas or use jsPDF angle.
    doc.addImage(imgItem.url, "JPEG", x, y, finalW, finalH, null, "FAST", imgItem.rotation || 0);
    
    if (onProgress) onProgress(Math.round(((i + 1) / images.length) * 100));
  }

  return doc.output("blob");
};

// Helper to get image dimensions from ObjectURL
const getImageProperties = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.src = url;
  });
};