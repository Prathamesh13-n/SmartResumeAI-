"""
Route that supplies real data for the Dashboard page, built from
whatever analyses have actually been saved to the database.
"""

from flask import Blueprint, jsonify
from app.database.db import get_recent_analyses

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/api/dashboard", methods=["GET"])
def dashboard_data():
    recent = get_recent_analyses(limit=5)

    if not recent:
        return jsonify({
            "hasData": False,
            "atsScore": None,
            "detectedSkillsCount": None,
            "topSuggestions": [],
            "recentAnalyses": [],
        })

    latest = recent[0]

    return jsonify({
        "hasData": True,
        "atsScore": latest["atsScore"]["overall"],
        "detectedSkillsCount": len(latest["detectedSkills"]),
        "topSuggestions": latest["suggestions"][:3],
        "recentAnalyses": [
            {
                "id": item["id"],
                "fileName": item["fileName"],
                "date": item["createdAt"][:10],
                "atsScore": item["atsScore"]["overall"],
            }
            for item in recent
        ],
    })
