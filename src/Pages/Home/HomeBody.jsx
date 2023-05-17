import logo from "../../assets/home-image.png";
import { useState } from "react";
import FarmingCard from "../../Components/Card/FarmingCard";
import PoolCard from "../../Components/Card/PoolCard";
import FarmingInforCard from "../../Components/Card/FarmingInforCard";
export const HomeBody = () => {
  const [openInforCard, setOpenInforCard] = useState("");

  return (
    <div className={`p-1 md:p-2`}>
      <div className={`flex flex-row justify-between mt-20`}>
        <div className={`flex flex-col justify-center ps-16`}>
          <h1 className="font-poppins font-bold text-8xl uppercase ">NTV Group</h1>
          <h2 className="font-sans font-medium text-4xl py-4">Sàn giao dịch phi tập trung trên nền tảng Blockchain</h2>
        </div>
        <div className={`justify-items-end pe-16`}>
          <img src={logo} alt="logo" width={800} height={600} />
        </div>
      </div>

      <div className="flex flex-col justify-center py-16">
        <div className="flex flex-col justify-around items-center py-8">
          <h1 className="font-poppins font-bold text-4xl uppercase ">FARMS</h1>
          <h2 className="font-sans font-medium text-3xl py-2">Cấp thanh khoản để nhận thưởng</h2>
        </div>

        <div className={`flex flex-row justify-between h-sceen px-16 gap-12`}>

          <FarmingCard
            isHome={true}
            openInforCard={openInforCard}
            setOpenInforCard={setOpenInforCard}
          />
          <FarmingCard
            isHome={true}
            openInforCard={openInforCard}
            setOpenInforCard={setOpenInforCard}
          />
          <FarmingCard
            isHome={true}
            openInforCard={openInforCard}
            setOpenInforCard={setOpenInforCard}
          />

        </div>
      </div>

      <div className="flex flex-col justify-center py-10">
        <div className="flex flex-col justify-around items-center py-8">
          <h1 className="font-poppins font-bold text-4xl uppercase ">POOLS</h1>
          <h2 className="font-sans font-medium text-3xl py-2">Gửi tiết kiệm đầu tư không rủi ro</h2>
        </div>

        <div className={`flex flex-col justify-between h-sceen px-16 gap-6`}>

          <PoolCard/>
          <PoolCard/>
          <PoolCard/>


        </div>
      </div>






    </div>
  );
};
