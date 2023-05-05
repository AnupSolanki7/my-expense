import { FaHandshake } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import styles from "@/styles/Home.module.css";
import { deleteExpenseID, editExpense } from "@/service/api";
import moment from "moment";
import { Button, Input, message, Modal, Popconfirm, Select } from "antd";
import { useEffect, useRef, useState } from "react";

const Card = ({ e, cardProps }: any) => {
  const { tableData, setTableData, refresh, setRefresh } = cardProps;

  const [formData, setFormData]: any = useState({
    id: "",
    amount: "",
    bearer: "",
    type:"",
    date: new Date(),
  });
  const formRef: any = useRef();
  const [openEditForm, setOpenEditForm] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      if (
        event.target.className.baseVal === "" ||
        event.target.className === "ant-select-item-option-content" ||
        event.target.className.baseVal === "edit"
      ) {
        return;
      } else {
        setOpenEditForm(false);
      }
    }
  };

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
      type:e.type
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
          type:"",
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
        <p className="name">
          Equal
          <FaHandshake style={{ fontSize: "25px" }} />
        </p>
      ) : e.bearer === "Anup" ? (
        <p className="name">
          Anup <FcBusinessman style={{ fontSize: "25px" }} />
        </p>
      ) : (
        <p className="name">
          Aparna
          <FcBusinesswoman style={{ fontSize: "25px" }} />
        </p>
      )}

      <span className="types">
        {e.type === "Others" ? (
          <p style={{ color: "#4bc0c0", fontSize: "18px", fontWeight: "800" }}>
            {e.type}
          </p>
        ) : e.type === "Food" ? (
          <p style={{ color: "#ff6384", fontSize: "18px", fontWeight: "800" }}>
            {e.type}
          </p>
        ) : e.type === "Travel" ? (
          <p style={{ color: "#ffce56", fontSize: "18px", fontWeight: "800" }}>
            {e.type}
          </p>
        ) : e.type === "Medical" ? (
          <p style={{ color: "#36a2eb", fontSize: "18px", fontWeight: "800" }}>
            {e.type}
          </p>
        ) : (
          <p>{e.Type}</p>
        )}
      </span>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <p
          style={{
            color: "#49ff49",
            display: "flex",
            fontSize: "20px",
            fontWeight: "700",
            justifyContent: "space-between",
          }}
        >
          ₹ {e.amount}.00/-{" "}
          <span
            style={{
              color: "white",
              cursor: "pointer",
              fontSize: "22px",
              marginLeft: "10px",
            }}
          >
            <AiFillEdit
              className="edit"
              onClick={() => {
                handleEdit(e);
              }}
            />
          </span>
        </p>

        <p>
          {moment(e.date).format("MMMM Do YYYY")}{" "}
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
                marginLeft: "5px",
                fontSize: "22px",
              }}
            />
          </Popconfirm>
        </p>
      </span>
      {openEditForm ? (
        <>
          <div
            className="custom-modal animate__animated animate__zoomIn animate__faster"
            style={{ top: "30%" }}
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
              <span className="form-item">
                <label htmlFor="bearer" style={{ fontWeight: "700" }}>
                  Expense Type
                </label>
                <Select
                  value={formData.type || "select expense type"}
                  id="bearer"
                  placeholder="select a bearer"
                  style={{ width: "100%" }}
                  onChange={(e: any) => {
                    setFormData({ ...formData, type: e });
                  }}
                  options={[
                    { value: "Food", label: "Food" },
                    { value: "Travel", label: "Travel" },
                    { value: "Medical", label: "Medical" },
                    { value: "Others", label: "Others" },
                  ]}
                />
              </span>


              <Button onClick={onFinish}>Edit</Button>
            </form>
          </div>
          <div className="modal-mask"></div>
        </>
      ) : null}
    </div>
  );
};

export default Card;
