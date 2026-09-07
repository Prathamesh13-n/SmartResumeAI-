"""
Compares extracted resume text against our skills database.
Only returns skills that are ACTUALLY present in the text - never guesses
or adds skills that weren't found, per the project's core requirement.
"""

import re
from app.data.skills_database import SKILLS_DATABASE


def detect_skills(text):
    """
    Returns a list of skills from SKILLS_DATABASE that appear in the
    given text. Matching is case-insensitive and uses word boundaries
    so "Java" doesn't accidentally match inside "JavaScript".
    """
    if not text:
        return []

    detected = []
    text_lower = text.lower()

    for skill in SKILLS_DATABASE:
        skill_lower = skill.lower()

        # \b = word boundary. re.escape() handles skills with special
        # characters like "C++" or "C#" safely.
        pattern = r"\b" + re.escape(skill_lower) + r"\b"

        if re.search(pattern, text_lower):
            detected.append(skill)

    return detected