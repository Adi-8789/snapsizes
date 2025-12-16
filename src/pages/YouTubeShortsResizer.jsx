import CropTool from "../tools/CropTool";
import SeoHead from "../components/SeoHead";

export default function YouTubeShortsResizer({ image }) {
  return (
    <div>
      <SeoHead
        title="YouTube Shorts Image Resizer – Free Online Tool | SnapSizes"
        description="Resize images for YouTube Shorts online. Free YouTube Shorts image resizer with perfect 9:16 dimensions and no quality loss."
        canonical="https://snapsizes.vercel.app/youtube-shorts-image-resizer"
      />

      <h1>YouTube Shorts Image Resizer – Free Online Tool</h1>

      <p>
        Resize your images perfectly for YouTube Shorts using SnapSizes. This
        free online tool helps you convert any image into the correct 9:16
        vertical format required for YouTube Shorts without losing quality.
      </p>

      <h2>YouTube Shorts Image Size</h2>
      <ul>
        <li>Recommended Size: 1080 × 1920 pixels</li>
        <li>Aspect Ratio: 9:16</li>
        <li>Supported Formats: JPG, PNG</li>
      </ul>

      {image && <CropTool image={image} />}

      <h2>Frequently Asked Questions</h2>

      <h3>What image size is best for YouTube Shorts?</h3>
      <p>
        The recommended image size for YouTube Shorts is 1080×1920 pixels with
        a 9:16 aspect ratio. This ensures your image fits perfectly on mobile
        screens.
      </p>

      <h3>Can I use PNG images for YouTube Shorts?</h3>
      <p>
        Yes, YouTube Shorts supports both JPG and PNG images. JPG is usually
        better for photos, while PNG works well for graphics and text.
      </p>

      <h3>Will resizing reduce image quality?</h3>
      <p>
        No. SnapSizes resizes images directly in your browser and preserves
        the best possible quality.
      </p>
    </div>
  );
}
