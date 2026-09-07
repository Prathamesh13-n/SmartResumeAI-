"""
Generates improvement suggestions based on the ACTUAL analysis results -
never generic hardcoded advice unrelated to what was found.
"""


def generate_suggestions(detected_skills, detected_sections, keyword_analysis, ats_score):
    suggestions = []

    if "Projects" not in detected_sections:
        suggestions.append(
            "Add academic or personal projects with technologies used and your specific contribution."
        )

    if "Experience" not in detected_sections:
        suggestions.append(
            "Consider adding an Experience or Internship section if you have any relevant experience."
        )

    if len(detected_skills) < 5:
        suggestions.append(
            "Add more technical skills that you genuinely possess - only 5+ detected skills score well."
        )

    if len(keyword_analysis["missing"]) > len(keyword_analysis["detected"]):
        suggestions.append(
            "Consider highlighting more relevant keywords from the job field, "
            "but only if they accurately describe your real experience."
        )

    if "Contact Information" not in detected_sections:
        suggestions.append(
            "Make sure your email and phone number are clearly visible near the top of your resume."
        )

    formatting_score = next(
        (item["score"] for item in ats_score["breakdown"] if item["category"] == "Formatting"),
        0
    )
    if formatting_score < 10:
        suggestions.append(
            "Use clear section headings (Education, Skills, Projects, Experience) "
            "and ensure your resume has enough detail - avoid very short sections."
        )

    if not suggestions:
        suggestions.append(
            "Your resume covers the key sections well. Consider adding measurable "
            "achievements (e.g. numbers, percentages) to strengthen it further."
        )

    return suggestions