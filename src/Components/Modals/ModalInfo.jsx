/* eslint-disable react/prop-types */
import { AiFillCloseCircle, AiOutlineCheck } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../../Redux/Reducers/FarmingReducer";

const ModalInfo = (props) => {
  const { message } = props;
  const dispatch = useDispatch();

  const handleDelete = () => {
    const action = deleteMessage(message.id);
    dispatch(action);
  };

  return (
    <div
      style={{ background: "rgb(51,61,81)" }}
      className="relative ml-10 p-4 flex flex-row justify-start items-center gap-4 border-2 border-gray-600 rounded-lg shadow-xl"
    >
      {message.type == "confirm" ? (
        <GiConfirmed className="text-2xl font-bold text-green-600" />
      ) : (
        <AiOutlineCheck className="text-2xl font-bold text-blue-600" />
      )}

      <p>{message.message}</p>
      <AiFillCloseCircle
        className="text-2xl font-bold absolute -top-2 -right-2 cursor-pointer"
        onClick={handleDelete}
      />
    </div>
  );
};

export default ModalInfo;
