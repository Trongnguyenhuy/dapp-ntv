/* eslint-disable react/prop-types */
import { Modal } from "antd";
import logoMetaMask from "../../assets/metamask.png";
import { useEffect } from "react";
import { useState } from "react";
const ModalInstallWallet = (props) => {
  const { modalOpen, warming } = props;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      setIsOpen(true);
    }
  }, [modalOpen, setIsOpen]);
  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleInstallMetamask = () => {
    window.open("https://metamask.io/download/", "_blank");
  };

  return (
    <Modal
      wrapClassName="custom-modal"
      bodyStyle={{ padding: 10 }}
      open={isOpen}
      onCancel={handleCancel}
      footer={[]}
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-4/5 border-2 border-gray-700 rounded-xl px-6 py-4">
          <h2 className="text-lg font-poppins font-light text-black">
            {warming.message}
          </h2>
        </div>
        <button
          onClick={handleInstallMetamask}
          className="w-4/5 flex flex-row items-center gap-10 px-6 py-4 bg-white rounded-lg"
        >
          <img
            src={logoMetaMask}
            alt="account"
            className="w-6 h-6 rounded-full"
          />
          <span className="text-black text-xl font-semibold ">CÀI ĐẶT VÍ</span>
        </button>
      </div>
    </Modal>
  );
};

export default ModalInstallWallet;
