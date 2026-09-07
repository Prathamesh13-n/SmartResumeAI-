"""
Route for comparing an uploaded resume against a pasted job description.
"""

from flask import Blueprint, request, jsonify
from app.utils.text_extractor import extract_text
from app.analyzer.job_matcher import match_resume_to_job

job_match_bp = Blueprint("job_match", __name__)


@job_match_bp.route("/api/job-match", methods=["POST"])
def job_match():
    if "resume" not in request.files:
        return jsonify({"error": "No resume file uploaded. Expected a file under the 'resume' field."}), 400

    uploaded_file = request.files["resume"]

    if uploaded_file.filename == "":
        return jsonify({"error": "No file selected."}), 400

    job_description = request.form.get("jobDescription", "").strip()

    if not job_description:
        return jsonify({"error": "Job description text is required."}), 400

    try:
        resume_text = extract_text(uploaded_file, uploaded_file.filename)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"Could not process file: {str(e)}"}), 500

    result = match_resume_to_job(resume_text, job_description)

    return jsonify(result)
