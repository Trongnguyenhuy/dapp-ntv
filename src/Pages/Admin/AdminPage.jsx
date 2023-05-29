/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { AdminBody } from "./AdminBody";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function AdminPage() {
  const history = useHistory();
  const { account, owner } = useSelector((state) => state.farmingReducer);

  useEffect(() => {
    if (account.walletAddress != owner) {
      alert(
        "Bạn không có quyền truy cập trang này!"
      );
      return history.push("/");
    }
  }, [account, owner]);

  return <>{account.walletAddress == owner && owner != "" && <AdminBody />}</>;
  // return (<AdminBody />);
}
