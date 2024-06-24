import React, { useEffect, useState } from "react";
import { Modal, Button, Input, List, Typography, Spin } from "antd";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createFaqs,
  deleteAFaq,
  getFaqs,
  updateAFaq,
} from "../features/faq/faqSlice";

const { Title } = Typography;

const FAQPage = () => {
  const [faqs, setFAQs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [loading,setLoading] = useState(true)

  const dispatch = useDispatch();
  const faqslist = useSelector((state) => state.faqs.faqs);

  // console.log(faqslist);
  useEffect(() => {
    dispatch(getFaqs());
    setTimeout(()=>{
      setLoading(false)
     },2000)
  }, []);

  const showModal = (faq = null) => {
    setEditingFAQ(faq);
    if (faq) {
      setQuestion(faq.question);
      setAnswer(faq.answer);
    } else {
      setQuestion("");
      setAnswer("");
    }
    setIsModalVisible(true);
  };

  // console.log(question, "========", answer);
  // console.log("===================----------", faqslist?.length);
  const handleOk = async () => {
    if (editingFAQ) {
      setFAQs(
        faqslist?.map((faq) =>
          faq._id === editingFAQ._id ? { ...faq, question, answer } : faq
        )
      );

      dispatch(updateAFaq({ id: editingFAQ?._id, question, answer })).then(
        (action) => {
          if (action.type === updateAFaq.fulfilled.type) {
            dispatch(getFaqs());
            toast.success("successfuly updated");
          }
        }
      );
      setIsModalVisible(false);
    }
    if (!editingFAQ && question !== "" && answer !== "") {
      // const newFAQ = { _id: Date.now().toString(), question, answer };
      // setFAQs([...faqs, newFAQ]);
      dispatch(createFaqs({ question, answer })).then((action) => {
        if (action.type === createFaqs.fulfilled.type) {
          dispatch(getFaqs());
          toast.success("successfuly created");
        }
      });
      setIsModalVisible(false);
    }

    if (!question && !answer) {
      toast.error("All field required*");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteAFaq(id)).then((action) => {
      if (action.type === deleteAFaq.fulfilled.type) {
        dispatch(getFaqs());
        toast.success("successfuly deleted");
      }
    });
  };

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
    <div style={{ padding: "20px" }}>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ float: "right", marginBottom: "20px" }}
      >
        Create FAQ
      </Button>
      <Title level={2}>FAQ's</Title>
      {faqslist?.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={faqslist}
          renderItem={(faq) => (
            <List.Item
              actions={[
                <AiFillEdit
                  onClick={() => showModal(faq)}
                  style={{ cursor: "pointer", color: "blue" }}
                />,
                <AiFillDelete
                  onClick={() => handleDelete(faq._id)}
                  style={{ cursor: "pointer", color: "red" }}
                />,
              ]}
            >
              <List.Item.Meta title={faq.question} description={faq.answer} />
            </List.Item>
          )}
        />
      ) : (
        <>
          <h5
            style={{
              textAlign: "center",
              // marginBottom: "20px",
              marginTop: "50px",
            }}
          >
            No FAQ's List... Please Add a List
          </h5>
        </>
      )}
      <Modal
        title={editingFAQ ? "Edit FAQ" : "Create FAQ"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Question"
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input.TextArea
          placeholder="Answer"
          required
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </Modal>
      <ToastContainer />
    </div>}
    </>
  );
};

export default FAQPage;
