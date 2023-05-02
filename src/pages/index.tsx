import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Table from "@/component/Table";
import Form from "@/component/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { getExpense } from "@/service/api";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getExpenses();
  }, [refresh]);

  const getExpenses = async () => {
    getExpense().then((res: any) => {
      setTableData(res.data.expense);
    });
  };

  const total = () => {
    let amt = 0;
    tableData.map((e: any) => {
      amt = amt + parseInt(e.amount);
    });
    return amt;
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <main className={styles.main}>
        <div className="whole">
          <div className={styles.description} style={{ textAlign: "center" }}>
            <h1 className="title">My Expense</h1>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
            }}
          >
            <div>Total: ₹{total()}.00</div>
            <Form refresh={refresh} setRefresh={setRefresh} />
          </div>
          <div
          className="table"
            style={{
              display: "flex",
              justifyContent: "center",
              width:"100%"
            }}
          >
            <Table
              tableData={tableData}
              setTableData={setTableData}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          </div>
        </div>
      </main>
    </>
  );
}
