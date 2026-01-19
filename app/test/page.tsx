"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const page = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="min-h-[50vh] min-w-screen">
      {/* <iframe
        src="https://stream25.xyz/player.php?id=17589-3865e19c9b7c48bf"
        sandbox="allow-scripts allow-same-origin allow-orientation-lock allow-presentation allow-fullscreen"
        width={"300px"}
        height={"300px"}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <video src="https://yellowclk.click/bbaze46/output.m3u8" controls></video> */}
      hello mtf

    </div>
  );
};

export default page;
