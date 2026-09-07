import { QR_HN, QR_XD } from "../assets";
import { WEDDING_INFO } from "../constants";

function QrCode() {
  const { groom, bride } = WEDDING_INFO;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#e5c07b]/30 p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-bold !text-[#b8975e] font-serif mb-2">
            QR CHUYỂN KHOẢN
          </h3>
          <p className="text-sm">Ngân hàng: {groom.bank.bankName}</p>
          <p className="text-sm">Chủ tài khoản: {groom.bank.accountName}</p>
          <p className="text-sm">Số tài khoản: {groom.bank.accountNumber}</p>
        </div>
        <div className="flex justify-center mt-4">
          <img
            src={QR_HN}
            alt="QR Code Chú Rể"
            className="w-48 h-48 rounded-md shadow-md"
          />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#e5c07b]/30 p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-bold !text-[#b8975e] font-serif mb-2">
            QR CHUYỂN KHOẢN
          </h3>
          <p className="text-sm">Ngân hàng: {bride.bank.bankName}</p>
          <p className="text-sm">Chủ tài khoản: {bride.bank.accountName}</p>
          <p className="text-sm">Số tài khoản: {bride.bank.accountNumber}</p>
        </div>
        <div className="flex justify-center mt-4">
          <img
            src={QR_XD}
            alt="QR Code Cô Dâu"
            className="w-48 h-48 rounded-md shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

export default QrCode;
