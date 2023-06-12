import { useSelector } from "react-redux";
import ModalConnectWallet from "./ModalConnectWallet";
import ModalInstallWallet from "./ModalInstallWallet";
import ModalChangeNetwork from "./ModalChangeNetwork";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useChainId } from "@thirdweb-dev/react";


const ModalWarming = (props) => {
  const { modalOpen, setModalOpen } = props;
  const { warming } = useSelector((state) => state.messageReducer);
  console.log("Warming", warming.code);
  const chainId = useChainId();

  return (
    <>
      {Object.keys(warming).length !== 0 && (

        <div className="px-2 py-2">
          {warming.code == "wm03" && (
            <ModalChangeNetwork
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              warming={warming}
            />
          )}
          {warming.code == "wm02" && (
            <ModalConnectWallet
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              warming={warming}
            />
          )}
          {warming.code == "wm01" && (
            <ModalInstallWallet
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              warming={warming}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ModalWarming;