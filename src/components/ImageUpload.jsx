import { useRef, useState } from "react";

export default function ImageUpload({ onImageSelect }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const imageUrl = URL.createObjectURL(file);
    onImageSelect(imageUrl);
  };

  return (
    <div className="upload-box">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        hidden
      />

      <button
        type="button"
        className="upload-area"
        onClick={() => inputRef.current.click()}
      >
        <div className="upload-icon">📁</div>

        <div className="upload-text">
          <strong>
            {fileName ? "Image Selected" : "Choose an image"}
          </strong>
          <span>
            {fileName || "PNG, JPG, JPEG supported"}
          </span>
        </div>
      </button>
    </div>
  );
}
