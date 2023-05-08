import { Modal } from "antd";
import { useRef } from "react";

const ModalContract = (props) => {
  const { modalOpen, setModalOpen } = props;
  const amountOfToken = useRef(0);

  const handleConfirm = () => {
    setModalOpen(false);
    console.log(`Confirm!!! ${amountOfToken.current}`);
  };

  const handleCancel = () => {
    setModalOpen(false);
    amountOfToken.current = 0;
  }

  const handleChange = (e) => {
    const { value } = e.target;

    amountOfToken.current = value;
    console.log(amountOfToken.current);
  };

  return (
    <Modal
      title={<h2 className="p-2 font-bold text-2xl">Amount Confirm</h2>}
      centered
      open={modalOpen}
      onOk={handleConfirm}
      onCancel={handleCancel}
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
