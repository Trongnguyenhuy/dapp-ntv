/* eslint-disable react/prop-types */
import { Modal } from "antd";
import logoMetaMask from "../../assets/metamask.png"
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../Redux/Reducers/MessageReducer";
const ModalInstallWallet= (props) => {
    const dispatch = useDispatch();
    const { warming } = useSelector((state) => state.messageReducer);
    const { modalOpen, setModalOpen} = props;
    const handleCancel = () => {
        setModalOpen(false);
    };
    const handleInstallMetamask = () => {
        window.open('https://metamask.io/download/', '_blank');
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
                onClick={handleInstallMetamask}
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

export default ModalInstallWallet;
