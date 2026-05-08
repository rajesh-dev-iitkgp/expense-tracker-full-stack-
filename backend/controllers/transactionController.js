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
    try {
        const updatedTransaction = await transactionModel.findOneAndUpdate({
            userId: req.userId,
            _id: req.params.id
        },
        req.body,
        {
            new: true
        })
        if(!updatedTransaction){
            return res.status(404).json({ message: "Transaction not found" })
        }
        res.status(200).json({ message: "Transaction edited successfully", transaction: updatedTransaction })

    } 
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error in editing transaction" })
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const deletedTransaction = await transactionModel.findOneAndDelete({
        userId: req.userId,
        _id: req.params.id
    })
        if(!deletedTransaction){
            return res.status(404).json({ message: "Transaction not found" })
        }
        res.status(200).json({ message: "Transaction deleted successfully" })
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error in deleting transaction" })
    }
}

const getTransactions = async (req, res) => {

}

export { addTransaction, editTransaction, deleteTransaction, getTransactions }