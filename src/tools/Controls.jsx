import { useState, useMemo } from "react";
import styles from "./Controls.styles.module.css";
import { PLATFORM_PRESETS } from "../data/platformPresets";

export default function Controls({
  fitMode,
  setFitMode,
  background,
  setBackground,
  onPreset,
  activePresetKey,
}) {
  const [openPlatform, setOpenPlatform] = useState(null);

  // ✅ memoized grouping (NO render-time mutation)
  const grouped = useMemo(() => {
    if (!Array.isArray(PLATFORM_PRESETS)) return [];
    return PLATFORM_PRESETS;
  }, []);

  return (
    <div className={styles.controls}>
      {/* PLATFORM ACCORDIONS */}
      {grouped.map((group) => {
        const isOpen = openPlatform === group.platform;

        return (
          <div key={group.platform} className={styles.group}>
            {/* HEADER */}
            <button
              type="button"
              className={styles.accordionHeader}
              onClick={() =>
                setOpenPlatform(isOpen ? null : group.platform)
              }
            >
              <span>{group.platform}</span>
              <span className={styles.icon}>{isOpen ? "−" : "+"}</span>
            </button>

            {/* BODY */}
            {isOpen && (
              <div className={styles.presetRow}>
                {group.items.map((p) => {
                  const isActive = activePresetKey === p.key;

                  return (
                    <button
                      key={p.key}
                      type="button"
                      className={`${styles.presetBtn} ${
                        isActive ? styles.active : ""
                      }`}
                      onClick={() => onPreset(p)}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* FIT MODE */}
      <div className={styles.group}>
        <h4>Fit Mode</h4>
        <div className={styles.toggleRow}>
          <button
            type="button"
            className={fitMode === "fill" ? styles.active : ""}
            onClick={() => setFitMode("fill")}
          >
            Fill
          </button>
          <button
            type="button"
            className={fitMode === "fit" ? styles.active : ""}
            onClick={() => setFitMode("fit")}
          >
            Fit
          </button>
        </div>
      </div>

      {/* BACKGROUND */}
      {fitMode === "fit" && (
        <div className={styles.group}>
          <h4>Background</h4>
          <div className={styles.toggleRow}>
            {["black", "white", "blur"].map((bg) => (
              <button
                key={bg}
                type="button"
                className={background === bg ? styles.active : ""}
                onClick={() => setBackground(bg)}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}