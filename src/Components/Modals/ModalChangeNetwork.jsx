/* eslint-disable react/prop-types */
import { Modal } from "antd";
import logoMetaMask from "../../assets/metamask.png";
import { useEffect } from "react";
import { useState } from "react";
const ModalChangeNetwork = (props) => {
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

  const changeNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0xaa36a7`,
                chainName: "Sepolia Ethereum",
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: [
                  "https://endpoints.omniatech.io/v1/eth/sepolia/public",
                ],
                blockExplorerUrls: ["https://sepolia.etherscan.io/"],
              },
            ],
          });
        } catch (addError) {
          console.log(addError);
        }
      }
      console.log(switchError);
    }
  };

  return (
    <Modal
      wrapClassName="custom-modal"
      // title={
      //   <h2 className="font-bold text-xl text-white uppercase text-center p-4">
      //     {warming.header}
      //   </h2>
      // }
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
          onClick={changeNetwork}
          className="w-4/5 flex flex-row items-center gap-10 px-6 py-4 bg-white rounded-lg"
        >
          <img
            src={logoMetaMask}
            alt="account"
            className="w-6 h-6 rounded-full"
          />
          <span className="text-black text-xl font-semibold ">CHUYỂN MẠNG</span>
        </button>
      </div>
    </Modal>
  );
};

export default ModalChangeNetwork;
