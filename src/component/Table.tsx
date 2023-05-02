import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHandshake } from "react-icons/fa";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import styles from "@/styles/Home.module.css";
import { deleteExpenseID } from "@/service/api";
import moment from "moment";

const Table = ({ tableData, setTableData, refresh, setRefresh }: any) => {
  const deleteExpense = (id: any) => {
    deleteExpenseID(id).then((res: any) => {
      setRefresh(!refresh);
    });
  };
  return (
    <>
      <div className="cards" style={{ width: "100%" }}>
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
                <p style={{color:"#49ff49"}}>₹ {e.amount}.00/-</p>
                <p>{moment(e.date).format('MMMM Do YYYY, h:mm a')}</p>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Table;
