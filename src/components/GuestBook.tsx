import { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { ImgBgFlower } from "../assets";
import { useS } from "use-s-react";
import AOS from "aos";
import "aos/dist/aos.css";

const { Title, Text } = Typography;

const GuestbookForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [_, setSubmissions] = useS({
    value: [],
    key: "guest-book",
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const GOOGLE_FORM_ACTION =
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdb2-aKOT-IUM2_mt4mmuJ_JEufxMvWooUl_wuGmojp-OFbIg/formResponse";

  const GOOGLE_FORM_FIELDS = {
    name: "entry.175920834",
    wish: "entry.928499893",
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append(GOOGLE_FORM_FIELDS.name, values.name);
    formData.append(GOOGLE_FORM_FIELDS.wish, values.wish);

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      setSubmissions((prev) => [...prev, values]);
      message.success("Cảm ơn bạn đã gửi lời chúc!");
      form.resetFields();
    } catch (error) {
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center py-10 px-4 sm:px-6 lg:px-20 w-full"
      style={{
        backgroundImage: `url(${ImgBgFlower})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-[#e5c07b]/30 w-full max-w-md"
        data-aos="fade-up"
      >
        <div className="text-center mb-6">
          <Title level={3} className="!text-[#b8975e] font-bold font-serif">
            Sổ lưu bút 💌
          </Title>
          <Text className="text-gray-700 italic">
            Cảm ơn bạn vì đã gửi những lời chúc tốt đẹp đến đám cưới chúng tôi
          </Text>
        </div>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label={
              <span className="font-semibold text-base sm:text-lg text-gray-800">
                Tên của bạn
              </span>
            }
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên của bạn" }]}
            required={false}
          >
            <Input placeholder="Nhập tên của bạn" />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-semibold text-base sm:text-lg text-gray-800">
                Lời chúc của bạn
              </span>
            }
            name="wish"
            rules={[{ required: true, message: "Vui lòng nhập lời chúc" }]}
            required={false}
          >
            <Input.TextArea rows={4} placeholder="Nhập lời chúc của bạn" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-[#b8975e] hover:bg-[#94743c] border-none"
              style={{
                backgroundColor: "#b8975e",
              }}
            >
              <span className="font-semibold text-base sm:text-lg text-white">
                Gửi lời chúc
              </span>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default GuestbookForm;
