/*
import React, { useState } from "react";
import { ShopContext } from '../Context/ShopContext';
import "./CSS/LoginSignup.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const responseData = await response.json();
      if (!responseData.Success) {
        alert(responseData.errors);
      } else {
        alert("Login Successful");
        localStorage.setItem("auth-token", responseData.token);
        localStorage.setItem("cartId", responseData.cartId);

        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
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
        <button onClick={login}>Login</button>
        <div className="loginsignup-options">
          <p onClick={() => window.location.replace("/signup")}>Create a new account?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
*/



/*
import React, { useState, useContext } from "react";
import { ShopContext } from '../Context/ShopContext';
import "./CSS/LoginSignup.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Access login method from ShopContext
  const { login,fetchCartProducts } = useContext(ShopContext);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const responseData = await response.json();

      if (!responseData.Success) {
        alert(responseData.errors || 'Login Failed');
      } else {
        alert("Login Successful");
        // Store token and cartId in localStorage
        localStorage.setItem("auth-token", responseData.token);
        localStorage.setItem("cartId", responseData.cartId);

        // Call login from context with the received token
       // login(responseData.token);
         // Call login from context with the received token and cartId
         await login(responseData.token, responseData.cartId);

         // Fetch cart products immediately after successful login
         await fetchCartProducts(responseData.cartId);

        setTimeout(() => {
          window.location.replace("/"); // Redirect after login
        }, 500);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <input
            id="email" // Added id
            name="email" // Added name
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            id="password" // Added id
            name="password" // Added name
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        <div className="loginsignup-options">
          <p onClick={() => window.location.replace("/signup")}>Create a new account?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

*/

/*

import React, { useState, useContext } from "react";
import { ShopContext } from '../Context/ShopContext';
import "./CSS/LoginSignup.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, fetchCartProducts } = useContext(ShopContext);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const responseData = await response.json();

      if (!responseData.Success) {
        alert(responseData.errors || 'Login Failed');
      } else {
        alert("Login Successful");
        // Store token, cartId, and userId in localStorage
        localStorage.setItem("auth-token", responseData.token);
        localStorage.setItem("cartId", responseData.cartId);
        localStorage.setItem("userId", responseData.userId);

        // Call login from context with the received token, cartId, and userId
        await login(responseData.token, responseData.cartId, responseData.userId);

        // Fetch cart products immediately after successful login
        await fetchCartProducts(responseData.cartId);

        setTimeout(() => {
          window.location.replace("/"); // Redirect after login
        }, 500);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            id="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        <div className="loginsignup-options">
          <p onClick={() => window.location.replace("/signup")}>Create a new account?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
*/


import React, { useState, useContext } from "react";
import { ShopContext } from '../Context/ShopContext';
import "./CSS/LoginSignup.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, fetchCartProducts } = useContext(ShopContext);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const responseData = await response.json();

      if (!responseData.Success) {
        alert(responseData.error || 'Login Failed');
      } else {
        alert("Login Successful");
        localStorage.setItem("auth-token", responseData.token);
        localStorage.setItem("cartId", responseData.cartId);
        localStorage.setItem("userId", responseData.userId);
        //localStorage.setItem('user-name', response.data.username); // Save the username
        await login(responseData.token, responseData.cartId, responseData.userId);
        await fetchCartProducts(responseData.cartId);

        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            id="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        <div className="loginsignup-options">
          <p onClick={() => window.location.replace("/signup")}>Create a new account?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;


