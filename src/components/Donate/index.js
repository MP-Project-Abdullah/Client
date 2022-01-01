import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import Navbar from "../Navbar";
const Donate = () => {
  const projectId = useParams().projectId; // Project id
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]); // All packages of the project

  // Get all packages
  const getData = async () => {
    console.log(`${process.env.REACT_APP_BASE_URL}/packages/${projectId}`);
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/packages/${projectId}`
    );
    console.log(res.data, "P");
    setPackages(res.data);
  };

  // Navigate to payment page with no packages
  const payment = (e) => {
    e.preventDefault();
    navigate(`/payment/${projectId}/${e.target[0].value}/0`);
  };

  // Navigate to payment page with one package
  const paymentPackage = (val, packageId) => {
    navigate(`/payment/${projectId}/${val}/${packageId}`);
  };

  // Invoke get all packges
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  // Return
  return (
    <div>
      <Navbar />
      {packages.length > 0 ? (
        <div className="wrapperPackges">
          <div className="divSelectPackage">
            <h2 className="packagesDomnationsH2">Select your reward</h2>
            <p>Select an option below</p>
          </div>
          <div className="line"> </div>
          <div className="containerPackages">
            {" "}
            {packages.map((item) => {
              return (
                <div
                  className="divPackages"
                  key={item._id}
                  id={
                    item.amount >= 100
                      ? item.amount >= 300
                        ? item.amount >= 500
                          ? "up500"
                          : "up300less500"
                        : "up100less300"
                      : "less100"
                  }
                >
                  <h2 className="packageTitle">{item.title}</h2>
                  <p className="packageDescribe">{item.describe}</p>
                  <p className="packageAmount">Amount : {item.amount}</p>
                  <p className="packageArrive">Arrive :{item.arrive}</p>
                  <div className="divBtnDonate">
                    <button
                      className="packageButtonDonate"
                      onClick={() => paymentPackage(item.amount, item._id)}
                    >
                      Donate
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}

      <div>
        <div>
          <div className="divH2AndPDonations">
            <h2 className="packagesDomnationsH2">Donations</h2>
            <p>Pledge without a reward</p>
          </div>
        </div>
        <form className="formDonate" onSubmit={payment}>
          <input
            type="number"
            name="donate"
            id="donate"
            placeholder="Enter your donations here..."
          />
          <input type="submit" value="Donate" id="submitDonate" />
        </form>
      </div>
    </div>
  );
};

export default Donate;
