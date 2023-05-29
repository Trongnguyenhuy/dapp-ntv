import { useState, useEffect, useRef } from "react";
import { AiFillCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { HiViewfinderCircle } from "react-icons/hi2";
import { IoCopyOutline } from "react-icons/io5";
import { MdAccountBalanceWallet } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../Redux/Reducers/MessageReducer";
import { checkNetworkToken } from "../../Ultis/NetworkCheck/NetworkCheck";
import logoCoinLP from "../../assets/logo-coin-lp.png";

const WalletInforCard = () => {
  const [accountCard, setAccountCard] = useState(false);
  const { account } = useSelector((state) => state.farmingReducer);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Gán sự kiện click cho document
    document.addEventListener("mousedown", handleClick);

    // Hủy bỏ sự kiện click
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleAccountCard = () => {
    setAccountCard(!accountCard);
  };

  const handleClick = (e) => {
    if (dropdownRef?.current?.contains(e.target)) {
      return;
    }
    setAccountCard(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(account.walletAddress);
    const action = setMessage({
      type: "confirm",
      message: "Sao chép thành công!",
    });
    dispatch(action);
  };

  return (
    <div className="pe-4 w-full">
      <div
        onClick={handleAccountCard}
        className="flex flex-row justify-between gap-4 items-center p-2 text-white walletCard rounded-md"
      >
        <img
          src="https://picsum.photos/id/134/200"
          alt="account"
          className="w-10 h-10 rounded-full"
        />
        <p>{account.walletAddress.slice(0, 7) + "..."}</p>
        {!accountCard ? (
          <AiFillCaretDown className="text-xl" />
        ) : (
          <AiOutlineCaretUp className="text-xl" />
        )}
      </div>
      {accountCard && (
        <div
          className="rounded-md absolute top-20 right-12  text-white walletCard"
          ref={dropdownRef}
        >
          <div className="border-b-2 border-gray-300 p-4">
            <div className="flex flex-row justify-start items-center gap-4">
              <img
                src="https://picsum.photos/id/134/200"
                alt="account"
                className="w-12 rounded-full"
              />
              <p className="font-poppins text-md">
                {account.walletAddress.slice(0, 6) + "..."}
              </p>
            </div>
            {/* <div className="flex flex-row justify-between mt-2">
              <button className="p-1 mr-2 border-2 border-gray-600 hover:border-white cursor-pointer">
                SWITCH WALLET
              </button>
              <button className="p-1 mr-2 border-2 border-gray-600 hover:border-white cursor-pointer">
                DISCONNECT
              </button>
            </div> */}
          </div>
          <div className="border-b-2 border-gray-300 px-4 py-2">
            <p>Mạng</p>
            <h2 className="font-bold text-xl flex flex-row gap-2 justify-start items-center">
              <GoPrimitiveDot className="text-xl" /> {account.network}
            </h2>
            <p>Tiền trong ví</p>
            <h2 className="font-poppins text-md flex flex-row gap-2 justify-start items-center">
              <MdAccountBalanceWallet className="text-2xl" />
              {account.balance} {checkNetworkToken(account.network)}
            </h2>
            <h2 className="font-poppins text-md flex flex-row gap-2 justify-start items-center">
              <img
                className="w-6 h-6 rounded-full"
                src={logoCoinLP}
                alt="TVN-LP"
              />
              {account.balanceOfStakeToken} TVN-LP
            </h2>
          </div>
          <div>
            <p
              onClick={copyToClipboard}
              className="font-poppins text-md flex flex-row gap-2 justify-start items-center py-2 px-4 cursor-pointer hover:bg-gray-400"
            >
              <IoCopyOutline className="text-md font-poppins" />
              <span>Sao chép địa chỉ ví</span>
            </p>
            <a
              href={`https://sepolia.etherscan.io/address/${account.walletAddress}`}
              target="_blank"
              rel="noreferrer"
            >
              <p className="font-poppins text-md flex flex-row gap-2 justify-start items-center py-2 px-4 cursor-pointer hover:bg-gray-400">
                <HiViewfinderCircle className="text-xl" />
                <span>Xem trên trình duyệt</span>
              </p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletInforCard;
