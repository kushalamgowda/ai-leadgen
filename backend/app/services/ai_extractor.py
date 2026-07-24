import json

from google import genai

from app.schemas.lead import Lead


class AIExtractor:
    """
    Extract structured lead information using Google Gemini.
    """

    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def extract_lead(
        self,
        website_url: str,
        website_content: str,
    ) -> Lead:

        prompt = f"""
You are a B2B lead research assistant.

Extract structured company information from the website content below.

Website URL:
{website_url}

Website Content:
{website_content}

Return ONLY valid JSON with these fields:
- company_name
- website
- industry
- description
- email
- phone
- location
- lead_score

Rules:
- Only use information present in the website content.
- If information is unavailable, return null.
- lead_score must be an integer between 0 and 100.
"""

        response = self.client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "response_schema": Lead,
            },
        )

        data = json.loads(response.text)

        return Lead(**data)