import axios from "axios";

const URL = "https://my-expense.vercel.app"
// const URL = "http://localhost:3000";

export async function getExpense() {
  return axios.get(`${URL}/api/expense`).then((res: any) => {
    return res;
  });
}

export async function deleteExpenseID(id: any) {
  return axios.delete(`${URL}/api/expense/?_id=${id}`).then((res: any) => {
    return res;
  });
}


export async function addExpense(formData: any) {
  return axios.post(`${URL}/api/expense`, formData).then((res: any) => {
    return res;
  });
}

export async function editExpense(id:any,formData: any) {
  return axios.put(`${URL}/api/expense/?_id=${id}`, formData).then((res: any) => {
    return res;
  });
}
