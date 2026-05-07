import Expenditure from "../../components/Expenditure/Expenditure"
import RecentTransactions from "../../components/RecentTransactions/RecentTransactions"
import "./summary.css"
import {useContext} from "react"
import {ThemeContext} from "../../context/ThemeContext"

const Summary = () => {

  const {theme} = useContext(ThemeContext);

  return (
    <div className={theme==="dark" ? "summary dark" : "summary"}>
        <div className={theme==="dark" ? "summary-info dark" : "summary-info"}>
            <Expenditure theme={theme}/>
            <RecentTransactions />
        </div> 
    </div>
  )
}

export default Summary
