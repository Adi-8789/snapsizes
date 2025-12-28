import SeoHead from "../components/SeoHead";

export default function About() {
  return (
    <div>
      <SeoHead
        title="About SnapSizes – Free Online Image Resizer Tool"
        description="Learn about SnapSizes, a free online image resizer built to help creators resize images for social media easily and privately."
        canonical="https://snapsizes.vercel.app/about"
      />

      <h1>About SnapSizes</h1>

      <p>
        SnapSizes is a free online image resizer created to help creators,
        marketers, developers, and everyday users resize images for social media
        platforms quickly and without complexity.
      </p>

      <p>
        Many users struggle with adjusting image dimensions for different
        platforms such as Instagram, YouTube Shorts, LinkedIn, or WhatsApp.
        SnapSizes solves this problem by allowing you to upload an image once
        and resize or crop it instantly for multiple use cases.
      </p>

      <p>
        SnapSizes is designed to be simple, fast, and accessible. The tool works
        entirely in your browser, which means images are processed locally on
        your device. We do not upload, store, or track your images on any server,
        ensuring better privacy and control for users.
      </p>

      <p>
        Our goal is to provide a reliable and user-friendly image resizing tool
        without requiring account creation, subscriptions, or software
        downloads. SnapSizes is continuously improved to support modern
        workflows and make image resizing easier for everyone.
      </p>
    </div>
  );
}