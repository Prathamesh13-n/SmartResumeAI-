import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>SmartResume AI</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/builder" style={styles.link}>Create Resume</Link>
        <Link to="/analyze" style={styles.link}>Analyze Resume</Link>
        <Link to="/job-match" style={styles.link}>Job Match</Link>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    backgroundColor: "#1f2937",
    color: "#fff",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    gap: "24px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "15px",
  },
};

export default Navbar; 