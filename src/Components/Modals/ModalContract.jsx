import { Modal } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { Slider } from "antd";
import "antd/dist/reset.css";
import { setHarvestingToken, setMessage} from "../../Redux/Reducers/FarmingReducer";
import {
  getBalanceOfStakeToken,
  predictInvidualARP,
  depositTokenToPool,
} from "../../Services/StakingServices/FarmingServices";

const ModalContract = (props) => {
  const { modalOpen, setModalOpen, poolId } = props;
  const [quantity, setQuantity] = useState(0);
  const [predictAPR, setPredictAPR] = useState(0);
  const [max, setMax] = useState(0);
  const dispatch = useDispatch();

  const amountOfToken = useRef(0);

  useEffect(() => {
    (async () => {
      try {
        let max = await getBalanceOfStakeToken();
        max = max / 1e18;
        setMax(max);
      } catch (err) {
        console.log("message", err.message);
      }
    })();
  }, []);

  const handleSliderChange = async (value) => {
    let predictAmount = await predictInvidualARP(value, poolId);
    predictAmount = predictAmount * 30 * (poolId + 1);
    console.log(predictAmount);
    setPredictAPR(predictAmount);
    setQuantity(value);
    amountOfToken.current = value;
  };

  const handleConfirm = async () => {
    await depositTokenToPool(poolId, amountOfToken.current);
    setModalOpen(false);
    const setHarvestingTokenAction = setHarvestingToken(amountOfToken.current);
    const setMessageAction = setMessage({
      type: "confirm",
      message: `${amountOfToken.current} tokens have been confirmed!`,
    });
    dispatch(setHarvestingTokenAction);
    dispatch(setMessageAction);
    window.location.reload();
  };

  const handleCancel = () => {
    setModalOpen(false);
    amountOfToken.current = 0;
  };

  const handleChange = async (e) => {
    const { value } = e.target;
    let predictAmount = await predictInvidualARP(value, poolId);
    predictAmount = predictAmount * 30 * (poolId + 1);
    setPredictAPR(predictAmount);
    amountOfToken.current = value;
    setQuantity(value);
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
            {`${
              predictAPR ? (predictAPR / (30 * (poolId + 1))).toFixed(8) : 0
            } TVN`}
          </h2>
        </div>
      </div>
    </Modal>
  );
};

export default ModalContract;
