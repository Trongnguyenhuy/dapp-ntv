import { useHistory } from 'react-router-dom';
import logoCoinLP from "../../assets/logo-coin-lp.png";
import logoCoinTVN from "../../assets/logo-coin-tvn.png";
const PoolCard = (props) => {
  const { id, totalLiquidity } = props;
  const history = useHistory();
  const handleClick = () => {
    history.push(`/pool-detail/${id}`); //get params
  };

  return (
    <div
      className="w-full bg-[#091227] border-2 border-gray-600 rounded-lg font-sans cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-row justify-start relative px-2 py-8">
          <img
            className="w-20 h-20"
            src={logoCoinLP}
            alt="TVN"
          />
          <img
            className="w-12 h-12 absolute left-12 bottom-6 rounded-full p-1"
            src={logoCoinTVN}
            alt="TVN-LP"
          />
        </div>
        <div className="flex flex-col pb-12">
          <h2 className="text-xl font-bold">TVNA . TVNB</h2>
        </div>
        <div className="w-full border-t-2 bg-white rounded-b-md border-gray-600 py-6">
          <div className="flex flex-row justify-between px-6 text-black font-poppins">
            <p className="flex flex-col justify-between">
              <span>Tổng số thanh khoản</span>
              <span className="font-bold">{totalLiquidity}</span>
            </p>
            <p className="flex flex-col text-end">
              <span>Phí</span>
              <span className="font-bold">0.3%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolCard;
