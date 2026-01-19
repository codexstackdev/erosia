"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Moon, Play, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSarapbabe } from "../hooks/action";
import Loading from "../components/loading";

interface DataProp {
  slug: string;
  title: string;
  views: string;
  thumbnail: string;
  viewSlug: string;
}

export default function Page() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [data, setData] = useState<DataProp[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      const res = await getSarapbabe(currentPage);
      setData(Array.isArray(res) ? res : []);
      setLoading(false);
    };
    getList();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/sarappaglibre/${page}`);
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-background text-foreground">

      <header className="sticky top-0 z-40 backdrop-blur supports-backdrop-filter:bg-background/70 border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
            SarapBitch
          </h1>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.map((v) => (
            <motion.div
              key={v.slug}
              onClick={() => router.push(`/sarappaglibre/kinantotsagad/${btoa(encodeURIComponent(v.slug))}`)}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="group overflow-hidden rounded-2xl bg-card shadow-sm hover:shadow-xl transition flex flex-col">
                
                <div className="relative aspect-9/16 bg-muted shrink-0">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="icon"
                      className="rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                    <Badge variant="secondary" className="bg-background/80">HD</Badge>
                    <Badge variant="secondary" className="bg-background/80">{v.views}</Badge>
                  </div>
                </div>

                <CardContent className="p-3 shrink-0" style={{ minHeight: "3.5rem" }}>
                  <p className="line-clamp-2 text-sm font-medium">{v.title}</p>
                </CardContent>

              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center items-center gap-3">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </Button>

          <Badge variant="outline">Page {currentPage}</Badge>

          <Button
            variant="secondary"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </main>
    </div>
  );
}
