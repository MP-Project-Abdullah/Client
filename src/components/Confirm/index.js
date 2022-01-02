import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import "./style.css";
const Confirm = () => {
  const id = useParams().id;
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const getData = async () => {
    let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${id}`);
    setCode(res.data[0].activateCode);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please confirm your email",
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const confirm = async (e) => {
    e.preventDefault();
    if (e.target[0].value === code) {
      let result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/activate/${id}`
      );
      navigate("/login");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid code",
      });
      console.log("Not confirmed");
    }
  };
  return (
    <div className="divConfirm">
      <h1>Enter the code</h1>
      <form onSubmit={(e) => confirm(e)} className="formConfirm">
        <input placeholder="Enter the code" className="inputCode" />
        <input type="submit" value="Submit" className="submitConfirm" />
      </form>
    </div>
  );
};

export default Confirm;
