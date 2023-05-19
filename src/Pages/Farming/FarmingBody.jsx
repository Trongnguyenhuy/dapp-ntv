import { useState } from "react";
import FarmingCard from "../../Components/Card/FarmingCard";
import FarmingInforCard from "../../Components/Card/FarmingInforCard";

export const FarmingBody = () => {
  const [openInforCard, setOpenInforCard] = useState("");
  const farmingCard = [
    { id: 1, isHome: false },
    { id: 2, isHome: false },
    { id: 3, isHome: false }
  ]
  return (
    <div className="flex flex-col justify-center py-16">
      <div className="flex flex-col justify-around items-center py-8">
        <h1 className="font-poppins font-bold text-4xl uppercase ">FARMS</h1>
        <h2 className="font-sans font-medium text-3xl py-2">Cấp thanh khoản để nhận thưởng</h2>
      </div>

      <div className={`flex flex-row justify-between h-sceen px-16 gap-12`}>
        {farmingCard.map(item => (
          <FarmingCard
            key={item.id}
            id={item.id}
            isHome={item.isHome}
          />
        ))}
      </div>
    </div>
  );
};
