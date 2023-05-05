import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Table from "@/component/Table";
import Form from "@/component/Form";
import { useEffect, useState } from "react";
import { getExpense } from "@/service/api";
import PieChart from "@/component/PieChart";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [pieType, setPieType] = useState(true)

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>
      <main className={styles.main}>
        <div className="whole">
          <div className={styles.description} style={{ textAlign: "center" }}>
            <h1 className="title">My Expense</h1>
          </div>
          <div className="body">
            <button>

            </button>
            <PieChart tableData={tableData} refresh={refresh} pieType={pieType} />
            <p className="total"> Total <br /> ₹{total()}/-</p>
            <div className="category">
              <span className={pieType ?  "selected" : ""} onClick={() => setPieType(false)} >
                Type
              </span>
              <span className={!pieType ?  "selected" : ""} onClick={() => setPieType(true)}>
                Bearer
              </span>
            </div>
            <Form refresh={refresh} setRefresh={setRefresh} />
          </div>
          <div
            className="table"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              height: "360px",
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
