
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");

    if (!url) {
      return new NextResponse("Missing video URL", { status: 400 });
    }

    const videoUrl = decodeURIComponent(url);

    const range = req.headers.get("range");
    const response = await axios({
      method: "GET",
      url: videoUrl,
      responseType: "stream",
      headers: range ? { Range: range } : {},
      timeout: 30000,
    });

    if (!response.headers["content-length"] && !response.headers["accept-ranges"]) {}

    const headers = new Headers();

    headers.set("Content-Type", response.headers["content-type"] || "video/mp4");
    headers.set("Accept-Ranges", response.headers["accept-ranges"] || "bytes");
    headers.set("Cache-Control", "public, max-age=3600");

    if (response.headers["content-length"]) {
      headers.set("Content-Length", response.headers["content-length"]);
    }

    const status = response.status === 206 ? 206 : 200;
    if (response.status === 206) {
      headers.set("Content-Range", response.headers["content-range"]!);
    }

    return new NextResponse(response.data as any, {
      status,
      headers,
    });
  } catch (error: any) {
    console.error("Video proxy error:", error.message);

    if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      return new NextResponse("Video source unreachable", { status: 502 });
    }

    return new NextResponse("Failed to stream video", { status: 500 });
  }
}