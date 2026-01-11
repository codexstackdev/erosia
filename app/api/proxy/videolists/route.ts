import cloudscraper from "cloudscraper"
import * as cheerio from "cheerio"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
  try {
    const html = await cloudscraper({
      method: "GET",
      url: `https://kantotplus.com/page/${parseInt(page as string)}`,
      headers: {  
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile Safari/604.1",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://kaldagan.com/",
      },
    })

    const $ = cheerio.load(html)

    const videos = $("article.loop-video")
      .map((_, el) => {
        const article = $(el)
        const classes = article.attr("class")?.split(" ") || []

        const link = article.find("a").attr("href") || ""
        const slug = link.split("/").filter(Boolean).pop() || ""

        return {
          postId: article.attr("data-post-id") || "",
          videoId: article.attr("data-video-id") || "",
          slug,
          title: article.find("header.entry-header span").text().trim(),
          duration: article.find(".duration").text().trim(),
          thumbnail:
            article.find("img").attr("data-src") ||
            article.attr("data-main-thumb") ||
            "",
          category:
            classes
              .find(c => c.startsWith("category-"))
              ?.replace("category-", "") || "",
          tags: classes
            .filter(c => c.startsWith("tag-"))
            .map(t => t.replace("tag-", "")),
          link,
        }
      })
      .get()

    return new Response(JSON.stringify(videos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error(err)
    return new Response("Error scraping site", { status: 500 })
  }
}
