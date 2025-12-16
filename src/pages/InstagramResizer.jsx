import CropTool from "../tools/CropTool";
import SeoHead from "../components/SeoHead";

export default function InstagramResizer({ image }) {
  return (
    <div>
      <SeoHead
        title="Instagram Image Resizer Online – Free Tool | SnapSizes"
        description="Resize images for Instagram posts, stories, and reels online. Free Instagram image resizer with perfect dimensions and no quality loss."
        canonical="https://snapsizes.vercel.app/instagram-image-resizer"
      />

      <h1>Instagram Image Resizer – Free Online Tool</h1>

      <p>
        Resize your images perfectly for Instagram posts, stories, and reels
        using SnapSizes. Upload your image once and instantly fit it to
        Instagram’s recommended sizes without losing quality.
      </p>

      <h2>Instagram Image Sizes</h2>
      <ul>
        <li>Instagram Post: 1080 × 1080</li>
        <li>Instagram Story: 1080 × 1920</li>
        <li>Instagram Reels: 1080 × 1920</li>
      </ul>

      {image && <CropTool image={image} />}

      <h2>FAQs</h2>

      <h3>What is the best image size for Instagram?</h3>
      <p>
        Instagram recommends 1080×1080 for posts and 1080×1920 for stories and
        reels.
      </p>

      <h3>Does Instagram support PNG?</h3>
      <p>Yes, Instagram supports both JPG and PNG images.</p>
    </div>
  );
}
