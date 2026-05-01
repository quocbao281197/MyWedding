import Modal from "antd/es/modal/Modal";
import { GiftOutlined } from "@ant-design/icons";
import QrCode from "./QrCode";

const MoneyBoxModal = ({ isModalVisible, toggleModal }: any) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-pink-600 font-semibold text-lg">
          <GiftOutlined />
          <span>Hộp mừng cưới</span>
        </div>
      }
      open={isModalVisible}
      onCancel={toggleModal}
      footer={null}
      className="custom-modal"
    >
      <QrCode />
    </Modal>
  );
};

export default MoneyBoxModal;
