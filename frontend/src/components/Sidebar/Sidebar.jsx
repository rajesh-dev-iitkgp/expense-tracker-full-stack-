import "./sidebar.css"
import summary from "../../assets/summary.png"
import AddTransactionIcon from "../../assets/add_transaction.svg?react"
import History from "../../assets/history.svg?react"
import DarkMode from "../../assets/dark_mode.svg?react"
import lightMode from "../../assets/light_mode.png"
import { useContext } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import {  NavLink, useNavigate } from "react-router-dom"

const Sidebar = () => {

  const {theme,ToggleTheme} = useContext(ThemeContext);
  const navigate = useNavigate();

  const logoutHandler = ()=>{
    localStorage.removeItem("token");
    navigate("/login",{replace:true})
  }

  return (
    <div className={theme==="dark" ? "sidebar dark" : "sidebar"}>
        <NavLink to="/"><p className="sidebar-title">Expense Tracker</p></NavLink>
      <div className="sidebar-top">
        <NavLink 
            to="/" 
            className={({ isActive }) =>isActive ? "sidebar-page active" : "sidebar-page" } >
            <img src={summary} alt="" />
            <p>Summary</p>
        </NavLink>
        <NavLink 
            to="/addTransaction" className={({ isActive }) =>isActive ? "sidebar-page active" : "sidebar-page" } >
            <AddTransactionIcon className="sidebar-icon" />
            <p>Add Transaction</p>
        </NavLink>
        <NavLink 
            to="/history" className={({ isActive }) =>isActive ? "sidebar-page active" : "sidebar-page" } >
            <History className="sidebar-icon" />
            <p>History</p>
        </NavLink>
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-bottom-theme">
          <p className = {theme==="dark" ? "sidebar-theme-light" : "sidebar-theme-dark"}>Change theme</p>
          {theme==="dark" ? <img src={lightMode} alt="" onClick={ToggleTheme}/> : <DarkMode className="sidebar-icon " onClick={ToggleTheme}/>}
        </div>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  )
}

export default Sidebar
