import { useState, useRef } from "react";
import Controls from "./Controls";
import Preview from "./Preview";

const RATIOS = [
  { label: "Free", value: null },
  { label: "1:1", value: 1 },
  { label: "4:5", value: 4 / 5 },
  { label: "9:16", value: 9 / 16 },
  { label: "16:9", value: 16 / 9 },
  { label: "1.91:1", value: 1.91 },
];

const PRESETS = [
  { key: "yt", label: "YouTube Shorts", ratio: 9 / 16, fitMode: "fit", background: "blur" },
  { key: "ig-story", label: "Instagram Story", ratio: 9 / 16, fitMode: "fit", background: "black" },
  { key: "ig-post", label: "Instagram Post", ratio: 1, fitMode: "fill", background: "black" },
  { key: "linkedin", label: "LinkedIn Post", ratio: 1.91, fitMode: "fill", background: "black" },
  { key: "x", label: "X (Twitter)", ratio: 16 / 9, fitMode: "fill", background: "black" },
];

export default function CropTool({ image }) {
  const [fitMode, setFitMode] = useState("fill");
  const [background, setBackground] = useState("black");
  const [ratio, setRatio] = useState(9 / 16);

  // 🔒 Original state (never changes)
  const original = useRef({
    fitMode: "fill",
    background: "black",
    ratio: 9 / 16,
  });

  const applyPreset = (p) => {
    setFitMode(p.fitMode);
    setBackground(p.background);
    setRatio(p.ratio);
  };

  const resetToOriginal = () => {
    setFitMode(original.current.fitMode);
    setBackground(original.current.background);
    setRatio(original.current.ratio);
  };

  return (
    <>
      <Controls
        fitMode={fitMode}
        setFitMode={setFitMode}
        background={background}
        setBackground={setBackground}
        ratio={ratio}
        setRatio={setRatio}
        ratios={RATIOS}
        presets={PRESETS}
        onPreset={applyPreset}
        onReset={resetToOriginal}
      />

      <Preview
        image={image}
        fitMode={fitMode}
        background={background}
        ratio={ratio}
      />
    </>
  );
}
