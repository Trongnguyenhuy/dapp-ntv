import { GoAlert } from "react-icons/go";
import { MdOutlineInsertComment } from "react-icons/md";
import { useSelector } from "react-redux";

const ModalWarming = () => {
  const { warming } = useSelector((state) => state.messageReducer);
  return (
    <>
      {Object.keys(warming).length !== 0 && (
        <div
          className="
            fixed z-50
            w-[100%] h-[100%]
            flex flex-row justify-center items-center
            bg-[rgba(0,0,0,0.3)]
        "
        >
          <div
            className="
                bg-white 
                h-[35%] w-[35%] 
                rounded-xl shadow-xl 
                grid grid-rows-2 justify-items-center gap-2
            "
          >
            {warming.type == "instruct" ? (
              <div className="w-full bg-blue-600 rounded-t-xl">
                <MdOutlineInsertComment className="text-8xl text-white font-bold mx-auto mt-4" />
              </div>
            ) : (
              <div className="w-full bg-red-600 rounded-t-xl">
                <GoAlert className="text-8xl text-white font-bold mx-auto mt-4" />
              </div>
            )}
            <div className="w-full rounded-b-xl text-black text-center p-4 leading-relaxed">
              <h2 className="text-xl font-bold mb-2">{warming.header}</h2>
              <p>{warming.message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalWarming;
