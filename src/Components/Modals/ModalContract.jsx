/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Modal } from "antd";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  setHarvestingToken,
  setMessage,
} from "../../Redux/Reducers/FarmingReducer";

const ModalContract = (props) => {
  const { modalOpen, setModalOpen, account } = props;
  const dispatch = useDispatch();

  const amountOfToken = useRef(0);

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
      title={<h2 className="p-2 font-bold text-2xl">Amount Confirm</h2>}
      centered
      open={modalOpen}
      onOk={handleConfirm}
      onCancel={handleCancel}
      footer={[
        <button key="back" onClick={handleCancel} className="font-bold font-poppins p-2 text-white bg-[rgb(28,23,41)] rounded-md">
          Return
        </button>,
        <button
          key="submit"
          onClick={handleConfirm}
          className="font-bold font-poppins p-2 text-white bg-[rgb(127,82,255)] rounded-md ml-4"
        >
          Submit
        </button>,
      ]}
    >
      <input
        type="number"
        id="amountOfToke"
        name="amountOfToke"
        className="w-full p-2 border-2 boder-black"
        placeholder="Please enter Amount of Token that you want to farm!"
        onChange={handleChange}
      />
    </Modal>
  );
};

export default ModalContract;
