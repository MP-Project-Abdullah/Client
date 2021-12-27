import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const NewPackage = () => {
  const projectId = useParams().postId;
  const userId = useParams().userId;

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [describe, setDescribe] = useState("");
  const [arrive, setArrive] = useState("");

  const createNewPackage = async (e) => {
    e.preventDefault();
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/newPackage/${userId}/${projectId}`,
      {
        title: title,
        amount: amount,
        describe: describe,
        arrive: arrive,
      }
    );
    console.log(res.data, "RES");
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
    e.target[3].value = "";
    console.log("HERE");
  };

  return (
    <div>
      <div>
        <h1>Package </h1>
        <form onSubmit={(e) => createNewPackage(e)}>
          <div>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter package title..."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="amount"
              id="amount"
              placeholder="Enter package amount..."
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="describe"
              id="describe"
              placeholder="Enter package describe..."
              onChange={(e) => setDescribe(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="arraive"
              id="arraive"
              placeholder="Enter package time arraive..."
              onChange={(e) => setArrive(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" value="Create" />
            <button onClick={() => navigate("/")}>Done</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPackage;
