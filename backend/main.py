from fastapi import FastAPI

app = FastAPI(
    title="AI LeadGen API",
    description="AI-powered lead generation and data enrichment platform",
    version="0.1.0",
)


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ai-leadgen-api",
    }