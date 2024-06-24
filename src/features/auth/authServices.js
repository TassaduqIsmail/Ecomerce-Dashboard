import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  console.log(response.data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getAdminDetails = async (id) => {
  const response = await axios.get(`${base_url}user/${id}`);
  // console.log(response.data);
  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config
  );

  return response.data;
};
const updateOrder = async (status) => {
  // console.log("ooooooooooooooooooooooooooo", status);
  const response = await axios.put(
    `${base_url}user/order/update-order/${status?.id}`,
    { status: status?.status },
    config
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  getAdminDetails,
  updateOrder,
};

export default authService;
