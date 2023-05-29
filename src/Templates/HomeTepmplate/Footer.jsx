export const Footer = () => {
  return (
    <div className="bg-[#060E22] border-b-2 border-gray-600 relative p-1">
      <div className="flex flex-row justify-between px-16 py-8">
        <div className="flex flex-col">
          <h1 className="font-sans font-bold text-4xl uppercase py-1">
            NTV GROUP
          </h1>
          <h2 className="font-sans font-medium text-md">
          Sàn giao dịch phi tập trung trên nền tảng Ethereum Sepolia
          </h2>
        </div>
        <div className="flex flex-col">
          <h1 className="font-sans font-bold text-xl uppercase py-1">
            Thông tin liên hệ
          </h1>
          <h2 className="font-sans font-medium text-md">
            <span className="text-gray-400">Số điện thoại: </span> (+84)
            395741398
          </h2>
          <h2 className="font-sans font-medium text-md">
            <span className="text-gray-400">Địa chỉ: </span>
            Số 81 - Khu dân cư 91B - Phường An Khánh - Quận Ninh Kiều - TP.
            Cần Thơ
          </h2>
        </div>
      </div>
    </div>
  );
};
