import SeoHead from "../components/SeoHead";

export default function Donate() {
  return (
    <>
      <SeoHead
        title="Support SnapSizes (Optional Donations)"
        description="Support SnapSizes through optional donations. SnapSizes remains free to use, and donations are voluntary."
        canonical="https://snapsizes.vercel.app/donate"
      />

      <section className="tool-card">
        <h1 className="tool-title">Support SnapSizes</h1>

        <p className="tool-subtitle">
          SnapSizes is a free online image resizer created to help users resize
          images quickly and easily. The tool is fully functional without any
          payment or account requirement.
        </p>

        <p style={{ marginTop: "12px" }}>
          If you find SnapSizes useful and would like to support its ongoing
          maintenance and improvement, you may choose to make a voluntary
          donation. Donations are completely optional and are not required to
          access any features.
        </p>

        <div style={{ marginTop: "20px" }}>
          <h3>Optional Donation (UPI)</h3>

          <p style={{ marginTop: "10px" }}>
            <strong>UPI ID:</strong>{" "}
            <span style={{ fontSize: "16px" }}>
              shankaraditya980-4@okaxis
            </span>
          </p>

          <img
            src="/upi-qr.png.jpeg"
            alt="Optional donation via UPI QR code"
            style={{ maxWidth: "210px", marginTop: "16px" }}
          />

          <p
            style={{
              marginTop: "16px",
              fontSize: "13px",
              color: "#666",
            }}
          >
            Donations are voluntary and do not provide access to additional
            features or services. Advertising revenue helps keep SnapSizes free
            for all users.
          </p>
        </div>
      </section>
    </>
  );
}