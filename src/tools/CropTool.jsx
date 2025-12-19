import { useRef, useState } from "react";
import Controls from "./Controls";
import Preview from "./Preview";
import ExportPanel from "../components/ExportPanel";
import { PLATFORM_PRESETS } from "../data/platformPresets";

export default function CropTool({ image }) {
  const canvasRef = useRef(null);

  const [fitMode, setFitMode] = useState("fill");
  const [background, setBackground] = useState("black");
  const [ratio, setRatio] = useState(null);

  const [activePreset, setActivePreset] = useState(null);

  // Export
  const [showExport, setShowExport] = useState(false);
  const [fileName, setFileName] = useState("snapsizes");
  const [format, setFormat] = useState("png");
  const [quality, setQuality] = useState(0.92);

  const applyPreset = (preset) => {
    if (!preset) return;
    setActivePreset(preset);
    setFitMode(preset.fitMode);
    setBackground(preset.background);
    setRatio(preset.ratio);
    setFileName(preset.filename);
  };

  const handleExport = (size) => {
    if (!image || !size) return;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = size.width;
    exportCanvas.height = size.height;

    const ctx = exportCanvas.getContext("2d");
    const img = new Image();
    img.src = image;

    img.onload = () => {
      if (fitMode === "fit") {
        if (background === "black") {
          ctx.fillStyle = "#000";
          ctx.fillRect(0, 0, size.width, size.height);
        }
        if (background === "white") {
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, size.width, size.height);
        }
        if (background === "blur") {
          const s = Math.max(
            size.width / img.width,
            size.height / img.height
          );
          ctx.filter = "blur(24px)";
          ctx.drawImage(
            img,
            (size.width - img.width * s) / 2,
            (size.height - img.height * s) / 2,
            img.width * s,
            img.height * s
          );
          ctx.filter = "none";
        }
      }

      const scale =
        fitMode === "fit"
          ? Math.min(size.width / img.width, size.height / img.height)
          : Math.max(size.width / img.width, size.height / img.height);

      ctx.drawImage(
        img,
        (size.width - img.width * scale) / 2,
        (size.height - img.height * scale) / 2,
        img.width * scale,
        img.height * scale
      );

      const link = document.createElement("a");
      link.download = `${fileName}.${format}`;
      link.href =
        format === "jpg"
          ? exportCanvas.toDataURL("image/jpeg", quality)
          : exportCanvas.toDataURL("image/png");
      link.click();

      setShowExport(false);
    };
  };

  if (!image) return null;

  return (
    <>
      <Controls
        fitMode={fitMode}
        setFitMode={setFitMode}
        background={background}
        setBackground={setBackground}
        onPreset={applyPreset}
        activePresetKey={activePreset?.key}
      />

      <Preview
        image={image}
        fitMode={fitMode}
        background={background}
        ratio={ratio}
        canvasRef={canvasRef}
      />

      <button className="btn-primary" onClick={() => setShowExport(true)}>
        Export Image
      </button>

      <ExportPanel
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        onConfirm={handleExport}
        presets={PLATFORM_PRESETS}
        preset={activePreset}
        fileName={fileName}
        setFileName={setFileName}
        format={format}
        setFormat={setFormat}
        quality={quality}
        setQuality={setQuality}
      />
    </>
  );
}