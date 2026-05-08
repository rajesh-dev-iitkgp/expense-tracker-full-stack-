import "./recentTransactions.css"
import {NavLink} from "react-router-dom"
import { useContext } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import { TransactionsContext } from "../../context/TransactionsContext"
import { categoryIcons } from "../../constants/categoryIcons"

const RecentTransactions = () => {

  const {theme} = useContext(ThemeContext);
  const {transactions} = useContext(TransactionsContext);

  const sortedTransactions = [...transactions].sort(
   (a, b) => new Date(b.date) - new Date(a.date)
  );

  const latestTransactions = sortedTransactions.slice(0,3);

  return (
    <div className={theme==="dark" ? "recent-transactions dark" : "recent-transactions"}>
      <div className="recent-transactions-title">Recent Transactions</div>
      <div className="recent-transactions-data">
        {latestTransactions.map(txn=>{
          const Icon = categoryIcons[txn.category];
          return (
                <>
                <div className="recent-transactions-data-item" key={txn._id}>
                  <div>
                    <Icon className={`${txn.category}-icon`}/>
                    <p>{txn.description}</p>
                  </div>
                  {
                    txn.type === "expense" ? <p style={{color:"red"}}> -₹ {txn.amount}</p> : <p style={{color:"green"}}> +₹ {txn.amount}</p>}
                </div>
                <hr />
                </>
          )
        })}

      </div>
      <NavLink to="/history" className="view-all">View All</NavLink>
    </div>
  )
}

export default RecentTransactions
