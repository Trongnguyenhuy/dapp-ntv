/* eslint-disable react/prop-types */
import { Modal } from "antd";
const ModalChangeNetwork = (props) => {
  const { modalOpen, setModalOpen, warming } = props;

  const handleCancel = () => {
    setModalOpen(false);
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
      title={
        <h2 className="font-bold text-xl text-white uppercase text-center p-4">
          {warming.header}
        </h2>
      }
      bodyStyle={{ padding: 10 }}
      open={modalOpen}
      onCancel={handleCancel}
      footer={[]}
    >
      <div className="flex flex-col justify-between gap-4">

        <h2 className="text-lg py-4 text-center font-poppins font-light cursor-pointer text-white">{warming.message}</h2>
        <button
          onClick={changeNetwork}
          className="w-full flex flex-row items-center gap-10 px-6 py-4 bg-white rounded-lg"
        >
          <h2 className="text-lg font-poppins font-light text-center w-full cursor-pointer text-black">Chuyển mạng</h2>

        </button>

      </div>
    </Modal>
  );
};

export default ModalChangeNetwork;
