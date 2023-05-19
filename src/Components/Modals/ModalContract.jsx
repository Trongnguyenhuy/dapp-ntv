/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Modal } from "antd";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setHarvestingToken,
  setMessage,
} from "../../Redux/Reducers/FarmingReducer";
import {
  depositTokenToPool,
  getPoolInfor,
} from "../../Services/StakingServices/FarmingServices";
import { LoadingOutlined } from "@ant-design/icons";

const ModalContract = (props) => {
  const { modalOpen, setModalOpen, poolId } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const amountOfToken = useRef(0);

  const handleConfirm = async () => {
    setLoading(true);
    const deposit = await depositTokenToPool(poolId, amountOfToken.current);
    const pool = await getPoolInfor(poolId);
    setModalOpen(false);
    setLoading(false);
    const setHarvestingTokenAction = setHarvestingToken(amountOfToken.current);
    const setMessageAction = setMessage({
      type: "confirm",
      message: `${amountOfToken.current} tokens have been confirmed!`,
    });
    dispatch(setHarvestingTokenAction);
    dispatch(setMessageAction);
  };

  const handleCancel = () => {
    setModalOpen(false);
    amountOfToken.current = 0;
    window.location.reload();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    amountOfToken.current = value;
  };

  return (
    <Modal
      title={
        <div className="flex flex-row justify-center">
          <h2 className="p-4 font-bold uppercase text-xl">Số Lượng Muốn Nạp</h2>
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
          {loading ? <LoadingOutlined className="text-2xl font-bold" /> : "Nạp"}
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
