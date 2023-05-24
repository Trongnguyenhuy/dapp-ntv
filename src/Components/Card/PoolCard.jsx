import { useHistory } from 'react-router-dom';

const PoolCard = (props) => {
  const { id, totalLiquidity } = props;
  const history = useHistory();
  const handleClick = () => {
    history.push(`/pool-detail/${id}`);
  };

  return (
    <div
      className="w-full bg-[#091227] border-2 border-gray-600 rounded-lg font-sans cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-row items-center font-poppin p-6 pt-12">
          <img
            className="w-14 h-14"
            src="https://miaswap-img-s3.s3.ap-northeast-1.amazonaws.com/busd.png"
            alt="BUSDT"
          />
          <img
            className="w-14 h-14"
            src="https://miaswap-img-s3.s3.ap-northeast-1.amazonaws.com/busd.png"
            alt="MIA"
          />
        </div>
        <div className="flex flex-col pb-12">
          <h2 className="text-xl font-bold">TVNSC . TVN</h2>
        </div>
        <div className="w-full border-t-2 bg-white rounded-b-md border-gray-600 py-6">
          <div className="flex flex-row justify-between px-6 text-black font-poppins">
            <p className="flex flex-col justify-between">
              <span>Tổng số thanh khoản</span>
              <span className="font-bold">{totalLiquidity}</span>
            </p>
            <p className="flex flex-col justify-between">
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
