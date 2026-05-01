import { Typography, Avatar, Button, Spin } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css"; // Ensure this includes .no-scrollbar CSS
import { useS } from "use-s-react";
import Papa from "papaparse";
import { ReactSVG } from "react-svg";
import { IcLeft, IcRight } from "../../assets";

type Submission = {
  name: string;
  wish: string;
};

const ListWishes = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useS<Submission[]>({
    value: [],
    key: "guest-book",
  });
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({ startX: 0, startTranslate: 0 });
  const [currentTranslate, setCurrentTranslate] = useState(0);

  const GOOGLE_SHEET_CSV_URL =
    "https://docs.google.com/spreadsheets/d/10fBTFk_T5rq0vXqA8HtOT3UbQP9LO55iH4OoNY8o5Xo/export?format=csv&gid=1100263779"; // prettier-ignore

  const PROXY_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    GOOGLE_SHEET_CSV_URL
  )}`;

  const fetchData = useCallback(async () => {
    const fetchWithTimeout = async (url: string, timeout = 8000) => {
      const controller = new AbortController();
      const id = window.setTimeout(() => controller.abort(), timeout);
      try {
        const res = await fetch(url, {
          signal: controller.signal,
          cache: "no-store",
        });
        return res;
      } finally {
        clearTimeout(id);
      }
    };

    const retryFetchText = async (
      url: string,
      attempts = 3,
      timeout = 8000
    ) => {
      let lastErr: unknown;
      for (let i = 0; i < attempts; i++) {
        try {
          const r = await fetchWithTimeout(url, timeout);
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          const t = await r.text();
          return t;
        } catch (err) {
          lastErr = err;
          // small backoff
          await new Promise((res) => setTimeout(res, 300 * (i + 1)));
        }
      }
      throw lastErr;
    };

    const buildUrl = (u: string) =>
      `${u}${u.includes("?") ? "&" : "?"}_=${Date.now()}`;

    try {
      const text = await retryFetchText(buildUrl(PROXY_URL), 3, 8000);
      const result = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
      });

      const sanitize = (text: string) =>
        text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

      const cleaned = (result.data as unknown[])
        .map((row) => {
          const r = row as Record<string, unknown>;
          return {
            name: sanitize(String(r["ten"] || "").trim()),
            wish: sanitize(String(r["loi_chuc"] || "").trim()),
          };
        })
        .filter((row) => row.name && row.wish) as Submission[];

      const unique = Array.from(
        new Map(
          cleaned.map((item) => [`${item.name}-${item.wish}`, item])
        ).values()
      );

      setSubmissions(unique as Submission[]);
    } catch (error) {
      console.error("Failed to fetch data:", error);

      try {
        const fallback = await import("../../data/guestbook-fallback.json");
        if (Array.isArray(fallback?.default || fallback)) {
          setSubmissions(fallback.default || fallback);
        }
      } catch (err) {
        console.error("Failed to load fallback guestbook:", err);
      }
    } finally {
      setLoading(false);
    }
  }, [PROXY_URL, setSubmissions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!isAutoScrolling || submissions.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % submissions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [submissions, isAutoScrolling]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        pauseAutoScroll();
        setIndex((prev) => (prev > 0 ? prev - 1 : submissions.length - 1));
      } else if (e.key === "ArrowRight") {
        pauseAutoScroll();
        setIndex((prev) => (prev + 1) % submissions.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [submissions]);

  const pauseAutoScroll = () => {
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 4000);
  };

  const handlePrev = () => {
    pauseAutoScroll();
    setIndex((prev) => (prev > 0 ? prev - 1 : submissions.length - 1));
  };

  const handleNext = () => {
    pauseAutoScroll();
    setIndex((prev) => (prev + 1) % submissions.length);
  };

  // Update translation when index changes
  useEffect(() => {
    if (scrollRef.current) {
      setCurrentTranslate(-index * scrollRef.current.offsetWidth);
    }
  }, [index]);

  const getPositionX = (e: React.MouseEvent | React.TouchEvent) => {
    return "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    pauseAutoScroll();
    setIsDragging(true);
    dragInfo.current.startX = getPositionX(e);
    dragInfo.current.startTranslate = currentTranslate;
    e.preventDefault();
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = getPositionX(e);
    const diff = currentX - dragInfo.current.startX;
    setCurrentTranslate(dragInfo.current.startTranslate + diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const movedBy = currentTranslate - dragInfo.current.startTranslate;
    const slideWidth = scrollRef.current?.offsetWidth ?? window.innerWidth;
    const threshold = slideWidth / 4;

    let newIndex = index;
    if (movedBy < -threshold && index < submissions.length - 1) {
      newIndex = index + 1;
    } else if (movedBy > threshold && index > 0) {
      newIndex = index - 1;
    }

    setIndex(newIndex);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("mousemove", handleDragMove as any);
      container.addEventListener("mouseup", handleDragEnd);
      container.addEventListener("mouseleave", handleDragEnd);
      return () => {
        container.removeEventListener("mousemove", handleDragMove as any);
        container.removeEventListener("mouseup", handleDragEnd);
        container.removeEventListener("mouseleave", handleDragEnd);
      };
    }
  });

  const renderDots = () => (
    <div className="flex justify-center space-x-2 mt-4">
      {submissions.map((_, i) => (
        <div
          key={i}
          className={`h-3 w-3 rounded-full ${
            i === index ? "bg-pink-500 opacity-100" : "bg-gray-300 opacity-50"
          }`}
        />
      ))}
    </div>
  );

  if (submissions.length === 0 && !loading) return null;

  return (
    <div className="py-8 w-full px-4 sm:py-10">
      <Typography.Title
        level={3}
        className="text-center text-white mb-4 text-lg sm:text-xl md:text-2xl"
        data-aos="fade-down"
      >
        💌 Lời chúc từ bạn bè
      </Typography.Title>

      <div className="flex flex-row items-center justify-center w-full">
        <div className="w-full max-w-screen-md mx-auto px-0 sm:px-2 relative min-h-[120px] sm:min-h-[150px] md:min-h-[160px] flex items-center justify-center">
          {/* Prev button - overlay on mobile, static on md+ */}
          <Button
            type="text"
            aria-label="Previous wish"
            onClick={handlePrev} // prettier-ignore
            className="absolute left-2 sm:left-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 p-3 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center shadow-lg pointer-events-auto transition-opacity md:static md:w-10 md:h-10 md:p-1 md:translate-y-0"
          >
            <ReactSVG
              src={IcLeft}
              className="w-6 h-6 md:w-4 md:h-4 text-pink-500"
            />
          </Button>

          <Spin spinning={loading} className="w-full">
            <div
              className="overflow-hidden w-full cursor-grab active:cursor-grabbing"
              ref={scrollRef}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              <div
                className="flex flex-nowrap"
                style={{
                  transform: `translateX(${currentTranslate}px)`,
                  transition: isDragging
                    ? "none"
                    : "transform 0.5s ease-in-out",
                }}
              >
                {submissions.map((wish: Submission, i: number) => (
                  <div
                    key={`${wish.name}-${i}`}
                    className="w-full flex-shrink-0 px-3 sm:px-4 md:px-6"
                  >
                    <div
                      className={`min-h-[120px] sm:min-h-[150px] md:min-h-[160px] bg-white/10 backdrop-blur-md p-3 sm:p-4 md:p-5 shadow-md text-white flex items-center gap-3 rounded-xl transition-all duration-150 ${
                        i === index
                          ? "border-2 border-pink-500"
                          : "border-2 border-transparent"
                      }`}
                    >
                      <Avatar
                        shape="circle"
                        className="flex-shrink-0 w-12 h-12 sm:w-11 sm:h-11 md:w-12 md:h-12 text-xs sm:text-sm md:text-base flex items-center justify-center"
                      >
                        {(() => {
                          const name = (wish.name || "").trim();
                          if (!name) return "?";
                          const parts = name.split(/\s+/).filter(Boolean);
                          if (parts.length === 1) {
                            return parts[0].slice(0, 2).toUpperCase();
                          }
                          return (
                            (parts[0][0] || "") + (parts[1][0] || "")
                          ).toUpperCase();
                        })()}
                      </Avatar>
                      <div className="flex-1 ml-3">
                        <div className="flex flex-col max-w-[92%] sm:max-w-full">
                          <Typography.Text className="font-semibold text-white text-sm sm:text-base md:text-base">
                            {wish.name}
                          </Typography.Text>
                          <Typography.Text className="text-gray-300 line-clamp-3 mt-1 text-xs sm:text-sm md:text-sm break-words">
                            {wish.wish}
                          </Typography.Text>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Spin>

          <Button
            type="text"
            aria-label="Next wish"
            onClick={handleNext}
            className="absolute right-2 sm:right-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 p-3 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center shadow-lg pointer-events-auto transition-opacity md:static md:w-10 md:h-10 md:p-1 md:translate-y-0"
          >
            <ReactSVG
              src={IcRight}
              className="w-6 h-6 md:w-4 md:h-4 text-pink-500"
            />
          </Button>
        </div>
      </div>

      <div className="mt-6">{renderDots()}</div>
    </div>
  );
};

export default ListWishes;
