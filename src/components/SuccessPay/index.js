import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import "./style.css";
const SuccessPay = () => {
  const projectId = useParams().projectId; // Project id
  const donate = useParams().donate; // Donate
  const packageId = useParams().packageId; // package id

  const [seconds, setSeconds] = useState(2); // 5 second to navigate to home page

  const navigate = useNavigate();

  const state = useSelector((state) => {
    return state;
  });

  // Update pleged of the project
  const successPayment = async () => {
    // eslint-disable-next-line
    let res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/updateProject/${projectId}/${donate}`
    );
  };

  // Add the package to the user
  const addPackage = async () => {
    // eslint-disable-next-line
    if (packageId == 0) {
      // eslint-disable-next-line
      let res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/newUserPackage/${state.signin_reducer.user._id}/${donate}/${projectId}`
      );
    } else {
      // eslint-disable-next-line
      let res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/newUserPackages/${packageId}/${state.signin_reducer.user._id}/${donate}/${projectId}`
      );
    }
  };
  // eslint-disable-next-line

  // Navigate to home after 5 second
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Navigate to home after 5 second
  if (seconds <= 0) {
    setTimeout(() => {
      navigate("/");
    }, 500);
  }

  // Invoke add the package to the user
  useEffect(() => {
    addPackage();
    // eslint-disable-next-line
  }, []);

  // Invoke update pleged of the project
  useEffect(() => {
    successPayment();
    // eslint-disable-next-line
  }, []);

  // Return
  return (
    <div className="success">
      <Navbar />
      <div>
        <h1 className="h1SuccessPay">Thank you for helping our community </h1>
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
