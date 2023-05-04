import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = ({ tableData, refresh }: any) => {
  useEffect(() => {
    typeAmounts;
  }, [refresh]);

  const typeAmounts = tableData.reduce((acc: any, cur: any) => {
    if (acc[cur.type]) {
      acc[cur.type] += cur.amount;
    } else {
      acc[cur.type] = cur.amount;
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(typeAmounts),
    datasets: [
      {
        label: "# of Votes",
        data: Object.values(typeAmounts),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut style={{ position: "absolute" }} data={data} />;
};

export default PieChart;
