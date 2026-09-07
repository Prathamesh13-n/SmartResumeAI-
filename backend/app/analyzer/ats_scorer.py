"""
Calculates a dynamic ATS score out of 100, broken down by category.
Every score here is computed FROM the actual detected results passed in -
nothing is ever hardcoded, per the project's core requirement.

Point breakdown (matches the project spec):
  Contact Information : 15
  Education            : 15
  Skills                : 20
  Projects/Experience   : 20
  Keywords              : 15
  Formatting            : 15
  ---------------------------
  Total                : 100
"""

from app.analyzer.section_detector import has_email, has_phone


def score_contact_info(text):
    """Full 15 if both email and phone found, partial credit otherwise."""
    score = 0
    if has_email(text):
        score += 8
    if has_phone(text):
        score += 7
    return score


def score_education(detected_sections):
    return 15 if "Education" in detected_sections else 0


def score_skills(detected_skills):
    """
    2 points per detected skill, capped at 20.
    (i.e. 10+ distinct skills = full marks)
    """
    return min(20, len(detected_skills) * 2)


def score_projects_experience(detected_sections):
    """
    10 points each for Projects and Experience being present,
    capped at 20 total.
    """
    score = 0
    if "Projects" in detected_sections:
        score += 10
    if "Experience" in detected_sections:
        score += 10
    return min(20, score)


def score_keywords(keyword_analysis):
    """
    Scaled based on how many of the tracked keywords were found,
    out of a maximum of 15.
    """
    detected_count = len(keyword_analysis["detected"])
    total_count = detected_count + len(keyword_analysis["missing"])

    if total_count == 0:
        return 0

    return round((detected_count / total_count) * 15)


def score_formatting(text, detected_sections):
    """
    Basic ATS-friendliness check:
    - At least 3 of the 5 standard sections are present (10 points)
    - Resume has a reasonable amount of content, not too short (5 points)
    """
    score = 0

    if len(detected_sections) >= 3:
        score += 10
    elif len(detected_sections) >= 1:
        score += 5

    word_count = len(text.split()) if text else 0
    if word_count >= 150:
        score += 5
    elif word_count >= 80:
        score += 3

    return min(15, score)


def calculate_ats_score(text, detected_skills, detected_sections, keyword_analysis):
    """
    Runs all the individual scoring functions and combines them into
    the final breakdown + overall score.
    """
    contact_score = score_contact_info(text)
    education_score = score_education(detected_sections)
    skills_score = score_skills(detected_skills)
    projects_score = score_projects_experience(detected_sections)
    keywords_score = score_keywords(keyword_analysis)
    formatting_score = score_formatting(text, detected_sections)

    overall = (
        contact_score + education_score + skills_score +
        projects_score + keywords_score + formatting_score
    )

    return {
        "overall": overall,
        "breakdown": [
            {"category": "Contact Information", "score": contact_score, "max": 15},
            {"category": "Education", "score": education_score, "max": 15},
            {"category": "Skills", "score": skills_score, "max": 20},
            {"category": "Projects / Experience", "score": projects_score, "max": 20},
            {"category": "Keywords", "score": keywords_score, "max": 15},
            {"category": "Formatting", "score": formatting_score, "max": 15},
        ],
    }