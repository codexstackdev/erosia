"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

interface DownloadBtnProps {
  src: string;
  filename?: string;
}

const DownloadBtn = ({ src, filename }: DownloadBtnProps) => {
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    setProgress(0);

    try {
      const response = await axios.get(`/api/proxy/downloadVideo?url=${encodeURIComponent(src)}`, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);
          } else {
            setProgress(Math.min(99, progressEvent.loaded / (1024 * 1024 * 10)));
          }
        },
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);


      const finalFilename =
        filename ||
        response.headers["content-disposition"]?.match(/filename="?([^"]+)"?/)?.[1] ||
        src.split("/").pop()?.split("?")[0] ||
        "video.mp4";

      const a = document.createElement("a");
      a.href = url;
      a.download = `${finalFilename}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

      setProgress(100);
      setTimeout(() => {
        setProgress(0);
        setIsDownloading(false);
      }, 1000);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
      setIsDownloading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        variant="default"
        className="w-full sm:w-auto"
      >
        {isDownloading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Downloading... {progress > 0 && `${progress}%`}
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Download Video
          </>
        )}
      </Button>

      {isDownloading && progress > 0 && progress < 100 && (
        <Progress value={progress} className="w-full sm:w-64" />
      )}
    </div>
  );
};

export default DownloadBtn;