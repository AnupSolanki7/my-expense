import { Schema, models, model } from "mongoose";

const expenseSchema = new Schema({
    amount:{type:Number,required: true},
    bearer: {type:String,required: true},
    date: {type:Date ,required: true},
    type: {type:String ,required: true}
})

const Expense = models.expense || model('expense', expenseSchema)

export default Expense