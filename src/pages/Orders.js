import React, { useEffect, useState } from "react";
import { Spin, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Order Number",
    dataIndex: "onumber",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "$ Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  // {
  //   title: "Action",
  //   dataIndex: "action",
  // },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
   setTimeout(()=>{
    setLoading(false)
   },2000)
  }, []);
  const orderState = useSelector((state) => state.auth.orders);
  // console.log(orderState);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    console.log("orders", orderState);
    data1.push({
      key: i + 1,
      name: orderState[i].orderby.fullName,
      onumber: orderState[i].orderNumber,
      product: (
        <Link to={`/admin/order/${orderState[i].orderby._id}`}>
          View Orders
        </Link>
      ),
      amount: `$ ${orderState[i].paymentIntent.amount}`,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      // action: (
      //   <>
      //     <Link to="/" className=" fs-3 text-danger">
      //       <BiEdit />
      //     </Link>
      //     <Link className="ms-3 fs-3 text-danger" to="/">
      //       <AiFillDelete />
      //     </Link>
      //   </>
      // ),
    });
  }
  const [loading, setLoading] = useState(true);
  return (
    <>
       {loading ? (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin spinning={loading} size="large" />
        </div>
      ):
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>}
    </>
  );
};

export default Orders;
