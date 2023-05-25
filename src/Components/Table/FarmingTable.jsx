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

const FarmingTable = () => {
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
    await harvestReward(poolId, time);
    setLoading("");
    window.location.reload();
  };

  const handleUnstaking = async (time, amount, index) => {
    setLoading("unstaking" + index);
    await unStakingToken(poolId, amount, time);
    setLoading("");
    // window.location.reload();
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;

    // console.log("SEARCH TEXT",value);
    setSearchText(value);
  };
  const handleSearchClick = () => {
    console.log("FILTER DATA", filteredData);
    console.log("SEARCH TEXT", searchText);
    if (searchText) {
      const filtered = filteredData.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase())
        )
      );

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
      filteredData &&
      filteredData.map((key, index) => {
        return (
          <tr className="border-t-2 border-gray-600 p-4" key={index}>
            <td className="py-4 px-4">{index + 1}</td>
            <td className="py-4">{key.amount} TVN-LP</td>
            <td className="py-4">{key.depositStartTime}</td>
            <td className="py-4">{key.reward} TVN</td>
            <td className="py-4 operation">
              <div className="flex flex-row justify-between gap-4 text-white">
                <button
                  onClick={() => handleUnstaking(key.unStakingTime, key.amount, index)}
                  className="w-1/2 py-4 bg-white text-[#091227] hover:text-white hover:bg-[rgb(81,59,143)] rounded-lg"
                >
                  <Loading index={"unstaking" + index} loading={loading} text={"Kết thúc"} />
                </button>
                <button
                  onClick={() => handleHarvest(key.unStakingTime, index)}
                  className="w-1/2 py-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg"
                >
                  <Loading index={"harvest" + index} loading={loading} text={"Thu Hoạch"} />
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
