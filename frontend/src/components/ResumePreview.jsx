// This component just DISPLAYS data — it receives everything as props
// and renders it to look like a real resume. It doesn't manage any state itself.
function ResumePreview({ personalInfo, summary, educationList, skillsList, projectsList, experienceList }) {
  return (
    <div style={styles.resumePaper}>
      {/* ---------- HEADER ---------- */}
      <div style={styles.header}>
        <h1 style={styles.name}>{personalInfo.fullName || "Your Name"}</h1>
        <p style={styles.contactLine}>
          {[personalInfo.email, personalInfo.phone, personalInfo.location]
            .filter(Boolean)
            .join(" | ")}
        </p>
        <p style={styles.contactLine}>
          {[personalInfo.linkedin, personalInfo.github, personalInfo.portfolio]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </div>

      {/* ---------- SUMMARY ---------- */}
      {summary && (
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Professional Summary</h2>
          <p style={styles.text}>{summary}</p>
        </div>
      )}

      {/* ---------- EDUCATION ---------- */}
      {educationList.some((edu) => edu.college) && (
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Education</h2>
          {educationList.map(
            (edu, index) =>
              edu.college && (
                <div key={index} style={styles.entry}>
                  <div style={styles.entryRow}>
                    <strong>{edu.college}</strong>
                    <span>{edu.startYear} - {edu.endYear}</span>
                  </div>
                  <p style={styles.text}>
                    {[edu.degree, edu.branch].filter(Boolean).join(", ")}
                    {edu.cgpa && ` | CGPA: ${edu.cgpa}`}
                  </p>
                </div>
              )
          )}
        </div>
      )}

      {/* ---------- SKILLS ---------- */}
      {skillsList.some((skill) => skill.trim()) && (
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Skills</h2>
          <p style={styles.text}>
            {skillsList.filter((skill) => skill.trim()).join(" • ")}
          </p>
        </div>
      )}

      {/* ---------- PROJECTS ---------- */}
      {projectsList.some((proj) => proj.name) && (
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Projects</h2>
          {projectsList.map(
            (proj, index) =>
              proj.name && (
                <div key={index} style={styles.entry}>
                  <div style={styles.entryRow}>
                    <strong>{proj.name}</strong>
                  </div>
                  {proj.technologies && (
                    <p style={styles.techLine}>{proj.technologies}</p>
                  )}
                  {proj.description && <p style={styles.text}>{proj.description}</p>}
                  <p style={styles.linkLine}>
                    {[proj.githubLink, proj.liveLink].filter(Boolean).join("  |  ")}
                  </p>
                </div>
              )
          )}
        </div>
      )}

      {/* ---------- EXPERIENCE ---------- */}
      {experienceList.some((exp) => exp.company) && (
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Experience</h2>
          {experienceList.map(
            (exp, index) =>
              exp.company && (
                <div key={index} style={styles.entry}>
                  <div style={styles.entryRow}>
                    <strong>{exp.role}</strong>
                    <span>{exp.duration}</span>
                  </div>
                  <p style={styles.techLine}>{exp.company}</p>
                  {exp.responsibilities && <p style={styles.text}>{exp.responsibilities}</p>}
                  {exp.achievements && <p style={styles.text}>{exp.achievements}</p>}
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  resumePaper: {
    backgroundColor: "#fff",
    padding: "40px",
    minHeight: "1000px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Georgia, serif",
    color: "#1f2937",
  },
  header: {
    textAlign: "center",
    borderBottom: "2px solid #1f2937",
    paddingBottom: "12px",
    marginBottom: "20px",
  },
  name: {
    fontSize: "26px",
    margin: "0 0 6px 0",
  },
  contactLine: {
    fontSize: "13px",
    color: "#4b5563",
    margin: "2px 0",
  },
  section: {
    marginBottom: "18px",
  },
  sectionHeading: {
    fontSize: "15px",
    textTransform: "uppercase",
    borderBottom: "1px solid #d1d5db",
    paddingBottom: "4px",
    marginBottom: "8px",
    letterSpacing: "0.5px",
  },
  entry: {
    marginBottom: "10px",
  },
  entryRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
  },
  text: {
    fontSize: "13px",
    color: "#374151",
    margin: "4px 0",
    lineHeight: "1.5",
  },
  techLine: {
    fontSize: "13px",
    fontStyle: "italic",
    color: "#4b5563",
    margin: "2px 0",
  },
  linkLine: {
    fontSize: "12px",
    color: "#2563eb",
    margin: "2px 0",
  },
};

export default ResumePreview;