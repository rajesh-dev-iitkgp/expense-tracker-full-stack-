import {Navigate,Outlet} from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const ProtectedLayout = () => {

    const token = localStorage.getItem("token");

    if(!token) {
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
