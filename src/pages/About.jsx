import SeoHead from "../components/SeoHead";

export default function About() {
  return (
    <div>
      <SeoHead
        title="About SnapSizes – Free Online Image Resizer Tool"
        description="Learn about SnapSizes, a free online image resizer built to help creators resize images for social media easily."
        canonical="https://snapsizes.vercel.app/about"
      />

      <h1>About SnapSizes</h1>

      <p>
        SnapSizes is a free online image resizer tool designed to help creators,
        marketers, and everyday users resize images for social media platforms
        quickly and easily.
      </p>

      <p>
        Our goal is to remove complexity from image resizing. With SnapSizes,
        you can upload an image once and instantly adjust it for platforms like
        Instagram, YouTube Shorts, LinkedIn, and more.
      </p>

      <p>
        SnapSizes works entirely in your browser. We do not upload or store your
        images on any server, ensuring speed and privacy.
      </p>
    </div>
  );
}
