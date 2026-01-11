import cloudscraper from "cloudscraper";
import * as cheerio from "cheerio";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug");

    const url = `https://kantotplus.com/${slug}/`;

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

    const player = $(".video-player");

    const meta = (name: string) =>
      player.find(`meta[itemprop="${name}"]`).attr("content") || "";

    const iframeSrc = player.find("iframe").attr("src") || "";

    const data = {
      author: meta("author"),
      title: meta("name"),
      description: meta("description"),
      durationISO: meta("duration"),
      thumbnail: meta("thumbnailUrl"),
      videoSrc: meta("contentURL"),
      uploadDate: meta("uploadDate"),
      iframeSrc,
    };

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response("Failed to scrape video page", { status: 500 });
  }
}
