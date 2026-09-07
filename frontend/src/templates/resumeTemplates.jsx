import "./resumeTemplates.css";

/* ============================================================
   RESUME TEMPLATES - COMBINED COMPONENT FILE
   Every template below receives the SAME props:
   personalInfo, summary, educationList, skillsList, projectsList,
   experienceList. Only the JSX structure + CSS class prefix differ.

   TO ADD A NEW TEMPLATE LATER:
   1. Copy one function below (e.g. MinimalTemplate), rename it,
      and change its class prefix (e.g. "minimal-" -> "creative-")
   2. Add the matching CSS block in resumeTemplates.css
   3. Add one entry to templateRegistry at the bottom of this file
   ============================================================ */

// ---------------- MODERN TEMPLATE ----------------
function ModernTemplate({
  personalInfo,
  summary,
  educationList,
  skillsList,
  projectsList,
  experienceList,
  customSections = [],
}) {
  return (
    <div className="modern-resume">
      <div className="modern-header">
        <h1 className="modern-name">{personalInfo.fullName || "Your Name"}</h1>
        <p className="modern-contact-line">
          {[personalInfo.email, personalInfo.phone, personalInfo.location]
            .filter(Boolean)
            .join(" | ")}
        </p>
        <p className="modern-contact-line">
          {[personalInfo.linkedin, personalInfo.github, personalInfo.portfolio]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </div>

      <div className="modern-body">
        {summary && (
          <div className="modern-section">
            <h2 className="modern-section-heading">Professional Summary</h2>
            <p className="modern-text">{summary}</p>
          </div>
        )}

        {educationList.some((edu) => edu.college) && (
          <div className="modern-section">
            <h2 className="modern-section-heading">Education</h2>
            {educationList.map(
              (edu, index) =>
                edu.college && (
                  <div key={index} className="modern-entry">
                    <div className="modern-entry-row">
                      <span>{edu.college}</span>
                      <span>{edu.startYear} - {edu.endYear}</span>
                    </div>
                    <p className="modern-text">
                      {[edu.degree, edu.branch].filter(Boolean).join(", ")}
                      {edu.cgpa && ` | CGPA: ${edu.cgpa}`}
                    </p>
                  </div>
                )
            )}
          </div>
        )}

        {skillsList.some((skill) => skill.trim()) && (
          <div className="modern-section">
            <h2 className="modern-section-heading">Skills</h2>
            <p className="modern-text">
              {skillsList.filter((skill) => skill.trim()).join(" • ")}
            </p>
          </div>
        )}

        {projectsList.some((proj) => proj.name) && (
          <div className="modern-section">
            <h2 className="modern-section-heading">Projects</h2>
            {projectsList.map(
              (proj, index) =>
                proj.name && (
                  <div key={index} className="modern-entry">
                    <div className="modern-entry-row">
                      <span>{proj.name}</span>
                    </div>
                    {proj.technologies && (
                      <p className="modern-tech-line">{proj.technologies}</p>
                    )}
                    {proj.description && <p className="modern-text">{proj.description}</p>}
                    <p className="modern-link-line">
                      {[proj.githubLink, proj.liveLink].filter(Boolean).join("  |  ")}
                    </p>
                  </div>
                )
            )}
          </div>
        )}

        {experienceList.some((exp) => exp.company) && (
          <div className="modern-section">
            <h2 className="modern-section-heading">Experience</h2>
            {experienceList.map(
              (exp, index) =>
                exp.company && (
                  <div key={index} className="modern-entry">
                    <div className="modern-entry-row">
                      <span>{exp.role}</span>
                      <span>{exp.duration}</span>
                    </div>
                    <p className="modern-tech-line">{exp.company}</p>
                    {exp.responsibilities && <p className="modern-text">{exp.responsibilities}</p>}
                    {exp.achievements && <p className="modern-text">{exp.achievements}</p>}
                  </div>
                )
            )}
          </div>
        )}

        {customSections.map(
          (section, index) =>
            section.title && (
              <div key={index} className="modern-section">
                <h2 className="modern-section-heading">{section.title}</h2>
                <p className="modern-text">{section.content}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
}

// ---------------- PROFESSIONAL TEMPLATE ----------------
function ProfessionalTemplate({
  personalInfo,
  summary,
  educationList,
  skillsList,
  projectsList,
  experienceList,
  customSections = [],
}) {
  return (
    <div className="professional-resume">
      <div className="professional-header">
        <h1 className="professional-name">{personalInfo.fullName || "Your Name"}</h1>
        <p className="professional-contact-line">
          {[personalInfo.email, personalInfo.phone, personalInfo.location]
            .filter(Boolean)
            .join(" | ")}
        </p>
        <p className="professional-contact-line">
          {[personalInfo.linkedin, personalInfo.github, personalInfo.portfolio]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </div>

      {summary && (
        <div className="professional-section">
          <h2 className="professional-section-heading">Professional Summary</h2>
          <p className="professional-text">{summary}</p>
        </div>
      )}

      {educationList.some((edu) => edu.college) && (
        <div className="professional-section">
          <h2 className="professional-section-heading">Education</h2>
          {educationList.map(
            (edu, index) =>
              edu.college && (
                <div key={index} className="professional-entry">
                  <div className="professional-entry-row">
                    <span>{edu.college}</span>
                    <span>{edu.startYear} - {edu.endYear}</span>
                  </div>
                  <p className="professional-text">
                    {[edu.degree, edu.branch].filter(Boolean).join(", ")}
                    {edu.cgpa && ` | CGPA: ${edu.cgpa}`}
                  </p>
                </div>
              )
          )}
        </div>
      )}

      {skillsList.some((skill) => skill.trim()) && (
        <div className="professional-section">
          <h2 className="professional-section-heading">Skills</h2>
          <p className="professional-text">
            {skillsList.filter((skill) => skill.trim()).join(" • ")}
          </p>
        </div>
      )}

      {projectsList.some((proj) => proj.name) && (
        <div className="professional-section">
          <h2 className="professional-section-heading">Projects</h2>
          {projectsList.map(
            (proj, index) =>
              proj.name && (
                <div key={index} className="professional-entry">
                  <div className="professional-entry-row">
                    <span>{proj.name}</span>
                  </div>
                  {proj.technologies && (
                    <p className="professional-tech-line">{proj.technologies}</p>
                  )}
                  {proj.description && <p className="professional-text">{proj.description}</p>}
                  <p className="professional-link-line">
                    {[proj.githubLink, proj.liveLink].filter(Boolean).join("  |  ")}
                  </p>
                </div>
              )
          )}
        </div>
      )}

      {experienceList.some((exp) => exp.company) && (
        <div className="professional-section">
          <h2 className="professional-section-heading">Experience</h2>
          {experienceList.map(
            (exp, index) =>
              exp.company && (
                <div key={index} className="professional-entry">
                  <div className="professional-entry-row">
                    <span>{exp.role}</span>
                    <span>{exp.duration}</span>
                  </div>
                  <p className="professional-tech-line">{exp.company}</p>
                  {exp.responsibilities && <p className="professional-text">{exp.responsibilities}</p>}
                  {exp.achievements && <p className="professional-text">{exp.achievements}</p>}
                </div>
              )
          )}
        </div>
      )}

      {customSections.map(
        (section, index) =>
          section.title && (
            <div key={index} className="professional-section">
              <h2 className="professional-section-heading">{section.title}</h2>
              <p className="professional-text">{section.content}</p>
            </div>
          )
      )}
    </div>
  );
}

// ---------------- MINIMAL / ATS-FRIENDLY TEMPLATE ----------------
function MinimalTemplate({
  personalInfo,
  summary,
  educationList,
  skillsList,
  projectsList,
  experienceList,
  customSections = [],
}) {
  return (
    <div className="minimal-resume">
      <div className="minimal-header">
        <h1 className="minimal-name">{personalInfo.fullName || "Your Name"}</h1>
        <p className="minimal-contact-line">
          {[personalInfo.email, personalInfo.phone, personalInfo.location]
            .filter(Boolean)
            .join(" | ")}
        </p>
        <p className="minimal-contact-line">
          {[personalInfo.linkedin, personalInfo.github, personalInfo.portfolio]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </div>

      {summary && (
        <div className="minimal-section">
          <h2 className="minimal-section-heading">Professional Summary</h2>
          <p className="minimal-text">{summary}</p>
        </div>
      )}

      {educationList.some((edu) => edu.college) && (
        <div className="minimal-section">
          <h2 className="minimal-section-heading">Education</h2>
          {educationList.map(
            (edu, index) =>
              edu.college && (
                <div key={index} className="minimal-entry">
                  <div className="minimal-entry-row">
                    <span>{edu.college}</span>
                    <span>{edu.startYear} - {edu.endYear}</span>
                  </div>
                  <p className="minimal-text">
                    {[edu.degree, edu.branch].filter(Boolean).join(", ")}
                    {edu.cgpa && ` | CGPA: ${edu.cgpa}`}
                  </p>
                </div>
              )
          )}
        </div>
      )}

      {skillsList.some((skill) => skill.trim()) && (
        <div className="minimal-section">
          <h2 className="minimal-section-heading">Skills</h2>
          <p className="minimal-text">
            {skillsList.filter((skill) => skill.trim()).join(", ")}
          </p>
        </div>
      )}

      {projectsList.some((proj) => proj.name) && (
        <div className="minimal-section">
          <h2 className="minimal-section-heading">Projects</h2>
          {projectsList.map(
            (proj, index) =>
              proj.name && (
                <div key={index} className="minimal-entry">
                  <div className="minimal-entry-row">
                    <span>{proj.name}</span>
                  </div>
                  {proj.technologies && (
                    <p className="minimal-tech-line">{proj.technologies}</p>
                  )}
                  {proj.description && <p className="minimal-text">{proj.description}</p>}
                  <p className="minimal-link-line">
                    {[proj.githubLink, proj.liveLink].filter(Boolean).join("  |  ")}
                  </p>
                </div>
              )
          )}
        </div>
      )}

      {experienceList.some((exp) => exp.company) && (
        <div className="minimal-section">
          <h2 className="minimal-section-heading">Experience</h2>
          {experienceList.map(
            (exp, index) =>
              exp.company && (
                <div key={index} className="minimal-entry">
                  <div className="minimal-entry-row">
                    <span>{exp.role}</span>
                    <span>{exp.duration}</span>
                  </div>
                  <p className="minimal-tech-line">{exp.company}</p>
                  {exp.responsibilities && <p className="minimal-text">{exp.responsibilities}</p>}
                  {exp.achievements && <p className="minimal-text">{exp.achievements}</p>}
                </div>
              )
          )}
        </div>
      )}

      {customSections.map(
        (section, index) =>
          section.title && (
            <div key={index} className="minimal-section">
              <h2 className="minimal-section-heading">{section.title}</h2>
              <p className="minimal-text">{section.content}</p>
            </div>
          )
      )}
    </div>
  );
}

/* ============================================================
   TEMPLATE REGISTRY
   The single source of truth for every template in the app.
   TemplateSwitcher.jsx reads this to show options.
   Builder.jsx reads this to know which component to render.
   ============================================================ */
export const templateRegistry = [
  {
    id: "modern",
    name: "Modern",
    description: "Bold accent color header, clean sans-serif design.",
    component: ModernTemplate,
  },
  {
    id: "professional",
    name: "Professional",
    description: "Classic serif font, traditional corporate look.",
    component: ProfessionalTemplate,
  },
  {
    id: "minimal",
    name: "Minimal / ATS-Friendly",
    description: "Plain black text, single column - easiest for ATS software to read.",
    component: MinimalTemplate,
  },
];