"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Flame, Eye, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { getVideos } from "./hooks/action";
import { toast } from "sonner";
import Loading from "./components/loading";
import { useRouter } from "next/navigation";
import VideoCard from "./components/videoCard";

interface dataProp {
  duration: string;
  slug: string;
  thumbnail: string;
  title: string;
  postId: string;
  tags: string[];
}

export default function ErosiaBrowse() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [data, setData] = useState<dataProp[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 66;

  useEffect(() => {
    const getList = async () => {
      try {
        const data = await getVideos(currentPage);
        if (data.length !== 0) setData(data);
      } catch (error) {
        const err = error instanceof Error ? error.message : "Server Error";
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };
    getList();
  }, [currentPage]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    router.push(`/page/${page}`);
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight">Erosia</span>
            <Badge variant="secondary" className="hidden sm:inline-flex">FUCK HOES</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="Search scenes, tags, performers" className="hidden sm:block w-65" />
            <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">Trending Now</h1>
            <p className="mt-1 text-muted-foreground">Updated in real time</p>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {data.map((vid, i) => (
            <motion.div
              key={i}
              onClick={() => router.push(`/lust/${btoa(encodeURIComponent(vid.slug))}`)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <VideoCard thumbnail={vid.thumbnail} title={vid.title} duration={vid.duration} postId={vid.postId} tags={vid.tags[0]} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 max-h-50 overflow-scroll overflow-x-hidden customScrollbar">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              size="sm"
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => handlePageClick(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Erosia • 18+</p>
        </div>
      </footer>
    </div>
  );
}
