import { Button, Col, ConfigProvider } from "antd";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import "./App.css";
import { Sound } from "./assets";
import { HeartRain, PlayBackAudio } from "./components";
import AutoScrollMobile from "./components/AutoScrollMobile";
import ConfirmInvitation from "./components/ConfirmInvitation";
import Event from "./components/Event";
import GuestbookForm from "./components/GuestBook";
import Introduce from "./components/Introduce";
import IntroMessage from "./components/IntroMessage";
import IntroOverlay from "./components/IntroOverlay";
import ListWishes from "./components/ListWishes/ListWishes";
import MoneyBoxModal from "./components/MoneyBoxModal";
import QrCode from "./components/QrCode";
import ThankYouCard from "./components/ThankYouCard/ThankYouCard";
import TimeWeddingCountdown from "./components/TimeWeddingCountdown";
import WeddingAlbum from "./components/WeddingAlbum/WeddingAlbum";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [autoOpenReady, setAutoOpenReady] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const openBtnRef = useRef<HTMLButtonElement | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    let handled = false;
  
    const tryPlay = async () => {
      if (handled) return;
      handled = true;
  
      const audio = audioRef.current;
      if (!audio) return;
  
      try {
        audio.muted = false; // đảm bảo không bị muted
        await audio.play();
      } catch (err) {
        console.warn('Autoplay blocked, waiting user click');
      }
  
      window.removeEventListener('pointerdown', onFirstInteraction);
    };
  
    const onFirstInteraction = () => {
      tryPlay();
    };
  
    window.addEventListener('pointerdown', onFirstInteraction, {
      once: true,
    });
  
    return () => {
      window.removeEventListener('pointerdown', onFirstInteraction);
    };
  }, [audioRef]);  

  useEffect(() => {
    const onReady = () => setAutoOpenReady(true);
    window.addEventListener("countdown-image-ready", onReady as EventListener);
    return () =>
      window.removeEventListener(
        "countdown-image-ready",
        onReady as EventListener
      );
  }, []);

  useEffect(() => {
    if (autoOpenReady) {
      const t = setTimeout(() => setIsCardOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, [autoOpenReady]);

  useEffect(() => {
    const overlayVisible = !isCardOpen;
    const overlayEl = overlayRef.current;
    const btn = openBtnRef.current;

    if (overlayVisible && btn) {
      btn.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        overlayVisible &&
        (e.key === "Enter" || e.code === "Space" || e.key === " ")
      ) {
        e.preventDefault();
        setIsCardOpen(true);
        return;
      }

      if (isCardOpen && e.key === "Escape") {
        e.preventDefault();
        setIsCardOpen(false);
        return;
      }

      if (overlayVisible && e.key === "Tab" && overlayEl) {
        const focusable = overlayEl.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement;

        if (e.shiftKey) {
          if (active === first || !overlayEl.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isCardOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener?.("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Prevent background scrolling while the card overlay is visible
  useEffect(() => {
    if (!isCardOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isCardOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const toggleModal = useCallback(() => {
    setIsModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const renderMain = useCallback(() => {
    return (
      <>
        <AutoScrollMobile />
        <div
          style={{
            position: "fixed",
            top: "0.5rem",
            right: "1.5rem",
            zIndex: 1000,
            borderRadius: "50%",
          }}
        >
          <PlayBackAudio
            triggerRef={audioRef as RefObject<HTMLAudioElement>}
            source={Sound}
          />
        </div>
        <HeartRain isShown />
        <TimeWeddingCountdown />
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <Introduce />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <Event />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <WeddingAlbum />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <IntroMessage />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <ConfirmInvitation />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <ListWishes />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <GuestbookForm />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <ThankYouCard />
        </div>
        <div className="flex flex-row justify-center items-center w-full h-auto relative overflow-visible py-10 px-4 sm:px-6 lg:px-20">
          <QrCode />
        </div>
        <Button
          type="primary"
          className="scroll-to-top"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "120px",
            right: "20px",
            zIndex: 1000,
            backgroundColor: "#F08FFF80",
            height: "2.5rem",
            width: "2.5rem",
            fontSize: "1.5rem",
          }}
        >
          ↑
        </Button>
        <Button
          type="primary"
          onClick={scrollToBottom}
          style={{
            position: "fixed",
            bottom: "70px",
            right: "20px",
            zIndex: 1000,
            backgroundColor: "#F08FFF80",
            height: "2.5rem",
            width: "2.5rem",
            borderRadius: 8,
            fontSize: "1.5rem",
          }}
        >
          ↓
        </Button>
        <Button
          type="primary"
          onClick={toggleModal}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
            backgroundColor: "#F08FFF80",
            height: "2.5rem",
            width: "2.5rem",
            borderRadius: 1000,
            fontSize: "1.5rem",
          }}
        >
          $
        </Button>
        <MoneyBoxModal {...{ isModalVisible, toggleModal }} />
      </>
    );
  }, [isModalVisible, toggleModal]);

  const renderContent = useCallback(() => {
    if (isMobile) {
      if (showIntro)
        return <IntroOverlay onFinish={() => setShowIntro(false)} />;
      return renderMain();
    } else {
      return renderMain();
    }
  }, [isMobile, renderMain, showIntro]);

  return (
    <ConfigProvider>
      <Col>{renderContent()}</Col>
    </ConfigProvider>
  );
}

export default App;
