import cloudscraper from "cloudscraper";
import * as cheerio from "cheerio";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug");
    if (!slug) return new Response("Missing slug", { status: 400 });

    const url = `https://sarapbabe.com/${slug}/`;

    const html = await cloudscraper({
      method: "GET",
      url,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile Safari/604.1",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const $ = cheerio.load(html);

    const embedUrl = $('meta[itemprop="embedUrl"]').attr("content") || "";
    const title = $('meta[itemprop="description"]').attr("content") || "";

    return new Response(
      JSON.stringify({ embedUrl, title}),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response("Failed to scrape embedUrl", { status: 500 });
  }
}
