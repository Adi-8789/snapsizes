import { useRef, useState, useEffect } from "react";
import Cropper from "react-cropper";
import { SOCIAL_SIZES } from "../utils/sizes";

export default function CropTool({ image }) {
  const cropperRef = useRef(null);
  const [active, setActive] = useState(SOCIAL_SIZES[0]);

  // Group sizes by platform (PRO UI)
  const groupedSizes = SOCIAL_SIZES.reduce((acc, size) => {
    acc[size.platform] = acc[size.platform] || [];
    acc[size.platform].push(size);
    return acc;
  }, {});

  // 🔥 FIX: reset crop box when aspect ratio changes
  useEffect(() => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    cropper.setAspectRatio(active.width / active.height);
    cropper.reset();
  }, [active]);

  const downloadOne = (size) => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    const canvas = cropper.getCroppedCanvas({
      width: size.width,
      height: size.height,
      imageSmoothingQuality: "high",
    });

    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `snapsizes-${size.name
      .replace(/\s+/g, "-")
      .toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadAll = () => {
    SOCIAL_SIZES.forEach((size) => downloadOne(size));
  };

  return (
    <div style={{ marginTop: "24px" }}>
      {/* SIZE SELECTOR */}
      <div style={{ marginBottom: "16px" }}>
        {Object.entries(groupedSizes).map(([platform, sizes]) => (
          <div key={platform} style={{ marginBottom: "10px" }}>
            <strong>{platform}</strong>
            <div
              style={{
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
                marginTop: "6px",
              }}
            >
              {sizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => setActive(size)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    cursor: "pointer",
                    background:
                      active.name === size.name ? "#111" : "#fff",
                    color:
                      active.name === size.name ? "#fff" : "#111",
                  }}
                >
                  {size.ratio}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CROPPER */}
      <Cropper
        src={image}
        style={{ height: 420, width: "100%" }}
        viewMode={1}
        guides
        ref={cropperRef}
      />

      {/* ACTIONS */}
      <div
        style={{
          marginTop: "14px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => downloadOne(active)}>
          Download {active.name}
        </button>
        <button onClick={downloadAll}>Download All Sizes</button>
      </div>
    </div>
  );
}
