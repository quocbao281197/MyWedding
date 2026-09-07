import { Col, ConfigProvider } from "antd";
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
import ConfirmInvitation from "./components/ConfirmInvitation";
import GuestbookForm from "./components/GuestBook";
import IntroMessage from "./components/IntroMessage";
import ListWishes from "./components/ListWishes/ListWishes";
import MoneyBoxModal from "./components/MoneyBoxModal";
import ThankYouCard from "./components/ThankYouCard/ThankYouCard";
import TimeWeddingCountdown from "./components/TimeWeddingCountdown";
import WeddingAlbum from "./components/WeddingAlbum/WeddingAlbum";
import WeddingCalendar from "./components/WeddingCalendar/WeddingCalendar";
import WeddingSaveTheDate from "./components/WeddingSaveTheDate/WeddingSaveTheDate";
import { FamilySection } from "./components/FamilySection/FamilySection";
import { CeremonySection } from "./components/CeremonySection/CeremonySection";
import WeddingHero from "./components/WeddingHero/WeddingHero";
import WeddingTimeline from "./components/WeddingTimeline/WeddingTimeline";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let handled = false;
  
    const tryPlay = async () => {
      if (handled) return;
      handled = true;
  
      const audio = audioRef.current;
      if (!audio) return;
  
      try {
        audio.muted = false;
        await audio.play();
      } catch (err) {
        console.warn("Autoplay blocked, waiting user click");
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

  const toggleModal = useCallback(() => {
    setIsModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const renderMain = useCallback(() => {
    return (
      <>
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
          <WeddingSaveTheDate
            title="QUYẾT ĐỊNH BÊN NHAU TRỌN ĐỜI."
            subtitle="Together, for a Lifetime."
            date="29.11.2026"
            imageUrl="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop"
          />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible py-10 bg-[#faf7f2]">
          <WeddingCalendar
            year={2026}
            month={10}
            specialDay={29}
          />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <WeddingHero />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <FamilySection />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <CeremonySection />
        </div>
        <div className="flex flex-row justify-center items-center w-screen h-auto relative overflow-visible">
          <WeddingTimeline />
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

        <button
          onClick={toggleModal}
          title="Hộp mừng cưới"
          aria-label="Hộp mừng cưới"
          className="group flex items-center justify-center transition-all duration-300 active:scale-90 hover:scale-105"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 1000,
            background:
              "linear-gradient(135deg, #e5c07b 0%, #b8975e 50%, #94743c 100%)",
            height: "3.2rem",
            width: "3.2rem",
            borderRadius: "50%",
            fontSize: "1.4rem",
            border: "2px solid rgba(255, 255, 255, 0.6)",
            boxShadow: "0 6px 20px rgba(184, 151, 94, 0.5)",
            cursor: "pointer",
          }}
        >
          <span className="group-hover:rotate-12 transition-transform">🎁</span>
        </button>
        <MoneyBoxModal {...{ isModalVisible, toggleModal }} />
      </>
    );
  }, [isModalVisible, toggleModal]);

  const renderContent = useCallback(() => {
    return renderMain();
  }, [renderMain]);

  return (
    <ConfigProvider>
      <Col>{renderContent()}</Col>
    </ConfigProvider>
  );
}

export default App;
