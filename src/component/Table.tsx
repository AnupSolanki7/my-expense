import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaHandshake } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import styles from "@/styles/Home.module.css";
import { deleteExpenseID, editExpense } from "@/service/api";
import moment from "moment";
import { Button, Input, Modal, Select } from "antd";

const Table = ({ tableData, setTableData, refresh, setRefresh }: any) => {
  const [formData, setFormData]: any = useState({
    amount: "",
    bearer: "",
    date: new Date(),
  });
  const formRef: any = useRef();
  const [open, setOpen] = useState(false);
  const deleteExpense = (id: any) => {
    deleteExpenseID(id).then((res: any) => {
      setRefresh(!refresh);
    });
  };

  const onFinish = (e: any) => {
    e.preventDefault();
    formRef.current.reportValidity();
    if (formRef.current.reportValidity()) {
      editExpense(e.id,formData).then((res: any) => {
        console.log(res);

        setOpen(false);
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
      <div
        className="cards"
        style={{ width: "100%", maxHeight: "360px", overflowY: "scroll" }}
      >
        {tableData?.map((e: any) => {
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
                      color: "blueviolet",
                      cursor: "pointer",
                      fontSize: "19px",
                    }}
                  >
                    <AiFillEdit onClick={() => {}} />
                    <Modal
                      title="Add Expense"
                      rootClassName="add-form"
                      open={open}
                      onOk={() => setOpen(false)}
                      onCancel={() => setOpen(false)}
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

                        <Button onClick={onFinish}>Add</Button>
                      </form>
                    </Modal>
                  </span>
                </p>

                <p>{moment(e.date).format("MMMM Do YYYY, h:mm a")}</p>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Table;
