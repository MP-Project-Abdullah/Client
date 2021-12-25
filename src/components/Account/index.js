import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login_reducser } from "../../reducers/login";
const Account = () => {
  const state = useSelector((state) => {
    return state;
  });

  const [editProfile, setEditProfile] = useState(false);
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");

  const dispatch = useDispatch();

  const bioAndName = () => {
    if (state.signin_reducer.token) {
      setNewName(state.signin_reducer.user.name);
      setNewBio(state.signin_reducer.user.bio);
    }
  };

  useEffect(() => {
    bioAndName();
  }, []);
  const navigate = useNavigate();

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
          <div className="divEmail">
            <h2>Email</h2>
            <h4>{state.signin_reducer.user.email}</h4>
          </div>
          <div className="divPassword">
            <h2>Password</h2>
            <h4>**************</h4>
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
