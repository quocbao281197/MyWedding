import "./index.css";
import { useEffect, useState } from "react";

export default function IntroOverlay({ onFinish }: { onFinish: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 1000);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`intro-overlay ${fadeOut ? "fade-out" : "fade-in"}`}>
      <div className="intro-content"></div>
    </div>
  );
}
