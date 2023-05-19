/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Modal } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import React, { useState } from 'react';
import { Slider } from 'antd';
import 'antd/dist/reset.css';
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
} from "../../Services/StakingServices/FarmingServices";

const ModalContract = (props) => {
  const { modalOpen, setModalOpen, account } = props;
  const [quantity, setQuantity] = useState(0);

  const handleSliderChange = (value) => {
    setQuantity(value);
    amountOfToken.current=value;
  };
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
        // const pool = await getPoolInfor(0);
        const stakerInfo = await getStakerInfo(1);
        const pools = await getAllPools();
        // console.log("pool", pool);
        console.log("stakerInfo:", stakerInfo);
        console.log("pools", pools);
      } catch (err) {
        console.log("message", err.message);
      }
    })();
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
    // amountOfToken.current = 0;
  };

  const handleChange = (e) => {
    const { value } = e.target;
    amountOfToken.current = value;
    setQuantity(value);
    // else setQuantity(0);
  };

  return (
    <Modal
    
      title={

        <div className="flex flex-row justify-center">
          <h2 className="p-4 font-bold uppercase text-xl">
            Thêm thanh khoản
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
          className="text-lg text-[#091227] font-poppins font-medium w-1/3 p-4 bg-[#A7AABA] hover:bg-[rgb(81,59,143)] hover:text-white rounded-lg me-3"
        >
          Quay Về
        </button>,
        <button
          key="submit"
          onClick={handleConfirm}
          className="text-lg text-white font-poppins font-medium w-1/3 p-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg"
        >
          Nạp
        </button>,
      ]}
    >

      <div className="flex flex-col justify-between gap-4">
        <div>
          <h2 className="w-full text-center text-[#222b42] text-5xl font-poppins font-bold">{quantity? quantity:0}</h2>
          <h2 className="w-full text-center text-[#222b42] text-1xl font-poppins font-bold">TVNSC</h2>
        </div>
        <div>
          <h2 className="py-4 text-base font-poppins font-semibold">Nhập số lượng</h2>

          <input
            type="number"
            id="amountOfToke"
            name="amountOfToke"
            className="w-full p-2 border-2 boder-black rounded-md text-lg outline-gray-400 focus: outline-none"
            placeholder="Nhập số lượng muốn nạp"
            onChange={handleChange}
            value={quantity}
          />
        </div>


        <div >

          <Slider

            min={0}
            max={100}
            value={quantity}
            onChange={handleSliderChange}
            trackStyle={{
              backgroundColor: '#091227',
            }}
            railStyle={{
              backgroundColor: '#A7AABA',
            }}
          />
        </div>


        <div className="flex flex-row justify-between py-2">
          <p className="py-2 text-base font-poppins font-semibold">Tổng phần thưởng dự kiến</p>
          <h2 className="py-2 text-base font-poppins font-medium">24,000 TVNSC</h2>
        </div>
        <div className="flex flex-row justify-between pb-6">
          <p className="py-2 text-base font-poppins font-semibold">Phần thưởng dự kiến theo ngày</p>
          <h2 className="py-2 text-base font-poppins font-medium">1,200 TVNSC</h2>
        </div>

      </div>
    </Modal>
  );
};

export default ModalContract;
