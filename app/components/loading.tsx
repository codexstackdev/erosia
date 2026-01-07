"use client";

import { motion } from "framer-motion";

export default function Loading() {
  const bounceTransition = {
    y: {
      duration: 0.6,
      yoyo: Infinity,
      ease: "easeInOut",
    },
    scale: {
      duration: 0.6,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary"
            animate={{
              y: ["0%", "-50%", "0%"],
              scale: [1, 1.4, 1],
              backgroundColor: [
                "#6366f1",
                "#f43f5e",
                "#6366f1",
              ],
            }}
            transition={{
              ...bounceTransition,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}
