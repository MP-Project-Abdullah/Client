import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./style.css"
const Account = () => {
  const state = useSelector((state) => {
    return state;
  });

  const [token, settoken] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      {state.signin_reducer.token ? (
        <div> gjkrejkghewbgiluwrb </div>
      ) : (
        <div className="notLogin">
          You must login
          <button className="btnNotLogin" onClick={() => navigate("/login")}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Account;
