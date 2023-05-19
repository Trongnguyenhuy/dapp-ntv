import logo from "../../assets/logo.png";
import WalletInforCard from "../../Components/Card/WalletInforCard";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../Redux/Reducers/FarmingReducer";

export const Footer = () => {

    return (
        <div className="bg-[#060E22] border-b-2 border-gray-600 relative p-1">
            <div className="flex flex-row justify-between px-16 py-8">
                <div className="flex flex-col">
                    <h1 className="font-sans font-bold text-xl uppercase py-1">NTV GROUP</h1>
                    <h2 className="font-sans font-medium text-md">Sàn giao dịch phi tập trung trên nền tảng Blockchain</h2>

                </div>
                <div className="flex flex-col">
                    <h1 className="font-sans font-bold text-xl uppercase py-1">Thông tin liên hệ</h1>
                    <h2 className="font-sans font-medium text-md">Số điện thoại: (+84) 395741398</h2>
                    <h2 className="font-sans font-medium text-md">Địa chỉ: 81, Khu dân cư 91B, phường Xuân Khánh, quận Ninh Kiều, TP. Cần Thơ</h2>

                </div>
            </div>
            
        </div>
    );
};
