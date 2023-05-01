import { NextApiRequest, NextApiResponse } from "next";
import {
  deleteExpense,
  getExpense,
  postExpense,
  putExpense,
} from "../../../database/controller";
import connectDb from "../../../database/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectDb();
  const { method } = req;
  switch (method) {
    case "POST":
      postExpense(req, res);
      break;
    case "GET":
      getExpense(req, res);
      break;
    case "PUT":
      putExpense(req, res);
      break;
    case "DELETE":
      deleteExpense(req, res);
      break;
  }
}
