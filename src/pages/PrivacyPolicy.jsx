import SeoHead from "../components/SeoHead";

export default function PrivacyPolicy() {
  return (
    <div>
      <SeoHead
        title="Privacy Policy | SnapSizes"
        description="Read SnapSizes privacy policy to understand how we handle user data, images, and privacy on our free image resizer tool."
        canonical="https://snapsizes.vercel.app/privacy-policy"
      />

      <h1>Privacy Policy</h1>

      <p>
        Your privacy is important to us. SnapSizes is designed to respect user
        privacy and does not collect personal data.
      </p>

      <h2>Image Processing</h2>
      <p>
        All image processing on SnapSizes happens locally in your browser. Your
        images are never uploaded, stored, or shared with any server.
      </p>

      <h2>Cookies & Advertising</h2>
      <p>
        SnapSizes may display advertisements provided by third-party ad
        networks such as Google AdSense. These services may use cookies to
        display relevant ads.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We may use third-party tools for analytics or advertising purposes.
        These services operate under their own privacy policies.
      </p>

      <p>
        By using SnapSizes, you agree to this privacy policy.
      </p>
    </div>
  );
}
