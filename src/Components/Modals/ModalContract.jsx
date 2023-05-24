import { Modal } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { Slider } from "antd";
import "antd/dist/reset.css";
import { setHarvestingToken, setMessage} from "../../Redux/Reducers/FarmingReducer";
import {
  depositTokenToPool,
  getBalanceOfStakeToken,
  predictInvidualARP,
  getPoolInfor,
} from "../../Services/StakingServices/FarmingServices";
import { LoadingOutlined } from "@ant-design/icons";

const ModalContract = (props) => {
  const { modalOpen, setModalOpen, account, poolId } = props;
  const [quantity, setQuantity] = useState(0);
  const [max, setMax] = useState(100);
  const [duration, setDuration] = useState(0);
  const [predictAPR, setPredictAPR] = useState(0);
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();
  const amountOfToken = useRef(0);

  useEffect(() => {
    (async () => {
      let maxAmount = await getBalanceOfStakeToken();
      const pool = await getPoolInfor(poolId);
      let duration = pool.endStakeTime;
      duration = duration / 2592000;
      setDuration(duration);
      maxAmount = maxAmount / 1e18;
      setMax(maxAmount);
    })();
  }, []);

  const handleSliderChange = async (value) => {
    let predictAmount = await calculateAPR(value);
    predictAmount = predictAmount * value * 2592000 * (poolId + 1);
    setPredictAPR(predictAmount);
    setQuantity(value);
    amountOfToken.current = value;
  };

  const handleConfirm = async () => {
    setLoading("deposit");
    await depositTokenToPool(poolId, amountOfToken.current);
    setModalOpen(false);
    setLoading("");
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
  };

  const handleChange = async (e) => {
    const { value } = e.target;
    let predictAmount = await calculateAPR(value);
    predictAmount = predictAmount * value * 2592000 * (poolId + 1);
    setPredictAPR(predictAmount);
    amountOfToken.current = value;
    setQuantity(value);
  };

  const calculateAPR = async (value) => {
    let invidualAPR = await predictInvidualARP(value, poolId);
    invidualAPR = invidualAPR / (12 * 2592000);
    return invidualAPR;
  };

  return (
    <Modal
      title={
        <div className="flex flex-row justify-center">
          <h2 className="p-4 font-bold uppercase text-xl">Thêm thanh khoản</h2>
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
          className="text-lg text-[#091227] font-poppins font-medium w-1/3 p-4 bg-[#A7AABA] hover:bg-[rgb(81,59,143)] hover:text-white rounded-lg me-3"
        >
          Quay Về
        </button>,
        <button
          key="submit"
          onClick={handleConfirm}
          className="text-lg text-white font-poppins font-medium w-1/3 p-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg"
        >
          {loading === "deposit" ? (
            <LoadingOutlined className="text-2xl font-bold" />
          ) : (
            "Nạp"
          )}
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
            {`${(predictAPR/1e18).toFixed(5)} TVNSC`}
          </h2>
        </div>
        <div className="flex flex-row justify-between pb-6">
          <p className="py-2 text-base font-poppins font-semibold">
            Phần thưởng dự kiến theo ngày
          </p>
          <h2 className="py-2 text-base font-poppins font-medium">
            {`${(predictAPR / 30 / 1e18).toFixed(5)} TVNSC`}
          </h2>
        </div>
      </div>
    </Modal>
  );
};

export default ModalContract;
