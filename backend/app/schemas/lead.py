from pydantic import BaseModel, Field


class Lead(BaseModel):
    company_name: str
    website: str
    industry: str | None = None
    description: str | None = None
    email: str | None = None
    phone: str | None = None
    location: str | None = None
    lead_score: int | None = Field(
        default=None,
        ge=0,
        le=100,
    )


# Add this new class below the Lead class
class LeadUpdate(BaseModel):
    company_name: str | None = None
    industry: str | None = None
    description: str | None = None
    email: str | None = None
    phone: str | None = None
    location: str | None = None
    lead_score: int | None = Field(
        default=None,
        ge=0,
        le=100,
    )