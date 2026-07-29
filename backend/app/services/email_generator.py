from google import genai
from app.config import settings


def generate_sales_email(lead):

    client = genai.Client(
        api_key=settings.gemini_api_key
    )

    prompt = f"""
    Write a professional sales outreach email.

    Company:
    {lead.company_name}

    Industry:
    {lead.industry}

    Description:
    {lead.description}

    Location:
    {lead.location}

    Keep it professional and concise.
    Include:
    - Subject line
    - Greeting
    - Value proposition
    - Call to action
    """

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt,
    )

    return response.text