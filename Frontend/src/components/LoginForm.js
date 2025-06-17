

import React, { useState } from "react";         //import react and hook state from react library
import { Button, FormGroup, InputGroup, Card, Icon } from "@blueprintjs/core";  //import Button, FormGroup, InputGroup, Card from blueprintjs library
import axios from "axios";    //import axios for making http requests

const LoginForm = ({ setShowLogin, onLoginSuccess, setShowRegister }) => {
  //state to manage login form data
  const [form, setForm] = useState({
    email: "",       //email input
    password: "",    //password input
  });

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();      //prevent default form submission behavior / only render the form on the page
    try {
      await axios.post("/api/auth/login", form);   //send POST request to /api/auth/login with form data
      alert("Login successful!");    //alert user on successful login
      
      onLoginSuccess(); // Call the success handler to update authentication state
    } catch (error) {            
      alert("Login failed: " + error.data.error);    //alert user on login failure with error message
    }
  };

  return (
    <Card className="form-card">    {/* Card for styling the login form */}
      <h2>Login</h2>               {/* Form title */}
      <form onSubmit={handleSubmit}>     {/* Form for user input */}
        <FormGroup label="Email">         {/*form group for email input */}
          <InputGroup
            value={form.email}             //insert the input value to form state
            onChange={(e) => setForm({ ...form, email: e.target.value })}  //User email type pannumbodhu adha form state la update pannrathu
            required
          />
        </FormGroup>
        <FormGroup label="Password">
          <InputGroup
            type="password"
            value={form.password}         // Set input type to password for secure input
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </FormGroup>   
        <Button type="submit" intent="primary">Login</Button>
        <button 
          className="close-button" 
          onClick={() => setShowLogin(false)} 
          aria-label="Close"
        >
          <Icon icon="cross" /> {/* Using BlueprintJS Icon component */}
        </button>
        <p>
          You agree to our terms and conditions.{" "}
          <Button onClick={() => { setShowLogin(false); setShowRegister(true); }}>Create new account</Button>
        </p>
      </form>
    </Card>
  );
};

export default LoginForm;     //export the login form component

