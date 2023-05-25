import logo from "../../assets/home-image.png";
import { FarmingBody } from "../Farming/FarmingBody";
import { PoolBody } from "../Pool/PoolBody";

export const HomeBody = () => {

  return (
    <div className={`p-1 md:p-2`}>
      <div className={`flex flex-row justify-between mt-20`}>
        <div className={`flex flex-col justify-center ps-16`}>
          <h1 className="font-poppins font-bold text-8xl uppercase ">
            NTV Group
          </h1>
          <h2 className="font-sans font-medium text-4xl py-4">
            Sàn giao dịch phi tập trung trên nền tảng Ethereum Sepolia
          </h2>
        </div>
        <div className={`justify-items-end pe-16`}>
          <img src={logo} alt="logo" width={800} height={600} />
        </div>
      </div>

      <FarmingBody />
      <PoolBody />
    </div>
  );
};
