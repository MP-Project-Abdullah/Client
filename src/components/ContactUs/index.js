import React from "react";
import Navbar from "../Navbar";
import "./style.css";
import { useState } from "react";
import { RiMailSendLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  const state = useSelector((state) => {
    return state;
  });

  const navigate = useNavigate();

  const sendQuestion = async () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Question resived",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");

    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/sendQuestion`,
      {
        firstName,
        lastName,
        email,
        question,
      }
    );
  };

  return (
    <div>
      <Navbar />
      <div className="contaienrContact">
        <div className="contactUsH2">
          <h2>Have some question ?</h2>
        </div>
        <div className="line"></div>
        <div className="inputWithIcon">
          <div>
            <RiMailSendLine className="iconSend" />
          </div>
          <div>
            <div className="allInputContact">
              {" "}
              <div>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="inputContact"
                  placeholder="First Name..."
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>{" "}
              <div>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="inputContact"
                  placeholder="Last Name..."
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>{" "}
              <div>
                <input
                  type="email"
                  name="emailUser"
                  id="emailUser"
                  className="inputContact"
                  placeholder="Your Email..."
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="question"
                  id="question"
                  className="inputContact"
                  placeholder="Your Question..."
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
              </div>
              <div>
                <button className="submitContact" onClick={sendQuestion}>
                  Send your question
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
