import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
const SuccessPay = () => {
  const projectId = useParams().projectId;
  const donate = useParams().donate;

  const navigate = useNavigate();

  const successPayment = async () => {
    let res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/updateProject/${projectId}/${donate}`
    );
    console.log(res);
  };

  useEffect(() => {
    successPayment();
  }, []);

  const [seconds, setSeconds] = useState(5);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  if (seconds <= 0) {
    setTimeout(() => {
      navigate("/");
    }, 500);
  }

  return (
    <div className="success">
      <div>
        <h1 className="h1SuccessPay">Thnak you for helping our community </h1>
      </div>
      <div>
        <img
          src="https://cdn.dribbble.com/users/147386/screenshots/5315437/success-tick-dribbble.gif"
          alt="success"
          className="imgSuccess"
        />
      </div>
    </div>
  );
};

export default SuccessPay;
