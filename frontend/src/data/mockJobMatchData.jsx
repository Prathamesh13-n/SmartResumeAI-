// MOCK JOB MATCH DATA
// Simulates what the real backend will return after comparing the user's
// resume against a pasted job description. Same principle as mockAnalysisData:
// keep this exact shape so swapping in the real backend later is a one-line change.

export function getMockJobMatch(jobDescriptionText) {
  return {
    matchPercentage: 71,

    // Skills/keywords from the job description that WERE found in the resume
    matchedSkills: ["React", "JavaScript", "HTML", "CSS", "Git"],

    // Skills/keywords from the job description that were NOT found in the resume
    missingSkills: ["REST API", "TypeScript"],

    // Suggestions generated from the comparison
    suggestions: [
      "Highlight REST API experience in your projects if you genuinely have it.",
      "Consider learning TypeScript if it's a hard requirement and you don't currently have the skill.",
      "Emphasize React and JavaScript projects near the top of your resume since they're strongly required.",
    ],
  };
}