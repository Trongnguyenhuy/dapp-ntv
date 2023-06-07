import { useSelector } from "react-redux";
import ModalInstallWallet from "./ModalInstallWallet";
import ModalChangeNetwork from "./ModalChangeNetwork";

const ModalWarming = () => {

  const { warming } = useSelector((state) => state.messageReducer);

  return (
    <>
      {Object.keys(warming).length !== 0 && (
        <div className="px-4 py-2">
          {warming.code == "wm03" && (
            <ModalChangeNetwork
              modalOpen={true}
              warming={warming}
            />
          )}
          {warming.code == "wm01" && (
            <ModalInstallWallet
              modalOpen={true}
              warming={warming}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ModalWarming;
