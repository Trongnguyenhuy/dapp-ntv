/* eslint-disable react/prop-types */
import { Modal } from "antd";
import logoMetaMask from "../../assets/metamask.png"
import logoTrustWallet from "../../assets/trustwallet.png"
import logoWallet from "../../assets/wallet.png"
import { useDispatch } from "react-redux";
import { setMessage } from "../../Redux/Reducers/MessageReducer";
import { AiFillGithub, AiOutlineWallet } from 'react-icons/ai';
import { FaEthereum } from 'react-icons/fa';
import { ConnectWallet } from "@thirdweb-dev/react";
const ModalConnectWallet = (props) => {
    const { modalOpen, setModalOpen } = props;
    const handleCancel = () => {
        setModalOpen(false);
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

    return (

        <Modal
            title={
                <h2 className="font-bold text-xl text-white uppercase text-center py-4">
                    Kết nối ví
                </h2>
            }
            open={modalOpen}
            onCancel={handleCancel}
            footer={null}
            className="custom-modal"
        >
            {/* <div className="flex items-center mb-4">
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
            </div> */}
            <div className="flex flex-col p-4">
                <div className="flex flex-col items-center">
                    <img
                        src={logoWallet}
                        alt="account"
                        className="w-32 h-32 rounded-full"
                    />
                    <h2 className="text-white font-sans text-lg font-semibold text-center py-6">Bạn chưa kết nối ví</h2>

                </div>
                <div className="text-center">

                    <div className="flex flex-col">

                    <ConnectWallet className="modal-info" theme="light" btnTitle="Kết nối ví" modalTitle="Chọn ví để kết nối" />
                    </div>
                </div>

            </div>
        </Modal>
    );
};

export default ModalConnectWallet;
