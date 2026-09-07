"""
Detects which standard resume sections are present, and pulls out
basic contact information (email, phone) using simple pattern matching.
"""

import re


def detect_sections(text):
    """
    Checks for the presence of standard resume section headings/content.
    Returns a list of section names that were found.
    """
    if not text:
        return []

    text_lower = text.lower()
    sections_found = []

    # Contact info: consider it present if we can find an email OR phone
    if has_email(text) or has_phone(text):
        sections_found.append("Contact Information")

    education_keywords = ["education", "university", "college", "bachelor",
                           "b.tech", "b.e.", "degree", "cgpa", "gpa"]
    if any(keyword in text_lower for keyword in education_keywords):
        sections_found.append("Education")

    skills_keywords = ["skills", "technical skills", "technologies"]
    if any(keyword in text_lower for keyword in skills_keywords):
        sections_found.append("Skills")

    projects_keywords = ["projects", "project"]
    if any(keyword in text_lower for keyword in projects_keywords):
        sections_found.append("Projects")

    experience_keywords = ["experience", "internship", "work history"]
    if any(keyword in text_lower for keyword in experience_keywords):
        sections_found.append("Experience")

    return sections_found


def has_email(text):
    """Returns True if the text contains something that looks like an email address."""
    pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    return bool(re.search(pattern, text))


def has_phone(text):
    """
    Returns True if the text contains something that looks like a phone number.
    Matches common formats like +91 9876543210, (123) 456-7890, 123-456-7890, etc.
    """
    pattern = r"(\+?\d{1,3}[\s-]?)?\(?\d{3,5}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}"
    return bool(re.search(pattern, text))