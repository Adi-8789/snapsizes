import CropTool from "../tools/CropTool";
import SeoHead from "../components/SeoHead";

export default function LinkedInResizer({ image }) {
  return (
    <div>
      <SeoHead
        title="LinkedIn Image Resizer – Free Online Tool | SnapSizes"
        description="Resize images for LinkedIn posts, banners, and profile images online. Free LinkedIn image resizer with correct dimensions and no quality loss."
        canonical="https://snapsizes.vercel.app/linkedin-image-resizer"
      />

      <h1>LinkedIn Image Resizer – Free Online Tool</h1>

      <p>
        Resize your images perfectly for LinkedIn using SnapSizes. This free
        LinkedIn image resizer helps you adjust images for LinkedIn posts,
        banners, and profile sections with the correct dimensions.
      </p>

      <h2>LinkedIn Image Sizes</h2>
      <ul>
        <li>LinkedIn Post: 1200 × 1200</li>
        <li>LinkedIn Banner: 1584 × 396</li>
        <li>LinkedIn Profile Image: 400 × 400</li>
      </ul>

      {image && <CropTool image={image} />}

      <h2>Frequently Asked Questions</h2>

      <h3>What is the best image size for LinkedIn posts?</h3>
      <p>
        The recommended LinkedIn post image size is 1200×1200 pixels. This size
        ensures your image looks sharp and professional in the feed.
      </p>

      <h3>Does LinkedIn support PNG images?</h3>
      <p>
        Yes, LinkedIn supports both JPG and PNG images. PNG works well for
        graphics, while JPG is ideal for photos.
      </p>

      <h3>Will resizing reduce image quality?</h3>
      <p>
        No. SnapSizes resizes images directly in your browser while preserving
        the best possible quality.
      </p>

      <h2>Related Tools</h2>
      <ul>
        <li>
          <a href="/instagram-image-resizer">Instagram Image Resizer</a>
        </li>
        <li>
          <a href="/youtube-shorts-image-resizer">
            YouTube Shorts Image Resizer
          </a>
        </li>
      </ul>
    </div>
  );
}
