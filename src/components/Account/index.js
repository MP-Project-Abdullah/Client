import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login_reducser } from "../../reducers/login";
import Title from "react-vanilla-tilt";

const Account = () => {
  const state = useSelector((state) => {
    return state;
  });

  console.log(state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editProfile, setEditProfile] = useState(false); // Toggle edit profie
  const [newName, setNewName] = useState(""); // set new name
  const [newBio, setNewBio] = useState(""); // set new bio
  const [totalDonations, setTotalDonations] = useState(0); // total donations
  const [packages, setPackages] = useState([]); // user packages
  const [totalPleged, setTotalPleged] = useState(0); // total pledged
  const [userProjects, setUserProjects] = useState([]); // all user projects

  // set new name and bio
  const bioAndName = () => {
    if (state.signin_reducer.token) {
      setNewName(state.signin_reducer.user.name);
      setNewBio(state.signin_reducer.user.bio);
    }
  };

  // Get user project
  const getUserProject = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/userProjects/${state.signin_reducer.user._id}`
    );
    setUserProjects(res.data);

    // Sum all pledged
    let total = 0;
    for (let i = 0; i < res.data.length; i++) {
      total += res.data[i].pledged;
    }
    setTotalPleged(total);
  };

  // Get all user packages
  const getPackges = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getUserPackages/${state.signin_reducer.user._id}`
    );

    // Take only the packages
    let newArr = [];
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].package != undefined) {
        newArr.push(res.data[i]);
      }
    }
    setPackages(newArr);

    // Sum all donations
    let total = 0;
    for (let i = 0; i < res.data.length; i++) {
      total += res.data[i].total;
    }
    setTotalDonations(total);
  };

  // Update bio and name
  const changeBioAndName = async () => {
    let res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/updateUser/${state.signin_reducer.user._id}`,
      {
        name: newName,
        bio: newBio,
      }
    );
    setEditProfile(false);
    let token = localStorage.getItem("token");
    const data = { token: token, user: res.data };
    dispatch(login_reducser({ data }));
  };

  // Use effects
  useEffect(() => {
    getUserProject();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getPackges();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    bioAndName();
    // eslint-disable-next-line
  }, []);

  // Return
  return (
    <div className="containerAccount">
      {state.signin_reducer.token ? (
        <div>
          <div className="infoAndEdit">
            <div className="avatarAndName">
              <div>
                <img
                  src={state.signin_reducer.user.avatar}
                  alt="avatarUser"
                  className="avatar"
                />
              </div>
              <div className="nameAndUsernmae">
                {editProfile ? (
                  <div>
                    <input
                      type="text"
                      name="newNAme"
                      id="newName"
                      placeholder="New name"
                      defaultValue={state.signin_reducer.user.name}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </div>
                ) : (
                  <div>
                    <p> {state.signin_reducer.user.name}</p>
                  </div>
                )}

                <p> @{state.signin_reducer.user.username}</p>
              </div>
            </div>
            {editProfile ? (
              <div>
                <button
                  className="editProfile"
                  onClick={() => changeBioAndName()}
                >
                  Submit changes
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="editProfile"
                  onClick={() => setEditProfile(true)}
                >
                  Edit profile
                </button>
              </div>
            )}
          </div>
          <div className="line"> </div>
          <div className="divBio">
            {" "}
            <h1>About {state.signin_reducer.user.name} </h1>
            {editProfile ? (
              <div>
                <input
                  type="text"
                  name="newBio"
                  id="newBio"
                  placeholder="New bio"
                  className="newBioInput"
                  defaultValue={state.signin_reducer.user.bio}
                  onChange={(e) => setNewBio(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <p>{state.signin_reducer.user.bio}</p>{" "}
              </div>
            )}
          </div>
          <div className="line"> </div>
          <div className="totalAccount">
            <Title
              style={{
                height: "0",
              }}
            >
              <div className="h2Div">
                {" "}
                <h2 className="h2Total">{totalDonations && totalDonations}</h2>
                <h2 className="h2Total">Total donations</h2>
              </div>
            </Title>
            <Title
              style={{
                height: "0",
              }}
            >
              <div className="h2Div">
                <h2 className="h2Total">{totalPleged && totalPleged}</h2>
                <h2 className="h2Total">Total pledged</h2>
              </div>{" "}
            </Title>
          </div>

          <div className="divEmail">
            <h2>Email</h2>
            <h4>{state.signin_reducer.user.email}</h4>
          </div>
          <div className="divPassword">
            <h2>Password</h2>
            <h4>**************</h4>
          </div>
          <div>
            <h2>Your Packages</h2>
            <div className="containerPackages">
              {packages.length > 0 ? (
                packages.map((item) => {
                  return (
                    <div className="divPackages" key={item._id}>
                      <div>
                        <h2 className="packageTitle">{item.package.title}</h2>
                        <p className="packageDescribe">
                          {item.package.describe}
                        </p>
                        <p className="packageAmount">
                          Amount : {item.package.amount}
                        </p>
                        <p className="packageArrive">
                          Arrive :{item.package.arrive}
                        </p>{" "}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>You haven't contributions yet</div>
              )}
            </div>
          </div>
          <h2>Your projects</h2>
          <div className="projects" id="accountProject">
            {userProjects.length > 0 ? (
              userProjects.map((item) => {
                return (
                  <div key={item._id} className="projectLeatset">
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
                      <p className="goalLeatsetProject">Goal: {item.goal} $</p>
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
                );
              })
            ) : (
              <div>You haven't posted any project yet </div>
            )}
          </div>
        </div>
      ) : (
        <div className="notLogin">
          You must login
          <button className="btnNotLogin" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
