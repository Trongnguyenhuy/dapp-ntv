/* eslint-disable react/prop-types */
import { LoadingOutlined } from "@ant-design/icons";

const Loading = (props) => {
  const { index, loading, text } = props;

  return (
    <>{index == loading ? <LoadingOutlined className="text-xl" /> : text}</>
  );
};

export default Loading;
