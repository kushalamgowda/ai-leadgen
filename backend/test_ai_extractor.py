from app.config import settings
from app.services.ai_extractor import AIExtractor


extractor = AIExtractor(
    api_key=settings.gemini_api_key
)


website_content = """
Example AI Technologies is a software company based in Bangalore.

We build artificial intelligence and machine learning solutions
for businesses.

Contact us at hello@example.ai.
"""


lead = extractor.extract_lead(
    website_url="https://example.com",
    website_content=website_content,
)

print(lead)
print()
print(lead.model_dump())