from playwright.async_api import async_playwright


async def crawl_website(url: str) -> dict:
    """
    Crawl a website and extract its basic content.
    """

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
            content = await page.locator("body").inner_text()

            return {
                "url": url,
                "title": title,
                "content": content,
            }

        finally:
            await browser.close()