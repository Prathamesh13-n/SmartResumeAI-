"""
Compares extracted text against the professional keywords database,
splitting them into "detected" (found in the resume) and "missing"
(useful keywords that weren't found).
"""

import re
from app.data.keywords_database import KEYWORDS_DATABASE


def analyze_keywords(text):
    """
    Returns a dict: { "detected": [...], "missing": [...] }
    """
    if not text:
        return {"detected": [], "missing": KEYWORDS_DATABASE.copy()}

    text_lower = text.lower()
    detected = []
    missing = []

    for keyword in KEYWORDS_DATABASE:
        pattern = r"\b" + re.escape(keyword.lower()) + r"\b"
        if re.search(pattern, text_lower):
            detected.append(keyword)
        else:
            missing.append(keyword)

    return {"detected": detected, "missing": missing}