import { useEffect, useRef, useState } from "react";
import styles from "./Tool.module.css";

export default function Preview({ image, fitMode, background, ratio }) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  // Watermark
  const [text, setText] = useState("");
  const [opacity, setOpacity] = useState(0.6);
  const [size, setSize] = useState(24);
  const [pos, setPos] = useState({ x: 40, y: 40 });
  const [dragging, setDragging] = useState(false);

  // Export
  const [format, setFormat] = useState("png");
  const [quality, setQuality] = useState(0.92);

  /* ======================
     DRAW FUNCTION (HOISTED)
  ====================== */
  function draw() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;
    if (!img) return;

    let cw = 360,
      ch = 640;
    if (ratio) {
      if (ratio > 1) {
        ch = 360;
        cw = Math.round(ch * ratio);
      } else {
        cw = 360;
        ch = Math.round(cw / ratio);
      }
    }

    canvas.width = cw;
    canvas.height = ch;
    ctx.clearRect(0, 0, cw, ch);

    // Background
    if (fitMode === "fit") {
      if (background === "black") {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, cw, ch);
      }
      if (background === "white") {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, cw, ch);
      }
      if (background === "blur") {
        const s = Math.max(cw / img.width, ch / img.height);
        ctx.filter = "blur(20px)";
        ctx.drawImage(
          img,
          (cw - img.width * s) / 2,
          (ch - img.height * s) / 2,
          img.width * s,
          img.height * s
        );
        ctx.filter = "none";
      }
    }

    // Main image
    const scale =
      fitMode === "fit"
        ? Math.min(cw / img.width, ch / img.height)
        : Math.max(cw / img.width, ch / img.height);

    ctx.drawImage(
      img,
      (cw - img.width * scale) / 2,
      (ch - img.height * scale) / 2,
      img.width * scale,
      img.height * scale
    );

    // Watermark
    if (text.trim()) {
      ctx.globalAlpha = opacity;
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${size}px system-ui`;
      ctx.fillText(text, pos.x, pos.y);
      ctx.globalAlpha = 1;
    }
  }

  /* ======================
     LOAD IMAGE ONCE
  ====================== */
  useEffect(() => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      imgRef.current = img;
      draw();
    };
    // eslint-disable-next-line
  }, [image]);

  /* ======================
     REDRAW ON CHANGE
  ====================== */
  useEffect(() => {
    draw();
    // eslint-disable-next-line
  }, [fitMode, background, ratio, text, opacity, size, pos]);

  /* ======================
     DRAG (MOUSE + TOUCH)
  ====================== */
  const startDrag = () => text && setDragging(true);
  const endDrag = () => setDragging(false);

  const moveDrag = (clientX, clientY) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setPos({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  const onMouseMove = (e) => dragging && moveDrag(e.clientX, e.clientY);
  const onTouchMove = (e) => {
    if (!dragging) return;
    const t = e.touches[0];
    moveDrag(t.clientX, t.clientY);
  };

  const download = () => {
    const a = document.createElement("a");
    a.download = format === "jpg" ? "snapsizes.jpg" : "snapsizes.png";
    a.href =
      format === "jpg"
        ? canvasRef.current.toDataURL("image/jpeg", quality)
        : canvasRef.current.toDataURL("image/png");
    a.click();
  };

  return (
    <div className={styles.previewWrapper}>
      <div
        className={styles.preview}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchMove={onTouchMove}
        onTouchEnd={endDrag}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
        />
      </div>
      <p className={styles.helperText}>
        Tip: Drag the watermark directly on the image
      </p>
      {/* Watermark controls */}
      <div className={styles.overlayControls}>
        <input
          type="text"
          placeholder="Watermark text (drag on image)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className={styles.row}>
          <label>Size</label>
          <input
            type="range"
            min="12"
            max="48"
            value={size}
            onChange={(e) => setSize(+e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label>Opacity</label>
          <input
            type="range"
            min="0.2"
            max="1"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(+e.target.value)}
          />
        </div>
      </div>

      {/* Export */}
      <div className={styles.exportControls}>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="png">PNG (Lossless)</option>
          <option value="jpg">JPG (Best Quality)</option>
        </select>

        {format === "jpg" && (
          <div className={styles.qualityControl}>
            <label>Quality {Math.round(quality * 100)}%</label>
            <input
              type="range"
              min="0.85"
              max="1"
              step="0.01"
              value={quality}
              onChange={(e) => setQuality(+e.target.value)}
            />
          </div>
        )}

        <button className={styles.downloadBtn} onClick={download}>
          Download Image
        </button>
      </div>
    </div>
  );
}
