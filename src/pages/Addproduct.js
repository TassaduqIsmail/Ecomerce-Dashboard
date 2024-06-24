import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { useLocation } from "react-router-dom";

import {
  delImg,
  resetUploadState,
  uploadImg,
} from "../features/upload/uploadSlice";
import {
  createProducts,
  resetState,
  updateProducts,
} from "../features/product/productSlice";
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  weight: yup.string().required("weight is Required"),
  waist: yup.string().required("waist is Required"),
  height: yup.string().required("height is Required"),
  shape: yup.string().required("shapes is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  hipHeight: yup.string().required("Hip Height is Required"),
  hip: yup.string().required("Hip size is Required"),
  gender: yup.string().required("Gender is Required"),
  colorStyle: yup.string().required("Color style is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

function Addproduct(props) {
  const location = useLocation();
  const product = location?.state;
  // const name = props?.location?.state;
  console.log("------------->", product);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);
  console.log(color);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const imaegs = useSelector((state) => state.upload);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct, isUpdate } =
    newProduct;
  const [files, setFiles] = useState([]);
  const currentImg = imgState.length > 0 ? imgState : product?.images;
  console.log("iamge state", imgState);
  // const handleDropzoneChange = (acceptedFiles) => {
  //   setFiles([...files, ...acceptedFiles]);
  // };

  const handleDropzoneChange = (acceptedFiles) => {
    console.log(
      imgState.length,
      "total",
      imgState.length + acceptedFiles.length > 5,
      "current",
      acceptedFiles.length
    );
    if (
      files.length + acceptedFiles.length > 5 ||
      imgState.length + files.length >= 5
    ) {
      alert("You can select up to 5 images.");
      return;
    }
    setFiles([...files, ...acceptedFiles.slice(0, 5 - files.length)]);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const genders = ["Women", "Men", "Non-Binary", "I prefer not to say"];
  const weightRanges = [
    "30-40",
    "40-50",
    "50-60",
    "60-70",
    "70-80",
    "80-90",
    "90-100",
    "100-110",
    "110-120",
    "120-130",
    "130-140",
    "140-150",
    "150-160",
    "160-170",
    "170-180",
    "180-190",
    "190-200",
    // Add more ranges as needed
  ];

  const waistRanges = ["20-25", "25-30", "30-35", "35-40", "40-45", "45-50"];
  const colorStyle = ["Classic", "Casual", "Minimalist", "Boo-hoo", "Romantic", "Sporty"];
  const heightRanges = [
    "120-130",
    "130-140",
    "140-150",
    "150-160",
    "160-170",
    "170-180",
    "180-190",
    "190-200",
    "200-210",
    "210-220",
    "220-230",
    "230-240",
    "240-250",
    "250-260",
    "260-270",
    "270-280",
    "280-290",
    "290-300",
  ];

  const hips = [
    "40-45",
    "50-55",
    "60-65",
    "70-75",
    "80-85",
    "90-95",
    "100-105",
    "110-115",
    "120-125",
    "130-135",
    "140-145",
    "150-155",
    "160-165",
    "170-175",
    "180-185",
  ];

  const hipHeight = [
    "40-49",
    "50-59",
    "60-69",
    "70-79",
    "80-89",
    "90-99",
    "100-109",
    "110-119",
    "120-129",
    "130-139",
    "140-149",
    "150-159",
    "160-169",
    "170-179",
    "180-189",
  ];

  const shapes = ["Rectangle", "Triangle", "Hour", "Inverted", "Round"];

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isSuccess && isUpdate) {
      toast.success("Product updated Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  console.log(files);
  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: "",
      waist: "",
      height: "",
      weight: "",
      shape: "",
      hipHeight: "",
      hip: "",
      gender: "",
      colorStyle: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (product!==null) {

        // console.log("update chl raha hn ");
        const allData = {
          ...values,
          _id: product?._id,
          images: [...product.images, ...imgState],
        };
        dispatch(updateProducts(allData)).then((action) => {
          if (action.type === updateProducts.fulfilled.type) {
            formik.resetForm();
            setColor(null);
            setFiles([]);
            setTimeout(() => {
              dispatch(resetState());
              dispatch(resetUploadState());
              navigate("/admin/list-product");
            }, 2000);
          }
        });
      } else {
        // console.log("simple chl raha hn ====================");

        dispatch(createProducts(values));
        formik.resetForm();
        setColor(null);
        setFiles([]);
        setTimeout(() => {
          dispatch(resetState());
          dispatch(resetUploadState());
        }, 3000);
      }
    },
  });

  // Assuming 'formik' is your Formik object and 'product' is the product data

  if (!formik.values.title && product) {
    formik.setValues({
      title: product?.title,
      description: product?.description,
      price: product?.price,
      brand: product?.brand,
      category: product?.category,
      tags: product?.tags,
      color: product?.color[0],
      quantity: product?.quantity,
      height: product?.height,
      weight: product?.weight,
      shape: product?.shape,
      hipHeight: product?.hipHeight,
      hip: product?.hip,
      gender: product?.gender,
      waist: product?.waist,
      colorStyle: product?.colorStyle,
    });
  }

  const handleColors = (e) => {
    setColor(e);
    console.log(color);
  };

  const uploadPictures = () => {
    if (files.length > 0) {
      dispatch(uploadImg(files));
      setTimeout(() => {
        setFiles([]);
      }, 2000);
    }
  };
  return (
    <div>
      <h3 className="mb-4 title">
        {product ? "Update Product" : "Add Product"}
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          {/* --------------------------------------------------------------------- */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                marginBottom: "10px",
                width: "70%",
                marginRight: "10px",
              }}
            >
              <CustomInput
                type="number"
                label="Enter Product Price"
                name="price"
                onChng={formik.handleChange("price")}
                onBlr={formik.handleBlur("price")}
                val={formik.values.price}
              />
              <div className="error">
                {formik.touched.price && formik.errors.price}
              </div>
            </div>
            <div
              style={{
                marginBottom: "10px",
                width: "70%",
              }}
            >
              <CustomInput
                type="number"
                label="Enter Product Quantity"
                name="quantity"
                onChng={formik.handleChange("quantity")}
                onBlr={formik.handleBlur("quantity")}
                val={formik.values.quantity}
              />
              <div className="error">
                {formik.touched.quantity && formik.errors.quantity}
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                marginBottom: "10px",
                width: "70%",
                marginRight: "10px",
              }}
            >
              <select
                name="waist"
                onChange={formik.handleChange("waist")}
                onBlur={formik.handleBlur("waist")}
                value={formik.values.waist}
                className="form-control py-3 mb-3"
                id=""
                // style={{ width: "100%" }}
              >
                <option value="">Select Waist (in)</option>
                {waistRanges.map((i, j) => {
                  return (
                    <option key={j} value={i}>
                      {i}
                    </option>
                  );
                })}
              </select>
              <div className="error">
                {formik.touched.waist && formik.errors.waist}
              </div>
            </div>
            <div style={{ marginBottom: "10px", width: "70%" }}>
              <select
                name="height"
                onChange={formik.handleChange("height")}
                onBlur={formik.handleBlur("height")}
                value={formik.values.height}
                className="form-control py-3 mb-3"
                id=""
                // style={{ width: "100%" }}
              >
                <option value="">Select Height (cm)</option>
                {heightRanges.map((i, j) => {
                  return (
                    <option key={j} value={i}>
                      {i}
                    </option>
                  );
                })}
              </select>
              <div className="error">
                {formik.touched.height && formik.errors.height}
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                marginBottom: "10px",
                width: "70%",
                marginRight: "10px",
              }}
            >
              <select
                name="weight"
                onChange={formik.handleChange("weight")}
                onBlur={formik.handleBlur("weight")}
                value={formik.values.weight}
                className="form-control py-3 mb-3"
                id=""
                // style={{ width: "100%" }}
              >
                <option value="">Select Weight (lb)</option>
                {weightRanges.map((i, j) => {
                  return (
                    <option key={j} value={i}>
                      {i}
                    </option>
                  );
                })}
              </select>
              <div className="error">
                {formik.touched.weight && formik.errors.weight}
              </div>
            </div>
            <div style={{ marginBottom: "10px", width: "70%" }}>
              <select
                name="brand"
                onChange={formik.handleChange("brand")}
                onBlur={formik.handleBlur("brand")}
                value={formik.values.brand}
                className="form-control py-3 mb-3"
                id=""
                // style={{ width: "100%" }}
              >
                <option value="">Select Brand</option>
                {brandState.map((i, j) => {
                  return (
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  );
                })}
              </select>
              <div className="error">
                {formik.touched.brand && formik.errors.brand}
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                marginBottom: "10px",
                width: "70%",
                marginRight: "10px",
              }}
            >
              <select
                name="category"
                onChange={formik.handleChange("category")}
                onBlur={formik.handleBlur("category")}
                value={formik.values.category}
                className="form-control py-3 mb-3"
                id=""
              >
                <option value="">Select Category</option>
                {catState.map((i, j) => {
                  return (
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  );
                })}
              </select>
              <div className="error">
                {formik.touched.category && formik.errors.category}
              </div>
            </div>
            <div
              style={{
                marginBottom: "10px",
                width: "70%",
              }}
            >
              <select
                name="tags"
                onChange={formik.handleChange("tags")}
                onBlur={formik.handleBlur("tags")}
                value={formik.values.tags}
                className="form-control py-3 mb-3"
                id=""
              >
                <option value="" disabled>
                  Select tags
                </option>
                <option value="perfect day">perfect day</option>
                <option value="hot">hot</option>
                <option value="casual">casual</option>
              </select>
              <div className="error">
                {formik.touched.tags && formik.errors.tags}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------------------- */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                marginBottom: "10px",
                width: "70%",
                marginRight: "10px",
              }}
            >
              <select
                name="hip"
                onChange={formik.handleChange("hip")}
                onBlur={formik.handleBlur("hip")}
                value={formik.values.hip}
                className="form-control py-3 mb-3"
                id=""
              >
                <option value="">Select Hip Size (cm)</option>
                {hips.map((i, j) => {
                  return (
                    <option key={j} value={i}>
                      {i}
                    </option>
                  );
                })}
              </select>
              <div className="error">
                {formik.touched.hip && formik.errors.hip}
              </div>
            </div>
            <div
              style={{
                marginBottom: "10px",
                width: "70%",
              }}
            >
              <select
                name="hipHeight"
                onChange={formik.handleChange("hipHeight")}
                onBlur={formik.handleBlur("hipHeight")}
                value={formik.values.hipHeight}
                className="form-control py-3 mb-3"
                id=""
              >
                <option value="">Select Hip Height Size (cm)</option>
                {hipHeight.map((i, j) => {
                  return (
                    <option key={j} value={i}>
                      {i}
                    </option>
                  );
                })}
              </select>
              <div className="error">
                {formik.touched.hipHeight && formik.errors.hipHeight}
              </div>
            </div>
          </div>

          {/* ================================================================================= */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                marginBottom: "10px",
                width: "70%",
                marginRight: "10px",
              }}
            >
              <select
                name="gender"
                onChange={formik.handleChange("gender")}
                onBlur={formik.handleBlur("gender")}
                value={formik.values.gender}
                className="form-control py-3 mb-3"
                id=""
              >
                <option value="">Select Gender</option>
                {genders.map((i, j) => {
                  return (
                    <option key={j} value={i}>
                      {i}
                    </option>
                  );
                })}
              </select>
              <div className="error">
                {formik.touched.gender && formik.errors.gender}
              </div>
            </div>
            <div
              style={{
                marginBottom: "10px",
                width: "70%",
              }}
            >
              <select
                name="shape"
                onChange={formik.handleChange("shape")}
                onBlur={formik.handleBlur("shape")}
                value={formik.values.shape}
                className="form-control py-3 mb-3"
                id=""
              >
                <option value="">Select Shapes</option>
                {shapes.map((i, j) => {
                  return (
                    <option key={j} value={i}>
                      {i}
                    </option>
                  );
                })}
              </select>
              <div className="error">
                {formik.touched.shape && formik.errors.shape}
              </div>
            </div>
          </div>

          {/* ================================================================================= */}

          <select
                name="colorStyle"
                onChange={formik.handleChange("colorStyle")}
                onBlur={formik.handleBlur("colorStyle")}
                value={formik.values.colorStyle}
                className="form-control py-3 mb-3"
                id=""
              >
                <option value="">Select color style</option>
                {colorStyle.map((i, j) => {
                  return (
                    <option key={j} value={i}>
                      {i}
                    </option>
                  );
                })}
              </select>
              <div className="error">
                {formik.touched.colorStyle && formik.errors.colorStyle}
              </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>

          <div
            className="bg-white border-1 p-5 text-center"
            style={{ cursor: "pointer" }}
          >
            {/* <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop product images here, or click to select
                      picture
                    </p>
                  </div>
                </section>
              )}
            </Dropzone> */}

            <Dropzone onDrop={handleDropzoneChange}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop product images here, or click to select
                      picture
                    </p>
                  </div>
                  <aside
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {files.map((file, index) => (
                      <div
                        key={index}
                        style={{ position: "relative", marginRight: "0.5rem" }}
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                          }}
                        />
                        {/* <p
                          onClick={() => removeFile(index)}
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            padding: "2px",
                          }}
                        >
                          X
                        </p> */}
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="btn-close position-absolute"
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            padding: "2px",
                          }}
                        ></button>
                      </div>
                    ))}
                  </aside>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {currentImg?.map((i, j) => {
              console.log("========current", i);
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i?.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          {files.length > 0 && (
            <button
              onClick={uploadPictures}
              className="btn btn-primary border-0 rounded-3 my-5"
              type="button"
              // type="submit"
            >
              Upload Images
            </button>
          )}
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {product ? "Update Product" : " Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addproduct;
