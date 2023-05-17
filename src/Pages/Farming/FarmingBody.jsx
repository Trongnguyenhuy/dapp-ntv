import { useState } from "react";
import FarmingCard from "../../Components/Card/FarmingCard";
import FarmingInforCard from "../../Components/Card/FarmingInforCard";

export const FarmingBody = () => {
  const [openInforCard, setOpenInforCard] = useState("");

  return (
    <div className={`grid grid-cols-1 justify-items-center h-sceen p-1 md:p-2`}>
      <div
        className={` w-full ${openInforCard.length > 1 ? "hidden" : "md:w-1/2 xl:w-1/3"
          } px-4`}
      >
        <FarmingCard
          isHome={false}
          openInforCard={openInforCard}
          setOpenInforCard={setOpenInforCard}
        />
      </div>
      {openInforCard.length > 1 && (
        // <div className="col-span-2 w-full flex flex-row justify-center">
        //   <FarmingInforCard setOpenInforCard={setOpenInforCard} />
        // </div>
        <div className="w-full xl:w-1/2 flex flex-row justify-center">
          <FarmingInforCard setOpenInforCard={setOpenInforCard} />
        </div>
      )}
      {/* <div
        // className={` w-full ${
        //   openInforCard.length > 1 ? "" : "md:w-1/2 xl:w-1/3"
        // } px-4`}

        className="w-full px-4"
      >
        <FarmingCard
          openInforCard={openInforCard}
          setOpenInforCard={setOpenInforCard}
        />
      </div>
      <div
        // className={` w-full ${
        //   openInforCard.length > 1 ? "" : "md:w-1/2 xl:w-1/3"
        // } px-4`}
        className="w-full px-4"
      >
        <FarmingCard
          openInforCard={openInforCard}
          setOpenInforCard={setOpenInforCard}
        />
      </div> */}
    </div>
  );
};
