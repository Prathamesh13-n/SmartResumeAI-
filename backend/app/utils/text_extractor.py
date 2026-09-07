"""
Text extraction utilities.
Handles pulling raw text out of uploaded PDF and DOCX resume files.
"""

import pdfplumber
from docx import Document


def extract_text_from_pdf(file_stream):
    """
    Extracts all text from a PDF file.
    file_stream: a file-like object (e.g. from Flask's request.files)
    Returns: a single string containing all text from every page.
    """
    full_text = ""

    with pdfplumber.open(file_stream) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                full_text += page_text + "\n"

    return full_text.strip()


def extract_text_from_docx(file_stream):
    """
    Extracts all text from a DOCX file.
    file_stream: a file-like object (e.g. from Flask's request.files)
    Returns: a single string containing all paragraph text.
    """
    document = Document(file_stream)
    full_text = ""

    for paragraph in document.paragraphs:
        if paragraph.text.strip():
            full_text += paragraph.text + "\n"

    return full_text.strip()


def extract_text(file_stream, filename):
    """
    Picks the right extraction method based on the file's extension.
    Raises ValueError for unsupported file types.
    """
    lower_name = filename.lower()

    if lower_name.endswith(".pdf"):
        return extract_text_from_pdf(file_stream)
    elif lower_name.endswith(".docx"):
        return extract_text_from_docx(file_stream)
    else:
        raise ValueError("Unsupported file type. Please upload a PDF or DOCX file.")