from pydantic import BaseModel, HttpUrl


class Lead(BaseModel):
    company_name: str
    website: HttpUrl
    industry: str | None = None
    description: str | None = None
    email: str | None = None
    phone: str | None = None
    location: str | None = None
    lead_score: int | None = None