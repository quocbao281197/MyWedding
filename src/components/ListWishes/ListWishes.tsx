import { Typography, Avatar, Button, Spin } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";
import { useS } from "use-s-react";
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

  const SHEET_ID = "1y5mD-K-M4ePk5XceoIdS7rk9j6htpPGwxflm_3yV2jI";

  const fetchData = useCallback(async () => {
    const sanitize = (text: string) =>
      text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Fetch via Google Visualization API (JSONP - native, fast, zero CORS issues)
    const fetchJsonp = (): Promise<Submission[]> => {
      return new Promise((resolve, reject) => {
        const callbackName =
          "handleWeddingWishes_" + Math.random().toString(36).substring(2, 9);
        const script = document.createElement("script");
        const timeout = setTimeout(() => {
          cleanup();
          reject(new Error("Timeout loading wishes"));
        }, 8000);

        const cleanup = () => {
          clearTimeout(timeout);
          delete (window as unknown as Record<string, unknown>)[callbackName];
          if (script.parentNode) script.parentNode.removeChild(script);
        };

        (window as unknown as Record<string, unknown>)[callbackName] = (data: {
          table?: {
            rows?: Array<{ c?: Array<{ v?: unknown } | null> }>;
          };
        }) => {
          cleanup();
          try {
            const rows = data?.table?.rows || [];
            const result: Submission[] = [];

            const isHeader = (val: string) => {
              const lower = val.toLowerCase();
              return (
                lower.includes("time") ||
                lower.includes("dấu thời gian") ||
                lower === "tên của bạn" ||
                lower === "lời chúc"
              );
            };

            for (const row of rows) {
              const cells = row?.c || [];
              if (cells.length < 3) continue;

              const cell0 = String(cells[0]?.v ?? "").trim();
              if (isHeader(cell0)) continue;

              const name = sanitize(String(cells[1]?.v ?? "").trim());
              const wish = sanitize(String(cells[2]?.v ?? "").trim());

              if (name && wish && !isHeader(name)) {
                result.push({ name, wish });
              }
            }
            resolve(result);
          } catch (err) {
            reject(err);
          }
        };

        script.src = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=responseHandler:${callbackName}&_=${Date.now()}`;
        script.onerror = () => {
          cleanup();
          reject(new Error("Script load error"));
        };
        document.body.appendChild(script);
      });
    };

    try {
      const remoteWishes = await fetchJsonp();
      setSubmissions(remoteWishes);
    } catch (error) {
      console.warn("Could not fetch real-time wishes from Sheet:", error);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  }, [setSubmissions]);

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
            i === index ? "bg-[#b8975e] opacity-100" : "bg-gray-300 opacity-50"
          }`}
        />
      ))}
    </div>
  );

  if (submissions.length === 0 && !loading) return null;

  return (
    <div className="py-12 w-full px-4 bg-[#faf7f2]">
      <Typography.Title
        level={3}
        className="text-center !text-[#b8975e] mb-6 text-lg sm:text-xl md:text-2xl font-serif"
        data-aos="fade-down"
      >
        💌 Lời chúc từ bạn bè
      </Typography.Title>

      <div className="flex flex-row items-center justify-center w-full">
        <div className="w-full max-w-screen-md mx-auto px-0 sm:px-2 relative min-h-[120px] sm:min-h-[150px] md:min-h-[160px] flex items-center justify-center">
          <Button
            type="text"
            aria-label="Previous wish"
            onClick={handlePrev}
            className="absolute left-2 sm:left-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 p-3 bg-white/90 hover:bg-white border border-[#e5c07b]/30 rounded-full flex items-center justify-center shadow-md pointer-events-auto transition-all md:static md:w-10 md:h-10 md:p-1 md:translate-y-0"
          >
            <ReactSVG
              src={IcLeft}
              className="w-6 h-6 md:w-4 md:h-4 text-[#b8975e]"
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
                      className={`min-h-[120px] sm:min-h-[150px] md:min-h-[160px] bg-white p-4 sm:p-5 shadow-[0_6px_24px_rgba(127,100,67,0.08)] flex items-center gap-4 rounded-2xl transition-all duration-200 ${
                        i === index
                          ? "border-2 border-[#b8975e]"
                          : "border border-[#e5c07b]/30"
                      }`}
                    >
                      <Avatar
                        shape="circle"
                        className="flex-shrink-0 w-12 h-12 sm:w-11 sm:h-11 md:w-12 md:h-12 text-xs sm:text-sm md:text-base font-bold bg-[#b8975e] text-white flex items-center justify-center shadow-sm"
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
                      <div className="flex-1 ml-2">
                        <div className="flex flex-col max-w-[92%] sm:max-w-full">
                          <Typography.Text className="font-semibold text-gray-900 text-sm sm:text-base md:text-base font-serif">
                            {wish.name}
                          </Typography.Text>
                          <Typography.Text className="text-gray-600 line-clamp-3 mt-1 text-xs sm:text-sm md:text-sm break-words leading-relaxed">
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
            className="absolute right-2 sm:right-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 p-3 bg-white/90 hover:bg-white border border-[#e5c07b]/30 rounded-full flex items-center justify-center shadow-md pointer-events-auto transition-all md:static md:w-10 md:h-10 md:p-1 md:translate-y-0"
          >
            <ReactSVG
              src={IcRight}
              className="w-6 h-6 md:w-4 md:h-4 text-[#b8975e]"
            />
          </Button>
        </div>
      </div>

      <div className="mt-6">{renderDots()}</div>
    </div>
  );
};

export default ListWishes;
