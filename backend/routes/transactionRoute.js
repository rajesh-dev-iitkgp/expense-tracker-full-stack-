import express from "express";
import { addTransaction, getTransactions, editTransaction, deleteTransaction } from "../controllers/transactionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const transactionRouter = express.Router();

transactionRouter.post("/",authMiddleware,addTransaction)
transactionRouter.get("/",authMiddleware,getTransactions)
transactionRouter.put("/:id",authMiddleware,editTransaction)
transactionRouter.delete("/:id",authMiddleware,deleteTransaction)

export default transactionRouter