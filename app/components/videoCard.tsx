import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play,Flame, Eye } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface videoProps {
    thumbnail:string;
    title:string;
    duration:string;
    tags: string;
    postId:string;
}

const VideoCard = ({thumbnail, title, duration, tags, postId} : videoProps) => {
  return (
    <>
      <Card className="group overflow-hidden bg-card">
        <div className="relative aspect-video bg-muted overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent opacity-90" />
          <Button
            size="icon"
            className="absolute inset-0 m-auto rounded-full opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition"
          >
            <Play className="h-5 w-5" />
          </Button>
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary">HD</Badge>
          </div>
          <div className="absolute bottom-2 right-2 rounded-md bg-background/80 px-1.5 py-0.5 text-[11px] font-medium text-foreground backdrop-blur">
            {duration}
          </div>
        </div>
        <CardContent className="p-3">
          <h3 className="text-sm font-medium leading-snug line-clamp-2">
            {title}
          </h3>
          <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Flame className="h-3 w-3" /> {tags}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" /> {postId}M
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default VideoCard;
