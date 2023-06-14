/* eslint-disable react/prop-types */
// import { useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { Button, Modal } from "antd";
const ErrorModal = ({ isModalOpen, setIsModalOpen, message }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title={<h2 className="text-2xl text-red-500">{message.title}</h2>}
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>
      }
    >
      <p className="text-base font-semibold">{message.content}:</p>
      <div className="w-full mt-4 flex flex-row justify-center">
        <ConnectWallet />
      </div>
    </Modal>
  );
};
export default ErrorModal;
