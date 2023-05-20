import FarmingCard from "../../Components/Card/FarmingCard";

export const FarmingBody = () => {
  const farmingCard = [
    { id: 1, isHome: false, duration: 30 },
    { id: 2, isHome: false, duration: 60 },
    { id: 3, isHome: false, duration: 90 },
  ];
  return (
    <div className="flex flex-col justify-center py-16">
      <div className="flex flex-col justify-around items-center py-8">
        <h1 className="font-poppins font-bold text-4xl uppercase ">FARMS</h1>
        <h2 className="font-sans font-medium text-3xl py-2">
          Cấp thanh khoản để nhận thưởng
        </h2>
      </div>

      <div className={`flex flex-row justify-between h-sceen px-16 gap-12`}>
        {farmingCard.map((item) => (
          <FarmingCard
            key={item.id}
            id={item.id}
            isHome={item.isHome}
            duration={item.duration}
          />
        ))}
      </div>
    </div>
  );
};
