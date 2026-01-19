import cloudscraper from "cloudscraper"
import * as cheerio from "cheerio"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const pageParam = req.nextUrl.searchParams.get("page") ?? "1"
  const page = Number(pageParam) || 1

  try {
    const html = await cloudscraper({
      method: "GET",
      url: `https://sarapbabe.com/page/${page}/`,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile Safari/604.1",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://sarapbabe.com/",
      },
    })

    const $ = cheerio.load(html)

    const posts = $(".post-card")
      .map((_, el) => {
        const card = $(el)

        const anchor = card.find("a").first()
        const link = anchor.attr("href") ?? ""
        const slug = link.split("/").filter(Boolean).pop() ?? ""

        const img = card.find("img.post-card-img")
        const viewBadge = card.find(".view-count-badge")

        return {
          slug,
          title: card.find(".post-card-title a").text().trim(),
          link,
          thumbnail: img.attr("src") ?? "",
          views: viewBadge.find(".vc").text().trim(),
          viewSlug: viewBadge.attr("data-slug") ?? slug,
        }
      })
      .get()

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("Scrape error:", err)
    return new Response("Error scraping sarapbabe", { status: 500 })
  }
}
