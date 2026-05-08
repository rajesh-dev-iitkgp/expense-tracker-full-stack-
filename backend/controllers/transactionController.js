import transactionModel from "../models/transactionModel.js"

const addTransaction = async (req, res) => {
    try {

        const newTransaction = new transactionModel({
            userId: req.userId,
            amount: req.body.amount,
            type: req.body.type,
            category: req.body.category,
            date: req.body.date,
            description: req.body.description
        })

        await newTransaction.save()
        res.status(201).json({ message: "Transaction added successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error in adding transaction" })
    }
}

const editTransaction = async (req, res) => {

}

const deleteTransaction = async (req, res) => {

}

const getTransactions = async (req, res) => {

}

module.exports = { addTransaction, editTransaction, deleteTransaction, getTransactions }