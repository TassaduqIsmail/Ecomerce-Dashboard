import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all-users`);

  return response.data;
};
const updateUsers = async (id, status) => {
  console.log("api=======", id, status);
  const response = await axios.put(`${base_url}user/edit-user`, {
    id,
    status,
  });

  return response.data;
};

const customerService = {
  getUsers,
  updateUsers,
};

export default customerService;
