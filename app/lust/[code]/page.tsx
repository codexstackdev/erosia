"use client";

import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { getVideoSource } from "@/app/hooks/action";
import Loading from "@/app/components/loading";
import "videojs-seek-buttons";
import "videojs-seek-buttons/dist/videojs-seek-buttons.css";
import DownloadBtn from "@/app/components/DownloadBtn";

interface VideoProps {
  thumbnail: string;
  title: string;
  author: string;
  videoSrc: string;
  durationISO: string;
}

const parseDuration = (iso: string) => {
  const regex = /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const match = iso.match(regex);
  if (!match) return "00:00";
  const h = parseInt(match[2] || "0");
  const m = parseInt(match[3] || "0");
  const s = parseInt(match[4] || "0");
  return h > 0
    ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    : `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

const WatchPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [data, setData] = useState<VideoProps | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const params = useParams();
  const slug = params.code;
  const decode = atob(decodeURIComponent(slug as string));

  useEffect(() => {
    setData(null);
    (async () => {
      const res = await getVideoSource(decode);
      if (res) setData(res);
    })();
  }, [decode]);

 useEffect(() => {
  if (!videoRef.current || !data) return;

  playerRef.current = videojs(videoRef.current, {
    controls: true,
    preload: "auto",
    fluid: true,
    poster: data.thumbnail,
    bigPlayButton: true,
    controlBar: {
      volumePanel: true,
      remainingTimeDisplay: true,
      progressControl: true,
      skipButtons: { forward: 5, backward: 5 },
    },
    sources: [{ src: data.videoSrc, type: "video/mp4" }],
  });

  const player = playerRef.current;
  player.on("play", () => setIsPlaying(true));
  player.on("pause", () => setIsPlaying(false));

  return () => {
    player.dispose();
    playerRef.current = null;
  };
}, [data]);


  if (!data) return <Loading />;

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-neutral-950 to-background text-foreground px-4 py-10">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <video
            ref={videoRef}
            className="video-js vjs-big-play-centered w-full h-full"
          />

          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-4 right-4 z-20"
              >
                <Badge className="bg-black/80 backdrop-blur text-white px-3 py-1 text-sm">
                  {parseDuration(data.durationISO)}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-6 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
            {data.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Uploaded by <span className="font-medium">{data.author}</span>
          </p>
        </motion.div>
        <div className="mt-3">
          <DownloadBtn src={data.videoSrc} filename={data.title}/>
        </div>
      </motion.div>
    </div>
  );
};

export default WatchPage;
