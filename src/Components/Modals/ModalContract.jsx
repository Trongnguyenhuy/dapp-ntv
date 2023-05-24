/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Modal } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  setHarvestingToken,
  setMessage,
} from "../../Redux/Reducers/FarmingReducer";
import {
  unStakingToken,
  depositTokenToPool,
  getAccountAddress,
  getBalanceOfStakeToken,
  getPoolInfor,
  getStakerInfo,
  getAllPools,
  createStakingToken,
  approveStakingPool,
  checkAllowance,
  harvestReward,
  updatePoolRewards,
} from "../../Services/StakingServices/FarmingServices";

const ModalContract = (props) => {
  const { modalOpen, setModalOpen, account } = props;
  const dispatch = useDispatch();

  const amountOfToken = useRef(0);

  useEffect(() => {
    (async () => {
      try {
        // const tx = await createStakingToken();
        const address = await getAccountAddress();
        const prevBalance = await getBalanceOfStakeToken(address);
        console.log("prevBalance", prevBalance);
        // const approve = await approveStakingPool(1000);
        // console.log("approve", approve);
        // const allowance = await checkAllowance();
        // console.log("allowance:", allowance);
        // const deposit = await depositTokenToPool(1,20);
        // console.log("deposit:",deposit)
        // const unStaking = await unStakingToken(1,40);
        // console.log("unStaking:",unStaking)
        const beforeBalance = await getBalanceOfStakeToken(address);
        console.log("beforeBalance", beforeBalance);
        const updatePool = await updatePoolRewards(0);
        const pool = await getPoolInfor(0);
        const stakerInfo = await getStakerInfo(0);
        // const pools = await getAllPools();
        console.log("updatePool", updatePool);
        console.log("pool", pool);
        console.log("stakerInfo:", stakerInfo);
        // console.log("pools", pools);
      } catch (err) {
        console.log("message", err.message);
      }
    })();
  }, []);

<<<<<<< Updated upstream
  useEffect(() => {
    const interval = setInterval(async () => {
      await updatePoolRewards(0);
      const stakerInfo = await getStakerInfo(0);
      const pool = await getPoolInfor(0);
      console.log("pool lastRewardedBlock:", pool.lastRewardedBlock);
      console.log("stakerInfo startBlock", stakerInfo.startBlock);
      console.log("stakerInfo rewards", stakerInfo.rewards);
    }, 30000); 
=======
  const handleSliderChange = async (value) => {
    let predictAmount = await predictInvidualARP(value, poolId);
    predictAmount = predictAmount * (poolId + 1);
    console.log(predictAmount);
    setPredictAPR(predictAmount);
    setQuantity(value);
    amountOfToken.current = value;
  };
>>>>>>> Stashed changes

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleConfirm = () => {
    setModalOpen(false);
    const setHarvestingTokenAction = setHarvestingToken(amountOfToken.current);
    const setMessageAction = setMessage({
      type: "confirm",
      message: `${amountOfToken.current} tokens have been confirmed!`,
    });
    dispatch(setHarvestingTokenAction);
    dispatch(setMessageAction);
<<<<<<< Updated upstream
    console.log(`amountOfToken: ${amountOfToken.current}`);
    console.log(`Address: ${account.walletAddress}`);
    console.log(`Balance: ${account.balance}`);
=======
    window.location.reload();
>>>>>>> Stashed changes
  };

  const handleCancel = () => {
    setModalOpen(false);
    amountOfToken.current = 0;
  };

  const handleChange = (e) => {
    const { value } = e.target;
<<<<<<< Updated upstream
    amountOfToken.current = value;
=======
    let predictAmount = await predictInvidualARP(value, poolId);
    predictAmount = predictAmount * 30 * (poolId + 1);
    setPredictAPR(predictAmount);
    amountOfToken.current = value;
    setQuantity(value);
>>>>>>> Stashed changes
  };

  return (
    <Modal
      title={
        <h2 className="p-4 font-bold text-3xl border-b-2 border-gray-700">
          Số Lượng Muốn Nạp
        </h2>
      }
      bodyStyle={{ padding: 20 }}
      open={modalOpen}
      onOk={handleConfirm}
      onCancel={handleCancel}
      footer={[
        <button
          key="back"
          onClick={handleCancel}
          className="text-xl w-1/4 font-poppins p-4 text-white bg-[rgb(28,23,41)] rounded-md"
        >
          Quay Về
        </button>,
        <button
          key="submit"
          onClick={handleConfirm}
          className="text-xl font-poppins p-4 text-white bg-[rgb(127,82,255)] w-1/4 rounded-md ml-4"
        >
          Nạp
        </button>,
      ]}
    >
<<<<<<< Updated upstream
      <input
        type="number"
        id="amountOfToke"
        name="amountOfToke"
        className="w-full p-2 border-2 boder-black rounded-xl text-xl"
        placeholder="Nhập Vào Số Lượng Muốn Nạp"
        onChange={handleChange}
      />
=======
      <div className="flex flex-col justify-between gap-4">
        <div>
          <h2 className="w-full text-center text-[#222b42] text-5xl font-poppins font-bold">
            {quantity ? quantity : 0}
          </h2>
          <h2 className="w-full text-center text-[#222b42] text-1xl font-poppins font-bold">
            TVN-LP
          </h2>
        </div>
        <div>
          <h2 className="py-4 text-base font-poppins font-semibold">
            Nhập số lượng
          </h2>

          <input
            type="number"
            min="0"
            id="amountOfToke"
            name="amountOfToke"
            className="w-full p-2 border-2 boder-black rounded-md text-lg outline-gray-400 focus: outline-none"
            placeholder="Nhập số lượng muốn nạp"
            onChange={handleChange}
            value={quantity}
          />
        </div>

        <div>
          <Slider
            min={0}
            max={max.toFixed(0)}
            value={quantity}
            onChange={handleSliderChange}
            trackStyle={{
              backgroundColor: "#091227",
            }}
            railStyle={{
              backgroundColor: "#A7AABA",
            }}
          />
        </div>

        <div className="flex flex-row justify-between py-2">
          <p className="py-2 text-base font-poppins font-semibold">
            Tổng phần thưởng dự kiến
          </p>
          <h2 className="py-2 text-base font-poppins font-medium">
            {`${predictAPR ? predictAPR.toFixed(8) : 0} TVN`}
          </h2>
        </div>
        <div className="flex flex-row justify-between pb-6">
          <p className="py-2 text-base font-poppins font-semibold">
            Phần thưởng dự kiến theo ngày
          </p>
          <h2 className="py-2 text-base font-poppins font-medium">
            {`${predictAPR ? (predictAPR / (30 * (poolId + 1))).toFixed(8) : 0} TVN`}
          </h2>
        </div>
      </div>
>>>>>>> Stashed changes
    </Modal>
  );
};

export default ModalContract;
