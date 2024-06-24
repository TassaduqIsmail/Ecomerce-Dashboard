import React, { useEffect, useState } from "react";
import { Table, Avatar, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateUsers } from "../features/cutomers/customerSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    render: (avatar) => <Avatar src={avatar} />,
  },
  ,
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    setTimeout(()=>{
      setLoading(false)
     },2000)
  }, []);
  const [loading, setLoading] = useState(true);
  const updateStatus = (id, status) => {
    // console.log("update status", status, !status);
    dispatch(updateUsers({ id: id, status: !status })).then((action) => {
      if (action.type === updateUsers.fulfilled.type) {
        dispatch(getUsers());
        toast.success("updated Status!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };
  const customerstate = useSelector((state) => state.customer.customers);
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== "admin") {
      data1.push({
        key: i,
        name: customerstate[i].username,
        avatar:
          customerstate[i].profilePic.url ||
          "https://img.freepik.com/premium-photo/bearded-man-illustration_665280-67047.jpg",
        // name: customerstate[i].firstname + " " + customerstate[i].lastname,
        email: customerstate[i].email,
        action: (
          <>
            {customerstate[i].isAccountStatus ? (
              <button
                onClick={() =>
                  updateStatus(
                    customerstate[i]._id,
                    customerstate[i].isAccountStatus
                  )
                }
                className="fs-5 text-success border-0 bg-transparent"
              >
                {/* <AiOutlineCheck /> */}
                Enable
              </button>
            ) : (
              <button
                onClick={() =>
                  updateStatus(
                    customerstate[i]._id,
                    customerstate[i].isAccountStatus
                  )
                }
                className=" fs-5 text-danger border-0 bg-transparent"
              >
                {/* <AiOutlineClose /> */}
                Disable
              </button>
            )}
          </>
        ),
      });
    }
  }

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
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
        <ToastContainer />
      </div>
    </div>}
    </>
  );
};

export default Customers;
