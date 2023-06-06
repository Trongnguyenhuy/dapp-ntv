/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { AiFillGithub, AiOutlineWallet } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";
import { useEffect, useState } from "react";
const ModalConnectWallet = (props) => {
  const { modalOpen } = props;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      setIsOpen(true);
    }
  }, [modalOpen, setIsOpen]);
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      title="Connect Wallet"
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      wrapClassName="custom-modal"
    >
      <div className="flex items-center mb-4">
        <FaEthereum className="mr-4 text-5xl text-indigo-500" />
        <span className="text-2xl font-semibold">Metamask</span>
      </div>
      <div className="flex items-center mb-4">
        <AiOutlineWallet className="mr-4 text-5xl text-purple-500" />
        <span className="text-2xl font-semibold">Other Wallets</span>
      </div>
      <div className="flex items-center">
        <AiFillGithub className="mr-4 text-5xl text-gray-500" />
        <span className="text-2xl font-semibold">GitHub</span>
      </div>
    </Modal>
  );
};

export default ModalConnectWallet;
