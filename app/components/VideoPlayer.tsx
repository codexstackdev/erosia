"use client";

import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  src: string;
  poster: string;
  onPlay?: () => void;
  onPause?: () => void;
}

const VideoPlayer = ({ src, poster, onPlay, onPause }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    const player = videojs(videoRef.current, {
      controls: true,
      fluid: true,
      preload: "auto",
      poster,
      sources: [{ src, type: "video/mp4" }],
    });

    playerRef.current = player;

    player.on("play", () => onPlay?.());
    player.on("pause", () => onPause?.());

    return () => {
      player.dispose();
      playerRef.current = null;
    };
  }, [src, poster]);

  return <video ref={videoRef} className="video-js vjs-big-play-centered w-full h-full" />;
};

export default VideoPlayer;
