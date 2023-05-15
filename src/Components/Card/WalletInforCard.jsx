import { useState,useEffect, useRef } from "react";
import { AiFillCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { HiViewfinderCircle } from "react-icons/hi2";
import { IoCopyOutline } from "react-icons/io5";
import { MdAccountBalanceWallet } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../Redux/Reducers/FarmingReducer";
import { checkNetworkToken } from "../../Ultis/NetworkCheck/NetworkCheck";

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

  const handleClick = e => {
    if (dropdownRef.current.contains(e.target)) {
      return;
    }
    setAccountCard(false);
  };


  const copyToClipboard = () => {
    navigator.clipboard.writeText(account.walletAddress);
    const action = setMessage({
      type: "info",
      message: "Wallet Adress have just copied !",
    });
    dispatch(action);
  };

  return (
    <div>
      <div
        onClick={handleAccountCard}
        className="flex flex-row justify-between items-center gap-4 p-2 hover:bg-[rgb(161,123,134)] rounded-lg border-gray-600 hover:border-black border-2 cursor-pointer"
      >
        <img
          src="https://picsum.photos/id/134/200"
          alt="account"
          className="w-10 h-10 rounded-full"
        />
        <p>{account.walletAddress.slice(0, 6) + "..."}</p>
        {!accountCard ? (
          <AiFillCaretDown className="text-2xl" />
        ) : (
          <AiOutlineCaretUp className="text-2xl" />
        )}
      </div>
      {accountCard && (
        <div
          className="rounded-lg shadow-2xl border-2 border-gray-500 absolute top-20 right-4"
          style={{ background: "rgb(51,61,81)" }}
          ref={dropdownRef}
        >
          <div className="border-b-2 border-gray-600 p-4">
            <div className="flex flex-row justify-start items-center gap-4">
              <img
                src="https://picsum.photos/id/134/200"
                alt="account"
                className="w-16 rounded-full"
              />
              <p className="text-xl font-bold">
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
          <div className="border-b-2 border-gray-600 p-4">
            <p>Network</p>
            <h2 className="font-bold text-xl flex flex-row gap-2 justify-start items-center">
              <GoPrimitiveDot className="text-[rgb(113,87,255)] text-3xl" />{" "}
              {account.network}
            </h2>
            <p>Balance</p>
            <h2 className="font-bold text-xl flex flex-row gap-2 justify-start items-center">
              <MdAccountBalanceWallet className="text-[rgb(113,87,255)] text-3xl" />
              {account.balance} {checkNetworkToken(account.network)}
            </h2>
          </div>
          <div>
            <p
              onClick={copyToClipboard}
              className="font-bold text-xl flex flex-row gap-2 justify-start items-center py-2 px-4 cursor-pointer hover:bg-gray-400"
            >
              <IoCopyOutline className="text-3xl" />
              <span>Copy Address</span>
            </p>
            <a
              href={`https://etherscan.io/address/${account.walletAddress}`}
              target="_blank" rel="noreferrer"
            >
              <p className="font-bold text-xl flex flex-row gap-2 justify-start items-center py-2 px-4 cursor-pointer hover:bg-gray-400">
                <HiViewfinderCircle className="text-3xl" />
                <span>View on Explorer</span>
              </p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletInforCard;
