/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import {
  getStakerInfo,
  harvestReward,
  unStakingToken,
  getAllStakingTimeInfo,
} from "../../Services/StakingServices/FarmingServices";
import Loading from "../Button/loadingButton";
import { useDispatch, useSelector } from "react-redux";
import { getStakingTimeInfoApi } from "../../Redux/Reducers/FarmingReducer";
import { setMessage } from "../../Redux/Reducers/MessageReducer";
import RewardLiveUpdate from "../LiveUpdate/RewardLiveUpdate";

const FarmingTable = () => {
  const { allStakingTime } = useSelector((state) => state.farmingReducer);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState("");

  const { id } = useParams();
  const poolId = id - 1;

  useEffect(() => {
    (async () => {
      const staker = await getStakerInfo(poolId);
      const allStakingTime = await getAllStakingTimeInfo(
        poolId,
        staker.firstStakeTime,
        staker.finalStakeTime
      );
      allStakingTime.map((item) => {
        item.amount = (item.amount / 1e18).toFixed(5);
        item.reward = (item.reward / 1e18).toFixed(5);
      });
      setFilteredData(allStakingTime);
      setData(allStakingTime);
    })();
  }, []);

  const handleHarvest = async (time, index) => {
    setLoading("harvest" + index);
    const success = await harvestReward(poolId, time);
    const allStakingTime = getStakingTimeInfoApi();
    dispatch(allStakingTime);
    if (success) {
      const setMessageAction = setMessage({
        type: "confirm",
        message: `Thu hoạch Token hoàn tất!`,
      });
      dispatch(setMessageAction);
    }
    else {
      const setMessageAction = setMessage({
        type: "confirm",
        message: `Đã hủy thu hoạch!`,
      });
      dispatch(setMessageAction);
    }


    setLoading("");
  };

  const handleUnstaking = async (time, amount, index) => {
    setLoading("unstaking" + index);
    await unStakingToken(poolId, amount, time);
    const allStakingTime = getStakingTimeInfoApi();
    dispatch(allStakingTime);
    const setMessageAction = setMessage({
      type: "confirm",
      message: `Thu hồi vốn hoàn tất!`,
    });
    dispatch(setMessageAction);
    setLoading("");
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
  };
  const handleSearchClick = () => {
    if (searchText) {
      const filtered = filteredData.filter((item) => {
        return (
          item.amount.toLowerCase().includes(searchText.toLowerCase()) ||
          item.reward.toLowerCase().includes(searchText.toLowerCase()) ||
          item.depositStartTime.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setFilteredData(filtered);
    } else setFilteredData(data);
  };

  // const handleReset = () => {
  //   setFilteredData(dataSource);
  //   setSearchText("");
  // };

  const renderHeader = () => {
    let headerElement = [
      "Lần",
      "Số lượng gửi",
      "Thời gian gửi",
      "Phần thưởng",
      " ",
    ];
    return headerElement.map((key, index) => {
      return (
        <th className="text-start py-4" key={index}>
          {key.toUpperCase()}
        </th>
      );
    });
  };

  const renderBody = () => {
    return (
      allStakingTime.length > 0 &&
      allStakingTime[poolId].stakingTime.map((key, index) => {
        return (
          <tr className="border-t-2 border-gray-600 p-4" key={index}>
            <td className="py-4 px-4">{index + 1}</td>
            <td className="py-4">{(key.amount / 1e18).toFixed(8)} TVN-LP</td>
            <td className="py-4">{key.depositStartTime}</td>
            <td className="py-4">
              <RewardLiveUpdate
                poolId={poolId}
                isTotal={false}
                time={key.unStakingTime}
              />{" "}
              TVN
            </td>
            <td className="py-4 operation">
              <div className="flex flex-row justify-between gap-4 text-white">
                <button
                  onClick={() =>
                    handleUnstaking(key.unStakingTime, key.amount, index)
                  }
                  className="w-1/2 py-4 bg-white text-[#091227] hover:text-white hover:bg-[rgb(81,59,143)] rounded-lg"
                >
                  <Loading
                    index={"unstaking" + index}
                    loading={loading}
                    text={"Kết thúc"}
                  />
                </button>
                <button
                  onClick={() => handleHarvest(key.unStakingTime, index)}
                  className="w-1/2 py-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg"
                >
                  <Loading
                    index={"harvest" + index}
                    loading={loading}
                    text={"Thu Hoạch"}
                  />
                </button>
              </div>
            </td>
          </tr>
        );
      })
    );
  };

  return (
    <div className="container px-32 mx-auto py-8">
      <div className="flex flex-row justify-between py-6 gap-4">
        <input
          type="text"
          className="w-full py-2 px-4 bg-[#060d20] border-b-2 border-gray-800 focus:outline-none rounded-md"
          placeholder="Search"
          value={searchText || ""}
          onChange={handleSearchChange}
        />
        <button
          className="w-40 p-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg"
          onClick={handleSearchClick}
        >
          Tìm kiếm
        </button>
      </div>
      {loading === "harvest" || loading === "unstaking" ? (
        <div className="w-full">
          <LoadingOutlined className="w-full text-4xl py-8 font-bold mx-auto" />
        </div>
      ) : (
        <table className="w-full">
          <thead className="border-b-2 border-gray-600">
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      )}
    </div>
  );
};

export default FarmingTable;
