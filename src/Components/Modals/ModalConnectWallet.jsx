/* eslint-disable react/prop-types */
import { Modal } from "antd";
import logoMetaMask from "../../assets/metamask.png"
import { useDispatch } from "react-redux";
import { setMessage } from "../../Redux/Reducers/MessageReducer";
import { AiFillGithub, AiOutlineWallet } from 'react-icons/ai';
import { FaEthereum } from 'react-icons/fa';
const ModalConnectWallet = (props) => {
    const dispatch = useDispatch();
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
        // <Modal
        //     wrapClassName="custom-modal"
        //     title={
        //         <h2 className="font-bold text-xl text-white uppercase text-center p-4">
        //             Kết nối ví
        //         </h2>
        //     }
        //     bodyStyle={{ padding: 10 }}
        //     open={modalOpen}
        //     onCancel={handleCancel}
        //     footer={[

        //     ]}
        // >
        //     <div className="flex flex-col justify-between gap-4">

        //         <button
        //         onClick={connectWalletHandler}
        //             className="w-full flex flex-row items-center gap-10 px-6 py-4 bg-white rounded-lg"
        //         >
        //             <img
        //             src={logoMetaMask}
        //             alt="account"
        //             className="w-16 h-16 rounded-full"
        //         />
        //         <h2 className="text-lg font-poppins font-light cursor-pointer text-black">MetaMask</h2>

        //         </button>

        //     </div>
        // </Modal>

        <Modal
            title="Connect Wallet"
            open={modalOpen}
            onCancel={handleCancel}
            footer={null}
            className="dark:bg-gray-800"
        >
            <div className="flex items-center mb-4">
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
      </div>
        </Modal>
    );
};

export default ModalConnectWallet;
