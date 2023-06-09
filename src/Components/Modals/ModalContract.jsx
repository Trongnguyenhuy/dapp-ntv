/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Modal } from "antd";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Slider } from "antd";
import "antd/dist/reset.css";
import {
  getAllPoolsAction,
  getPoolAPRAPI,
  getStakingTimeInfoApi,
  updateBalanceOfTokenApi,
} from "../../Redux/Reducers/FarmingReducer";
import { setMessage } from "../../Redux/Reducers/MessageReducer";
import { depositTokenToPool } from "../../Services/StakingServices/FarmingServices";
import Loading from "../Button/loadingButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  usePools,
  useReadFarmingContract,
} from "../../Services/StakingServices/FarmingHook";
import useStaking from "../../Services/StakingServices/StakingHook";
import { bignumberModifier } from "../../Ultis/modifierData";
const NUMBEROFBLOCKPERDAY = 84000 / 13;

const ModalContract = (props) => {
  const { modalOpen, setModalOpen, poolId, isInfoCard } = props;
  const { account, pools, rewardTokenPerBlock, totalMultiflier } = useSelector(
    (state) => state.farmingReducer
  );

  const stakingContract = useStaking();
  // const { result, isLoading, error } = usePools();

  const [loading, setLoading] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [predictAPR, setPredictAPR] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const amountOfToken = useRef(0);

  const calculateInvidualAPR = (numberOfToken) => {
    const assetRatio = (numberOfToken * 1e18) / pools[poolId].tokensStaked;
    const poolWeight = pools[poolId].farmMultiplier / totalMultiflier;
    const rewardPerBlockForPool = poolWeight * rewardTokenPerBlock;
    const invidualAPRPerDay =
      assetRatio * poolWeight * rewardPerBlockForPool * NUMBEROFBLOCKPERDAY;
    return invidualAPRPerDay / 1e18;
  };

  const handleSliderChange = async (value) => {
    if (pools.length > 0) {
      const invidualToken = calculateInvidualAPR(value);
      setPredictAPR(invidualToken);
    } else {
      setPredictAPR(0);
    }
    setQuantity(value);
    amountOfToken.current = value;
  };

  const handleConfirm = async () => {
    setLoading(1);

    if (
      account.balanceOfStakeToken == 0 ||
      account.balanceOfStakeToken < quantity
    ) {
      const setMessageAction = setMessage({
        type: "instruct",
        message: `Số tiền trong ví không đủ để giao dịch!`,
      });
      dispatch(setMessageAction);
      setLoading(0);
      setModalOpen(false);
    } else if (
      amountOfToken.current == 0
    ) {
      const setMessageAction = setMessage({
        type: "instruct",
        message: `Không thể giao dịch với số tiền 0 TVN!`,
      });
      dispatch(setMessageAction);
      setLoading(0);
      setModalOpen(false);
    } else {
      const success = await depositTokenToPool(poolId, amountOfToken.current);
      // const success = true;
      setLoading(0);
      setModalOpen(false);
      if (success) {
        const setMessageAction = setMessage({
          type: "confirm",
          message: `${amountOfToken.current} tokens đã được ký gửi!`,
        });
        const allPool = await stakingContract.call("getAllPool");
        const action = getAllPoolsAction(bignumberModifier(allPool));
        dispatch(action);
        dispatch(setMessageAction);
      } else {
        const setMessageAction = setMessage({
          type: "confirm",
          message: `Đã hủy ký gửi`,
        });
        dispatch(setMessageAction);
      }
      if (!isInfoCard) {
        const allStakingTime = getStakingTimeInfoApi();
        dispatch(allStakingTime);
        history.push(`/farm-detail/${poolId + 1}`);
      } else {
        const allStakingTime = getStakingTimeInfoApi();
        dispatch(allStakingTime);
      }

      const balanceOfToken = updateBalanceOfTokenApi();
      dispatch(balanceOfToken);
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    amountOfToken.current = 0;
  };

  const handleChange = async (e) => {
    const { value } = e.target;
    if (pools.length > 0) {
      const invidualToken = calculateInvidualAPR(value);
      setPredictAPR(invidualToken);
    } else {
      setPredictAPR(0);
    }
    amountOfToken.current = value;
    setQuantity(value);
  };

  return (
    <Modal
      title={
        <h2 className="p-4 font-bold text-2xl text-center uppercase">
          Số lượng muốn đặt cọc
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
          Quay lại
        </button>,
        <button
          key="submit"
          onClick={handleConfirm}
          className="text-xl font-poppins p-4 text-white bg-[rgb(127,82,255)] w-1/4 rounded-md ml-4"
        >
          <Loading index={1} loading={loading} text={"Nạp"} />
        </button>,
      ]}
    >
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
            min={0}
            max={account.balanceOfStakeToken}
            id="amountOfToke"
            name="amountOfToke"
            className="w-full p-2 border-2 boder-black rounded-md text-lg outline-gray-400 focus: outline-none"
            placeholder="Nhập số lượng muốn nạp"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-base font-poppins font-semibold">
            Số tiền hiện có
          </p>
          <h2 className="text-base font-poppins font-medium">
            {`${account.balanceOfStakeToken} TVN-LP`}
          </h2>
        </div>
        <div className="flex flex-row justify-between py-2">
          <p className="text-base font-poppins font-semibold">
            Tổng phần thưởng dự kiến
          </p>
          <h2 className="text-base font-poppins font-medium">
            {`${(predictAPR * 30 * (poolId + 1)).toFixed(8)} TVN`}
          </h2>
        </div>
        <div className="flex flex-row justify-between pb-6">
          <p className="text-base font-poppins font-semibold">
            Phần thưởng dự kiến theo ngày
          </p>
          <h2 className="text-base font-poppins font-medium">
            {`${predictAPR.toFixed(8)} TVN`}
          </h2>
        </div>
      </div>
    </Modal>
  );
};

export default ModalContract;
