import { addExpense } from "@/service/api";
import { Modal, Form, Button, Input, Select } from "antd";
import React, { useRef, useState } from "react";
import { TbCoinRupee } from "react-icons/tb";

const FormComp = ({ refresh, setRefresh }: any) => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [formData, setFormData]: any = useState({
    amount: "",
    bearer: "",
    date: new Date(),
  });
  const formRef: any = useRef();
  const onFinish = (e: any) => {
    e.preventDefault();
    formRef.current.reportValidity();
    if (formRef.current.reportValidity()) {
      addExpense(formData).then((res: any) => {
        console.log(res);
        
        setOpenAddForm(false);
        setRefresh(!refresh);
        setFormData({
          amount: "",
          bearer: "",
          date: new Date(),
        });
      });
    }
  };

  return (
    <>
      <div>
        <button className="btn" onClick={() => setOpenAddForm(true)}>
          Add Expense <TbCoinRupee style={{ fontSize: "25px" }} />{" "}
        </button>
      </div>
      <Modal
        title="Add Expense"
        className="add-form"
        open={openAddForm}
        onOk={() => setOpenAddForm(false)}
        onCancel={() => setOpenAddForm(false)}
        footer={false}
      >
        <form>
          <span className="form-item">
            <label htmlFor="amount">Amount</label>
            <Input
              required
              value={formData.amount}
              prefix="₹"
              onChange={(e: any) =>
                setFormData({ ...formData, amount: e.target.value })
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

          <Button onClick={onFinish}>Add</Button>
        </form>
      </Modal>
    </>
  );
};

export default FormComp;
