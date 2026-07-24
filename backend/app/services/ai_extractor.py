import time

from google import genai

from app.schemas.lead import Lead


class AIExtractor:

    def __init__(self, api_key: str):
        self.client = genai.Client(
            api_key=api_key
        )

    def extract_lead(
        self,
        website_url: str,
        website_content: str,
    ) -> Lead:

        prompt = f"""
        Extract company information from this website.

        Website URL:
        {website_url}

        Website content:
        {website_content}
        """

        max_retries = 3

        for attempt in range(max_retries):
            try:
                response = self.client.models.generate_content(
                    model="gemini-3.5-flash-lite",
                    contents=prompt,
                    config={
                        "response_mime_type": "application/json",
                        "response_schema": Lead,
                    },
                )

                return response.parsed

            except Exception as error:
                if attempt == max_retries - 1:
                    raise error

                wait_time = 2 ** attempt

                print(
                    f"Gemini request failed. "
                    f"Retrying in {wait_time} seconds..."
                )

                time.sleep(wait_time)