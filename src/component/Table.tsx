import React, { useEffect, useRef, useState } from "react";
import { deleteExpenseID, editExpense } from "@/service/api";
import { Button, Input, message, Modal, Popconfirm, Select } from "antd";
import Card from "./Card";

const Table = ({ tableData, setTableData, refresh, setRefresh }: any) => {
  const cardProps = {tableData, setTableData, refresh, setRefresh}

  return (
    <>
      <div
        className="cards"
        style={{ width: "100%",height:"300px" ,maxHeight: "300px", overflowY: "scroll" }}
      >
        {tableData?.map((e: any) => {
          return (
            <Card e={e} cardProps={cardProps}/>
          );
        })}
      </div>
    </>
  );
};

export default Table;
