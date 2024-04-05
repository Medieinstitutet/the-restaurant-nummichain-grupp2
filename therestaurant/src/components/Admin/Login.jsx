
import { useState } from "react";
export default function Login() {
    
    const[enteredEmail, setEnteredEmail]=useState('');
//  const [enteredPassword, setEnteredPassword]= useState('');

const submitHandeler=(event)=>{
    event.preventDefault();
  console.log('user Email:'+ enteredEmail) ;
}
 const emailChangeHandeler=(event)=>{
    setEnteredEmail(event.target.value);
   
 }


    
    return (
      <form className="adminform" onSubmit={submitHandeler}>
        <h2>Login</h2>
  
        <div className="control-row">
          <div className="control no-margin">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" onChange={emailChangeHandeler} value={enteredEmail}/>
          </div>
  
          <div className="control no-margin">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" />
          </div>
        </div>
  
        <p className="form-actions">
          <button className="button button-flat">Reset</button>
          <button className="button">Login</button>
        </p>
      </form>
    );
  }
  