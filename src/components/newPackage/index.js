import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import "./style.css";
const NewPackage = () => {
  const projectId = useParams().postId; // project id
  const userId = useParams().userId; // User id

  const navigate = useNavigate();

  const [title, setTitle] = useState(""); // Title of the package
  const [amount, setAmount] = useState(0); // amount  of the package
  const [describe, setDescribe] = useState(""); // describe  of the package
  const [arrive, setArrive] = useState(""); // arrive  of the package

  // Create new package
  const createNewPackage = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/newPackage/${userId}/${projectId}`,
      {
        title: title,
        amount: amount,
        describe: describe,
        arrive: arrive,
      }
    );
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
    e.target[3].value = "";
  };

  // Return
  return (
    <div>
      <Navbar />
      <div className="containerNewPackage">
        <div className="newPackageH1">
          {" "}
          <h1>New Package </h1>
        </div>
        <div className="lineAll"></div>
        <form onSubmit={(e) => createNewPackage(e)} className="formNewPackge">
          <div className="newPackageInputs">
            <div className="h2AndPNewPAckage">
              <h2>Package title</h2>
              <p>
                Write a clear, brief title to help people quickly understand
                your package.{" "}
              </p>
            </div>
            <div className="divInputNewPackage">
              <p>Title</p>
              <input
                type="text"
                name="title"
                id="title"
                className="inputNewPackge"
                placeholder="Enter package title..."
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="lineAll"></div>
          <div className="newPackageInputs">
            <div className="h2AndPNewPAckage">
              <h2>Package amount</h2>
              <p>How much the user can donate to get this package </p>
            </div>
            <div className="divInputNewPackage">
              <p>Amount</p>
              <input
                type="text"
                name="amount"
                id="amount"
                className="inputNewPackge"
                placeholder="Enter package amount..."
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>{" "}
          <div className="lineAll"></div>
          <div className="newPackageInputs">
            <div className="h2AndPNewPAckage">
              <h2>Package describe</h2>
              <p>
                {" "}
                Brief describe of your package, describe will appear on your
                package and pre-launch pages.{" "}
              </p>
            </div>
            <div className="divInputNewPackage">
              <p>Describe</p>
              <input
                type="text"
                name="describe"
                id="describe"
                className="inputNewPackge"
                placeholder="Enter package describe..."
                onChange={(e) => setDescribe(e.target.value)}
              />
            </div>
          </div>{" "}
          <div className="lineAll"></div>
          <div className="newPackageInputs">
            <div className="h2AndPNewPAckage">
              <h2>Package time arrive</h2>
              <p>When the user can get this package </p>
            </div>
            <div className="divInputNewPackage">
              <p>Arrive</p>
              <input
                type="text"
                name="arraive"
                id="arraive"
                className="inputNewPackge"
                placeholder="Enter package time arraive..."
                onChange={(e) => setArrive(e.target.value)}
              />
            </div>
          </div>{" "}
          <div className="lineAll"></div>
          <div className="butnNewPackage">
            <div className="divSubmitNewPackge">
              <input
                type="submit"
                value="Create new package"
                className="btnNewPackge"
              />
              <p className="pCreateNewP"></p>
            </div>
            <div className="dibDoneNewPackge">
              <button onClick={() => navigate("/")} className="btnNewPackge">
                Done
              </button>
              <div className="divPNewPackge">
                <p className="pCreateNewP">
                  {" "}
                  " If you done creating packges please enter done. "
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPackage;
