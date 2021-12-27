import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Payment from "./../Payment"
// import PaymentTest from "../PaymentTest.svelte"
// import PaymentTest
// import PaymentTest from "../paymentTest"
// import "../"
const Donate = () => {
  const projectId = useParams().projectId;
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [amount, setAmount] = useState(0);

  const getData = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/packages/${projectId}`
    );
    setPackages(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const payment = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    navigate(`/payment/${projectId}/${e.target[0].value}`);
  };

  const paymentPackage = (val) => {
    navigate(`/payment/${projectId}/${val}`);
  };

  return (
    <div>
      <h2 className="packagesDomnationsH2">Packages</h2>
      <div className="containerPackages">
        {packages &&
          packages.map((item) => {
            return (
              <div className="divPackages">
                <h2 className="packageTitle">{item.title}</h2>
                <p className="packageDescribe">{item.describe}</p>
                <p className="packageAmount">Amount : {item.amount}</p>
                <p className="packageArrive">Arrive :{item.arrive}</p>
                <div className="divBtnDonate">
                  <button
                    className="packageButtonDonate"
                    onClick={() => paymentPackage(item.amount)}
                  >
                    Donate
                  </button>
                  {/* <Payment/> */}
                </div>
              </div>
            );
          })}
      </div>
      <div>
        <div>
          <h2 className="packagesDomnationsH2">Donations</h2>
        </div>
        <form className="formDonate" onSubmit={payment}>
          <input
            type="number"
            name="donate"
            id="donate"
            placeholder="Enter your donations here..."
          />
          <input
            type="submit"
            value="Donate"
            id="submitDonate"
            // onChange={(e) => setAmount(e.target.value)}
          />
        </form>
      </div>
      {/* <PaymentTest amount={1999} name={"test"} sku={"prod_Kqwnfq6kgu22J5"} /> */}
    </div>
  );
};

export default Donate;
