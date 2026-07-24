from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl

from app.config import settings
from app.schemas.lead import Lead
from app.services.ai_extractor import AIExtractor
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
    Crawl a website and extract structured lead information using AI.
    """

    try:
        # Step 1: Crawl website
        crawled_data = crawl_website(str(request.url))

        # Step 2: Create AI extractor
        extractor = AIExtractor(
            api_key=settings.gemini_api_key
        )

        # Step 3: Extract structured lead
        lead = extractor.extract_lead(
            website_url=str(request.url),
            website_content=crawled_data["content"],
        )

        # Step 4: Return validated lead
        return lead

    except Exception as error:
        print("ENRICHMENT ERROR:", repr(error))

        raise HTTPException(
            status_code=500,
            detail=f"Failed to enrich lead: {repr(error)}",
        )