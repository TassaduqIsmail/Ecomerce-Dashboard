import React, { useEffect, useState } from "react";
import { Button, Modal, Select, Spin, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import {
  getOrderByUser,
  getOrders,
  updateOrderStatus,
} from "../features/auth/authSlice";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";

const { Option } = Select;

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Order No.",
    dataIndex: "ordernumber",
  },
  {
    title: "Order Status",
    dataIndex: "status",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  // {
  //   title: "Brand",
  //   dataIndex: "brand",
  // },
  {
    title: "Count",
    dataIndex: "count",
  },
  // {
  //   title: "Color",
  //   dataIndex: "color",
  // },
  {
    title: "$ Total Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location?.pathname?.split("/")[3];

  const [UpdateId, setUpdateId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading,  setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getOrderByUser(userId));

    }
    setTimeout(()=>{
      setLoading(false)
     },2000)
  }, [dispatch]);

  const handleConfirmUpdate = () => {
    // console.log(deleteId);
    // setModalVisible(false);
    if (selectedOption && UpdateId) {
      const status = {
        id: UpdateId,
        status: selectedOption,
      };
      dispatch(updateOrderStatus(status)).then((action) => {
        if (action.type === updateOrderStatus.fulfilled.type) {
          dispatch(getOrderByUser(userId));
          setModalVisible(false);
          setUpdateId(null);
          setSelectedOption(null);
          toast.success("Successfully status Update!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
    } else {
      toast.error("Please select Option");
    }
  };

  const handleUpdateClick = (id) => {
    console.log("click ho raha hn ", id);
    setModalVisible(true);
    setUpdateId(id);
  };

  const handleCancelUpdate = () => {
    setModalVisible(false);
    setUpdateId(null);
    setSelectedOption(null);
  };

  const handleChange = (value) => {
    console.log("Selected option:", value);
    setSelectedOption(value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "blue";
      case "Dispatched":
        return "green";
      case "Cancelled":
        return "orange";
      case "Delivered":
        return "purple";
      default:
        return "red";
    }
  };

  // _.sumBy(order?.products, (product) => product?.count || 0)
  const orderState = useSelector((state) => state?.auth?.orderbyuser || []);
  // console.log(orderState);

  const data1 = orderState.map((order, index) => ({
    key: index + 1,
    ordernumber: order?.orderNumber || "-",
    // status: order?.orderStatus || "-",
    status: (
      <>
        <h6 style={{ color: getStatusColor(order?.orderStatus) }}>
          {order?.orderStatus}
        </h6>
      </>
    ),
    name: order?.products?.map((u) => u?.product?.title).join(", ") || "-",
    // brand: order.brand || "-",
    count: order?.products?.map((u) => u?.count).join(", ") || "-",
    amount: `$ ${order.paymentIntent?.amount}` || "-",
    color: order?.color || "-",
    date: new Date(order?.createdAt).toLocaleString() || "-",
    action: (
      <>
        <button
          className="ms-3 fs-3 text-success border-0 bg-transparent"
          onClick={() => handleUpdateClick(order?._id)}
        >
          <BiEdit />
        </button>
        {/* <Link className="ms-3 fs-3 text-danger" to="/">
          <AiFillDelete />
        </Link> */}
      </>
    ),
  }));

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
        <h3 className="mb-4 title">View Order</h3>
       
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <Modal
          title="Update Order Status"
          visible={modalVisible}
          // onOk={handleConfirmDelete}
          onCancel={handleCancelUpdate}
          footer={null}
        >
          <Select
            defaultValue="Not Processed"
            style={{ width: 200 }}
            onChange={handleChange}
          >
            <Option value="Not Processed" style={{ color: "red" }}>
              Not Processed
            </Option>
            <Option value="Processing" style={{ color: "blue" }}>
              Processing
            </Option>
            <Option value="Dispatched" style={{ color: "green" }}>
              Dispatched
            </Option>
            <Option value="Cancelled" style={{ color: "orange" }}>
              Cancelled
            </Option>
            <Option value="Delivered" style={{ color: "purple" }}>
              Delivered
            </Option>
          </Select>
          <div
            style={{
              display: "flex",
              justifyItems: "flex-end",
              justifyContent: "end",
            }}
          >
            <Button style={{ marginRight: "4px" }} onClick={handleCancelUpdate}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleConfirmUpdate}>
              Update
            </Button>
          </div>
        </Modal>
        <ToastContainer />
      </div>}
    </>
  );
};

export default ViewOrder;
