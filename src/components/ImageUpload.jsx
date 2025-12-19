import { useRef } from "react";
import styles from "./ImageUpload.module.css";

export default function ImageUpload({ onImageSelect }) {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      onImageSelect(reader.result); // ✅ STRING
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.uploadBox}>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        hidden
        onChange={handleFileChange}
      />

      <div
        className={styles.dropArea}
        onClick={() => inputRef.current?.click()}
      >
        <strong>Upload Image</strong>
        <span>PNG or JPG · Single image only</span>
      </div>
    </div>
  );
}