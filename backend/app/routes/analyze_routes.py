"""
Routes related to resume upload and analysis.
This now returns REAL analysis results calculated from the actual
uploaded resume - no hardcoded scores or skills.
"""

from flask import Blueprint, request, jsonify
from app.utils.text_extractor import extract_text
from app.analyzer.skill_detector import detect_skills
from app.analyzer.section_detector import detect_sections
from app.analyzer.keyword_analyzer import analyze_keywords
from app.analyzer.ats_scorer import calculate_ats_score
from app.analyzer.suggestion_generator import generate_suggestions
from app.analyzer.ai_style_estimator import estimate_ai_style
from app.database.db import save_analysis

analyze_bp = Blueprint("analyze", __name__)


@analyze_bp.route("/api/analyze", methods=["POST"])
def analyze_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded. Expected a file under the 'resume' field."}), 400

    uploaded_file = request.files["resume"]

    if uploaded_file.filename == "":
        return jsonify({"error": "No file selected."}), 400

    try:
        extracted_text = extract_text(uploaded_file, uploaded_file.filename)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"Could not process file: {str(e)}"}), 500

    # Run the full real analysis pipeline on the extracted text
    detected_skills = detect_skills(extracted_text)
    detected_sections = detect_sections(extracted_text)
    keyword_analysis = analyze_keywords(extracted_text)
    ats_score = calculate_ats_score(extracted_text, detected_skills, detected_sections, keyword_analysis)
    suggestions = generate_suggestions(detected_skills, detected_sections, keyword_analysis, ats_score)
    ai_style_estimate = estimate_ai_style(extracted_text)


        # Save this analysis to the database so it shows up in Recent Analyses
    save_analysis(
        file_name=uploaded_file.filename,
        detected_skills=detected_skills,
        ats_score=ats_score,
        keyword_analysis=keyword_analysis,
        suggestions=suggestions,
    )

    return jsonify({
        "fileName": uploaded_file.filename,
        "extractedText": extracted_text,
        "detectedSkills": detected_skills,
        "detectedSections": detected_sections,
        "keywordAnalysis": keyword_analysis,
        "atsScore": ats_score,
        "suggestions": suggestions,
        "aiStyleEstimate": ai_style_estimate,
    })