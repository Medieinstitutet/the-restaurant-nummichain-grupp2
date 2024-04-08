import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import "../styles/login.scss";

export default function Login() {
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    
    const fd = new FormData(event.target);
    const { email, password } = Object.fromEntries(fd.entries());

   
    const hardcodedEmail = "example@example.com";
    const hardcodedPassword = "password";

    
    if (email === hardcodedEmail && password === hardcodedPassword) {
      console.log("Login successful");
      setError(""); 
      setIsLoggedIn(true);
      setError("Invalid email or password. Please try again.");
    }

    event.target.reset();
  };

 
  if (isLoggedIn) {
    navigate("/admin");
  }

  return (
    <form className="adminform" onSubmit={submitHandler}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <Input label="email" id="email" type="email" name="email" required />
        </div>

        <div className="control no-margin">
          <Input
            label="password"
            id="password"
            type="password"
            name="password"
            required
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
