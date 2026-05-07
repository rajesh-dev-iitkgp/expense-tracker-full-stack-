import "./expenditure.css"
import Income from "../../assets/income.svg?react"
import Expenses from "../../assets/expense.svg?react"
import Balance from "../../assets/balance.svg?react"
import { useContext, useState } from "react"
import { TransactionsContext } from "../../context/TransactionsContext"


const Expenditure = ({theme}) => {

  const [selectedMonth, setSelectedMonth] = useState("all");
  const {transactions} = useContext(TransactionsContext);

  let filteredTransactions = transactions;

  if(selectedMonth !== "all"){
    filteredTransactions = transactions.filter(txn=>{
      const date = new Date(txn.date)
      const label = date.toLocaleString("default", {
            month: "long",
            year: "numeric"
          })
      return label === selectedMonth
    })
  }

  let income=0;
  let expense=0;

  filteredTransactions.forEach(txn=>{
    if(txn.type==="income"){
      income+=txn.amount
    }
    else{
      expense+=txn.amount
    }
  })

  let balance = income-expense;

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

  return (
    <div className={theme==="dark" ? "expenditure dark" : "expenditure"}>
      <div className="expenditure-title">
        <h2>Summary</h2>
        <select value={selectedMonth} onChange={(e)=>setSelectedMonth(e.target.value)}>
          <option value="all">All Months</option>
          {months.map((month)=>
            <option key={month} value={month}>
              {month}
            </option>
          )}   
        </select>
      </div>
      <div className="expenditure-desc">Track your Income and Expenses</div>
      <hr />
      <div className="money-information">
        <div className="money-data income">
            <Income className="money-icon income-icon"/>
            <p>Total Income</p>
            <div>+ ₹{income}</div>
        </div>
        <div className="money-data expense">
            <Expenses className="money-icon expense-icon"/>
            <p>Total Expenses</p>
            <div>- ₹{expense}</div>
        </div>
        <div className="money-data balance">
            <Balance className="money-icon balance-icon"/>
            <p>Remaining Balance</p>
            <div> ₹{balance}</div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Expenditure
