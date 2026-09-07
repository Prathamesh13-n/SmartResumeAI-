// MOCK DASHBOARD DATA
// Simulates a summary view pulling together results from the Builder,
// Analyzer, and Job Match pages. Later, this will be replaced by real
// data fetched from the backend (e.g. the user's saved resume + their
// most recent analysis results stored in the database).

export function getMockDashboardData() {
  return {
    resumeScore: 78, // how complete/well-filled the resume builder is
    atsScore: 72, // most recent ATS analysis score
    jobMatchPercentage: 71, // most recent job match score
    detectedSkillsCount: 5,

    topSuggestions: [
      "Add measurable achievements where possible.",
      "Highlight REST API experience if you genuinely have it.",
      "Add more specific project details and outcomes.",
    ],

    // A simple history of past analyses, newest first
    recentAnalyses: [
      { id: 1, fileName: "John_Doe_Resume.pdf", date: "2026-08-20", atsScore: 72 },
      { id: 2, fileName: "Resume_Draft_v2.docx", date: "2026-08-15", atsScore: 65 },
      { id: 3, fileName: "Resume_Draft_v1.pdf", date: "2026-08-10", atsScore: 58 },
    ],
  };
}