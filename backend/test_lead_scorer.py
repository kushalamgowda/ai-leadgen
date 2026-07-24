from app.schemas.lead import Lead
from app.services.lead_scorer import calculate_lead_score


lead = Lead(
    company_name="Example AI Technologies",
    website="https://example.com",
    industry="Software",
    description="An AI company.",
    email="hello@example.com",
    phone="+91 9876543210",
    location="Bangalore",
)


score = calculate_lead_score(lead)


print(f"Lead Score: {score}")