import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login_reducser } from "../../reducers/login";
import Title from "react-vanilla-tilt";
import Navbar from "../Navbar";
import { storage } from "../../firebase";
import CountUp from "react-countup";
const Account = () => {
  const state = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editProfile, setEditProfile] = useState(false); // Toggle edit profie
  const [newName, setNewName] = useState(""); // set new name
  const [newBio, setNewBio] = useState(""); // set new bio
  const [totalDonations, setTotalDonations] = useState(0); // total donations
  const [packages, setPackages] = useState([]); // user packages
  const [totalPleged, setTotalPleged] = useState(0); // total pledged
  const [userProjects, setUserProjects] = useState([]); // all user projects
  const [newAvatar, setNewAvatar] = useState(""); // New avatar

  // New avatar
  const [image, setImage] = useState(null); // Upload iamge
  // eslint-disable-next-line
  const [url, setUrl] = useState(""); /// Upload iamge
  // eslint-disable-next-line
  const [urlString, setUrlString] = useState(""); // Upload iamge
  const [progress, setProgress] = useState(0); // Upload iamge

  // set new name and bio and avatar
  const bioAndName = () => {
    if (state.signin_reducer.token) {
      setNewName(state.signin_reducer.user.name);
      setNewBio(state.signin_reducer.user.bio);
      setNewAvatar(state.signin_reducer.user.avatar);
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
      // eslint-disable-next-line
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
        avatar: newAvatar,
      },
      {
        headers: { Authorization: `Bearer ${state.signin_reducer.token}` },
      }
    );
    setEditProfile(false);
    let token = localStorage.getItem("token");
    const data = { token: token, user: res.data };
    dispatch(login_reducser({ data }));
  };























  

  //  New avatar
  // Uplad image
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Upload image
  const handleUpload = (e) => {
    e.preventDefault();
    const uploadImg = storage.ref(`images/${image.name}`).put(image);

    uploadImg.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((res) => {
            setNewAvatar(res);
          });
      }
    );
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
    <div>
      <Navbar />
      <div className="containerAccount">
        {state.signin_reducer.token ? (
          <div>
            <div className="infoAndEdit">
              <div className="avatarAndName">
                <div>
                  <div className="divAvatar">
                    <img
                      src={state.signin_reducer.user.avatar}
                      alt="avatarUser"
                      className="avatar"
                    />
                  </div>
                  {/* Edit avatar */}
                  <div className="divEditAvatar">
                    {editProfile ? (
                      <div className="divNewaAvatar">
                        <label className="uploadLabelAccount">
                          Choose image
                          <input
                            className="inputFile"
                            type="file"
                            name="postImg"
                            onChange={(e) => {
                              setUrlString(e.target.value);
                              handleChange(e);
                            }}
                            required
                          />
                        </label>
                        <button className="uploadBtn" onClick={handleUpload}>
                          Click to upload
                        </button>
                        <progress
                          value={progress}
                          max="100"
                          className="progress"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* Edit user name */}
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
            <div className="bioAndEMmil">
              <div className="divBio">
                {" "}
                <h2 className="bioH2">Professional Bio </h2>
                {editProfile ? (
                  // Edit new bio
                  <div className="divNewBio">
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
                  <div className="divBio2">
                    <p className="bioP">{state.signin_reducer.user.bio}</p>{" "}
                  </div>
                )}
              </div>

              <div className="divEmail">
                <div className="emailPH2">
                  <h2 className="h2Email">Your Email :</h2>{" "}
                  <p className="email">{state.signin_reducer.user.email}</p>
                </div>
                <div className="divEMailP"></div>
                <div className="totalAccount">
                  <Title
                    style={{
                      height: "0",
                    }}
                  >
                    <div className="h2Div">
                      {" "}
                      <h2 className="h2Total">
                        {totalDonations && (
                          <CountUp
                            start={0}
                            end={totalDonations}
                            duration={2.75}
                          />
                        )}
                      </h2>
                      <h2 className="h2Total">Total donations</h2>
                    </div>
                  </Title>
                  <Title
                    style={{
                      height: "0",
                    }}
                  >
                    <div className="h2Div">
                      <h2 className="h2Total">
                        {totalPleged && (
                          <CountUp
                            start={0}
                            end={totalPleged}
                            duration={2.75}
                          />
                        )}
                      </h2>
                      <h2 className="h2Total">Total pledged</h2>
                    </div>{" "}
                  </Title>
                </div>
              </div>
            </div>
            <div>
              <h2>Your Packages</h2>
              <div className="containerPackages" id="accountPackges">
                {packages.length > 0 ? (
                  packages.map((item) => {
                    return (
                      <div
                        className="divPackages"
                        key={item._id}
                        id="accountPackage"
                      >
                        <div className="divAllPackage" id="divAllPackgeAccount">
                          <div className="pledgedAndTitleAndP">
                            <div>
                              <p
                                className="packageAmount"
                                id="amountackageAccount"
                              >
                                • Pledged {item.package.amount} $
                              </p>
                            </div>
                            <div>
                              <h2
                                className="packageTitle"
                                id="titlePackageAccount"
                              >
                                • {item.package.title}
                              </h2>
                            </div>
                            <div className="divDEscribePAckegeACcount">
                              <p
                                className="packageDescribe"
                                id="describePackageAccount"
                              >
                                {" "}
                                • {item.package.describe}
                              </p>
                            </div>
                            <div className="divAddOns" id="divAddOneAccount">
                              <p className="addOns" id="addOneAccount">
                                Add-ons
                              </p>{" "}
                            </div>
                          </div>
                          <div>
                            <p
                              className="packageArrive"
                              id="arrivePackageAccount"
                            >
                              {" "}
                              • Arrive in{" "}
                            </p>
                            <p id="arrivePackage">{item.package.arrive}</p>
                          </div>
                        </div>
                        <div className="divBtnDonate"></div>
                      </div>
                    );
                  })
                ) : (
                  <div className="havntPosted" id="haventPackage">
                    You haven't contributions yet
                  </div>
                )}
              </div>
            </div>
            <h2>Your projects</h2>
            <div className="projects" id="accountProject">
              {userProjects.length > 0 ? (
                userProjects.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="projectLeatset"
                      id="projectAccount"
                    >
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
                  );
                })
              ) : (
                <div className="havntPosted">
                  You haven't posted any project yet{" "}
                </div>
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
    </div>
  );
};

export default Account;
