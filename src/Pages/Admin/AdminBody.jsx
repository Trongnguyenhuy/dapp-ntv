import WalletInforCard from "../../Components/Card/WalletInforCard";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../Redux/Reducers/FarmingReducer";
import AdminFarmingCard from "../../Components/Card/AdminFarmingCard";

export const AdminBody = () => {
    const { account } = useSelector((state) => state.farmingReducer);
    const dispatch = useDispatch();

    const connectWalletHandler = async () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
        try {
            await window.ethereum.request({
            method: "eth_requestAccounts",
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
        } else {
        const setMessageAction = setMessage({
            type: "warming",
            message: "Need to install MetaMask",
        });
        dispatch(setMessageAction);
        }
    };


    const farmingCard = [
        { id: 1, isHome: true, duration: 30 },
        { id: 2, isHome: true, duration: 60 },
        { id: 3, isHome: true, duration: 90 },
      ];

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <aside
        className="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-gray-800"
        >
        <div className="sidebar-header flex items-center justify-center py-4">
            <div className="inline-flex">
            <a href="#" className="inline-flex flex-row items-center">
                <span className="leading-10 text-gray-100 text-2xl font-bold ml-1 uppercase">NTV</span>
            </a>
            </div>
        </div>
        <div className="sidebar-content px-4 py-6">
            <li className="my-px">
                <a
                href="#"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100"
                >
                <span className="ml-3">Dashboard</span>
                </a>
            </li>
        </div>
        </aside>
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <header className="header bg-white shadow py-4 px-4">
            <div className="header-content flex items-center flex-row">
            <form action="#">
                <div className="hidden md:flex relative">
                <input
                    id="search"
                    type="text"
                    name="search"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400"
                    placeholder="Search..."
                />
                </div>
            </form>
            <div className="flex ml-auto">
                <a href className="flex flex-row items-center">
                <ul className="flex flex-row justify-start items-center gap-8 mr-8">
                    {account.walletAddress.length > 0 ? (
                        <li>
                        <WalletInforCard />
                        </li>
                    ) : (
                        <li>
                        <button
                            onClick={connectWalletHandler}
                            className="p-2 px-6 text-[#091227] bg-[#1CE6EC] hover:bg-[#fff] rounded-lg font-sans font-medium cursor-pointer "
                        >
                            Kết nối ví
                        </button>
                        </li>
                    )}
                </ul>
                </a>
            </div>
            </div>
        </header>
        <div className="main-content flex flex-col flex-grow p-4">
            <h1 className="font-bold text-2xl text-gray-700">Dashboard</h1>
            <a href="#" className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-900">
                <span className="ml-3">Create Pool</span>
            </a>
            <div className="flex flex-col flex-grow border-4 border-gray-400 border-dashed bg-white rounded mt-4">
                <div className={`flex flex-row justify-between h-sceen px-16 gap-12`}>
                    {farmingCard.map((item) => (
                        <AdminFarmingCard
                        key={item.id}
                        id={item.id}
                        isHome={item.isHome}
                        duration={item.duration}
                        />
                    ))}
                </div>
            </div>
        </div>
        <footer className="footer px-4 py-6">
            <div className="footer-content">
            <p className="text-sm text-gray-600 text-center">© NTV 2023. All rights reserved. <a href="https://twitter.com/iaminos">by NTV</a></p>
            </div>
        </footer>
        </main>
    </div>
  )
}

export default AdminBody