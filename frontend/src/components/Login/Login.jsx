import "./Login.css"
import { useState } from "react"

const Login = () => {

    const [currState,setCurrState]=useState("Login");

  return (
    <div className="login">
      <form className="logincontainer">
        <div className="login-title">
            <h2>{currState}</h2>
        </div>
        <div className="login-inputs">
            {currState==="Login"? <></> : <input type="text" name="name" placeholder="Your Name" required/>}
            <input type="email"  name="email" placeholder="Your Email" required/>
            <input type="password" name="password" placeholder="Password" required />
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
