import express from "express";
import { addTransaction, getTransactions, editTransaction, deleteTransaction } from "../controllers/transactionController.js";

const transactionRouter = express.Router();

transactionRouter.post("/",addTransaction)
transactionRouter.get("/",getTransactions)
transactionRouter.put("/:id",editTransaction)
transactionRouter.delete("/:id",deleteTransaction)

export default transactionRouter