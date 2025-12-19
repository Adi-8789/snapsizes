import { useMemo, useState, useEffect } from "react";
import styles from "./ExportPanel.module.css";

export default function ExportPanel({
  isOpen,
  onClose,
  onConfirm,
  presets = [],
  preset,
  fileName,
  setFileName,
  format,
  setFormat,
  quality,
  setQuality,
}) {
  const [selected, setSelected] = useState(null);
  const [openPlatform, setOpenPlatform] = useState(null);

  /* =========================
     LOCK BODY SCROLL
  ========================= */
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* =========================
     GROUP PRESETS (PURE)
  ========================= */
  const groupedPresets = useMemo(() => {
    return presets.map((group) => ({
      platform: group.platform,
      items: group.items,
    }));
  }, [presets]);

  /* =========================
     SYNC PRESET WHEN MODAL OPENS
     ✅ NO useEffect
     ✅ NO setState-in-effect
  ========================= */
  useEffect(() => {
  if (!isOpen) return;

  // snapshot preset ONLY when modal opens
  const initialPreset = preset ?? null;

  // eslint-disable-next-line react-hooks/set-state-in-effect
  setSelected(initialPreset);
  setOpenPlatform(initialPreset?.platform ?? null);
}, [isOpen, preset]); // ✅ preset intentionally NOT tracked

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className={styles.header}>
          <h3>Export Image</h3>
        </div>

        {/* BODY */}
        <div className={styles.body}>
          {/* File name */}
          <div className={styles.group}>
            <label>File name</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>

          {/* Format */}
          <div className={styles.group}>
            <label>Format</label>
            <div className={styles.radioRow}>
              <label>
                <input
                  type="radio"
                  checked={format === "png"}
                  onChange={() => setFormat("png")}
                />
                PNG
              </label>
              <label>
                <input
                  type="radio"
                  checked={format === "jpg"}
                  onChange={() => setFormat("jpg")}
                />
                JPG
              </label>
            </div>
          </div>

          {/* Quality */}
          {format === "jpg" && (
            <div className={styles.group}>
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

          {/* PLATFORM ACCORDIONS */}
          {groupedPresets.map((group) => {
            const isOpenSection = openPlatform === group.platform;

            return (
              <div key={group.platform} className={styles.platform}>
                <button
                  type="button"
                  className={styles.platformHeader}
                  onClick={() =>
                    setOpenPlatform(
                      isOpenSection ? null : group.platform
                    )
                  }
                >
                  <span>{group.platform}</span>
                  <span>{isOpenSection ? "−" : "+"}</span>
                </button>

                {isOpenSection && (
                  <div className={styles.sizeList}>
                    {group.items.map((item) => (
                      <button
                        key={item.key}
                        className={`${styles.sizeBtn} ${
                          selected?.key === item.key
                            ? styles.active
                            : ""
                        }`}
                        onClick={() => setSelected(item)}
                      >
                        <strong>{item.label}</strong>
                        <span>
                          {item.width} × {item.height}
                        </span>

                        {item.badge && (
                          <span className={styles.badge}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className={styles.footer}>
          <button className={styles.secondary} onClick={onClose}>
            Cancel
          </button>

          <button
            className={styles.primary}
            disabled={!selected}
            onClick={() => onConfirm(selected)}
          >
            Download Selected
          </button>
        </div>
      </div>
    </div>
  );
}