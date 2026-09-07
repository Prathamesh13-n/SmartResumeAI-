"""
Compares a resume's text against a job description's text to calculate
a match score, matched skills, and missing skills.

Approach: we reuse the same skill detector to find skills mentioned in
BOTH texts. Skills required by the job = skills found in the job
description. Skills the candidate has = skills found in the resume.
Matched = skills in both. Missing = required skills not in the resume.
"""

from app.analyzer.skill_detector import detect_skills


def match_resume_to_job(resume_text, job_description_text):
    resume_skills = set(detect_skills(resume_text))
    required_skills = set(detect_skills(job_description_text))

    matched_skills = sorted(resume_skills & required_skills)
    missing_skills = sorted(required_skills - resume_skills)

    if len(required_skills) == 0:
        match_percentage = 0
    else:
        match_percentage = round((len(matched_skills) / len(required_skills)) * 100)

    suggestions = generate_job_match_suggestions(matched_skills, missing_skills)

    return {
        "matchPercentage": match_percentage,
        "matchedSkills": matched_skills,
        "missingSkills": missing_skills,
        "suggestions": suggestions,
    }


def generate_job_match_suggestions(matched_skills, missing_skills):
    suggestions = []

    if missing_skills:
        skills_list = ", ".join(missing_skills[:3])
        suggestions.append(
            f"Consider learning {skills_list} if these are required and you don't currently have them."
        )

    if matched_skills:
        top_skill = matched_skills[0]
        suggestions.append(
            f"Highlight your {top_skill} experience prominently since it's a strong match for this role."
        )

    if not missing_skills and matched_skills:
        suggestions.append(
            "Great match! Your resume covers all the key skills mentioned in this job description."
        )

    if not matched_skills and not missing_skills:
        suggestions.append(
            "We couldn't detect specific technical skills in the job description. "
            "Try pasting the full requirements section for a more accurate match."
        )

    return suggestions