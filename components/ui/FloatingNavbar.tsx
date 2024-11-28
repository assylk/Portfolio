"use client";
import React, { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon: string;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className={cn(
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-full shadow-lg items-center justify-center space-x-4",
          className
        )}
        style={{
          backdropFilter: "blur(6px) saturate(200%)",
          background:
            "linear-gradient(135deg, rgba(17, 25, 40, 0.85), rgba(34, 49, 63, 0.85))",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {navItems.map((navItem: any, idx: number) =>
          navItem.name === "My Resume" ? (
            <a
              key={`link=${idx}`}
              href="/Assyl-Chouikh.pdf"
              download
              className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 transition-transform transform hover:scale-105"
            >
              <span className="flex items-center text-xs sm:text-sm md:text-base cursor-pointer">
                {navItem.name}
                <MdOutlineFileDownload className="ml-1 text-base" />
              </span>
            </a>
          ) : (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 transition-transform transform hover:scale-105"
            >
              <span className="flex items-center text-xs sm:text-sm md:text-base cursor-pointer">
                {navItem.name}
              </span>
            </Link>
          )
        )}
      </motion.div>
    </AnimatePresence>
  );
};
