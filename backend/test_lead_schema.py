from app.schemas.lead import Lead


lead = Lead(
    company_name="Example Company",
    website="https://example.com",
    industry="Technology",
    description="A technology company",
)

print(lead)
print()
print(lead.model_dump())