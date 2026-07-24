from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl
from app.services.lead_scorer import calculate_lead_score
from app.config import settings
from app.schemas.lead import Lead
from app.services.ai_extractor import AIExtractor
from app.services.contact_extractor import (
    extract_emails,
    extract_phone_numbers,
)
from app.services.crawler import crawl_website



router = APIRouter(
    prefix="/api/v1",
    tags=["Lead Generation"],
)


class CrawlRequest(BaseModel):
    url: HttpUrl


@router.post("/crawl")
def crawl_url(request: CrawlRequest):
    """
    Crawl a website and return extracted content.
    """

    try:
        result = crawl_website(str(request.url))

        return {
            "success": True,
            "data": result,
        }

    except Exception as error:
        print("CRAWLER ERROR:", repr(error))

        raise HTTPException(
            status_code=500,
            detail=f"Failed to crawl website: {repr(error)}",
        )


@router.post("/enrich", response_model=Lead)
def enrich_lead(request: CrawlRequest):
    """
    Crawl a website and extract structured lead information using AI
    and deterministic contact extraction.
    """

    try:
        # Step 1: Crawl website
        crawled_data = crawl_website(
            str(request.url)
        )

        content = crawled_data["content"]

        # Step 2: Extract contacts deterministically
        emails = extract_emails(content)
        phone_numbers = extract_phone_numbers(content)

        # Step 3: Extract company information with Gemini
        extractor = AIExtractor(
            api_key=settings.gemini_api_key
        )

        lead = extractor.extract_lead(
            website_url=str(request.url),
            website_content=content,
        )

        # Step 4: Add deterministic contact data
        if emails:
            lead.email = emails[0]

        if phone_numbers:
            lead.phone = phone_numbers[0]
        
        # Step 5: Calculate explainable lead score
        lead.lead_score = calculate_lead_score(lead)

        # Step 6: Return final validated lead
        return lead

    except Exception as error:
        print("ENRICHMENT ERROR:", repr(error))

        raise HTTPException(
            status_code=500,
            detail=f"Failed to enrich lead: {repr(error)}",
        )