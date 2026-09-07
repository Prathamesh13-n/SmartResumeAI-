function Features() {
  const features = [
    {
      title: "Resume Builder",
      description: "Fill a simple form and see your resume update live, in real time.",
    },
    {
      title: "ATS Checker",
      description: "Get a dynamic ATS score based on your actual resume content.",
    },
    {
      title: "Skill Detection",
      description: "Automatically detect the technical skills present in your resume.",
    },
    {
      title: "Job Match",
      description: "Paste a job description and see how well your resume matches it.",
    },
  ];

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>What SmartResume AI Does</h2>
      <div style={styles.grid}>
        {features.map((feature, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.cardTitle}>{feature.title}</h3>
            <p style={styles.cardText}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "60px 40px",
  },
  heading: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "40px",
    color: "#111827",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
  },
  card: {
    padding: "24px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontSize: "18px",
    marginBottom: "8px",
    color: "#111827",
  },
  cardText: {
    fontSize: "14px",
    color: "#6b7280",
  },
};

export default Features;