import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import styles from "@/styles/Home.module.css";
import { deleteExpenseID } from "@/service/api";

const Table = ({ tableData, setTableData, refresh, setRefresh }: any) => {
  const deleteExpense = (id: any) => {
    deleteExpenseID(id).then((res: any) => {
      setRefresh(!refresh);
    });
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Bearer</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((e: any) => {
          return (
            <tr>
              <td>₹{e.amount}</td>
              <td>{e.bearer}</td>
              <td>{e.date}</td>
              <td style={{ fontSize: "20px" }}>
                {" "}
                <MdDelete
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteExpense(e._id)}
                />{" "}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
