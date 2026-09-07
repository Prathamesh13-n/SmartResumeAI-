import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section style={styles.hero}>
      <h1 style={styles.title}>Build a Resume That Gets You Hired</h1>
      <p style={styles.subtitle}>
        Create a professional resume, check its ATS compatibility, and match it
        against real job descriptions — all in one platform.
      </p>
      <div style={styles.buttons}>
        <button style={styles.primaryBtn} onClick={() => navigate("/builder")}>
          Create Resume
        </button>
        <button style={styles.secondaryBtn} onClick={() => navigate("/analyze")}>
          Analyze Resume
        </button>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    textAlign: "center",
    padding: "80px 20px",
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#111827",
  },
  subtitle: {
    fontSize: "18px",
    color: "#4b5563",
    maxWidth: "600px",
    margin: "0 auto 32px auto",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
  },
  primaryBtn: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#fff",
    color: "#2563eb",
    border: "2px solid #2563eb",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Hero;