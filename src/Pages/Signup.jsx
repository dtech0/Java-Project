// Signup.js
import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signup = async () => {
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      const responseData = await response.json();
      if (!responseData.Success) {
        alert(responseData.errors);
      } else {
        alert("Sign Up Successful");
        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input
            name="username"
            value={formData.username}
            onChange={changeHandler}
            type="text"
            placeholder="Your Name"
          />
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        <button onClick={signup}>Sign Up</button>
        <div className="loginsignup-options">
          <p onClick={() => window.location.replace("/login")}>
            Already have an account? Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
