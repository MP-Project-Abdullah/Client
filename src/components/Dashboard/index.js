import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [projects, setProjects] = useState([]); // all projects, not approved

  const navigate = useNavigate();

  // Get all projects not approved
  const getData = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/projectsNotApproved`
    );
    setProjects(res.data);
  };

  // Aproved project
  const aprooved = async (projectId, userId, projectName) => {
    let res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/aprooved/${projectId}`
    );
    let titleNotif = `Approved`;
    let messageNotif = `we are happy to inform you, your project ${projectName} has been approved.`;
    let result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/newNotif/${projectId}/${userId}`,
      {
        title: titleNotif,
        message: messageNotif,
      }
    );

    getData();
  };

  // Reject project
  const reject = async (projectId, userId, projectName) => {
    let res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/reject/${projectId}`
    );

    let titleNotif = `Rejected`;
    let messageNotif = `we are sorry to inform you, your project ${projectName} has been rejected.`;
    let result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/newNotif/${projectId}/${userId}`,
      {
        title: titleNotif,
        message: messageNotif,
      }
    );
    console.log(result.data);

    getData();
  };

  // Invoke get all projects not approved
  useEffect(() => {
    getData();
  }, []);

  // Navigate to project page
  const projectPage = (id) => {
    navigate(`/project/${id}`);
  };

  // Return
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
                        onClick={() =>
                          aprooved(item._id, item.user, item.title)
                        }
                      >
                        Approved
                      </button>

                      <button
                        className="btnApprovedAndReject"
                        id="reject"
                        onClick={() => reject(item._id, item.user, item.title)}
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
