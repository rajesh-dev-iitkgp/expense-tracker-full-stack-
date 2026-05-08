import "./history.css"
import Search from "../../assets/search.svg?react"
import Edit from "../../assets/edit.svg?react"
import Delete from "../../assets/delete.svg?react"
import { useContext,useState } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import { TransactionsContext } from "../../context/TransactionsContext"
import { categoryIcons } from "../../constants/categoryIcons"
import {useNavigate} from "react-router-dom"
import React from "react"

const History = () => {

  const {theme} = useContext(ThemeContext);
  const {transactions,deleteTransaction} = useContext(TransactionsContext);
  const [search,setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");

  const navigate = useNavigate();

  const sortedTransactions = [...transactions].sort(
   (a, b) => new Date(b.date) - new Date(a.date)
  );

  let MonthlyFilteredTransactions = sortedTransactions;

  if(selectedMonth !== "all"){
    MonthlyFilteredTransactions = transactions.filter(txn=>{
      const date = new Date(txn.date)
      const label = date.toLocaleString("default", {
            month: "long",
            year: "numeric"
          })
      return label === selectedMonth
    })
  }

  const months = []
  transactions.forEach(txn=>{
    const date = new Date(txn.date)
    const monthLabel = date.toLocaleString("default", {
          month: "long",
          year: "numeric"
        })
    if(!months.includes(monthLabel)){
      months.push(monthLabel)
    }
  })

  months.sort((a,b)=>{
    const dateA = new Date(a)
    const dateB = new Date(b)
    return dateB-dateA
  })

  const filteredTransactions = search.trim() === "" ?  MonthlyFilteredTransactions : MonthlyFilteredTransactions.filter(txn=>txn.category.includes(search.toLowerCase()));

  const handleDelete = (id)=>{
    deleteTransaction(id);
  }

  return (
    <div className={theme==="dark" ? "history dark" : "history"}>
      <div className={theme==="dark" ? "history-info dark" : "history-info"}>
        <div className="history-title">
        <h2>History</h2>
        <select value={selectedMonth} onChange={(e)=>setSelectedMonth(e.target.value)}>
            <option value="all">All Months</option>
            {months.map(month=>{
              return(
                <option value={month} key={month}>{month}</option>
              )
            })}
        </select>
      </div>
      <div className="history-desc">Manage your income and expenses</div>
      <hr />
      <div className="history-search">
        <Search className="search-icon"/>
        <input type="text" placeholder="Search by category..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      <hr />
      <div className="history-data">

        {filteredTransactions.map(transaction=>{
          const Icon = categoryIcons[transaction.category]

          return (
              <React.Fragment key={transaction._id}>
              <div className="history-data-item">
                <div className="history-data-item-desc">
                  {Icon && <Icon className={`${transaction.category}-icon`}/>}
                  <div className="history-data-item-details">
                    <div>{transaction.description}</div>
                    <p><span>{transaction.category}</span> {transaction.category}</p>
                  </div>
                </div>
                <div className="history-data-item-amount">
                  <div className="history-data-item-date">
                    {
                      transaction.type === "expense" ? <div style={{color:"red"}}> -₹ {transaction.amount}</div> : <div style={{color:"green"}}> +₹ {transaction.amount}</div>}
                    <p>{transaction.date}</p>
                  </div>
                  <div className="history-buttons">
                    <button className="edit-button" onClick={()=>navigate("/addTransaction",{state:{transaction}})}> <Edit className="edit-icon"/> Edit</button>
                    <button className="delete-button" onClick={()=>handleDelete(transaction._id)}> <Delete className="delete-icon" /> Delete</button>
                  </div>
                </div>
              </div>
              <hr /> 
              </React.Fragment> 
          )
        })}
      </div>
     </div>
    </div>
  )
}

export default History
