import { Typography, Image } from "antd";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import { ImgIntroMessage } from "../assets";

const { Title, Paragraph } = Typography;

const IntroMessage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="w-full px-4 py-14 bg-[#faf7f2]"
      data-aos="fade-up"
    >
      <div
        className="max-w-3xl mx-auto text-center bg-white p-8 sm:p-12 rounded-2xl border border-[#e5c07b]/40 shadow-[0_16px_40px_rgba(127,100,67,0.08)] relative"
        style={{
          outline: "1px solid rgba(229, 192, 123, 0.2)",
          outlineOffset: "-10px",
        }}
      >
        <Title level={3} className="!text-[#b8975e] mb-4 font-serif">
          💌 Lời Ngỏ
        </Title>
        <Paragraph className="text-gray-700 text-base sm:text-lg whitespace-pre-line leading-relaxed font-serif">
          Bằng tất cả sự trân trọng, chúng con/chúng em xin gửi lời cảm ơn chân
          thành nhất đến ông bà, cô chú, cậu mợ, dì dượng, cùng toàn thể anh chị
          em, bạn bè và đồng nghiệp thân yêu!
          {"\n\n"}
          Dù cuộc sống luôn bận rộn với nhiều lo toan và công việc, nhận được sự
          quan tâm cùng những lời chúc phúc ấm áp của mọi người dành cho ngày vui
          của chúng con/chúng em chính là món quà quý giá nhất.
          {"\n\n"}
          Một lần nữa, chúng con/chúng em xin chân thành cảm ơn và hân hoan chờ
          đón sự hiện diện của mọi người trong ngày trọng đại sắp tới.
        </Paragraph>

        <div className="mt-8 flex justify-center">
          <Image
            src={ImgIntroMessage}
            alt="Ảnh cô dâu chú rể"
            className="rounded-xl shadow-md border-2 border-[#b8975e]/60 object-cover"
            width={300}
            preview={false}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroMessage;
