import { Typography, Image } from "antd";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import { Img03 } from "../assets";

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
          Bằng tất cả sự trân trọng chúng con xin cám ơn tất cả những người thân
          yêu, cô dì, chú bác, anh chị em, bạn bè và đồng nghiệp của tụi con/tụi
          em.
          {"\n\n"}
          Tụi con/tụi em biết mọi người rất bận rộn, bận rộn với công việc, tất
          bật với gia đình…
          {"\n\n"}
          Nhưng vẫn giành chút thời gian quý báu và những sự yêu thương để chúc
          mừng tình yêu và hạnh phúc của tụi con/tụi em.
          {"\n\n"}
          Một lần nữa xin chân thành cảm ơn tất cả mọi người và hẹn gặp mọi
          người vào ngày trọng đại sắp tới !!!
        </Paragraph>

        <div className="mt-8 flex justify-center">
          <Image
            src={Img03}
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
