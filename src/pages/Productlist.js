import React, { useEffect, useState } from "react";
import { Modal, Table,Spin } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getProducts } from "../features/product/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [successVisible, setSuccessVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const data1 = [];

  const handleDeleteClick = (id) => {
    console.log("click ho raha hn ", id);
    setModalVisible(true);
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    console.log(deleteId);
    dispatch(deleteProducts(deleteId)).then((action) => {
      if (action.type === deleteProducts.fulfilled.type) {
        dispatch(getProducts());
        setModalVisible(false);
        toast.success("Success deleted product!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
    // setSuccessVisible(true);
    // setData1(newData);
    // dispatch(getProducts());
    // setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
    setDeleteId(null);
  };

  const handleEditClick = (product) => {
    const data = { name: "John", age: 30 };
    navigate("../product", { state: product });
  };

  useEffect(() => {
    dispatch(getProducts());
    setTimeout(()=>{
      setLoading(false)
     },2000)
  }, []);

  const dataToPass = { name: "John Doe", age: 25 };
  const productState = useSelector((state) => state.product.products);
  console.log();
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color,
      price: `${productState[i].price}`,
      _id: productState[i]._id,
      action: (
        <>
          {/* <Link
            // to={{
            //   pathname: "/admin/product",
            //   state: { name: "John Doe", age: 25 },
            // }}
            className="fs-3 text-danger"
          > */}
          <button
            onClick={() => handleEditClick(productState[i])}
            className="ms-3 fs-3 text-success border-0 bg-transparent"
          >
            <BiEdit />
          </button>
          {/* </Link> */}
          <button
            onClick={() => handleDeleteClick(productState[i]._id)}
            className="ms-3 fs-3 text-danger border-0 bg-transparent"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  console.log(data1);
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
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>

      <Modal
        title="Confirmation"
        visible={modalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete?</p>
      </Modal>
      <ToastContainer />
    </div>}
    </>
  );
};

export default Productlist;
