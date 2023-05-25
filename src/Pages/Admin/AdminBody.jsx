import WalletInforCard from "../../Components/Card/WalletInforCard";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../Redux/Reducers/FarmingReducer";
import AdminFarmingCard from "../../Components/Card/AdminFarmingCard";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

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

    const [depositDuration, setDepositDuration] = useState(0);
    const [farmMultiplier, setFarmMultiplier] = useState(0);
    const [showForm, setShowForm] = useState(false);

    const history = useHistory();

    const submit = () => {
        console.log("skjksfs: " + depositDuration);
        console.log("skjksfs: " + farmMultiplier);
        history.goBack();
    }

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <aside
        className="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-gray-800"
        >
        <div className="sidebar-header flex items-center justify-center py-4">
            <div className="inline-flex">
            <a href="#" className="inline-flex flex-row items-center">
                <img src={logo} alt="logo" width={65} height={65} />
            </a>
            </div>
        </div>
        <div className="sidebar-content px-4 py-6">
            <li className="my-px">
                <a href="#" className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100">
                <span className="ml-3">Dashboard</span>
                </a>
            </li>
            <li className="my-px">
                <Link className="text-white" to="/">Trang chủ</Link>
            </li>
            <li className="my-px">
                <Link className="text-white" to="/farm">Farm</Link>
            </li>
            <li className="my-px">
                <Link className="text-white" to="/pool">Pool</Link>
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
            <button onClick={() => setShowForm(true)}>Create Pool</button>
            <div style={showForm ? {display: "block"} : {display: "none"}}>
                <div className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                    <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                            <div className="w-full flex justify-start text-gray-600 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wallet" width={52} height={52} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                    <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                                </svg>
                            </div>
                            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Create Pool</h1>
                            <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                                Thời Gian
                            </label>
                            <input id="name" value={depositDuration} onChange={(e) => setDepositDuration(e.target.value)} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
                            
                            <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                                Tỉ Trọng
                            </label>
                            <input id="name" value={farmMultiplier} onChange={(e) => setFarmMultiplier(e.target.value)} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"/>
                
                            <div className="flex items-center justify-start w-full">
                                <button className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm" onClick={submit}>Submit</button>
                                <button className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"  onClick={() => setShowForm(false)}>
                                    Cancel
                                </button>
                            </div>
                            <div className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"  onClick={() => setShowForm(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1={18} y1={6} x2={6} y2={18} />
                                    <line x1={6} y1={6} x2={18} y2={18} />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center py-12" id="button">
                    <button className="focus:outline-none mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm">
                        Create Pool
                    </button>
                </div>
            </div>
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
