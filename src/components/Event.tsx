import { Card, Typography, Modal } from "antd";
import { IcHeart, ImgBgLotus } from "../assets";
import { ReactSVG } from "react-svg";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const listData = [
  // {
  //   id: 1,
  //   nameEvent: "Lễ Đính Hôn",
  //   placeEventName: "Tư gia nhà gái",
  //   placeEventAddress: "Xã Tân Phú, Huyện Thanh Bình, Tỉnh Đồng Tháp",
  //   timeWelcome: "08:00",
  //   timeEvent: "09:00",
  //   dateEvent: "Thứ bảy, 11.10.2025",
  //   latitude: 10.5848,
  //   longitude: 105.50692,
  // },
  {
    id: 2,
    nameEvent: "Lễ Vu Quy",
    placeEventName: "Tư gia nhà gái",
    placeEventAddress: "207/13B Đ. Bình Thới, Phường, Bình Thới, Hồ Chí Minh 700000",
    timeWelcome: "07:00",
    timeEvent: "08:00",
    dateEvent: "Thứ bảy, 28.11.2026",
    latitude: 10.5848,
    longitude: 105.50692,
  },
  {
    id: 3,
    nameEvent: "Lễ Tân Hôn",
    placeEventName: "Tư gia nhà trai",
    placeEventAddress: "182/B4 Đ. Phạm Phú Thứ, Khu Phố 5, Bình Tiên, Hồ Chí Minh",
    timeWelcome: "08:00",
    timeEvent: "09:00",
    dateEvent: "Thứ bảy, 28.11.2026",
    latitude: 10.80767,
    longitude: 106.46492,
  },
  {
    id: 4,
    nameEvent: "Lễ báo hỷ",
    placeEventName: "Trung tâm tiệc cưới",
    placeEventAddress: "101 Đ. Lý Chiêu Hoàng, Phường 10, Bình Phú, Hồ Chí Minh, Vietnam",
    timeWelcome: "11:00",
    timeEvent: "12:00",
    dateEvent: "Chủ nhật, 29.11.2026",
    latitude: 10.81931621520912,
    longitude: 106.70107302310292,
  },
];

const CardEvent = ({
  data,
  onClick,
  onOpenMap,
}: {
  data: any;
  onClick: () => void;
  onOpenMap: () => void;
}) => {
  return (
    <div className="w-full sm:w-[20rem] flex justify-center items-center p-4">
      <Card
        className="bg-white bg-opacity-10 border border-white/30 shadow-lg backdrop-blur-md w-full"
        style={{
          borderRadius: "16px",
        }}
        onClick={onClick}
        data-aos="zoom-in"
      >
        <div className="text-center space-y-3 py-6">
          <Typography.Title
            level={4}
            className="text-white font-bold text-lg sm:text-xl"
          >
            🎉 {data?.nameEvent}
          </Typography.Title>
          <Typography.Text className="block text-white text-base">
            📍 {data?.placeEventName}
          </Typography.Text>
          <Typography.Text className="block text-gray-300 text-sm">
            {data?.placeEventAddress}
          </Typography.Text>
          <div className="mt-4 space-y-2 text-white text-sm sm:text-base">
            <Typography.Text>🕰️ Đón khách: {data?.timeWelcome}</Typography.Text>
            <br />
            <Typography.Text>🍽️ Khai tiệc: {data?.timeEvent}</Typography.Text>
            <br />
            <Typography.Text>📅 {data?.dateEvent}</Typography.Text>
          </div>
          <button
            onClick={onOpenMap}
            className="mt-4 bg-pink-500 text-white rounded px-4 py-2"
          >
            Mở bản đồ
          </button>
        </div>
      </Card>
    </div>
  );
};

function Event() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleOpenMap = (lat: number, lng: number) => {
    setSelectedCoords({ lat, lng });
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedCoords(null);
  };

  const handleOpenDirections = () => {
    if (selectedCoords) {
      const { lat, lng } = selectedCoords;
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
        "_blank"
      );
    }
  };

  return (
    <div className="w-full bg-cover bg-center bg-no-repeat relative overflow-visible px-4 sm:px-6 md:px-10 lg:px-20 py-10 w-full">
      <div
        className="bg-transparent rounded-xl p-8 flex flex-col items-center text-center"
        style={{
          backgroundImage: `url(${ImgBgLotus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          objectFit: "cover",
          width: "100%",
        }}
      >
        <Typography.Title
          data-aos="fade-up"
          style={{
            color: "#fff",
            fontWeight: 600,
            textShadow: "0 1px 3px rgba(0,0,0,0.6)",
          }}
          className="italic text-lg sm:text-xl md:text-2xl"
        >
          Thân mời tới dự lễ cưới thân mật <br></br> của chúng em/chúng con
        </Typography.Title>
        <div className="flex flex-row items-center justify-center gap-4 mt-4 mb-4 w-full max-w-md">
          <div className="flex-grow h-0.5 bg-white rounded-2xl" />
          <ReactSVG src={IcHeart} className="w-6 h-6 text-pink-500" />
          <div className="flex-grow h-0.5 bg-white rounded-2xl" />
        </div>
        {/* <Typography.Text
          className="text-white text-base sm:text-lg max-w-md"
          style={{ color: "#ffffff", fontWeight: 700 }}
        >
          ...tình yêu không phải là nhìn vào nhau, mà là nhìn về chung một
          hướng...
        </Typography.Text> */}
        <div className="mt-8 w-full flex flex-wrap justify-center items-stretch gap-2">
          {listData.map((item) => (
            <div key={item.id} data-aos="zoom-in">
              <CardEvent
                data={item}
                onClick={() =>
                  setSelectedCoords({ lat: item.latitude, lng: item.longitude })
                }
                onOpenMap={() => handleOpenMap(item.latitude, item.longitude)}
              />
            </div>
          ))}
        </div>
      </div>

      <Modal
        title="Bản đồ địa điểm"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        <iframe
          src={`https://www.google.com/maps?q=${selectedCoords?.lat},${selectedCoords?.lng}&output=embed`}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
        <button
          onClick={handleOpenDirections}
          className="mt-4 bg-pink-500 text-white rounded px-4 py-2"
        >
          Mở chỉ đường
        </button>
      </Modal>
    </div>
  );
}

export default Event;
