import re

PII_PATTERNS = {
    "email": r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}",
    "phone": r"\b\d{10}\b",
}

BIAS_KEYWORDS = [
    "race", "gender", "religion", "caste", "ethnicity",
    "minority", "discrimination"
]

def redact_pii(text: str) -> str:
    for label, pattern in PII_PATTERNS.items():
        text = re.sub(pattern, f"[REDACTED_{label.upper()}]", text)
    return text


def detect_bias(text: str) -> bool:
    text_lower = text.lower()
    return any(keyword in text_lower for keyword in BIAS_KEYWORDS)


def ethical_review(text: str) -> dict:
    redacted_text = redact_pii(text)
    bias_flag = detect_bias(text)

    return {
        "redacted_text": redacted_text,
        "contains_bias_risk": bias_flag
    }
