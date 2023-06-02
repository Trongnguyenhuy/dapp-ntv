/* eslint-disable react/prop-types */
import { Modal } from "antd";
import logoMetaMask from "../../assets/metamask.png"
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../Redux/Reducers/MessageReducer";
const ModalChangeNetwork= (props) => {
  const { warming } = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const { modalOpen, setModalOpen} = props;
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
          // This error code indicates that the chain has not been added to MetaMask.
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
              // handle "add" error
              console.log(addError);
            }
          }
          // handle other "switch" errors
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
            footer={[

            ]}
        >
            <div className="flex flex-col justify-between gap-4">
                
                <button
                onClick={changeNetwork}
                    className="w-full flex flex-row items-center gap-10 px-6 py-4 bg-white rounded-lg"
                >
                    <img
                    src={logoMetaMask}
                    alt="account"
                    className="w-16 h-16 rounded-full"
                />
                <h2 className="text-lg font-poppins font-light cursor-pointer text-black">{warming.message}</h2>
                    
                </button>

            </div>
        </Modal>
    );
};

export default ModalChangeNetwork;