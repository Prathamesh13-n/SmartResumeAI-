"""
Estimates how "generic" or template-like a resume's writing sounds, versus
how specific and personalized it is. This is intentionally framed as an
ESTIMATE - it does NOT claim to detect whether text was written by AI.

Approach:
- Count occurrences of common generic/cliche resume phrases (negative signal)
- Count concrete, specific details: numbers, percentages, named technologies,
  and multi-word capitalized phrases that look like project/company names
  (positive signal)
- Combine these into a 0-100 "genericness" percentage
"""

import re
from app.analyzer.skill_detector import detect_skills


GENERIC_PHRASES = [
    "hard-working", "hardworking", "team player", "detail-oriented",
    "detail oriented", "results-driven", "results driven",
    "passionate about", "responsible for", "duties included",
    "seeking opportunities", "excellent communication skills",
    "strong work ethic", "fast learner", "self-motivated",
    "go-getter", "think outside the box", "proven track record",
    "dynamic individual", "highly motivated", "works well independently",
    "works well in a team", "familiar with", "exposure to",
]


def count_generic_phrases(text_lower):
    count = 0
    matched_phrases = []
    for phrase in GENERIC_PHRASES:
        occurrences = text_lower.count(phrase)
        if occurrences > 0:
            count += occurrences
            matched_phrases.append(phrase)
    return count, matched_phrases


def count_numbers_and_percentages(text):
    """Counts things like '30%', '2 years', '500 users' - concrete metrics."""
    percentage_matches = re.findall(r"\d+(\.\d+)?%", text)
    number_matches = re.findall(r"\b\d{2,}\b", text)  # 2+ digit numbers
    return len(percentage_matches) + len(number_matches)


def count_capitalized_phrases(text):
    """
    Rough heuristic for proper nouns like project names or company names:
    sequences of 2+ capitalized words in a row (e.g. "Fake Note Detection").
    """
    pattern = r"\b([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+){1,4})\b"
    matches = re.findall(pattern, text)
    return len(matches)


def estimate_ai_style(text):
    if not text or len(text.strip()) < 20:
        return {
            "percentage": 0,
            "style": "Not enough text",
            "explanation": "There wasn't enough text extracted to estimate writing style.",
        }

    text_lower = text.lower()

    generic_count, matched_phrases = count_generic_phrases(text_lower)
    metric_count = count_numbers_and_percentages(text)
    proper_noun_count = count_capitalized_phrases(text)
    skill_count = len(detect_skills(text))

    # Positive indicators reduce the genericness score
    positive_signal = (metric_count * 4) + (proper_noun_count * 2) + (skill_count * 2)

    # Negative indicators increase it
    negative_signal = generic_count * 10

    # Combine into a 0-100 percentage. Base of 20 means even a "clean" resume
    # isn't assumed to be 0% generic - some standard phrasing is normal.
    raw_score = 20 + negative_signal - positive_signal
    percentage = max(0, min(100, raw_score))

    if percentage < 30:
        style = "Specific"
    elif percentage < 60:
        style = "Mixed"
    else:
        style = "Generic"

    explanation = build_explanation(percentage, matched_phrases, metric_count, skill_count)

    return {
        "percentage": percentage,
        "style": style,
        "explanation": explanation,
    }


def build_explanation(percentage, matched_phrases, metric_count, skill_count):
    parts = []

    if matched_phrases:
        example_phrases = ", ".join(f'"{p}"' for p in matched_phrases[:3])
        parts.append(f"Found some commonly overused phrases (e.g. {example_phrases}).")
    else:
        parts.append("No overly generic phrases were detected.")

    if metric_count == 0:
        parts.append("No measurable numbers or percentages were found - adding concrete metrics (e.g. '30% faster', '500+ users') would help.")
    else:
        parts.append(f"Found {metric_count} numeric detail(s), which adds specificity.")

    if skill_count > 0:
        parts.append(f"{skill_count} specific technologies were mentioned, which is a good sign of concrete content.")

    return " ".join(parts)