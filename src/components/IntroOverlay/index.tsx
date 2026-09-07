import "./index.css";
import { useState } from "react";

export default function IntroOverlay({ onFinish }: { onFinish: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleOpen = () => {
    if (fadeOut) return;
    setFadeOut(true);
    setTimeout(onFinish, 800);
  };

  return (
    <div className={`intro-overlay ${fadeOut ? "fade-out" : "fade-in"}`}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div className="relative z-10 intro-content px-6 py-10 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
        <div className="text-[#e5c07b] text-xs uppercase tracking-[4px] mb-3 font-semibold">
          Wedding Invitation
        </div>
        <div
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(2.8rem, 8vw, 4rem)",
            lineHeight: 1.2,
            background:
              "linear-gradient(135deg, #e5c07b 0%, #b8975e 50%, #94743c 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "6px",
          }}
        >
          Mai Anh
          <br />
          <span style={{ fontSize: "0.6em", opacity: 0.85 }}>&amp;</span>
          <br />
          Quốc Bảo
        </div>
        <div className="text-white/90 text-sm tracking-[2px] font-light mt-3 mb-8">
          29 . 11 . 2026
        </div>

        <button
          onClick={handleOpen}
          className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#b8975e] text-white font-medium text-sm tracking-wider uppercase shadow-xl hover:bg-[#94743c] active:scale-95 transition-all duration-300"
          style={{
            boxShadow: "0 4px 20px rgba(184, 151, 94, 0.5)",
          }}
        >
          <span>Chạm để mở thiệp</span>
          <span className="text-base group-hover:translate-x-1 transition-transform">
            ✉️
          </span>
        </button>
      </div>
    </div>
  );
}
