import { FaHandshake } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import styles from "@/styles/Home.module.css";
import { deleteExpenseID, editExpense } from "@/service/api";
import moment from "moment";
import { Button, Input, message, Modal, Popconfirm, Select } from "antd";
import { useRef, useState } from "react";

const Card = ({ e, cardProps }: any) => {
  const { tableData, setTableData, refresh, setRefresh } = cardProps;

  const [formData, setFormData]: any = useState({
    id: "",
    amount: "",
    bearer: "",
    date: new Date(),
  });
  const formRef: any = useRef();
  const [openEditForm, setOpenEditForm] = useState(false);

  const deleteExpense = (id: any) => {
    deleteExpenseID(id).then((res: any) => {
      setRefresh(!refresh);
    });
  };

  const handleEdit = (e: any) => {
    setFormData({
      ...formData,
      id: e._id,
      amount: e.amount,
      bearer: e.bearer,
    });
    setOpenEditForm(true);
  };

  const onFinish = (e: any) => {
    e.preventDefault();
    formRef.current.reportValidity();
    if (formRef.current.reportValidity()) {
      editExpense(e.id, formData).then((res: any) => {
        setOpenEditForm(false);
        setRefresh(!refresh);
        setFormData({
          id: "",
          amount: "",
          bearer: "",
          date: new Date(),
        });
      });
    }
  };

  const confirm: any = (e: React.MouseEvent<HTMLElement>) => {
    deleteExpenseID(e).then((res: any) => {
      setRefresh(!refresh);
    });
    message.success("expense deleted");
  };

  const cancel: any = (e: React.MouseEvent<HTMLElement>) => {};
  return (
    <div className={styles.card}>
      {e.bearer === "Equal" ? (
        <p
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          paid Equally <FaHandshake style={{ fontSize: "25px" }} />
        </p>
      ) : e.bearer === "Anup" ? (
        <p
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          Anup <FcBusinessman style={{ fontSize: "25px" }} />
        </p>
      ) : (
        <p
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          Aparna
          <FcBusinesswoman style={{ fontSize: "25px" }} />
        </p>
      )}

      <span>
        <p
          style={{
            color: "#49ff49",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          ₹ {e.amount}.00/-{" "}
          <span
            style={{
              color: "white",
              cursor: "pointer",
              fontSize: "22px",
            }}
          >
            <AiFillEdit
              onClick={() => {
                handleEdit(e);
              }}
            />
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => confirm(e._id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <MdDelete
                style={{
                  color: "red",
                  marginLeft: "15px",
                }}
              />
            </Popconfirm>
          </span>
        </p>

        <p>{moment(e.date).format("MMMM Do YYYY, h:mm a")}</p>
      </span>
      <Modal
        title="Edit Expense"
        className="add-form"
        open={openEditForm}
        destroyOnClose
        onOk={() => setOpenEditForm(false)}
        onCancel={() => setOpenEditForm(false)}
        footer={false}
      >
        <form ref={formRef}>
          <span className="form-item">
            <label htmlFor="amount">Amount</label>
            <Input
              required
              value={formData.amount}
              prefix="₹"
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  amount: e.target.value,
                })
              }
              type="text"
              id="amount"
              placeholder="enter amount"
            />
          </span>
          <span className="form-item">
            <label htmlFor="bearer">Bearer</label>
            <Select
              value={formData.bearer || "select a bearer"}
              id="bearer"
              placeholder="select a bearer"
              style={{ width: "100%" }}
              onChange={(e: any) => {
                setFormData({ ...formData, bearer: e });
              }}
              options={[
                { value: "Anup", label: "Anup" },
                { value: "Aparna", label: "Aparna" },
                { value: "Equal", label: "Equal" },
              ]}
            />
          </span>

          <Button onClick={onFinish}>Edit</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Card;
