"use client";

import Loading from "@/app/components/loading";
import { getSarapSource } from "@/app/hooks/action";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface dataProp {
  embedUrl: string;
  title: string;
}

const page = () => {
  const params = useParams();
  const slug = params.slug;
  const decode = atob(decodeURIComponent(slug as string));
  const [source, setSource] = useState<dataProp | null>(null);

  useEffect(() => {
    const getVideo = async () => {
      const data = await getSarapSource(decode as string);
      if (data) {
        setSource(data);
      } else {
        console.error("Failed to fetch video data:", data);
      }
    };
    getVideo();
  }, [decode]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-start py-6 px-4">
      {source ? (
        <div className="w-full max-w-5xl flex flex-col gap-4">
          <div className="relative w-full rounded-xl shadow-2xl border border-border overflow-hidden" style={{ paddingTop: "56.25%" }}>
            <iframe
              src={source.embedUrl}
              className="absolute top-0 left-0 w-full h-full"
              sandbox="allow-scripts allow-same-origin allow-download allow-orientation-lock allow-presentation allow-fullscreen"
              allowFullScreen
              title={source.title}
            />
          </div>

          <h1 className="text-lg md:text-2xl font-bold tracking-tight line-clamp-2 text-foreground">
            {source.title}
          </h1>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-[60vh]">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default page;
