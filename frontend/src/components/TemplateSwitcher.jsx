import { useState, useRef, useEffect } from "react";
import { templateRegistry } from "../templates/resumeTemplates";

// A dropdown version of the template switcher.
// Clicking the box opens a list of templates; clicking one selects it and closes the list.
function TemplateSwitcher({ selectedTemplateId, onSelectTemplate }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedTemplate =
    templateRegistry.find((t) => t.id === selectedTemplateId) || templateRegistry[0];

  // Closes the dropdown if the user clicks anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (templateId) => {
    onSelectTemplate(templateId);
    setIsOpen(false);
  };

  return (
    <div style={styles.container} ref={dropdownRef}>
      <label style={styles.label}>Template</label>

      {/* The box you click to open/close the dropdown */}
      <button style={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        <div>
          <div style={styles.triggerName}>{selectedTemplate.name}</div>
          <div style={styles.triggerDesc}>{selectedTemplate.description}</div>
        </div>
        <span style={{ ...styles.arrow, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
          ▼
        </span>
      </button>

      {/* The dropdown list, only rendered when open */}
      {isOpen && (
        <div style={styles.dropdown}>
          {templateRegistry.map((template) => (
            <div
              key={template.id}
              onClick={() => handleSelect(template.id)}
              style={{
                ...styles.option,
                ...(selectedTemplateId === template.id ? styles.optionActive : {}),
              }}
            >
              <div style={styles.optionName}>{template.name}</div>
              <div style={styles.optionDesc}>{template.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "6px",
  },
  trigger: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: "#fff",
    cursor: "pointer",
    textAlign: "left",
  },
  triggerName: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#111827",
  },
  triggerDesc: {
    fontSize: "12px",
    color: "#6b7280",
    marginTop: "2px",
  },
  arrow: {
    fontSize: "12px",
    color: "#6b7280",
    transition: "transform 0.2s ease",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    zIndex: 10,
    overflow: "hidden",
  },
  option: {
    padding: "12px 16px",
    cursor: "pointer",
    borderBottom: "1px solid #f3f4f6",
  },
  optionActive: {
    backgroundColor: "#eff6ff",
  },
  optionName: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#111827",
  },
  optionDesc: {
    fontSize: "12px",
    color: "#6b7280",
    marginTop: "2px",
  },
};

export default TemplateSwitcher;