import { Spin, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ImgWedding01 } from "../assets";

function TimeWeddingCountdown() {
  const targetDates = useMemo(() => {
    return [
      dayjs("2025-10-11T00:00:00"),
      dayjs("2025-10-31T00:00:00"),
      dayjs("2025-11-01T00:00:00"),
      dayjs("2026-11-29T00:00:00"),
    ];
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bgImage, setBgImage] = useState<string | undefined>(undefined);
  const [textVisible, setTextVisible] = useState(false);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);
  const [_, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStartedLoading(true);
          const img = new Image();
          img.src = ImgWedding01;
          img.onload = () => {
            setBgImage(ImgWedding01 as string);
            setImageLoaded(true);
          };
          img.onerror = () => {
            setImageLoaded(true);
          };
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // when we start loading on mobile, open the card panels after a short delay
  useEffect(() => {
    if (hasStartedLoading && !imageLoaded) {
      const t = setTimeout(() => setMobileOpen(true), 600);
      return () => clearTimeout(t);
    }
    return;
  }, [hasStartedLoading, imageLoaded]);

  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = targetDates[currentTargetIndex];
      const now = dayjs();
      const diff = targetDate.valueOf() - now.valueOf();

      if (diff <= 0 && currentTargetIndex < targetDates.length - 1) {
        setCurrentTargetIndex((prevIndex) => prevIndex + 1);
      }

      const totalSeconds = Math.max(0, Math.floor(diff / 1000));
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [currentTargetIndex, targetDates]);

  const labels = ["Ngày", "Giờ", "Phút", "Giây"];
  const values = [
    timeLeft.days,
    timeLeft.hours,
    timeLeft.minutes,
    timeLeft.seconds,
  ];

  // Responsive font sizes (clamp for mobile -> desktop)
  const titleStyle: React.CSSProperties = {
    color: "white",
    fontFamily: "Great Vibes",
    fontSize: "clamp(2rem, 5vw, 4rem)",
    lineHeight: 1,
  };

  const numberStyle: React.CSSProperties = {
    color: "white",
    fontSize: "clamp(1.2rem, 4vw, 2rem)",
    lineHeight: 1,
  };

  const labelStyle: React.CSSProperties = {
    color: "white",
    fontSize: "clamp(0.8rem, 2.5vw, 1.2rem)",
    lineHeight: 1,
  };

  const dateStyle: React.CSSProperties = {
    color: "white",
    fontSize: "clamp(1rem, 2.5vw, 2rem)",
  };

  useEffect(() => {
    if (imageLoaded) {
      const t = setTimeout(() => setTextVisible(true), 500);
      try {
        window.dispatchEvent(new CustomEvent("countdown-image-ready"));
      } catch {
        // ignore in non-browser env
      }
      return () => clearTimeout(t);
    }
  }, [imageLoaded]);

  return (
    <div
      ref={containerRef}
      className={`w-screen min-h-screen relative overflow-hidden`}
    >
      <div
        className={`absolute inset-0 bg-center bg-no-repeat bg-cover transition-opacity duration-700 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage:
            imageLoaded && bgImage ? `url(${bgImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#000",
          filter: imageLoaded ? "none" : "blur(10px)",
        }}
      />

      <div className="absolute inset-0 bg-black opacity-30 z-0" />

      {hasStartedLoading && !imageLoaded && (
        <div
          className="flex absolute inset-0 z-20 items-center justify-center bg-black bg-opacity-80"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="flex flex-col items-center gap-3 px-4">
            <Spin size="large" />
            <span className="text-white text-sm sm:text-base">Loading…</span>
          </div>
        </div>
      )}

      <div
        className={`relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-10 text-center transition-all duration-700 ease-out ${
          textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="w-full flex justify-center">
          <div className="w-full max-w-3xl">
            <SkeletonTheme baseColor="#111827" highlightColor="#374151">
              {imageLoaded ? (
                <Typography.Title
                  level={1}
                  className="text-white font-[Great_Vibes] font-extrabold leading-tight mt-28"
                  style={titleStyle}
                >
                  Mai Anh
                  <br />&<br />
                  Quốc Bảo
                </Typography.Title>
              ) : (
                <div className="mt-8">
                  <Skeleton height={80} />
                  <div className="h-6" />
                  <Skeleton height={80} />
                </div>
              )}
            </SkeletonTheme>
          </div>
        </div>
        {/* Countdown circles or skeletons */}
        <div className="mt-5 w-full max-w-md px-2">
          <div className="flex justify-center items-center gap-1 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16">
            {values.map((element, index) => (
              <div key={`circle-${index}`} className="p-1 sm:p-4 shrink-0">
                {imageLoaded ? (
                  <div className="bg-[#F4146E95] rounded-full shadow-lg flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36">
                    <Typography.Text
                      className="text-center font-semibold leading-tight"
                      style={numberStyle}
                    >
                      <span style={numberStyle}>{element}</span>
                      <br />
                      <span className="block" style={labelStyle}>
                        {labels[index]}
                      </span>
                    </Typography.Text>
                  </div>
                ) : (
                  <SkeletonTheme baseColor="#111827" highlightColor="#374151">
                    <Skeleton circle={true} height={80} width={80} />
                  </SkeletonTheme>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Date title or skeleton */}
        <div className="mt-6">
          {imageLoaded ? (
            <Typography.Title
              level={2}
              className="font-bold mt-10 tracking-wide"
              style={dateStyle}
            >
              {dayjs(targetDates[currentTargetIndex]).format(
                "DD [THÁNG] MM YYYY"
              )}
            </Typography.Title>
          ) : (
            <SkeletonTheme baseColor="#111827" highlightColor="#374151">
              <Skeleton height={28} width={240} />
            </SkeletonTheme>
          )}
        </div>
      </div>
    </div>
  );
}

export default TimeWeddingCountdown;
