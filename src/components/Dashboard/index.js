import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [projects, setProjects] = useState([]); // all projects, not approved
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return state;
  });

  // Get all projects not approved
  const getData = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/projectsNotApproved`
    );
    setProjects(res.data);
  };

  // Get all projects not approved
  const getDataStory = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/storiesNotApproved`
    );
    setStories(res.data);
  };

  useEffect(() => {
    getDataStory();
  }, []);

  // Aproved story
  const aproovedStory = async (storyId, userId, storytName) => {
    // eslint-disable-next-line
    let res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/aproovedStory/${storyId}`,
      {},
      {
        headers: { Authorization: `Bearer ${state.signin_reducer.token}` },
      }
    );
    let titleNotif = `Approved`;
    let messageNotif = `we are happy to inform you, your story ${storytName} has been approved.`;
    // eslint-disable-next-line
    let result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/newNotif/${storyId}/${userId}`,
      {
        title: titleNotif,
        message: messageNotif,
      },
      {
        headers: { Authorization: `Bearer ${state.signin_reducer.token}` },
      }
    );
    Swal.fire({
      icon: "success",
      title: "Approved story",
      showConfirmButton: false,
      timer: 1500,
    });
    getDataStory();
  };

  // Reject story
  const rejectStory = async (projectId, userId, projectName) => {
    // eslint-disable-next-line
    let res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/rejectStory/${projectId}`,
      {},
      {
        headers: { Authorization: `Bearer ${state.signin_reducer.token}` },
      }
    );

    let titleNotif = `Rejected`;
    let messageNotif = `we are sorry to inform you, your story ${projectName} has been rejected.`;
    // eslint-disable-next-line
    let result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/newNotif/${projectId}/${userId}`,
      {
        title: titleNotif,
        message: messageNotif,
      },
      {
        headers: { Authorization: `Bearer ${state.signin_reducer.token}` },
      }
    );
    Swal.fire({
      icon: "success",
      title: "Rejected story",
      showConfirmButton: false,
      timer: 1500,
    });
    getDataStory();
  };

  // Aproved project
  const aprooved = async (projectId, userId, projectName) => {
    // eslint-disable-next-line
    let res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/aprooved/${projectId}`,
      {},
      {
        headers: { Authorization: `Bearer ${state.signin_reducer.token}` },
      }
    );
    let titleNotif = `Approved`;
    let messageNotif = `we are happy to inform you, your project ${projectName} has been approved.`;
    // eslint-disable-next-line
    let result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/newNotif/${projectId}/${userId}`,
      {
        title: titleNotif,
        message: messageNotif,
      },
      {
        headers: { Authorization: `Bearer ${state.signin_reducer.token}` },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Approved project",
      showConfirmButton: false,
      timer: 1500,
    });
    getData();
  };

  // Reject project
  const reject = async (projectId, userId, projectName) => {
    // eslint-disable-next-line
    let res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/reject/${projectId}`,
      {},
      {
        headers: { Authorization: `Bearer ${state.signin_reducer.token}` },
      }
    );

    let titleNotif = `Rejected`;
    let messageNotif = `we are sorry to inform you, your project ${projectName} has been rejected.`;
    // eslint-disable-next-line
    let result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/newNotif/${projectId}/${userId}`,
      {
        title: titleNotif,
        message: messageNotif,
      },
      {
        headers: { Authorization: `Bearer ${state.signin_reducer.token}` },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Rejected project",
      showConfirmButton: false,
      timer: 1500,
    });
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

  // Navigate to project page
  const storyPage = (id) => {
    navigate(`/story/${id}`);
  };

  // Return
  return (
    <div>
      <Navbar />
      
      { // eslint-disable-next-line
      state.signin_reducer.user.role == "61c04770ff8aeaad62406e9b" ? (
        <div>
          {" "}
          {projects.length > 0 ? (
            <div>
              <div>
                <div className="aproovedProject">
                  <h1>Project not approved </h1>
                </div>
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
                              onClick={() =>
                                reject(item._id, item.user, item.title)
                              }
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="lineAll"> </div>
              <div className="aproovedProject">
                <h1>Stories not approved </h1>
              </div>
            </div>
          ) : (
            <div className="divNoPRoject">
              {" "}
              <h1 className="noProjectH1">No projects posted yet</h1>{" "}
            </div>
          )}
          <div>
            {stories.length > 0 ? (
              <div className="projectLeatsetDiv">
                {stories.map((item) => {
                  return (
                    <div key={item._id} className="projectLeatset">
                      <div onClick={() => storyPage(item._id)}>
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
                          <p className="time">{item.time}</p>
                        </div>
                      </div>
                      <div className="divBtnRejectAndApproved">
                        <button
                          className="btnApprovedAndReject"
                          id="approved"
                          onClick={() =>
                            aproovedStory(item._id, item.user, item.title)
                          }
                        >
                          Approved
                        </button>

                        <button
                          className="btnApprovedAndReject"
                          id="reject"
                          onClick={() =>
                            rejectStory(item._id, item.user, item.title)
                          }
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="divNoPRoject">
                {" "}
                <h1 className="noProjectH1">No stories posted yet</h1>{" "}
              </div>
            )}
          </div>{" "}
        </div>
      ) : (
        <div className="divForbidden">
          <p className="forbidden">Forbidden</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
