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
        const address = await getAccountAddress();
        console.log("address", address);
        const prevBalance = await getBalanceOfStakeToken(address);
        console.log("prevBalance", prevBalance);
        // const createPool = await createStakingToken(2592000, 25);
        // console.log("createPool", createPool);
        // const approve = await approveStakingPool(1000);
        // console.log("approve", approve);
        // const allowance = await checkAllowance();
        // console.log("allowance:", allowance);
        // const deposit = await depositTokenToPool(0,60);
        // console.log("deposit:",deposit)
        // const harvest = await harvestReward(0);
        // console.log("harvest", harvest);
        // const unStaking = await unStakingToken(1,40);
        // console.log("unStaking:",unStaking)
        const beforeBalance = await getBalanceOfStakeToken(address);
        console.log("beforeBalance", beforeBalance);
        const pool = await getPoolInfor(0);
        // const stakerInfo = await getStakerInfo(0);
        // const pools = await getAllPools();
        console.log("pool", pool);
        // console.log("stakerInfo:", stakerInfo);
        // console.log("pools", pools);
      } catch (err) {
        console.log("message", err.message);
      }
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const stakerInfo = await getStakerInfo(0);
      console.log("=============================================");
      console.log(
        "amountOfStakeTokenOnPool:",
        stakerInfo.amountOfStakeTokenOnPool
      );
      console.log("stakerInfo startBlock", stakerInfo.startBlock);
      console.log("stakerInfo currentBlock", stakerInfo.currentBlock);
      console.log("stakerInfo rewards", stakerInfo.rewards);
    }, 30000);

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
    console.log(`amountOfToken: ${amountOfToken.current}`);
    console.log(`Address: ${account.walletAddress}`);
    console.log(`Balance: ${account.balance}`);
  };

  const handleCancel = () => {
    setModalOpen(false);
    amountOfToken.current = 0;
  };

  const handleChange = (e) => {
    const { value } = e.target;
    amountOfToken.current = value;
  };

  return (
    <Modal
      title={

        <div className="flex flex-row justify-center">
          <h2 className="p-4 font-bold uppercase text-xl">
            Số Lượng Muốn Nạp
          </h2>
        </div>
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
      <input
        type="number"
        id="amountOfToke"
        name="amountOfToke"
        className="w-full p-2 border-2 boder-black rounded-xl text-xl"
        placeholder="Nhập Vào Số Lượng Muốn Nạp"
        onChange={handleChange}
      />
    </Modal>
  );
};

export default ModalContract;
