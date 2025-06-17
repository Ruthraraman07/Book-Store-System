import React, { useState } from "react";              //import react and hook state from react library
import { Button} from "@blueprintjs/core";            //import Button from blueprintjs library
import RegisterForm from "./RegisterForm";            //import Registerform from Registerform.js file
import LoginForm from "./LoginForm";                  //import loginform from login.js file
import "./HomePage.css";                              //import CSS for styling
      //


const HomePage = ({ onLoginSuccess }) => {
  const [showRegister, setShowRegister] = useState(false);    //state to manage showing register form
  const [showLogin, setShowLogin] = useState(false);          //state to manage showing login form

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };
  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

return (
    <div className="home-page">
      <div className="navbar1">
        {/* <h1>Book Library</h1> */}
        <div className="auth-buttons">
          <Button onClick={handleRegisterClick}>Register</Button>
          <Button onClick={handleLoginClick}>Login</Button>
        </div>
      </div>
      <div className="form-container">
        {showRegister && <RegisterForm setShowRegister={setShowRegister} setShowLogin={setShowLogin} />}
        {showLogin && <LoginForm setShowLogin={setShowLogin} onLoginSuccess={onLoginSuccess} setShowRegister={setShowRegister} />}
      </div>
    </div>
  );
};
export default HomePage;             //export the HomePage component
