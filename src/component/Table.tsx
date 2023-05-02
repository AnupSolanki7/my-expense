import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import styles from "@/styles/Home.module.css";

const Table = ({refresh, setRefresh}:any) => {
  const [tableData, setTableData] = useState([]);


  useEffect(() => {
    getExpenses();
  }, [refresh]);

  const getExpenses = async () => {
    axios.get("https://my-expense.vercel.app/api/expense").then((res: any) => {
      setTableData(res.data.expense);
    });
  };

  const deleteExpense = (id: any) => {
    axios
      .delete(`https://my-expense.vercel.app/api/expense/?_id=${id}`)
      .then((res: any) => {
        setRefresh(!refresh);
      });
  };
  return (
    <div>
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
    </div>
  );
};

export default Table;
