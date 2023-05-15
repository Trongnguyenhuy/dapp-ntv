/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Modal } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  setHarvestingToken,
  setMessage,
} from "../../Redux/Reducers/FarmingReducer";
import stakingServices from "../../Services/StakingServices/StakingServices";

const ModalContract = (props) => {
  const { modalOpen, setModalOpen, account } = props;
  const dispatch = useDispatch();

  const amountOfToken = useRef(0);

  useEffect(() => {
    (async () => {
      const pool = await stakingServices.methods.pools(0).call();
      const tx = await stakingServices.methods
        .deposit(0, 10)
        .send({ from: "0xee0d47fB627a8a812169C13F7FEe5e3100c329f3" });

      console.log("pool:", pool);
      console.log("Tx:", tx);
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
    amountOfToken.current = 0;
  };

  const handleChange = (e) => {
    const { value } = e.target;
    amountOfToken.current = value;
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
