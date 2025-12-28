import SeoHead from "../components/SeoHead";

export default function PrivacyPolicy() {
  return (
    <div>
      <SeoHead
        title="Privacy Policy | SnapSizes"
        description="Read SnapSizes privacy policy to understand how we handle user data, images, cookies, and advertising on our free image resizer tool."
        canonical="https://snapsizes.vercel.app/privacy-policy"
      />

      <h1>Privacy Policy</h1>

      <p>
        Your privacy is important to us. SnapSizes is designed to respect user
        privacy and transparency. This page explains how information is handled
        when you use our website.
      </p>

      <h2>Image Processing</h2>
      <p>
        All image processing on SnapSizes happens locally in your browser. Your
        images are never uploaded, stored, or shared with any server. SnapSizes
        does not collect or retain image data.
      </p>

      <h2>Personal Data</h2>
      <p>
        SnapSizes does not require account registration and does not knowingly
        collect personal information such as names, email addresses, or phone
        numbers from users.
      </p>

      <h2>Cookies and Advertising</h2>
      <p>
        SnapSizes may display advertisements provided by third-party vendors,
        including Google AdSense. These advertising services may use cookies,
        including the DoubleClick cookie, to display ads relevant to users based
        on their visits to this and other websites.
      </p>

      <p>
        Users may opt out of personalised advertising by visiting Google’s Ad
        Settings page or learn more about how Google manages data in advertising
        products.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        SnapSizes may use third-party services for analytics or advertising.
        These services operate under their own privacy policies, and we do not
        control how third-party services collect or use data.
      </p>

      <h2>Consent</h2>
      <p>
        By using SnapSizes, you consent to this privacy policy and agree to its
        terms.
      </p>
    </div>
  );
}