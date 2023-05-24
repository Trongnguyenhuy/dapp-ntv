/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    getStakerInfo,
    harvestReward,
    unStakingToken,
    getGlobalARP,
    getAllStakingTimeInfo,
    getPoolInfor,
    totalReward,
} from "../../Services/StakingServices/FarmingServices";
import ModalContract from "../Modals/ModalContract";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import RewardLiveUpdate from "../LiveUpdate/RewardLiveUpdate";

const PoolInforCard = () => {
    const { id } = useParams();
    const [value_1, setValue_1] = useState(0);
    const [value_2, setValue_2] = useState(0);

    const handleDecrease = (id) => {
        if (id == 1) {
            if (value_1 > 0) setValue_1(value_1 - 1);
        }
        else if (value_2 > 0) setValue_2(value_2 - 1);
    };

    const handleIncrease = (id) => {
        if (id == 1) {
            if (value_1 < 100) setValue_1(value_1 + 1);
        }
        else if (value_2 < 100) setValue_2(value_2 + 1);
      
    };

    return (
        <div className="container mx-auto px-32 py-20 items-center text-center">

            <div className="grid grid-cols-4 gap-2 pt-8">

                <div className="flex flex-col justify-between p-8">
                    <span className="font-light text-sm">Tổng số thanh khoản</span>
                    <span className="font-bold font-poppins text-2xl text-gray-300 py-2">12.000.000</span>
                </div>


                <div className="flex flex-col justify-between p-8">
                    <span className="font-light text-sm">Tổng số TVNSC</span>
                    <span className="font-bold font-poppins text-2xl text-gray-300 py-2">9.000.000</span>
                </div>


                <div className="flex flex-col justify-between p-8">
                    <span className="font-light text-sm">Tổng số TVNRC</span>
                    <span className="font-bold font-poppins text-2xl text-gray-300 py-2">1.000.000</span>
                </div>


                <div className="flex flex-col justify-between p-8">
                    <span className="font-light text-sm">Phí</span>
                    <span className="font-bold font-poppins text-2xl text-gray-300 py-2">0.3%</span>
                </div>
            </div>

            <div className="flex flex-row py-8 w-2/3 mx-auto">
                <div className="w-full flex flex-col gap-4">
                    <div className="text-center">
                        <h2 className="font-sans font-medium text-3xl py-2">Thêm thanh khoản cho Pool</h2>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <div className="font-bold font-poppins text-2xl text-gray-300 px-4">
                            <img
                                className="w-14 h-9"
                                src="https://miaswap-img-s3.s3.ap-northeast-1.amazonaws.com/busd.png"
                                alt="BUSDT"
                            />
                            <span className="font-light text-sm">TVNSC</span>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row items-center gap-2 py-2">
                                <input

                                    className="w-full py-4 px-4 bg-[#060E22] border-2 border-gray-800 focus:outline-none rounded-md"
                                    value={value_1 || 0}
                                    min={0}
                                    max={100}
                                    onChange={(e) => setValue_1(parseInt(e.target.value))}

                                />
                                <div className="flex flex-col">
                                    <button
                                        className="text-black bg-white hover:bg-gray-300 px-3 rounded-t-md"
                                        onClick={() => handleIncrease(1)}>
                                        +
                                    </button>
                                    <button
                                        className="text-black bg-white px-3 hover:bg-gray-300 rounded-b-md"
                                        onClick={() => handleDecrease(1)}>
                                        -
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className="text-white w-40 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] py-4 rounded-md"
                                    >
                                        Tối đa
                                    </button>
                                </div>
                            </div>
                            <h2 className="text-xs text-left text-gray-400 font-medium px-1">Số TVNSC hiện có: 10</h2>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">

                        <div className="font-bold font-poppins text-2xl text-gray-300 px-4">
                            <img
                                className="w-14 h-9"
                                src="https://miaswap-img-s3.s3.ap-northeast-1.amazonaws.com/busd.png"
                                alt="BUSDT"
                            />
                            <span className="font-light text-sm">TVNSC</span>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row items-center gap-2 py-2">
                                <input
                                    className="w-full py-4 px-4 bg-[#060E22] border-2 border-gray-800 focus:outline-none rounded-md"
                                    value={value_2 || 0}
                                    min={0}
                                    max={100}
                                    onChange={(e) => setValue_2(parseInt(e.target.value))}

                                />
                                <div className="flex flex-col">
                                    <button
                                        className="text-black bg-white hover:bg-gray-300 px-3 rounded-t-md"
                                        onClick={() => handleIncrease(2)}>
                                        +
                                    </button>
                                    <button
                                        className="text-black bg-white hover:bg-gray-300 px-3 rounded-b-md"
                                        onClick={() => handleDecrease(2)}>
                                        -
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className="text-white w-40 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] py-4 rounded-md"
                                    >
                                        Tối đa
                                    </button>
                                </div>
                            </div>
                            <h2 className="text-xs text-left text-gray-400 font-medium px-1">Số TVNRC hiện có: 0</h2>
                        </div>
                    </div>
                    <button
                        className="text-white w-full bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] py-4 my-8 rounded-md"
                    >
                        Thêm thanh khoản
                    </button>

                </div>
            </div>
        </div>
    );
};

export default PoolInforCard;
