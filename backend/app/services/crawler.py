import asyncio

from bs4 import BeautifulSoup
from playwright.async_api import async_playwright


async def _crawl_website(url: str) -> dict:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)

        try:
            page = await browser.new_page()

            await page.goto(
                url,
                wait_until="domcontentloaded",
                timeout=30000,
            )

            title = await page.title()

            html = await page.content()

            soup = BeautifulSoup(html, "html.parser")

            content = soup.get_text(
                separator="\n",
                strip=True,
            )

            return {
                "url": url,
                "title": title,
                "content": content,
                "html": html,
            }

        finally:
            await browser.close()


def crawl_website(url: str) -> dict:
    return asyncio.run(_crawl_website(url))