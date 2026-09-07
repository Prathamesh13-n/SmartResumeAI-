import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StatCard from "../components/StatCard";

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // Fetch real dashboard data from the backend when this page loads
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard")
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load dashboard data:", error);
        setLoadError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div style={styles.page}>
        <p style={styles.loadingText}>Loading dashboard...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div style={styles.page}>
        <p style={styles.loadingText}>
          Could not load dashboard data. Make sure the backend is running on port 5000.
        </p>
      </div>
    );
  }

  if (!data.hasData) {
    return (
      <div style={styles.page}>
        <h1 style={styles.heading}>Dashboard</h1>
        <p style={styles.subheading}>
          No analyses yet. Run your first resume analysis to see your stats here.
        </p>
        <button style={styles.actionBtnPrimary} onClick={() => navigate("/analyze")}>
          Analyze a Resume
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Dashboard</h1>
      <p style={styles.subheading}>
        A quick summary of your most recent resume analysis and activity.
      </p>

      {/* ---------- TOP STATS ROW ---------- */}
      <div style={styles.statsRow}>
        <StatCard label="Latest ATS Score" value={data.atsScore} suffix="%" color="#16a34a" />
        <StatCard label="Skills Detected" value={data.detectedSkillsCount} color="#f59e0b" />
      </div>

      {/* ---------- QUICK ACTIONS ---------- */}
      <div style={styles.actionsRow}>
        <button style={styles.actionBtnPrimary} onClick={() => navigate("/builder")}>
          Continue Building Resume
        </button>
        <button style={styles.actionBtnSecondary} onClick={() => navigate("/analyze")}>
          Run New Analysis
        </button>
        <button style={styles.actionBtnSecondary} onClick={() => navigate("/job-match")}>
          Check Job Match
        </button>
      </div>

      {/* ---------- TOP SUGGESTIONS ---------- */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Top Improvement Suggestions</h2>
        <ul style={styles.suggestionList}>
          {data.topSuggestions.map((suggestion, index) => (
            <li key={index} style={styles.suggestionItem}>
              {suggestion}
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- RECENT ANALYSES ---------- */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Recent Analyses</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>File Name</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>ATS Score</th>
            </tr>
          </thead>
          <tbody>
            {data.recentAnalyses.map((analysis) => (
              <tr key={analysis.id}>
                <td style={styles.td}>{analysis.fileName}</td>
                <td style={styles.td}>{analysis.date}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.scoreBadge,
                      backgroundColor:
                        analysis.atsScore >= 75
                          ? "#dcfce7"
                          : analysis.atsScore >= 50
                          ? "#fef3c7"
                          : "#fee2e2",
                      color:
                        analysis.atsScore >= 75
                          ? "#15803d"
                          : analysis.atsScore >= 50
                          ? "#b45309"
                          : "#b91c1c",
                    }}
                  >
                    {analysis.atsScore}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: "900px",
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
  loadingText: {
    fontSize: "14px",
    color: "#6b7280",
    textAlign: "center",
    marginTop: "60px",
  },
  statsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "24px",
  },
  actionsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "24px",
  },
  actionBtnPrimary: {
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: "600",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  actionBtnSecondary: {
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: "600",
    backgroundColor: "#fff",
    color: "#2563eb",
    border: "2px solid #2563eb",
    borderRadius: "8px",
    cursor: "pointer",
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
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    fontSize: "12px",
    color: "#6b7280",
    padding: "8px",
    borderBottom: "2px solid #e5e7eb",
  },
  td: {
    fontSize: "13px",
    color: "#374151",
    padding: "10px 8px",
    borderBottom: "1px solid #f3f4f6",
  },
  scoreBadge: {
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "700",
  },
};

export default Dashboard;