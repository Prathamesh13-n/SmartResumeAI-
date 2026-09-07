import { useState } from "react";
import TemplateSwitcher from "../components/TemplateSwitcher";
import { templateRegistry } from "../templates/resumeTemplates";

function Builder() {
  // Personal Information state
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  // Professional Summary state
  const [summary, setSummary] = useState("");

  // Education state - an ARRAY because user can add multiple entries
  const [educationList, setEducationList] = useState([
    { college: "", degree: "", branch: "", startYear: "", endYear: "", cgpa: "" },
  ]);

  // Skills state - a simple array of strings
  const [skillsList, setSkillsList] = useState([""]);

  // Projects state - array of objects
  const [projectsList, setProjectsList] = useState([
    { name: "", description: "", technologies: "", githubLink: "", liveLink: "" },
  ]);

  // Experience/Internship state - array of objects
  const [experienceList, setExperienceList] = useState([
    { company: "", role: "", duration: "", responsibilities: "", achievements: "" },
  ]);

  // Tracks which template is currently selected. Defaults to the first one in the registry.
  const [selectedTemplateId, setSelectedTemplateId] = useState(templateRegistry[0].id);

  // Custom sections - array of { title, content }, so the user can add anything
  // not covered by the standard sections (e.g. Certifications, Hobbies, Languages)
  const [customSections, setCustomSections] = useState([]);

  // Look up the actual component to render based on the selected id
  const SelectedTemplateComponent =
    templateRegistry.find((t) => t.id === selectedTemplateId)?.component ||
    templateRegistry[0].component;

  // Handles typing into any Personal Info field
  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  // Handles typing into a specific Education entry (identified by its index)
  const handleEducationChange = (index, field, value) => {
    const updatedList = [...educationList];
    updatedList[index][field] = value;
    setEducationList(updatedList);
  };

  const addEducation = () => {
    setEducationList([
      ...educationList,
      { college: "", degree: "", branch: "", startYear: "", endYear: "", cgpa: "" },
    ]);
  };

  const removeEducation = (index) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  // ---------- SKILLS HANDLERS ----------
  const handleSkillChange = (index, value) => {
    const updatedList = [...skillsList];
    updatedList[index] = value;
    setSkillsList(updatedList);
  };

  const addSkill = () => {
    setSkillsList([...skillsList, ""]);
  };

  const removeSkill = (index) => {
    setSkillsList(skillsList.filter((_, i) => i !== index));
  };

  // ---------- PROJECTS HANDLERS ----------
  const handleProjectChange = (index, field, value) => {
    const updatedList = [...projectsList];
    updatedList[index][field] = value;
    setProjectsList(updatedList);
  };

  const addProject = () => {
    setProjectsList([
      ...projectsList,
      { name: "", description: "", technologies: "", githubLink: "", liveLink: "" },
    ]);
  };

  const removeProject = (index) => {
    setProjectsList(projectsList.filter((_, i) => i !== index));
  };

  // ---------- EXPERIENCE HANDLERS ----------
  const handleExperienceChange = (index, field, value) => {
    const updatedList = [...experienceList];
    updatedList[index][field] = value;
    setExperienceList(updatedList);
  };

  const addExperience = () => {
    setExperienceList([
      ...experienceList,
      { company: "", role: "", duration: "", responsibilities: "", achievements: "" },
    ]);
  };

  const removeExperience = (index) => {
    setExperienceList(experienceList.filter((_, i) => i !== index));
  };

  // ---------- CUSTOM SECTIONS HANDLERS ----------
  const handleCustomSectionChange = (index, field, value) => {
    const updatedList = [...customSections];
    updatedList[index][field] = value;
    setCustomSections(updatedList);
  };

  const addCustomSection = () => {
    setCustomSections([...customSections, { title: "", content: "" }]);
  };

  const removeCustomSection = (index) => {
    setCustomSections(customSections.filter((_, i) => i !== index));
  };

  // Triggers the browser's native print dialog. The user picks
  // "Save as PDF" as the destination to download it as a PDF file.
  // print.css (imported globally in main.jsx) hides everything except
  // the element with id="resume-print-area" when this runs.
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div style={styles.splitLayout}>
      {/* LEFT SIDE: THE FORM */}
      <div style={styles.formSide}>
        <h1 style={styles.heading}>Resume Builder</h1>

        {/* ---------- PERSONAL INFORMATION ---------- */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Personal Information</h2>
          <div style={styles.grid}>
            <input
              style={styles.input}
              placeholder="Full Name"
              value={personalInfo.fullName}
              onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="Email"
              value={personalInfo.email}
              onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="Phone"
              value={personalInfo.phone}
              onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="Location"
              value={personalInfo.location}
              onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="LinkedIn URL"
              value={personalInfo.linkedin}
              onChange={(e) => handlePersonalInfoChange("linkedin", e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="GitHub URL"
              value={personalInfo.github}
              onChange={(e) => handlePersonalInfoChange("github", e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="Portfolio URL"
              value={personalInfo.portfolio}
              onChange={(e) => handlePersonalInfoChange("portfolio", e.target.value)}
            />
          </div>
        </section>

        {/* ---------- PROFESSIONAL SUMMARY ---------- */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Professional Summary</h2>
          <textarea
            style={styles.textarea}
            placeholder="Write a short summary about yourself..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={4}
          />
        </section>

        {/* ---------- EDUCATION ---------- */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {educationList.map((edu, index) => (
            <div key={index} style={styles.entryBox}>
              <div style={styles.grid}>
                <input
                  style={styles.input}
                  placeholder="College/University"
                  value={edu.college}
                  onChange={(e) => handleEducationChange(index, "college", e.target.value)}
                />
                <input
                  style={styles.input}
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                />
                <input
                  style={styles.input}
                  placeholder="Branch"
                  value={edu.branch}
                  onChange={(e) => handleEducationChange(index, "branch", e.target.value)}
                />
                <input
                  style={styles.input}
                  placeholder="Start Year"
                  value={edu.startYear}
                  onChange={(e) => handleEducationChange(index, "startYear", e.target.value)}
                />
                <input
                  style={styles.input}
                  placeholder="End Year"
                  value={edu.endYear}
                  onChange={(e) => handleEducationChange(index, "endYear", e.target.value)}
                />
                <input
                  style={styles.input}
                  placeholder="CGPA/Percentage"
                  value={edu.cgpa}
                  onChange={(e) => handleEducationChange(index, "cgpa", e.target.value)}
                />
              </div>
              {educationList.length > 1 && (
                <button style={styles.removeBtn} onClick={() => removeEducation(index)}>
                  Remove This Education
                </button>
              )}
            </div>
          ))}
          <button style={styles.addBtn} onClick={addEducation}>
            + Add Another Education
          </button>
        </section>

        {/* ---------- SKILLS ---------- */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Skills</h2>
          {skillsList.map((skill, index) => (
            <div key={index} style={styles.skillRow}>
              <input
                style={styles.input}
                placeholder="e.g. Python, React, Git"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
              />
              {skillsList.length > 1 && (
                <button style={styles.removeBtnSmall} onClick={() => removeSkill(index)}>
                  ✕
                </button>
              )}
            </div>
          ))}
          <button style={styles.addBtn} onClick={addSkill}>
            + Add Another Skill
          </button>
        </section>

        {/* ---------- PROJECTS ---------- */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Projects</h2>
          {projectsList.map((project, index) => (
            <div key={index} style={styles.entryBox}>
              <div style={styles.grid}>
                <input
                  style={styles.input}
                  placeholder="Project Name"
                  value={project.name}
                  onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                />
                <input
                  style={styles.input}
                  placeholder="Technologies Used"
                  value={project.technologies}
                  onChange={(e) => handleProjectChange(index, "technologies", e.target.value)}
                />
                <input
                  style={styles.input}
                  placeholder="GitHub Link"
                  value={project.githubLink}
                  onChange={(e) => handleProjectChange(index, "githubLink", e.target.value)}
                />
                <input
                  style={styles.input}
                  placeholder="Live Demo Link"
                  value={project.liveLink}
                  onChange={(e) => handleProjectChange(index, "liveLink", e.target.value)}
                />
              </div>
              <textarea
                style={{ ...styles.textarea, marginTop: "12px" }}
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                rows={3}
              />
              {projectsList.length > 1 && (
                <button style={styles.removeBtn} onClick={() => removeProject(index)}>
                  Remove This Project
                </button>
              )}
            </div>
          ))}
          <button style={styles.addBtn} onClick={addProject}>
            + Add Another Project
          </button>
        </section>

        {/* ---------- EXPERIENCE / INTERNSHIP ---------- */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Experience / Internship</h2>
          {experienceList.map((exp, index) => (
            <div key={index} style={styles.entryBox}>
              <div style={styles.grid}>
                <input
                  style={styles.input}
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                />
                <input
                  style={styles.input}
                  placeholder="Role"
                  value={exp.role}
                  onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                />
                <input
                  style={styles.input}
                  placeholder="Duration (e.g. Jun 2025 - Aug 2025)"
                  value={exp.duration}
                  onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
                />
              </div>
              <textarea
                style={{ ...styles.textarea, marginTop: "12px" }}
                placeholder="Responsibilities"
                value={exp.responsibilities}
                onChange={(e) => handleExperienceChange(index, "responsibilities", e.target.value)}
                rows={3}
              />
              <textarea
                style={{ ...styles.textarea, marginTop: "12px" }}
                placeholder="Achievements"
                value={exp.achievements}
                onChange={(e) => handleExperienceChange(index, "achievements", e.target.value)}
                rows={2}
              />
              {experienceList.length > 1 && (
                <button style={styles.removeBtn} onClick={() => removeExperience(index)}>
                  Remove This Experience
                </button>
              )}
            </div>
          ))}
          <button style={styles.addBtn} onClick={addExperience}>
            + Add Another Experience
          </button>
        </section>

        {/* ---------- CUSTOM SECTIONS ---------- */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Custom Sections</h2>
          <p style={styles.helperText}>
            Add anything not covered above — Certifications, Hobbies, Languages, Achievements, etc.
          </p>
          {customSections.map((section, index) => (
            <div key={index} style={styles.entryBox}>
              <input
                style={styles.input}
                placeholder="Section Title (e.g. Certifications)"
                value={section.title}
                onChange={(e) => handleCustomSectionChange(index, "title", e.target.value)}
              />
              <textarea
                style={{ ...styles.textarea, marginTop: "12px" }}
                placeholder="Section Content"
                value={section.content}
                onChange={(e) => handleCustomSectionChange(index, "content", e.target.value)}
                rows={3}
              />
              <button style={styles.removeBtn} onClick={() => removeCustomSection(index)}>
                Remove This Section
              </button>
            </div>
          ))}
          <button style={styles.addBtn} onClick={addCustomSection}>
            + Add Custom Section
          </button>
        </section>
      </div>

      {/* RIGHT SIDE: TEMPLATE SWITCHER + DOWNLOAD BUTTON + LIVE PREVIEW */}
      <div style={styles.previewSide}>
        <div style={styles.previewToolbar}>
          <TemplateSwitcher
            selectedTemplateId={selectedTemplateId}
            onSelectTemplate={setSelectedTemplateId}
          />
          <button style={styles.downloadBtn} onClick={handleDownloadPDF}>
            ⬇ Download PDF
          </button>
        </div>

        {/* id="resume-print-area" is what print.css looks for to know
            what to keep visible when printing / saving as PDF */}
        <div id="resume-print-area">
          <SelectedTemplateComponent
            personalInfo={personalInfo}
            summary={summary}
            educationList={educationList}
            skillsList={skillsList}
            projectsList={projectsList}
            experienceList={experienceList}
            customSections={customSections}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  splitLayout: {
    display: "flex",
    gap: "24px",
    padding: "24px",
    alignItems: "flex-start",
  },
  formSide: {
    flex: "1",
    minWidth: "0",
  },
  previewSide: {
    flex: "1",
    minWidth: "0",
    position: "sticky",
    top: "24px",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "24px",
    color: "#111827",
  },
  section: {
    marginBottom: "32px",
    padding: "20px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
  },
  sectionTitle: {
    fontSize: "18px",
    marginBottom: "16px",
    color: "#111827",
  },
  helperText: {
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "12px",
  },
  previewToolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "4px",
  },
  downloadBtn: {
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: "600",
    backgroundColor: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    marginTop: "22px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontFamily: "inherit",
  },
  entryBox: {
    marginBottom: "16px",
    paddingBottom: "16px",
    borderBottom: "1px dashed #d1d5db",
  },
  addBtn: {
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  removeBtn: {
    marginTop: "8px",
    padding: "6px 12px",
    fontSize: "13px",
    backgroundColor: "#fff",
    color: "#dc2626",
    border: "1px solid #dc2626",
    borderRadius: "6px",
    cursor: "pointer",
  },
  skillRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "8px",
  },
  removeBtnSmall: {
    padding: "0 12px",
    fontSize: "14px",
    backgroundColor: "#fff",
    color: "#dc2626",
    border: "1px solid #dc2626",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Builder;