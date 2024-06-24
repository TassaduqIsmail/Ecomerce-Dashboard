import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getFaqs = async () => {
  const response = await axios.get(`${base_url}faqs/`);

  return response.data;
};

const createFaqs = async (faq) => {
  const response = await axios.post(`${base_url}faqs/create`, faq, config);

  return response.data;
};
const updateFaqs = async (faq) => {
  console.log("faq --------------------", faq);
  const response = await axios.put(
    `${base_url}faqs/${faq.id}`,
    { question: faq.question, answer: faq.answer },
    config
  );

  return response.data;
};
// const getFaqs  = async (id) => {
//   const response = await axios.get(`${base_url}brand/${id}`, config);

//   return response.data;
// };

const deleteFaqs = async (id) => {
  const response = await axios.delete(`${base_url}faqs/${id}`, config);

  return response.data;
};

const brandService = {
  getFaqs,
  createFaqs,
  deleteFaqs,
  updateFaqs,
};

export default brandService;
