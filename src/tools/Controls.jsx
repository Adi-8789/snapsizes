import styles from "./Tool.module.css";

export default function Controls({
  fitMode,
  setFitMode,
  background,
  setBackground,
  ratio,
  setRatio,
  ratios,
  presets,
  onPreset,
  onReset,
}) {
  return (
    <div className={styles.controls}>
      {/* Presets */}
      <div className={styles.controlGroup}>
        <span className={styles.label}>Presets</span>
        <div className={styles.toggleRow}>
          {presets.map((p) => (
            <button key={p.key} onClick={() => onPreset(p)}>
              {p.label}
            </button>
          ))}
          <button onClick={onReset}>Reset</button>
        </div>
      </div>

      {/* Aspect Ratio */}
      <div className={styles.controlGroup}>
        <span className={styles.label}>Aspect Ratio</span>
        <div className={styles.toggleRow}>
          {ratios.map((r) => (
            <button
              key={r.label}
              className={ratio === r.value ? styles.active : ""}
              onClick={() => setRatio(r.value)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fit Mode */}
      <div className={styles.controlGroup}>
        <span className={styles.label}>Fit Mode</span>
        <div className={styles.toggleRow}>
          <button
            className={fitMode === "fill" ? styles.active : ""}
            onClick={() => setFitMode("fill")}
          >
            Fill
          </button>
          <button
            className={fitMode === "fit" ? styles.active : ""}
            onClick={() => setFitMode("fit")}
          >
            Fit
          </button>
        </div>
      </div>

      {/* Background */}
      {fitMode === "fit" && (
        <div className={styles.controlGroup}>
          <span className={styles.label}>Background</span>
          <div className={styles.toggleRow}>
            <button
              className={background === "black" ? styles.active : ""}
              onClick={() => setBackground("black")}
            >
              Black
            </button>
            <button
              className={background === "white" ? styles.active : ""}
              onClick={() => setBackground("white")}
            >
              White
            </button>
            <button
              className={background === "blur" ? styles.active : ""}
              onClick={() => setBackground("blur")}
            >
              Blur
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
