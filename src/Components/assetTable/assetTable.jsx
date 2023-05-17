import { Table } from "antd";
import { AiFillCheckCircle } from "react-icons/ai";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";

const columns = [
  {
    title: "Assets",
    dataIndex: "assets",
    sorter: (a, b) => a.assets.length - b.assets.length,
    sortDirections: ["descend"],
  },
  {
    title: "Wallet balance",
    dataIndex: "walletBalance",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.walletBalance - b.walletBalance,
  },
  {
    title: "APY",
    dataIndex: "apy",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.apy - b.apy,
  },
  {
    title: "Can be collateral",
    dataIndex: "collateral",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.collateral - b.collateral,
    render: (record) => {
      if (record) {
        return <AiFillCheckCircle className="text-2xl text-blue-600" />;
      } else {
        return <RiCheckboxBlankCircleLine className="text-2xl text-red-600" />;
      }
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="flex flex-row justify-start gap-4">
        <button className="p-2 border-2 border-black rounded-md">Supply</button>
        <button className="p-2 border-2 border-black rounded-md">
          Details
        </button>
      </div>
    ),
  },
];

const data = [
  {
    key: "1",
    assets: "ETH",
    walletBalance: 0.1,
    apy: 1.93,
    collateral: true,
  },
  {
    key: "2",
    assets: "MATIC",
    walletBalance: 0.1,
    apy: 1.03,
    collateral: false,
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export const AssetTable = () => {
  return (
    <div className="mt-8 mx-4">
      <Table columns={columns} dataSource={data} onChange={onChange} />;
    </div>
  );
};
