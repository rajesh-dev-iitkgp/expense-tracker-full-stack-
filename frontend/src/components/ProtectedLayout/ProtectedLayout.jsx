import {Navigate,Outlet} from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const ProtectedLayout = () => {

    const isLoggedIn= localStorage.getItem("isLoggedIn");

    if(!isLoggedIn) {
        return <Navigate to="/login" />
    }

  return (
    <div>
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default ProtectedLayout
