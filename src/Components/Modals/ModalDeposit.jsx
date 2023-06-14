import { Modal } from "antd";

export const error = ({ title, content }) => {
  Modal.error({
    title: title,
    content: content,
  });
};
