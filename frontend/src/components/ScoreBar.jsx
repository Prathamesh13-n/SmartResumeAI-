// A simple horizontal bar that visually shows score out of max.
// Used for both the big overall ATS score and each category's sub-score.
function ScoreBar({ label, score, max, large = false }) {
  const percentage = Math.round((score / max) * 100);

  // Color changes based on how good the score is - simple traffic-light logic
  const getColor = (pct) => {
    if (pct >= 75) return "#16a34a"; // green
    if (pct >= 50) return "#f59e0b"; // amber
    return "#dc2626"; // red
  };

  const barColor = getColor(percentage);

  return (
    <div style={{ marginBottom: large ? "16px" : "12px" }}>
      <div style={styles.labelRow}>
        <span style={large ? styles.labelLarge : styles.label}>{label}</span>
        <span style={{ ...styles.scoreText, color: barColor }}>
          {score} / {max}
        </span>
      </div>
      <div style={styles.track}>
        <div
          style={{
            ...styles.fill,
            width: `${percentage}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
    </div>
  );
}

const styles = {
  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  label: {
    fontSize: "13px",
    color: "#374151",
  },
  labelLarge: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#111827",
  },
  scoreText: {
    fontSize: "13px",
    fontWeight: "700",
  },
  track: {
    width: "100%",
    height: "10px",
    backgroundColor: "#e5e7eb",
    borderRadius: "6px",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: "6px",
    transition: "width 0.4s ease",
  },
};

export default ScoreBar;