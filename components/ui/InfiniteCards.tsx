import { getMessages } from "@/data/getMessageApi";
import { cn } from "@/lib/utils";
import { Tetstimonials } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [items, setItems] = useState<Tetstimonials[]>([]);
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const messages = await getMessages();
        setItems(messages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-screen overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px] gap-8 py-12">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-[90vw] md:w-[60vw] h-[300px] rounded-2xl border border-slate-800 p-6 md:p-16 relative overflow-hidden"
              style={{
                background: "rgb(4,7,29)",
                backgroundColor:
                  "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              }}
            >
              <div className="animate-pulse space-y-6">
                {/* Quote icon placeholder */}
                <div className="absolute right-12 top-8">
                  <div className="h-12 w-12 rounded-full bg-slate-700/30"></div>
                </div>

                {/* Shimmer effect for text lines */}
                <div className="space-y-3">
                  <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-700/50 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-700/50 rounded w-4/5"></div>
                  <div className="h-4 bg-slate-700/50 rounded w-2/3"></div>
                </div>

                {/* Shimmer effect for profile section */}
                <div className="flex items-center space-x-4 mt-12">
                  <div className="relative">
                    <div className="rounded-full bg-slate-700/50 h-16 w-16">
                      {/* Animated ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-slate-600/50 animate-[ping_2s_infinite]"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-5 bg-slate-700/50 rounded w-32"></div>
                    <div className="h-4 bg-slate-700/50 rounded w-24"></div>
                  </div>
                </div>
              </div>

              {/* Multiple gradient overlays for enhanced effect */}
              <div
                className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                }}
              ></div>

              {/* Border gradient effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-50"
                style={{
                  background:
                    "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
                  backgroundSize: "200% 200%",
                  animation: "gradient 3s ease infinite",
                }}
              ></div>
            </div>
          ))}
        </div>
      ) : (
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-16 py-4 w-max flex-nowrap",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {items.map((item, idx) => (
            <li
              className="w-[90vw] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-800 p-5 md:p-16 md:w-[60vw]"
              style={{
                background: "rgb(4,7,29)",
                backgroundColor:
                  "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              }}
              key={idx}
            >
              <blockquote>
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <span className="relative z-20 text-sm md:text-lg leading-[1.6] text-white font-normal">
                  {item.message}
                </span>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <div className="me-3">
                    <Image
                      width={60}
                      height={60}
                      src="/profile.png"
                      alt="profile"
                    />
                  </div>
                  <span className="flex flex-col gap-1">
                    <span className="text-xl font-bold leading-[1.6] text-white">
                      {item.name}
                    </span>
                    <span className="text-sm leading-[1.6] text-white-200 font-normal">
                      {item.name}
                    </span>
                  </span>
                </div>
              </blockquote>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
