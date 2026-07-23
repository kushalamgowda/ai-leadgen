import asyncio

from app.services.crawler import crawl_website


async def main():
    result = await crawl_website("https://example.com")

    print("URL:", result["url"])
    print("TITLE:", result["title"])
    print("\nCONTENT:")
    print(result["content"][:1000])


if __name__ == "__main__":
    asyncio.run(main())