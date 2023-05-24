import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import {
  getStakerInfo,
  harvestReward,
  unStakingToken,
  getGlobalARP,
  getAllStakingTimeInfo,
  totalReward,
} from "../../Services/StakingServices/FarmingServices";

const FarmingTable = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState("");
  const [globalAPR, setGlobalAPR] = useState(0);
  const [staker, setStaker] = useState({
    amountOfStakeTokenOnPool: 0,
    depositStartTime: 0,
    rewards: 0,
    startBlock: 0,
    currentBlock: 0,
  });
  const [allStaking, setAllStakingTime] = useState({
    amount: 0,
    currentBlock: 0,
    depositStartTime: 0,
    reward: 0,
    rewardRate: 0,
    startBlock: 0,
  })
  const { account } = useSelector((state) => state.farmingReducer);
  const { id } = useParams();
  const poolId = id - 1;
  const amountOfStake = staker.totalTokenStake / 1e18;
  useEffect(() => {
    (async () => {
      const staker = await getStakerInfo(poolId);
      const allStakingTime = await getAllStakingTimeInfo(
        poolId,
        staker.firstStakeTime,
        staker.finalStakeTime
      );
      console.log(allStakingTime);
      setFilteredData(allStakingTime);
      setData(allStakingTime);
      setAllStakingTime(allStakingTime);

      const reward = await totalReward(
        poolId,
        staker.firstStakeTime,
        staker.finalStakeTime
      );
      console.log("reward:", reward);
      setStaker(staker);
    })();
  }, []);

  const handleHarvest = async (index) => {
    setLoading("harvest");
    await harvestReward(poolId, index);
    const newStaker = await getStakerInfo(poolId);
    setStaker(newStaker);
    setLoading("");
    window.location.reload();
  };

  const handleUnstaking = async (index, amount) => {

    setLoading("unstaking");
    const unstaking = await unStakingToken(poolId, amount, index);
    const newStaker = await getStakerInfo(poolId);
    setStaker(newStaker);
    setLoading("");
    window.location.reload();
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
  };
  const handleSearchClick = () => {
    if (searchText) {
      const filtered = filteredData.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
    else setFilteredData(data);
  };

  const handleReset = () => {
    setFilteredData(dataSource);
    setSearchText('');
  };

  const renderHeader = () => {
    let headerElement = ["Lần", "Số lượng gửi", "Thời gian gửi", "Phần thưởng", " "]
    return headerElement.map((key, index) => {
      return <th className='text-start py-4' key={index}>{key.toUpperCase()}</th>
    })
  }

  const renderBody = () => {
    return filteredData && filteredData.map((key, index) => {
      return (
        <tr className='border-b-2 border-b-gray-300' key={index}>
          <td className='py-4 px-4' >{index + 1}</td>
          <td className='py-4'>{(key.amount / 1e18).toFixed(5)} TVN-LP</td>
          <td className='py-4'>{key.depositStartTime}</td>
          <td className='py-4'>{(key.reward / 1e18).toFixed(5)} TVNRC</td>
          <td className='py-4 operation'>
            <div className='flex flex-row justify-between gap-4 text-white'>
              <button
                onClick={() => handleUnstaking(index + 1, key.amount)}
                className="w-1/2 py-4 bg-white text-[#091227] hover:text-white hover:bg-[rgb(81,59,143)] rounded-lg"
              >
                Kết thúc
              </button>
              <button
                onClick={() => handleHarvest(index + 1)}
                className="w-1/2 py-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg"
              >
                Thu hoạch
              </button>
            </div>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className="container px-32 mx-auto py-8">
      <div className='flex flex-row justify-between py-6 gap-4'>
        <input
          className='w-full py-2 px-4 bg-[#060d20] border-b-2 border-gray-800 focus:outline-none rounded-md'
          placeholder="Search"
          value={searchText || ''}
          onChange={handleSearchChange} />
        <button
          className='w-40 p-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg'
          onClick={handleSearchClick}>
          Tìm kiếm
        </button>
      </div>
      {loading === "harvest" || loading === "unstaking" ? (
        <div className='w-full'>
          <LoadingOutlined className="w-full text-4xl py-8 font-bold mx-auto" />
        </div>
      ) : (
        <table className='w-full'>
          <thead className='border-b-2 border-b-gray-300'>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>
            {renderBody()}
          </tbody>
        </table>)}
    </div>
  );
}

export default FarmingTable;
