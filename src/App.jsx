import ImageUpload from "./components/ImageUpload";
import SeoText from "./components/SeoText";

function App() {
  return (
    <main>
      <h1>SnapSizes</h1>
      <p>Resize one image for all social media platforms</p>

      <ImageUpload />

      {/* SEO Helper Content */}
      <SeoText />
    </main>
  );
}

export default App;
