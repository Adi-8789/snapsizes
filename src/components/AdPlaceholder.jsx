export default function AdPlaceholder({ position = "inline" }) {
  return (
    <div className={`ad-slot ad-${position}`}>
      {/* AdSense will inject ad here later */}
      <span className="ad-label">Advertisement</span>
    </div>
  );
}