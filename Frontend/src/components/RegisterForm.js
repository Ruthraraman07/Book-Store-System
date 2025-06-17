

import React, { useState } from "react";              //import react and hook state from react library
import { Button, FormGroup, InputGroup, Card,Icon } from "@blueprintjs/core"; //import Button, FormGroup, InputGroup, Card from blueprintjs library
import axios from "axios";  //import axios for making http request

const RegisterForm = ({ setShowRegister, setShowLogin }) => {
  const [form, setForm] = useState({                 //state to manage form data 
    name: "",                                        //name input
    email: "",                                       //email input
    password: "",                                    //password input
  });

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();                   //prevent default form submission behavior / only render the form on the page
    try {
      await axios.post("/api/auth/register", form);   //send POST request to the back end for user registration
      alert("Registration successful!");              //alert user if registration is successful
      setShowRegister(false);                         // Close the register form
    } catch (error) {
      alert("Registration failed: " + error.response.data.error);    //alert user if registration fails
    }
  };

  return (
    <Card className="form-card">            {/* card for styling the registration form */}
      <h2>Register</h2>                     {/* form title */}
      <form onSubmit={handleSubmit}>        {/* form for user registration */}
        <FormGroup label="Name">             {/* form group for name input */}
          <InputGroup
            value={form.name}                    //insert the input value to form state
            onChange={(e) => setForm({ ...form, name: e.target.value })} //User name type pannumbodhu 
                                                                      // adha form state la update pannrathu
            required
          />
        </FormGroup>
        <FormGroup label="Email">
          <InputGroup
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </FormGroup>
        <FormGroup label="Password">                                                            
          <InputGroup
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </FormGroup>
        <Button type="submit" intent="primary">Register</Button>
        <button 
          className="close-button" 
          onClick={() => setShowRegister(false)} 
          aria-label="Close"
        >
          <Icon icon="cross" /> {/* Using BlueprintJS Icon component */}
        </button>
        <p>
          Already have an account?{" "}
          <Button onClick={() => { setShowRegister(false); setShowLogin(true); }}>Login</Button>
        </p>
      </form>
    </Card>
  );
};

export default RegisterForm;              //export the RegisterForm component
