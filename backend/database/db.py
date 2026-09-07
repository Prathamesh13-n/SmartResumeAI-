"""
Handles all SQLite database operations for saved resume analyses.
Uses Python's built-in sqlite3 module directly (no ORM) to keep things
simple and easy to understand for a student project.
"""

import sqlite3
import json
import os
from datetime import datetime

# The database file lives in backend/database/smartresume.db
DB_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "database", "smartresume.db")


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # lets us access columns by name
    return conn


def init_db():
    """Creates the analyses table if it doesn't already exist. Safe to call every startup."""
    conn = get_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS analyses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            file_name TEXT NOT NULL,
            detected_skills TEXT NOT NULL,
            ats_score TEXT NOT NULL,
            keyword_analysis TEXT NOT NULL,
            suggestions TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()


def save_analysis(file_name, detected_skills, ats_score, keyword_analysis, suggestions):
    """
    Saves one analysis result to the database.
    Complex fields (lists/dicts) are stored as JSON text since SQLite
    doesn't have a native list/dict column type.
    """
    conn = get_connection()
    conn.execute(
        """
        INSERT INTO analyses (file_name, detected_skills, ats_score, keyword_analysis, suggestions, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            file_name,
            json.dumps(detected_skills),
            json.dumps(ats_score),
            json.dumps(keyword_analysis),
            json.dumps(suggestions),
            datetime.now().isoformat(),
        ),
    )
    conn.commit()
    conn.close()


def get_recent_analyses(limit=5):
    """Returns the most recent N analyses, newest first, with JSON fields parsed back into Python objects."""
    conn = get_connection()
    rows = conn.execute(
        "SELECT * FROM analyses ORDER BY id DESC LIMIT ?", (limit,)
    ).fetchall()
    conn.close()

    results = []
    for row in rows:
        results.append({
            "id": row["id"],
            "fileName": row["file_name"],
            "detectedSkills": json.loads(row["detected_skills"]),
            "atsScore": json.loads(row["ats_score"]),
            "keywordAnalysis": json.loads(row["keyword_analysis"]),
            "suggestions": json.loads(row["suggestions"]),
            "createdAt": row["created_at"],
        })
    return results