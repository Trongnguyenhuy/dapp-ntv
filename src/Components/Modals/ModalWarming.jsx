import { GoAlert } from "react-icons/go";
import { MdOutlineInsertComment } from "react-icons/md";
import { useSelector } from "react-redux";

const ModalWarming = () => {
  const { warming } = useSelector((state) => state.messageReducer);
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

  const connectWalletHandler = async () => {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleInstallMetamask = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  return (
    <>
      {Object.keys(warming).length !== 0 && (
        <div className="h-screen flex flex-row justify-center items-center">
          <div className="walletCard w-1/4 rounded-xl shadow-xl">
            <div className="rounded-t-xl walletCard py-4 text-center">
              {warming.type == "instruct" ? (
                <div className="w-full rounded-t-xl">
                  <MdOutlineInsertComment className="text-6xl text-white font-bold mx-auto" />
                </div>
              ) : (
                <div className="w-full rounded-t-xl">
                  <GoAlert className="text-6xl text-whit font-bold mx-auto" />
                </div>
              )}
              <h2 className="text-xl font-bold py-2">{warming.header}</h2>
            </div>

            <div className="w-full rounded-b-xl bg-white p-4 text-black text-center leading-relaxed">
              
              <p className="text-sm font-poppins p-4 px-6">{warming.message}</p>
              <div className="px-4 py-2">
                {warming.code == "wm03" && (
                  <button
                    onClick={changeNetwork}
                    className="w-full py-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] text-white rounded-lg font-sans font-medium cursor-pointer"
                  >
                    Chuyển mạng
                  </button>
                )}
                {warming.code == "wm02" && (
                  <button
                    onClick={connectWalletHandler}
                    className="w-full py-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg font-sans font-medium cursor-pointer text-white"
                  >
                    Kết nối ví
                  </button>
                )}
                {warming.code == "wm01" && (
                  <button
                    onClick={handleInstallMetamask}
                    className="w-full py-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg font-sans font-medium cursor-pointer text-white"
                  >
                    Cài đặt ví MetaMask
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalWarming;
