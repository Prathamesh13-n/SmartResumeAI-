# SmartResume AI

A full-stack resume builder and intelligent resume analysis platform. Build a professional resume with live preview and multiple templates, then analyze any resume for ATS compatibility, detect skills and keywords, and compare it against job descriptions — all with real analysis, not hardcoded results.

## Features

### Resume Builder
- Personal info, summary, education, skills, projects, and experience sections with dynamic add/remove
- Live resume preview that updates instantly as you type
- 3 switchable templates (Modern, Professional, Minimal/ATS-friendly)
- Custom sections for anything not covered by the standard fields
- One-click PDF download (via browser print, preserving real selectable text)

### Resume Analyzer
- Upload a real PDF or DOCX resume
- Real text extraction (Python: pdfplumber for PDF, python-docx for DOCX)
- Real skill detection against a technical skills database
- Real section detection (Contact Info, Education, Skills, Projects, Experience)
- Dynamic ATS scoring (0–100), calculated from what's actually in the resume — never hardcoded
- Keyword analysis (detected vs. missing professional keywords)
- Estimated generic/AI-style content score (framed as an estimate, not a definitive AI-detection claim)
- Personalized improvement suggestions generated from the actual analysis

### Job Description Matching
- Upload a resume and paste a job description
- Real comparison of skills mentioned in both texts
- Match percentage, matched skills, missing skills, and suggestions

### Dashboard
- Real saved analysis history per user (SQLite database)
- Latest ATS score, skills detected, and top suggestions
- Recent analyses table

### Authentication
- Email/password registration and login
- Passwords hashed with Werkzeug security (never stored in plain text)
- JWT-based session tokens
- Each user's analyses and dashboard are private to their account

## Tech Stack

**Frontend:** React (Vite), React Router, Axios
**Backend:** Flask, Flask-CORS
**Database:** SQLite
**Document processing:** pdfplumber, python-docx
**Auth:** PyJWT, Werkzeug password hashing
**Client-side PDF reading (name detection):** pdfjs-dist

## Project Structure

```
Folder PATH listing for volume New Volume
Volume serial number is 6A92-A24B
D:.
|   .gitignore
|   structure.txt
|   
+---backend
|   |   requirements.txt
|   |   run.py
|   |   
|   +---app
|   |   |   __init__.py
|   |   |   
|   |   +---analyzer
|   |   |   |   ai_style_estimator.py
|   |   |   |   ats_scorer.py
|   |   |   |   job_matcher.py
|   |   |   |   keyword_analyzer.py
|   |   |   |   section_detector.py
|   |   |   |   skill_detector.py
|   |   |   |   suggestion_generator.py
|   |   |   |   __init__.py
|   |   |   
|   |   |   
|   |   |           
|   |   +---data
|   |   |   |   keywords_database.py
|   |   |   |   skills_database.py
|   |   |   |   __init__.py
|   |   |   |   
|   |   |   
|   |   |           
|   |   +---database
|   |   |   |   db.py
|   |   |   |   __init__.py
|   |   |   |   
|   |   |   
|   |   |           
|   |   +---routes
|   |   |   |   analyze_routes.py
|   |   |   |   auth_routes.py
|   |   |   |   dashboard_routes.py
|   |   |   |   job_match_routes.py
|   |   |   |   
|   |   |   
|   |   |           
|   |   +---utils
|   |   |   |   auth_decorator.py
|   |   |   |   auth_routes.py
|   |   |   |   auth_utils.py
|   |   |   |   text_extractor.py
|   |   |   |   
|   |   |   
|   |           
|   +---database
|   |       db.py
|   |       smartresume.db
|   |       
|   +---venv
|       |   .gitignore
|       |   pyvenv.cfg
                   
+---frontend
|   +---public
|    |       favicon.svg
|    |       icons.svg
|   |       
|   +---src
|       |   App.css
|       |   App.jsx
|       |   index.css
|       |   main.jsx
|       |   Print.css
|       |   
|       +---assets
|       |   |   hero.png
|       |   |   react.svg
|       |   |   vite.svg
|       |   |   
|       |   +---images
|       +---components
|       |       Features.jsx
|       |       Footer.jsx
|       |       Hero.jsx
|       |       Navbar.jsx
|       |       ProtectedRoute.jsx
|       |       ResumePreview.jsx
|       |       ScoreBar.jsx
|       |       StatCard.jsx
|       |       TemplateSwitcher.jsx
|       |       
|       +---context
|       |       AuthContext.jsx
|       |       
|       +---data
|       |       mockAnalysisData.jsx
|       |       mockDashboardData.jsx
|       |       mockJobMatchData.jsx
|       |       
|       +---pages
|       |       Analyzer.jsx
|       |       Builder.jsx
|       |       Dashboard.jsx
|       |       Home.jsx
|       |       JobMatch.jsx
|       |       Login.jsx
|       |       Register.jsx
|       |       
|       +---templates
|       |       resumeTemplates.css
|       |       resumeTemplates.jsx
|       |       
|       +---utils
|                pdfExtractor.js
                

```

## Getting Started

### Prerequisites
- Node.js and npm
- Python 3.10+

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

pip install -r requirements.txt
python run.py
```

Backend runs at `http://localhost:5000`.

### Frontend Setup

```bash
cd frontend
npm install
(npm run dev)
npm run dev
```

Frontend runs at `http://localhost:5173`.

### Usage

1. Make sure both the backend and frontend are running at the same time
2. Open `http://localhost:5173`
3. Register an account to access the Analyzer and Dashboard
4. Build a resume, analyze one, or compare against a job description

## Notes

- The SQLite database file is created automatically on first backend run and is not committed to version control
- `venv/` and `node_modules/` are excluded via `.gitignore` — run the setup steps above to regenerate them
- All ATS scores, skill detections, and suggestions are calculated dynamically from the actual uploaded resume — nothing is hardcoded

## Status

🚧 In active development — core features complete, polish and additional features in progress.




## 🚀 How to Clone a GitHub Repository in VS Code

### Step 1: Open VS Code

* Open **Visual Studio Code**.
* Select or create the folder where you want to keep your project.
* Make sure the selected folder has the name/location you want.

### Step 2: Open the Terminal

Open the terminal inside VS Code:

* **Windows:** Press `Ctrl + ``
* **Mac:** Press `Cmd + ``

### Step 3: Clone the GitHub Repository

* Copy the **URL of your GitHub repository**.
* Paste the following command into the VS Code terminal:

```bash
git clone https://github.com/Prathamesh13-n/SmartResumeAI-.git
```

* Press **Enter**.
* Git will download the repository into your selected folder.

### Step 4: Open the Project

After cloning is complete, move into the project folder:

```bash
cd SmartResumeAI-
```

Then open the project in VS Code:

```bash
code .
```

✅ **Your GitHub repository is now cloned and ready to use in VS Code.**

Can you driect this git clone... just do a copy paste in termial you will get all files there 
