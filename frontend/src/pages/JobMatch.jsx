import { useState } from "react";
import axios from "axios";
import ScoreBar from "../components/ScoreBar";

function JobMatch() {
  // The resume file the user uploads
  const [selectedFile, setSelectedFile] = useState(null);

  // The job description text the user pastes in
  const [jobDescription, setJobDescription] = useState("");

  // Whether we're calling the backend
  const [isMatching, setIsMatching] = useState(false);

  // The match results - null until matching has been run
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setResults(null);
    }
  };

  const canMatch = selectedFile && jobDescription.trim() && !isMatching;

  const handleMatch = async () => {
    if (!canMatch) return;

    setIsMatching(true);

    try {
      const formData = new FormData();
      formData.append("resume", selectedFile);
      formData.append("jobDescription", jobDescription);

      const response = await axios.post("http://localhost:5000/api/job-match", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResults(response.data);
    } catch (error) {
      console.error("Job match failed:", error);
      if (error.response) {
        alert(error.response.data.error || "Something went wrong comparing your resume.");
      } else {
        alert("Could not reach the backend. Make sure the Flask server is running on port 5000.");
      }
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Resume vs Job Description Match</h1>
      <p style={styles.subheading}>
        Upload your resume and paste a job description to see how well they match.
      </p>

      {/* ---------- RESUME UPLOAD ---------- */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Your Resume</h2>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          id="jobMatchFileInput"
          style={{ display: "none" }}
        />
        <label htmlFor="jobMatchFileInput" style={styles.uploadLabel}>
          {selectedFile ? "Change File" : "Choose PDF or DOCX File"}
        </label>
        {selectedFile && <p style={styles.fileName}>Selected: {selectedFile.name}</p>}
      </div>

      {/* ---------- JOB DESCRIPTION INPUT ---------- */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Job Description</h2>
        <textarea
          style={styles.textarea}
          placeholder="Paste the job description here (e.g. required skills, responsibilities)..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={8}
        />
        <button
          style={{
            ...styles.matchBtn,
            opacity: canMatch ? 1 : 0.5,
            cursor: canMatch ? "pointer" : "not-allowed",
          }}
          onClick={handleMatch}
          disabled={!canMatch}
        >
          {isMatching ? "Matching..." : "Compare With My Resume"}
        </button>
      </div>

      {/* ---------- RESULTS ---------- */}
      {results && (
        <div style={styles.resultsWrapper}>
          {/* Match Percentage */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Job Match Score</h2>
            <ScoreBar
              label="Overall Match"
              score={results.matchPercentage}
              max={100}
              large
            />
          </div>

          {/* Matched Skills */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Matched Skills</h2>
            {results.matchedSkills.length > 0 ? (
              <div style={styles.chipRow}>
                {results.matchedSkills.map((skill, index) => (
                  <span key={index} style={styles.chipGreen}>
                    ✓ {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p style={styles.noResultsText}>No matching skills detected.</p>
            )}
          </div>

          {/* Missing Skills */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Missing Skills / Keywords</h2>
            {results.missingSkills.length > 0 ? (
              <>
                <div style={styles.chipRow}>
                  {results.missingSkills.map((skill, index) => (
                    <span key={index} style={styles.chipRed}>
                      {skill}
                    </span>
                  ))}
                </div>
                <p style={styles.noteText}>
                  Only add these to your resume if you genuinely have experience with them.
                </p>
              </>
            ) : (
              <p style={styles.noResultsText}>No missing skills detected - great match!</p>
            )}
          </div>

          {/* Suggestions */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Suggestions</h2>
            <ul style={styles.suggestionList}>
              {results.suggestions.map((suggestion, index) => (
                <li key={index} style={styles.suggestionItem}>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "8px",
    color: "#111827",
  },
  subheading: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "24px",
  },
  card: {
    padding: "24px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    backgroundColor: "#fff",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "17px",
    marginBottom: "14px",
    color: "#111827",
  },
  uploadLabel: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#2563eb",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  fileName: {
    marginTop: "12px",
    fontSize: "14px",
    color: "#374151",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontFamily: "inherit",
    marginBottom: "16px",
  },
  matchBtn: {
    display: "block",
    margin: "0 auto",
    padding: "10px 24px",
    fontSize: "14px",
    fontWeight: "600",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },
  resultsWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  chipRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  chipGreen: {
    fontSize: "12px",
    padding: "6px 12px",
    backgroundColor: "#dcfce7",
    color: "#15803d",
    borderRadius: "20px",
    fontWeight: "600",
  },
  chipRed: {
    fontSize: "12px",
    padding: "6px 12px",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "20px",
    fontWeight: "600",
  },
  noResultsText: {
    fontSize: "13px",
    color: "#6b7280",
    fontStyle: "italic",
  },
  noteText: {
    fontSize: "12px",
    color: "#9ca3af",
    marginTop: "12px",
    fontStyle: "italic",
  },
  suggestionList: {
    margin: 0,
    paddingLeft: "20px",
  },
  suggestionItem: {
    fontSize: "13px",
    color: "#374151",
    marginBottom: "10px",
    lineHeight: "1.5",
  },
};

export default JobMatch;