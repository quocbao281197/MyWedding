import { Spin, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ImgWedding01 } from "../assets";
import { WEDDING_INFO, THEME } from "../constants";

function TimeWeddingCountdown() {
  const targetDates = useMemo(() => {
    return [dayjs(WEDDING_INFO.date.iso)];
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

  const titleStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.serif,
    fontSize: "clamp(2.4rem, 6.5vw, 4.2rem)",
    lineHeight: 1.25,
    fontStyle: "italic",
    fontWeight: 600,
    letterSpacing: "0.02em",
    background: THEME.gradients.textGold,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
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
    fontFamily: THEME.fonts.serif,
    fontSize: "clamp(1.1rem, 3.2vw, 1.8rem)",
    lineHeight: 1.4,
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    background: THEME.gradients.textGold,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  useEffect(() => {
    if (imageLoaded) {
      const t = setTimeout(() => setTextVisible(true), 500);
      try {
        window.dispatchEvent(new CustomEvent("countdown-image-ready"));
      } catch {}
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
                  className="leading-tight mt-28"
                  style={titleStyle}
                >
                  {WEDDING_INFO.groom.name}
                  <br />
                  <span className="text-[0.75em] block my-1 font-normal opacity-90">&</span>
                  {WEDDING_INFO.bride.name}
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
        <div className="mt-5 w-full max-w-md px-2">
          <div className="flex justify-center items-center gap-1 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16">
            {values.map((element, index) => (
              <div key={`circle-${index}`} className="p-1 sm:p-4 shrink-0">
                {imageLoaded ? (
                  <div className="bg-[#b8975e]/85 backdrop-blur-sm border border-[#e5c07b]/40 rounded-full shadow-lg flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36">
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

        <div className="mt-6">
          {imageLoaded ? (
            <Typography.Title
              level={2}
              className="font-bold mt-10 tracking-wide"
              style={dateStyle}
            >
              {dayjs(targetDates[currentTargetIndex]).format(
                "DD [THÁNG] MM [NĂM] YYYY"
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
