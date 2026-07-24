import re


EMAIL_PATTERN = r"""
[a-zA-Z0-9._%+-]+
@
[a-zA-Z0-9.-]+
\.
[a-zA-Z]{2,}
"""


PHONE_PATTERN = r"""
(?:
    \+?\d{1,3}[\s.-]?
)?
(?:\(?\d{2,4}\)?[\s.-]?)
\d{3,4}[\s.-]?
\d{3,4}
"""


def extract_emails(text: str) -> list[str]:
    emails = re.findall(
        EMAIL_PATTERN,
        text,
        re.VERBOSE,
    )

    return sorted(
        set(email.lower() for email in emails)
    )


def extract_phone_numbers(text: str) -> list[str]:
    phones = re.findall(
        PHONE_PATTERN,
        text,
        re.VERBOSE,
    )

    return sorted(
        set(phone.strip() for phone in phones)
    )