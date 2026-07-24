from app.schemas.lead import Lead


def calculate_lead_score(lead: Lead) -> int:
    """
    Calculate an explainable lead score between 0 and 100.
    """

    score = 0

    if lead.company_name:
        score += 10

    if lead.email:
        score += 20

    if lead.phone:
        score += 15

    if lead.industry:
        score += 15

    if lead.description:
        score += 15

    if lead.location:
        score += 15

    return min(score, 100)