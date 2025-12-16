import { useState } from "react";
import CropTool from "../tools/CropTool";

export default function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
  };

  return (
    <section>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {image && <CropTool image={image} />}
    </section>
  );
}
