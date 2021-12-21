import React from "react";
import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Home = () => {
  const [latestWork, setLatestWork] = useState([]);

  const getLetestWork = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/projects`);
    let newArr = [];
    for (let i = 0; i < 4; i++) {
      newArr.push(res.data[i]);
    }
    setLatestWork(newArr);
  };

  useEffect(() => {
    getLetestWork();
  }, []);

  return (
    <div>
      <div className="totalDonateProject">
        <div className="total">
          <h1>Total donations : 2000 $</h1>
        </div>
        <div className="total">
          <h1>Total projects : 20</h1>
        </div>
      </div>
      <h1 className="h1Leatest">Leatest work:</h1>
      <div className="projectLeatsetDiv">
        {latestWork &&
          latestWork.map((item) => {
            return (
              <div key={item._id} className="projectLeatset">
                <img className="leatestImg" src={item.img} alt="project" />
                <div className="divInsideLeatestProject">
                  <h2 className="titleLeatestProject">Title: {item.title}</h2>
                  <div className="pDescribe">
                    <p className="describeProjectLeatest">{item.describe}</p>
                  </div>
                  <hr />
                  <p className="goalLeatsetProject">Goal: {item.goal} $</p>
                  <p className="pledgedLeatsetProject">
                    {item.pledged} $ Pledged
                  </p>
                  <p className="deadlineLeatsetProject">
                    {item.deadline} to go
                  </p>
                  <div className="kindAndLocation">
                    <p className="kind">{item.kind}</p>
                    <p className="location">Round Pushpin on SoftBank {item.location}</p>
                  </div>
                  <p className="time">{item.time}</p>
                </div>
              </div>
            );
          })}
      </div>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
      <p>a</p>
    </div>
  );
};

export default Home;
