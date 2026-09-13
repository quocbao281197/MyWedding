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
    fontSize: "clamp(1.5rem, 4.2vw, 2.4rem)",
    lineHeight: 1.2,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    background: THEME.gradients.textGold,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.sans,
    fontSize: "clamp(0.7rem, 1.8vw, 0.95rem)",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "rgba(255, 255, 255, 0.85)",
    marginBottom: "8px",
    fontWeight: 500,
  };

  const numberStyle: React.CSSProperties = {
    color: "white",
    fontSize: "clamp(1.6rem, 4.5vw, 2.3rem)",
    lineHeight: 1,
    fontWeight: 700,
  };

  const labelStyle: React.CSSProperties = {
    color: "rgba(255, 255, 255, 0.95)",
    fontSize: "clamp(0.8rem, 2.2vw, 1.05rem)",
    lineHeight: 1,
    marginTop: "4px",
    letterSpacing: "0.05em",
  };

  const dateStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.serif,
    fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
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
        className={`absolute inset-0 transition-opacity duration-700 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage:
            imageLoaded && bgImage ? `url(${bgImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center 65%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#000",
          filter: imageLoaded ? "none" : "blur(10px)",
        }}
      />

      {/* Lớp gradient tinh chỉnh rất nhẹ chỉ để chữ có độ tương phản, giữ bức ảnh sáng tự nhiên */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55 z-0 pointer-events-none" />

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
        className={`relative z-10 flex flex-col items-center justify-between min-h-screen px-4 pt-8 pb-10 text-center transition-all duration-700 ease-out ${
          textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* TOP: Tên 2 bạn gom gọn gàng trên 1 dòng như bìa tạp chí cao cấp */}
        <div className="w-full flex flex-col items-center pt-2 sm:pt-4">
          <SkeletonTheme baseColor="#111827" highlightColor="#374151">
            {imageLoaded ? (
              <div>
                <div style={subtitleStyle}>THE WEDDING OF</div>
                <Typography.Title
                  level={1}
                  className="!m-0 leading-tight"
                  style={titleStyle}
                >
                  {WEDDING_INFO.groom.name}
                  <span className="inline-block mx-3 text-[0.85em] font-light text-[#e5c07b]">
                    &
                  </span>
                  {WEDDING_INFO.bride.name}
                </Typography.Title>
              </div>
            ) : (
              <div className="mt-2">
                <Skeleton height={20} width={160} />
                <div className="h-2" />
                <Skeleton height={40} width={280} />
              </div>
            )}
          </SkeletonTheme>
        </div>

        {/* BOTTOM: Đồng hồ đếm ngược kích thước nổi bật, ấn tượng và ngày cưới */}
        <div className="w-full flex flex-col items-center gap-5">
          <div className="w-full max-w-xl px-2">
            <div className="flex justify-center items-center gap-3 sm:gap-6 md:gap-8">
              {values.map((element, index) => (
                <div key={`circle-${index}`} className="p-1 shrink-0">
                  {imageLoaded ? (
                    <div className="bg-[#b8975e]/90 backdrop-blur-md border-2 border-[#f5d38e]/60 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.35)] flex items-center justify-center w-18 h-18 sm:w-24 sm:h-24 md:w-28 md:h-28">
                      <Typography.Text
                        className="text-center font-bold leading-tight"
                        style={numberStyle}
                      >
                        <span style={numberStyle}>{element}</span>
                        <br />
                        <span className="block font-medium" style={labelStyle}>
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

          <div>
            {imageLoaded ? (
              <Typography.Title
                level={2}
                className="!m-0 font-medium tracking-wider"
                style={dateStyle}
              >
                {dayjs(targetDates[currentTargetIndex]).format(
                  "DD [THÁNG] MM [NĂM] YYYY"
                )}
              </Typography.Title>
            ) : (
              <SkeletonTheme baseColor="#111827" highlightColor="#374151">
                <Skeleton height={24} width={220} />
              </SkeletonTheme>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeWeddingCountdown;
