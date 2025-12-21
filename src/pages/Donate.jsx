import SeoHead from "../components/SeoHead";

export default function Donate() {
  return (
    <>
      <SeoHead
        title="Support SnapSizes – Donate via UPI"
        description="Support SnapSizes by donating via UPI. Your contribution helps keep this free image resizer online."
        canonical="https://snapsizes.vercel.app/donate"
      />

      <section className="tool-card">
        <h1 className="tool-title">Support SnapSizes ❤️</h1>

        <p className="tool-subtitle">
          SnapSizes is a free image resizer built to help creators save time.
          If this tool helped you, you can support its development with a small
          donation.
        </p>

        <div style={{ marginTop: "20px" }}>
          <h3>Donate via UPI</h3>

          <p style={{ marginTop: "10px" }}>
            <strong>UPI ID:</strong>{" "}
            <span style={{ fontSize: "16px" }}>shankaraditya980-4@okaxis</span>
          </p>
            
          OPTIONAL QR IMAGE
          <br />
          <img
            src="/upi-qr.png.jpeg"
            alt="Donate via UPI QR"
            style={{ maxWidth: "210px", marginTop: "16px" }}
          />
         

          <p
            style={{
              marginTop: "16px",
              fontSize: "13px",
              color: "#666",
            }}
          >
            Donations are optional. Ads help keep this tool free for everyone.
          </p>
        </div>
      </section>
    </>
  );
}