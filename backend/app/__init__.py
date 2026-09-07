from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # Allow the React frontend (running on a different port) to call this API
    CORS(app)

    # Make sure the database and its table exist
    from app.database.db import init_db
    init_db()

    # Register route blueprints
    from app.routes.analyze_routes import analyze_bp
    from app.routes.job_match_routes import job_match_bp
    from app.routes.dashboard_routes import dashboard_bp
    app.register_blueprint(analyze_bp)
    app.register_blueprint(job_match_bp)
    app.register_blueprint(dashboard_bp)

    @app.route("/")
    def health_check():
        return {"status": "ok", "message": "SmartResume AI backend is running"}

    return app