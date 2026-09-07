import { Image } from "antd";
import { Img12 } from "../../assets";
import { WEDDING_INFO, THEME } from "../../constants";

const ThankYouCard = () => {
  return (
    <div className="w-full py-16 px-4 sm:px-6 flex justify-center items-center bg-[#faf8f5]">
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#e5c07b]/40 shadow-xl w-full max-w-lg text-center">
        <div className="flex justify-center mb-5">
          <Image
            src={Img12}
            preview={false}
            alt="Wedding Couple"
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full border-4 border-[#b8975e] shadow-md"
          />
        </div>
        <div
          style={{
            fontFamily: THEME.fonts.serif,
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "clamp(2.4rem, 6vw, 3.6rem)",
            lineHeight: 1.2,
            background: THEME.gradients.buttonGold,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "12px",
          }}
        >
          Thank you!
        </div>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-sm mx-auto mb-5 font-sans">
          Sự hiện diện và những lời chúc phúc của quý vị là niềm vinh hạnh và món quà ý nghĩa nhất dành cho chúng tôi trong ngày trọng đại.
        </p>
        <div
          style={{
            fontFamily: THEME.fonts.serif,
            fontWeight: 600,
            fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
            color: THEME.colors.primaryBrown,
            letterSpacing: "0.5px",
          }}
        >
          {WEDDING_INFO.groom.name} & {WEDDING_INFO.bride.name}
        </div>
      </div>
    </div>
  );
};

export default ThankYouCard;
