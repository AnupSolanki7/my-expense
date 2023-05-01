import Expense from "../model/expense";

export async function getExpense(req: any, res: any) {
  try {
    const expense = await Expense.find({});
    if (!expense) {
      return res.status(404).json({ error: "expense not found" });
    } else {
      res.status(200).json({ expense });
    }
  } catch (err: any) {
    res.status(404).json({ error: "Error while fetching data " });
  }
}

export async function postExpense(req: any, res: any) {
  try {
    const formData = req.body;
    if (!formData) {
      return res.status(404).json({ error: "body not found" });
    } else {
      Expense.create(formData).then((response: any) => {
        res.status(200).json(response);
      });
    }
  } catch (err: any) {
    res.status(404).json({ error: "Error while fetching data " });
  }
}

export async function putExpense(req: any, res: any) {
  try {
    const formData = req.body;
    const id = req.body.id;
    if (!formData && !id) {
      return res.status(404).json({ error: "body not found" });
    } else {
      Expense.findByIdAndUpdate(id, formData).then((response: any) => {
        res.status(200).json(response);
      });
    }
  } catch (err: any) {
    res.status(404).json({ error: "Error while fetching data " });
  }
}

export async function deleteExpense(req: any, res: any) {
  try {
    const id = req.query;
    console.log(id);

    if (!id) {
      return res.status(404).json({ error: "body not found" });
    } else {
      Expense.findByIdAndDelete(id).then((response: any) => {
        res.status(200).json(response);
      });
    }
  } catch (err: any) {
    res.status(404).json({ error: "Error while fetching data " });
  }
}
