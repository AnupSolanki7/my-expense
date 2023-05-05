import { addExpense } from "@/service/api";
import { Modal, Form, Button, Input, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { TbCoinRupee } from "react-icons/tb";

const FormComp = ({ refresh, setRefresh }: any) => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [formData, setFormData]: any = useState({
    amount: "",
    bearer: "",
    type:"",
    date: new Date(),
  });
  const formRef: any = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      if (
        event.target.className === "btn" ||
        event.target.className === "ant-select-item-option-content"
      ) {
        return;
      } else {
        setOpenAddForm(false);
      }
    }
  };

  const onFinish = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    formRef.current.reportValidity();
    if (formRef.current.reportValidity()) {
      addExpense(formData).then((res: any) => {
        setOpenAddForm(false);
        setRefresh(!refresh);
        setFormData({
          amount: "",
          bearer: "",
          type:"",
          date: new Date(),
        });
      });
    }
  };

  return (
    <>
      <div>
        <button
          style={{ position: "absolute", bottom: "5%", right: "6%" }}
          className="btn"
          onClick={() => setOpenAddForm(true)}
        >
          Add Exp <TbCoinRupee style={{ fontSize: "25px" }} />{" "}
        </button>
      </div>

      {openAddForm ? (
        <>
          <div className="custom-modal animate__animated animate__zoomIn animate__faster">
            <form ref={formRef}>
              <span className="form-item">
                <label htmlFor="amount" style={{ fontWeight: "700" }}>
                  Amount
                </label>
                <Input
                  required
                  value={formData.amount}
                  prefix="₹"
                  onChange={(e: any) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  type="number"
                  pattern="\d*"
                  id="amount"
                  placeholder="enter amount"
                />
              </span>
              <span className="form-item">
                <label htmlFor="bearer" style={{ fontWeight: "700" }}>
                  Bearer
                </label>
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

              <Button onClick={(e: any) => onFinish(e)}>Add</Button>
            </form>
          </div>
          <div className="modal-mask"></div>
        </>
      ) : null}
    </>
  );
};

export default FormComp;
