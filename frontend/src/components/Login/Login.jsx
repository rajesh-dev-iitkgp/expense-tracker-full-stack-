import "./Login.css"
import { useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import axios from "axios"


const Login = () => {

    const navigate=useNavigate();

    const [currState,setCurrState]=useState("Login");
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    });

    const onChangeHandler = (e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault();

        try {
            const url = currState==="Login" ? "http://localhost:4000/api/user/login" : "http://localhost:4000/api/user/register";
            const response = await axios.post(url,data)
            if(response.data.success){
                localStorage.setItem("token",response.data.token);
                navigate("/",{replace:true})
                setData((prev)=>({...prev,password:""}));
            }

        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
        
    }

  return (
    <div className="login">
      <form className="login-container" onSubmit={onSubmitHandler}>
        <div className="login-title">
            <h2>{currState}</h2>
        </div>
        <div className="login-inputs">
            {currState==="Login"? <></> : <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder="Your Name" required/>}
            <input type="email"  name="email" onChange={onChangeHandler} value={data.email} placeholder="Your Email" required/>
            <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder="Password" required />
        </div>
        <button type="submit">{currState==="Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-condition">
            <input type="checkbox" required/>
            <p>By continuing, I accept the <span>Terms of Use</span> and <span>Privacy Policy</span></p>
        </div>
        {currState==="Login" ? <p>Create a new Account ? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p> : 
                               <p>Already have an Account ? <span onClick={()=>setCurrState("Login")}>Login here</span></p>}
      </form>
    </div>
  )
}

export default Login
