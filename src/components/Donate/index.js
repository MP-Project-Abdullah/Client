import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";

import Navbar from "../Navbar";
const Donate = () => {
  const projectId = useParams().projectId; // Project id
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return state;
  });

  const [packages, setPackages] = useState([]); // All packages of the project

  // Get all packages
  const getData = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/packages/${projectId}`
    );
    setPackages(res.data);
  };

  // Navigate to payment page with no packages
  const payment = (e) => {
    e.preventDefault();
    navigate(`/payment/${projectId}/${e.target[0].value}/0`);
  };

  // Navigate to payment page with one package
  const paymentPackage = (val, packageId) => {
    navigate(`/payment/${projectId}/${val}/${packageId}`, {});
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
      <div>
        <div>
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
                      <div className="divAllPackage">
                        <div className="pledgedAndTitleAndP">
                          <div>
                            <p className="packageAmount">
                              • Pledged {item.amount} $
                            </p>
                          </div>
                          <div>
                            <h2 className="packageTitle">• {item.title}</h2>
                          </div>
                          <div className="dectibePackge">
                            <p className="packageDescribe">
                              {" "}
                              • {item.describe}
                            </p>
                          </div>
                          <div className="divAddOns">
                            <p className="addOns">Add-ons</p>{" "}
                          </div>
                        </div>
                        <div>
                          <p className="packageArrive"> • Arrive in </p>
                          <p>{item.arrive}</p>
                        </div>
                      </div>
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
      </div>
    </div>
  );
};

export default Donate;
