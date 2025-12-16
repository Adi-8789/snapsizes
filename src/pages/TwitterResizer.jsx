import CropTool from "../tools/CropTool";
import SeoHead from "../components/SeoHead";

export default function TwitterResizer({ image }) {
  return (
    <div>
      <SeoHead
        title="Twitter (X) Image Resizer – Free Online Tool | SnapSizes"
        description="Resize images for Twitter (X) posts, headers, and profile photos online. Free Twitter image resizer with correct dimensions and no quality loss."
        canonical="https://snapsizes.vercel.app/twitter-image-resizer"
      />

      <h1>Twitter (X) Image Resizer – Free Online Tool</h1>

      <p>
        Resize your images perfectly for Twitter (now called X) using SnapSizes.
        This free online Twitter image resizer helps you adjust images for posts,
        headers, and profile photos with the correct sizes.
      </p>

      <h2>Twitter (X) Image Sizes</h2>
      <ul>
        <li>Twitter Post Image: 1200 × 675 (16:9)</li>
        <li>Twitter Header: 1500 × 500</li>
        <li>Twitter Profile Image: 400 × 400</li>
      </ul>

      {image && <CropTool image={image} />}

      <h2>Frequently Asked Questions</h2>

      <h3>What is the best image size for Twitter (X)?</h3>
      <p>
        The recommended image size for Twitter posts is 1200×675 pixels with a
        16:9 aspect ratio. This ensures images display clearly in the feed.
      </p>

      <h3>Does Twitter support PNG images?</h3>
      <p>
        Yes, Twitter (X) supports both JPG and PNG images. JPG is best for photos,
        while PNG works well for graphics and text.
      </p>

      <h3>Will resizing reduce image quality?</h3>
      <p>
        No. SnapSizes resizes images directly in your browser while maintaining
        the best possible image quality.
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
        <li>
          <a href="/linkedin-image-resizer">LinkedIn Image Resizer</a>
        </li>
      </ul>
    </div>
  );
}
