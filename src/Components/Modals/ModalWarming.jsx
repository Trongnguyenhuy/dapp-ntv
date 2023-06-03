import { useSelector } from "react-redux";
import ModalConnectWallet from "./ModalConnectWallet";
import ModalInstallWallet from "./ModalInstallWallet";
import ModalChangeNetwork from "./ModalChangeNetwork";

const ModalWarming = (props) => {
  const { modalOpen, setModalOpen } = props;
  const { warming } = useSelector((state) => state.messageReducer);

  return (
    <>
      {Object.keys(warming).length !== 0 && (

        <div className="px-4 py-2">
          {warming.code == "wm03" && (
            <ModalChangeNetwork
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          )}
          {warming.code == "wm02" && (
            <ModalConnectWallet
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          )}
          {warming.code == "wm01" && (
            <ModalInstallWallet
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ModalWarming;
