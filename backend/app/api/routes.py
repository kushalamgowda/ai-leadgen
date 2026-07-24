from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl

from app.services.crawler import crawl_website


router = APIRouter(
    prefix="/api/v1",
    tags=["Crawler"],
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