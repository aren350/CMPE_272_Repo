import React, {useState} from 'react';
import "./entry.style.css";
import { Login } from '../../components/login/Login.comp';
import { ResetPassword } from '../../components/password-reset/PasswordReset';


export const Entry = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [frmLoad, setFrmLoad] = useState("login");

    const handleOnchange = e => {
        const {name, value} = e.target
        switch(name){
          case"email":
            setEmail(value)
            break;

          case "password":
            setPassword(value)
            break;

          default:
            break;  
        }
        console.log(email,value)
    }

    const handleOnsubmit = e => {
    e.preventDefault()

    if (!email || !password){
      return alert("Please fill out the required forms");
    }
    // CALL API HERE
    }
    const handleOnresetsubmit = e => {
      e.preventDefault()
  
      if (!email){
        return alert("Please fill out the required forms");
      }
      // CALL API HERE
      }

    const formSwitcher = frmType =>{
      setFrmLoad(frmType);
    }

  return (
    <div class = "col-md-6" className='entry-page bg-info'>
        <div class = "h-100 p-5 bg-light border rounded-3">
          {frmLoad === "login" && 
            <Login 
            handleOnchange = {handleOnchange} 
            handleOnsubmit={handleOnsubmit}
            formSwitcher = {formSwitcher}
            email = {email}
            pass = {password}
            
            />}

            {frmLoad === "reset" &&
            <ResetPassword 
            handleOnchange = {handleOnchange} 
            handleOnresetsubmit={handleOnresetsubmit}
            formSwitcher = {formSwitcher}
            email = {email}
            />}
        </div>
        
        </div>
  )
}
