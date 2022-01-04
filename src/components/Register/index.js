import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import validator from "validator";
import "./style.css";
import Navbar from "../Navbar";
const Register = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState(""); // User name
  const [name, setName] = useState(""); // name
  const [users, setUsers] = useState([]); // all user
  const [email, setEmail] = useState(""); // email
  const [password, setPassword] = useState(""); // password
  const [errorMessage, setErrorMessage] = useState(""); // Message validate password

  // Get all user
  const getData = async () => {
    const items = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
    setUsers(items.data);
  };

  // Complex password
  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Is Strong Password");
    } else {
      setErrorMessage("Is Not Strong Password");
    }
  };

  // Register
  const register = async () => {
    console.log("HERE ");

    let check = false;
    // eslint-disable-next-line
    users.map((item) => {
      // eslint-disable-next-line
      if (item.email == email || item.username == userName) {
        check = true;
      }
    });

    if (check) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid email or username",
      });
    } else {
      // eslint-disable-next-line
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/register`,
        {
          email,
          username: userName,
          password,
          name,
        }
      );
      if (res) {
        navigate(`/confirm/${res.data._id}`);
      }
    }
  };

  // Invoke get all user
  useEffect(() => {
    getData();
  }, []);

  // Navigate to login page
  const login = () => {
    navigate("/");
  };

  // Wrong password
  const invalPass = () => {
    Swal.fire({
      title: "Invalid email or password",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  // Return
  return (
    <div>
      <Navbar />
      <div className="divLogin">
        <div className="wrapperLogin">
          <h1> Register </h1>

          <div className="btnsForm">
            <input
              className="inputLogin"
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              className="inputLogin"
              type="text"
              name="name"
              placeholder="Your name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              className="inputLogin"
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="inputLogin"
              type="password"
              name="password"
              id="passIput"
              placeholder="Password"
              onChange={(e) => {
                validate(e.target.value);
                setPassword(e.target.value);
              }}
            />{" "}
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {errorMessage}
            </span>
            <input
              className="inputLogin"
              id="loginSubmit"
              type="submit"
              value="Register"
              onClick={
                errorMessage === "Is Strong Password" ? register : invalPass
              }
            />
          </div>
          <p onClick={login} style={{ cursor: "pointer" }}>
            Already have an account ?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
