// A small card showing one key number - used for the top row of the Dashboard
// (Resume Score, ATS Score, Job Match %, Skills Detected)
function StatCard({ label, value, suffix = "", color = "#2563eb" }) {
  return (
    <div style={styles.card}>
      <div style={{ ...styles.value, color }}>
        {value}
        {suffix}
      </div>
      <div style={styles.label}>{label}</div>
    </div>
  );
}

const styles = {
  card: {
    flex: "1",
    minWidth: "150px",
    padding: "20px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  value: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "6px",
  },
  label: {
    fontSize: "13px",
    color: "#6b7280",
  },
};

export default StatCard;