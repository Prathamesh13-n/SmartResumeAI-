// MOCK ANALYSIS DATA
// This simulates what the real backend will eventually return after
// analyzing an uploaded resume. Keeping this exact shape means that when
// the real backend is built later, we only need to swap the data SOURCE
// (mock -> real API call) - none of the display components need to change.

export function getMockAnalysis(fileName) {
  return {
    fileName: fileName,

    // A short preview of the text extracted from the PDF/DOCX
    extractedTextPreview:
      "John Doe\nSoftware Developer\nEmail: john.doe@email.com | Phone: +91 98765 43210\n\n" +
      "EDUCATION\nB.Tech in Computer Science, ABC University (2022-2026)\n\n" +
      "SKILLS\nPython, JavaScript, React, Git, SQL\n\n" +
      "PROJECTS\nSmartResume AI - A resume builder and ATS analyzer platform...",

    // Which standard resume sections were found in the document
    detectedSections: [
      "Contact Information",
      "Education",
      "Skills",
      "Projects",
    ],

    // Skills found by comparing extracted text against the skill database
    detectedSkills: ["Python", "JavaScript", "React", "Git", "SQL"],

    // Dynamic ATS score, broken down by category (adds up to 100)
    atsScore: {
      overall: 72,
      breakdown: [
        { category: "Contact Information", score: 15, max: 15 },
        { category: "Education", score: 15, max: 15 },
        { category: "Skills", score: 16, max: 20 },
        { category: "Projects / Experience", score: 12, max: 20 },
        { category: "Keywords", score: 8, max: 15 },
        { category: "Formatting", score: 6, max: 15 },
      ],
    },

    // Professional keywords found vs missing in the resume
    keywordAnalysis: {
      detected: ["Git", "Database"],
      missing: ["REST API", "Problem Solving", "Team Collaboration", "Project Development"],
    },

    // Estimated genericness / AI-style writing indicator (always framed as an estimate)
    aiStyleEstimate: {
      percentage: 38,
      style: "Mixed",
      explanation:
        "Some sections use generic phrasing. Adding specific project details, measurable outcomes, and concrete numbers would make the resume feel more personalized and specific to you.",
    },

    // Suggestions generated from the analysis above
    suggestions: [
      "Add measurable achievements where possible (e.g. 'improved load time by 30%').",
      "Highlight relevant keywords like REST API or Team Collaboration if you genuinely have that experience.",
      "Add more detail to your project descriptions — specific technologies, your exact contribution, and outcomes.",
      "Consider adding an Experience or Internship section if you have any relevant experience.",
    ],
  };
}