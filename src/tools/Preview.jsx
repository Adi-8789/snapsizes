import { useEffect, useRef, useState } from "react";
import styles from "./Tool.module.css";

export default function Preview({
  image,
  fitMode,
  background,
  ratio,
  canvasRef,
}) {
  const imgRef = useRef(null);

  const [text, setText] = useState("");
  const [opacity, setOpacity] = useState(0.6);
  const [size, setSize] = useState(24);
  const [pos, setPos] = useState({ x: 40, y: 40 });
  const [dragging, setDragging] = useState(false);

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imgRef.current;

    if (!canvas || !ctx || !img) return;

    const maxWidth = 360;
    const maxHeight = Math.min(window.innerHeight * 0.6, 520);

    let cw = maxWidth;
    let ch = maxHeight;

    if (ratio) {
      const r = Number(ratio);
      if (r > 1) {
        ch = maxWidth / r;
      } else {
        cw = maxHeight * r;
      }
    }

    canvas.width = Math.round(cw);
    canvas.height = Math.round(ch);

    ctx.clearRect(0, 0, cw, ch);

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
        ctx.filter = "blur(24px)";
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

    if (text.trim()) {
      ctx.globalAlpha = opacity;
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${size}px system-ui`;
      ctx.fillText(text, pos.x, pos.y);
      ctx.globalAlpha = 1;
    }
  };

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

  useEffect(() => {
    draw();
    // eslint-disable-next-line
  }, [fitMode, background, ratio, text, opacity, size, pos]);

  const startDrag = (e) => {
    if (!text) return;
    e.preventDefault();
    setDragging(true);
  };

  const endDrag = () => setDragging(false);

  const moveDrag = (x, y) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setPos({
      x: x - rect.left,
      y: y - rect.top,
    });
  };

  return (
    <div className={styles.previewWrapper}>
      <div
        className={styles.preview}
        onMouseMove={(e) => dragging && moveDrag(e.clientX, e.clientY)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchMove={(e) =>
          dragging && moveDrag(e.touches[0].clientX, e.touches[0].clientY)
        }
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

      <div className={styles.overlayControls}>
        <input
          placeholder="Watermark text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label>
          Size
          <input
            type="range"
            min="12"
            max="48"
            value={size}
            onChange={(e) => setSize(+e.target.value)}
          />
        </label>

        <label>
          Opacity
          <input
            type="range"
            min="0.2"
            max="1"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(+e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}