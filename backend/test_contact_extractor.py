from app.services.contact_extractor import (
    extract_emails,
    extract_phone_numbers,
)


text = """
Contact us at hello@example.com
or sales@example.com.

Call us at +91 9876543210.
You can also call 080-12345678.
"""


emails = extract_emails(text)
phones = extract_phone_numbers(text)


print("EMAILS:")
print(emails)

print()

print("PHONES:")
print(phones)