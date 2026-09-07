import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ScoreBar from "../components/ScoreBar";
import { guessNameFromText } from "../utils/pdfExtractor";

function Analyzer() {
  const navigate = useNavigate();

  // The file the user selected (just the File object, not its content yet)
  const [selectedFile, setSelectedFile] = useState(null);

  // Whether we're in the middle of analyzing
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // The analysis results - null until analysis has been run
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setResults(null); // clear old results if a new file is chosen
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);

    try {
      // Build a FormData object - this is how files are sent over HTTP.
      // "resume" here must match request.files["resume"] on the Flask side.
      const formData = new FormData();
      formData.append("resume", selectedFile);

      // Real API call to our Flask backend - it extracts text AND runs
      // real skill detection, section detection, keyword analysis, and
      // ATS scoring on it (all calculated from the actual uploaded file).
      const response = await axios.post("http://localhost:5000/api/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const realExtractedText = response.data.extractedText;
      const detectedName = guessNameFromText(realExtractedText);

      const realResult = {
        fileName: response.data.fileName,
        detectedName: detectedName,
        extractedTextPreview: realExtractedText.slice(0, 800),
        detectedSections: response.data.detectedSections,
        detectedSkills: response.data.detectedSkills,
        atsScore: response.data.atsScore,
        keywordAnalysis: response.data.keywordAnalysis,
        suggestions: response.data.suggestions,
        aiStyleEstimate: response.data.aiStyleEstimate,
      };

      setResults(realResult);
    } catch (error) {
      console.error("Analysis failed:", error);
      if (error.response) {
        // The backend responded with an error (e.g. unsupported file type)
        alert(error.response.data.error || "Something went wrong analyzing this file.");
      } else {
        // The backend probably isn't running at all
        alert("Could not reach the backend. Make sure the Flask server is running on port 5000.");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Resume Analyzer</h1>
      <p style={styles.subheading}>
        Upload your resume to check its ATS compatibility, detect skills, and get personalized suggestions.
      </p>

      {/* ---------- UPLOAD BOX ---------- */}
      <div style={styles.uploadBox}>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          id="resumeFileInput"
          style={{ display: "none" }}
        />
        <label htmlFor="resumeFileInput" style={styles.uploadLabel}>
          {selectedFile ? "Change File" : "Choose PDF or DOCX File"}
        </label>

        {selectedFile && (
          <p style={styles.fileName}>Selected: {selectedFile.name}</p>
        )}

        <button
          style={{
            ...styles.analyzeBtn,
            opacity: selectedFile && !isAnalyzing ? 1 : 0.5,
            cursor: selectedFile && !isAnalyzing ? "pointer" : "not-allowed",
          }}
          onClick={handleAnalyze}
          disabled={!selectedFile || isAnalyzing}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      {/* ---------- RESULTS (only shown after analysis) ---------- */}
      {results && (
        <div style={styles.resultsWrapper}>
          {/* Detected Name */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Detected Name</h2>
            <p style={styles.detectedName}>{results.detectedName}</p>
          </div>

          {/* Extracted Text */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Extracted Resume Text</h2>
            <pre style={styles.extractedText}>{results.extractedTextPreview}</pre>
          </div>

          {/* Detected Sections */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Detected Sections</h2>
            <div style={styles.chipRow}>
              {results.detectedSections.map((section, index) => (
                <span key={index} style={styles.chipGreen}>
                  ✓ {section}
                </span>
              ))}
            </div>
          </div>

          {/* Detected Skills */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Detected Skills</h2>
            <p style={styles.helperText}>
              Only skills actually found in your resume are shown here.
            </p>
            <div style={styles.chipRow}>
              {results.detectedSkills.map((skill, index) => (
                <span key={index} style={styles.chipBlue}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* ATS Score */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>ATS Score</h2>
            <ScoreBar
              label="Overall Score"
              score={results.atsScore.overall}
              max={100}
              large
            />
            <div style={styles.divider} />
            {results.atsScore.breakdown.map((item, index) => (
              <ScoreBar
                key={index}
                label={item.category}
                score={item.score}
                max={item.max}
              />
            ))}
          </div>

          {/* Keyword Analysis */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Keyword Analysis</h2>
            <p style={styles.subLabel}>Detected Keywords</p>
            <div style={styles.chipRow}>
              {results.keywordAnalysis.detected.map((kw, index) => (
                <span key={index} style={styles.chipGreen}>
                  ✓ {kw}
                </span>
              ))}
            </div>
            <p style={{ ...styles.subLabel, marginTop: "16px" }}>Missing Useful Keywords</p>
            <div style={styles.chipRow}>
              {results.keywordAnalysis.missing.map((kw, index) => (
                <span key={index} style={styles.chipGray}>
                  {kw}
                </span>
              ))}
            </div>
            <p style={styles.noteText}>
              Add a keyword only if you genuinely have experience with it.
            </p>
          </div>

          {/* AI-Style / Generic Content Estimate */}
          {/* AI-Style / Generic Content Estimate */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Estimated Generic / AI-Style Content</h2>
            <ScoreBar
              label={`Writing Style: ${results.aiStyleEstimate.style}`}
              score={results.aiStyleEstimate.percentage}
              max={100}
              large
            />
            <p style={styles.explanationText}>{results.aiStyleEstimate.explanation}</p>
            <p style={styles.noteText}>
              This is an estimate only, not a definitive detection of AI-generated content.
            </p>
          </div>

          {/* Suggestions */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Improvement Suggestions</h2>
            <ul style={styles.suggestionList}>
              {results.suggestions.map((suggestion, index) => (
                <li key={index} style={styles.suggestionItem}>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>

          {/* Link to Job Match */}
          <button style={styles.jobMatchLinkBtn} onClick={() => navigate("/job-match")}>
            Compare With a Job Description →
          </button>
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
  uploadBox: {
    border: "2px dashed #d1d5db",
    borderRadius: "12px",
    padding: "32px",
    textAlign: "center",
    marginBottom: "32px",
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
  analyzeBtn: {
    display: "block",
    margin: "16px auto 0 auto",
    padding: "10px 24px",
    fontSize: "14px",
    fontWeight: "600",
    backgroundColor: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },
  resultsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    padding: "24px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontSize: "17px",
    marginBottom: "14px",
    color: "#111827",
  },
  detectedName: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
  },
  extractedText: {
    fontSize: "13px",
    color: "#374151",
    backgroundColor: "#f9fafb",
    padding: "16px",
    borderRadius: "6px",
    whiteSpace: "pre-wrap",
    fontFamily: "monospace",
    lineHeight: "1.6",
    maxHeight: "220px",
    overflowY: "auto",
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
  chipBlue: {
    fontSize: "12px",
    padding: "6px 12px",
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
    borderRadius: "20px",
    fontWeight: "600",
  },
  chipGray: {
    fontSize: "12px",
    padding: "6px 12px",
    backgroundColor: "#f3f4f6",
    color: "#4b5563",
    borderRadius: "20px",
    fontWeight: "600",
  },
  helperText: {
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "10px",
  },
  subLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
  },
  noteText: {
    fontSize: "12px",
    color: "#9ca3af",
    marginTop: "12px",
    fontStyle: "italic",
  },
  explanationText: {
    fontSize: "13px",
    color: "#374151",
    lineHeight: "1.6",
    marginTop: "12px",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "16px 0",
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
  jobMatchLinkBtn: {
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: "600",
    backgroundColor: "#7c3aed",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Analyzer;