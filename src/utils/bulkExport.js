import JSZip from "jszip";

export async function bulkExportImages({
  images,
  sizes,
  format,
}) {
  const zip = new JSZip();
  const folder = zip.folder("snapsizes-export");

  for (let imgIndex = 0; imgIndex < images.length; imgIndex++) {
    const imageObj = images[imgIndex];
    const img = await loadImage(imageObj.src);

    for (let sizeIndex = 0; sizeIndex < sizes.length; sizeIndex++) {
      const { w, h } = sizes[sizeIndex];

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, w, h);

      // ===== SCALE (FILL MODE DEFAULT) =====
      const scale = Math.max(w / img.width, h / img.height);

      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;

      const dx = (w - drawWidth) / 2;
      const dy = (h - drawHeight) / 2;

      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);

      const blob = await canvasToBlob(canvas, format);

      const fileName = `${stripExt(imageObj.name)}_${w}x${h}.${format}`;

      folder.file(fileName, blob);
    }
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });

  downloadBlob(zipBlob, "snapsizes-bulk-export.zip");
}

/* =========================
   HELPERS
========================= */

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function canvasToBlob(canvas, format) {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob),
      format === "jpg" ? "image/jpeg" : "image/png",
      0.92
    );
  });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function stripExt(name) {
  return name.replace(/\.[^/.]+$/, "");
}