/* eslint-disable react-hooks/set-state-in-effect */
import "./addTransaction.css"
import { useContext, useState, useEffect } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import { TransactionsContext } from "../../context/TransactionsContext"
import { useLocation, useNavigate } from "react-router-dom"

const AddTransaction = () => {
  const {theme} = useContext(ThemeContext);
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const location = useLocation();
  const {addTransaction,editTransaction} = useContext(TransactionsContext);
  const navigate = useNavigate();

  const editingTransaction = location.state?.transaction;
  const isEditMode = Boolean(editingTransaction);

  useEffect(() => {
  if (editingTransaction) {
    setAmount(editingTransaction.amount);
    setCategory(editingTransaction.category);
    setType(editingTransaction.type);
    setDescription(editingTransaction.description);
    setDate(editingTransaction.date);
  }
}, [editingTransaction]);

  const saveTransaction = (e) => {
    e.preventDefault();

    if (!amount || !type || !category || !date || !description) {
      alert("Please fill all fields")
      return
    }

    if(isEditMode){
      editTransaction({
        _id: editingTransaction._id,
        amount: Number(amount),
        type: type,
        category: category,
        date: date,
        description : description
      })
      alert("Transaction edited successfully")
    }

    else {
      addTransaction({
      amount: Number(amount),
      type: type,
      category: category,
      date: date,
      description : description
    }) 
    
    alert("Transaction added successfully")
   }

    //reset form

    setAmount("")
    setType("")
    setCategory("")
    setDescription("")
    setDate("")
    navigate("/addTransaction", { replace: true,state:null });
  }

  return (
    <div className={theme==="dark" ? "add-transaction dark" : "add-transaction"}>
        <div className={theme==="dark" ? "add-transaction-info dark" : "add-transaction-info"}>
          <div className="add-transaction-title">
            <h2>{isEditMode ? "Edit Transaction" : "Add Transaction"}</h2>
            <p>Track your income and expenses</p>
        </div>
        <hr />
          <form onSubmit={saveTransaction}>
            <div className="add-transaction-amount">
              <label>₹Amount: </label>
              <input type="number" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
            </div>
            <hr />
            <div className="add-transaction-type">
              <label>Type:</label>
              <label><input type="radio" name="type" value="expense" checked={type === "expense"}
                            onChange={(e) => setType(e.target.value)}/> Expense</label>
              <label><input type="radio" name="type" value="income" checked={type === "income"}
                            onChange={(e) => setType(e.target.value)}/> Income</label>
            </div>
            <hr />
            <div className="add-transaction-category">
              <label>Category: </label>
              <select value={category}
                      onChange={(e)=>setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="books">Books</option>
              <option value="shopping">Shopping</option>
              <option value="income">Income</option>
            </select>
            </div>
            <hr />
            <div className="add-transaction-desc">
              <label>Description: </label>
              <input type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <hr />
            <div className="add-transaction-date">
              <label>Date: </label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
            <button className="add-transaction-button">{isEditMode ? "Update Transaction" : "Add Transaction"}</button>
          </form>
          <p className="add-transaction-feature">You can edit or delete this later</p>
        </div>
    </div>
  )
}

export default AddTransaction
