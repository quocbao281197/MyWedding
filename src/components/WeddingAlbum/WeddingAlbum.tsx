import { Typography, Image } from "antd";
import {
  Img01,
  Img02,
  Img03,
  Img04,
  Img05,
  Img06,
  Img07,
  Img08,
  Img09,
  Img10,
  Img11,
  Img12,
  Img01_full,
  Img02_full,
  Img03_full,
  Img04_full,
  Img05_full,
  Img06_full,
  Img07_full,
  Img08_full,
  Img09_full,
  Img10_full,
  Img11_full,
  Img12_full,
} from "../../assets";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const { Title, Text } = Typography;

const albumImages = [
  { thumb: Img01, full: Img01_full },
  { thumb: Img02, full: Img02_full },
  { thumb: Img03, full: Img03_full },
  { thumb: Img04, full: Img04_full },
  { thumb: Img05, full: Img05_full },
  { thumb: Img06, full: Img06_full },
  { thumb: Img07, full: Img07_full },
  { thumb: Img08, full: Img08_full },
  { thumb: Img09, full: Img09_full },
  { thumb: Img10, full: Img10_full },
  { thumb: Img11, full: Img11_full },
  { thumb: Img12, full: Img12_full },
];

const WeddingAlbum = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
    });

    const handleResize = () => {
      AOS.refreshHard(); // more aggressive refresh
    };

    window.addEventListener("resize", handleResize);

    // Refresh after initial render
    setTimeout(() => {
      AOS.refreshHard();
    }, 500);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#faf7f2] py-14 px-4 sm:px-6 lg:px-20">
      <div className="text-center mb-10">
        <Title
          level={3}
          className="!text-[#b8975e] !font-bold !text-xl sm:!text-2xl lg:!text-3xl font-serif"
        >
          Album hình cưới
        </Title>
        <Text className="block text-sm sm:text-base lg:text-lg text-gray-700 italic max-w-2xl mx-auto">
          “Cùng nhau là một từ rất lãng mạn. Cùng nhau trưởng thành, cùng nhau
          già đi, cùng nhau đi khắp thế gian, cùng nhau về chung một nhà.”
        </Text>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Image.PreviewGroup>
          {albumImages.map((item, index) => (
            <div
              key={index}
              className="w-full"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Image
                src={item.thumb}
                alt={`Wedding ${index + 1}`}
                draggable={false}
                className="object-cover h-64 w-full rounded-xl cursor-pointer select-none border border-[#e5c07b]/40 shadow-md hover:shadow-xl transition-all duration-300"
                preview={{
                  src: item.full,
                  movable: true,
                }}
              />
            </div>
          ))}
        </Image.PreviewGroup>
      </div>
    </div>
  );
};

export default WeddingAlbum;
