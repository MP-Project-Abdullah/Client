import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  const getData = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/projectsNotApproved`
    );
    setProjects(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // Navigate to project page
  const projectPage = (id) => {
    navigate(`/project/${id}`);
  };

  const aprooved = async (id) => {
    let res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/aprooved/${id}`
    );
    console.log(res.data);
    getData();
  };

  const reject = async (id) => {
    let res = await axios.put(`${process.env.REACT_APP_BASE_URL}/reject/${id}`);
    console.log(res.data);
    getData();
  };

  return (
    <div>
      {projects.length > 0 ? (
        <div>
          <h1>Not approved </h1>
          <div className="projectLeatsetDiv">
            {projects &&
              projects.map((item) => {
                return (
                  <div key={item._id} className="projectLeatset">
                    <div onClick={() => projectPage(item._id)}>
                      <img
                        className="leatestImg"
                        src={item.url[0]}
                        alt="project"
                      />
                      <div className="divInsideLeatestProject">
                        <h2 className="titleLeatestProject">
                          Title: {item.title}
                        </h2>
                        <div className="pDescribe">
                          <p className="describeProjectLeatest">
                            {item.describe}
                          </p>
                        </div>
                        <hr />
                        <p className="goalLeatsetProject">
                          Goal: {item.goal} $
                        </p>
                        <p className="pledgedLeatsetProject">
                          {item.pledged} $ Pledged
                        </p>
                        <p className="deadlineLeatsetProject">
                          {item.deadline} to go
                        </p>
                        <div className="kindAndLocation">
                          <p className="kind">{item.kind}</p>
                          <p className="location"> {item.location}</p>
                        </div>
                        <p className="time">{item.time}</p>
                      </div>
                    </div>
                    <div className="divBtnRejectAndApproved">
                      <button
                        className="btnApprovedAndReject"
                        id="approved"
                        onClick={() => aprooved(item._id)}
                      >
                        Approved
                      </button>

                      <button
                        className="btnApprovedAndReject"
                        id="reject"
                        onClick={() => reject(item._id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="divNoPRoject">
          {" "}
          <h1 className="noProjectH1">No projects</h1>{" "}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
