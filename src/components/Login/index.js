import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login_reducser } from "../../reducers/login";
import "./style.css";
import Swal from "sweetalert2";

const popupTools = require("popup-tools");

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailOrUsername, setEmailOrUsername] = useState(""); // Email or username
  const [password, setPassword] = useState(""); // Password
  
  // Login
  const logIn = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
      data: emailOrUsername,
      password: password,
    });

    if (res.data === "Wrong email or password") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong email or username or password",
      });
    }
    if (res.data === "not found") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong email or username or password",
      });
    }

    const data = {
      user: res.data.result,
      token: res.data.token,
    };
    dispatch(login_reducser({ data }));
    navigate("/");
  };

  // Google login
  const oAuth = () => {
    popupTools.popup(
      `${process.env.REACT_APP_BASE_URL}/auth/google`,
      "Logging in with Google",
      { width: 500, height: 500 },
      (err, user) => {
        if (err) {
        } else {
          const data = { token: user.token, user: user.result };
          dispatch(login_reducser({ data }));
          navigate("/");
        }
      }
    );
  };

  // Navigate to register
  const reg = () => {
    navigate("/register");
  };

  // Navigate to reset password
  const reset = () => {
    navigate("/reset");
  };

  // Return
  return (
    <div>
      <div className="divLogin">
        <div className="wrapperLogin">
          <h1>Login</h1>
          <div className="btnsLogin">
            <form onSubmit={logIn} className="btnsForm">
              <input
                className="inputLogin"
                type="text"
                name="email"
                placeholder="Email or Username"
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
              />
              <input
                className="inputLogin"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                className="inputLogin"
                id="loginSubmit"
                type="submit"
                value="Login"
              />
            </form>
          </div>
          <button className="google" onClick={oAuth}>
            Google+
          </button>
          <p onClick={reg} style={{ cursor: "pointer" }}>
            Not have an account ?
          </p>{" "}
          <p style={{ cursor: "pointer" }} onClick={reset}>
            Forgot the password ?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
