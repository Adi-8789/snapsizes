export default function ImageUpload({ onImageSelect }) {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    onImageSelect(imageUrl);
  };

  return (
    <section>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <p className="tool-subtitle">
        JPG, PNG supported · No upload limits · Free to use
      </p>
    </section>
  );
}
