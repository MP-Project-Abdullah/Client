import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { storage } from "../../firebase";
import "./style.css";
import axios from "axios";
import Navbar from "../Navbar";
import { BsCardImage } from "react-icons/bs";
import Swal from "sweetalert2";
const NewProject = () => {
  const state = useSelector((state) => {
    return state;
  });

  const navigate = useNavigate();

  const [image, setImage] = useState(null); // Upload iamge
  const [url, setUrl] = useState([]); /// Upload iamge
  // eslint-disable-next-line
  const [urlString, setUrlString] = useState(""); // Upload iamge
  const [progress, setProgress] = useState(0); // Upload iamge

  // New story state
  const [kind, setKind] = useState("art"); // Kind of the project
  const [title, setTitle] = useState(""); // title of the project
  const [describe, setDescribe] = useState(""); // describe of the project
  const [desc, setDesc] = useState(""); // desc of the project
  const [goal, setGoal] = useState(0); // goal of the project
  const [deadline, setDeadline] = useState(0); // deadline of the project
  const [location, setLocation] = useState(""); // location of the project
  const [desc1, setDesc1] = useState(""); // desc  of the project
  const [desc2, setDesc2] = useState(""); // desc  of the project
  const [desc3, setDesc3] = useState(""); // desc  of the project
  const [desc4, setDesc4] = useState(""); // desc  of the project
  const [desc5, setDesc5] = useState(""); // desc  of the project
  const [desc6, setDesc6] = useState(""); // desc  of the project

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
            let newArr = [...url, res];
            setUrl(newArr);
          });
      }
    );
  };

  // Create new story
  const newStory = async () => {
    if (
      kind === "" ||
      title === "" ||
      desc === "" ||
      describe === "" ||
      goal === "" ||
      deadline === "" ||
      location === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "You must fill all non optional",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/newProject/${state.signin_reducer.user._id}`,
      {
        kind: kind,
        title: title,
        desc: desc,
        describe: describe,
        goal: goal,
        deadline: deadline,
        location: location,
        url: url,
        desc1: desc1,
        desc2: desc2,
        desc3: desc3,
        desc4: desc4,
        desc5: desc5,
        desc6: desc6,
      },
      {
        headers: { Authorization: `Bearer ${state.signin_reducer.token}` },
      }
    );
    Swal.fire({
      icon: "success",
      title: "New project created",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate(`/newPackage/${res.data._id}/${res.data.user}`);
  };

  // Return
  return (
    <div>
      <Navbar />
      {state.signin_reducer.token.length > 0 ? (
        <div className="containerNewProject">
          {" "}
          <div className="divH1NewProject">
            <h1>New project</h1>{" "}
          </div>
          <div className="lineAll"> </div>
          <div className="containerDivNewProject">
            <div className="divKind">
              <form className="formKind">
                <div className="h2Kind">
                  <h2>Choose a kind for your project</h2>
                </div>
                <div className="selectKind">
                  <select
                    name="kind"
                    id="kind"
                    defaultValue="art"
                    onChange={(e) => setKind(e.target.value)}
                  >
                    <option value="art">Art</option>
                    <option value="film">Film</option>
                    <option value="music">Music</option>
                    <option value="comic">Comics & Illustration</option>
                  </select>
                </div>
              </form>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Project title</h2>
                <p>
                  Write a clear, brief title to help people quickly understand
                  your project. title will appear on your project and pre-launch
                  pages.
                </p>
              </div>
              <div className="divInputTitle">
                <p>Title</p>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter your title here..."
                  className="inputNewProjectTitle"
                  maxLength={50}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Project image</h2>
                <p>
                  Add an image that clearly represents your project. Choose one
                  that looks good at different sizes—it’ll appear on your
                  project page
                </p>
              </div>
              <div className="divInputTitle">
                <div className="uploading">
                  <div>
                    <label className="custom-file-upload">
                      <BsCardImage /> +
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
                  </div>
                  <div className="divUpladProgress">
                    <div className="divBtnUpload">
                      <button className="uploadButton" onClick={handleUpload}>
                        Upload
                      </button>
                    </div>
                    <div className="progress">
                      <progress value={progress} max="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Project Description</h2>
                <p>
                  Describe what you're raising funds to do, why you care about
                  it, how you plan to make it happen, and who you are. Your
                  description should tell backers everything they need to know.
                  If possible.
                </p>
              </div>
              <div className="divInputTitle">
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter your project description..."
                  className="inputNewProjectTitle"
                  onChange={(e) => setDesc(e.target.value)}
                  required
                />
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Describe</h2>
                <p>
                  Brief describe of your project, describe will appear on your
                  project and pre-launch pages.
                </p>
              </div>
              <div className="divInputTitle">
                <p>Describe</p>
                <input
                  type="text"
                  name="describe"
                  id="describe"
                  placeholder="Nax letter 160"
                  maxLength={160}
                  className="inputNewProjectTitle"
                  onChange={(e) => setDescribe(e.target.value)}
                  required
                />
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Funding goal</h2>
                <p>
                  Set an achievable goal that covers what you need to complete
                  your project.
                </p>
                <p>
                  Funding is all-or-nothing. If you don’t meet your goal, you
                  won’t receive any money.
                </p>
              </div>
              <div className="divInputTitle">
                <div>
                  <p>Goal amount</p>
                </div>
                <div className="divGoal">
                  <p className="dollar">$</p>
                  <input
                    type="text"
                    name="goal"
                    id="goal"
                    placeholder="Enter your project goal here..."
                    className="inputNewProjectTitle"
                    onChange={(e) => setGoal(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Campaign duration</h2>
                <p>
                  Set a time limit for your campaign. You won’t be able to
                  change this after you launch.
                </p>
              </div>
              <div className="divInputTitle">
                <p>Campaign duration</p>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter your project deadline here... ( Days )"
                  className="inputNewProjectTitle"
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Location</h2>
                <p>Set a location for your project</p>
              </div>
              <div className="divInputTitle">
                <p>Location</p>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter your project location here..."
                  className="inputNewProjectTitle"
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Description (Optional)</h2>
                <p>
                  Describe what you're raising funds to do, why you care about
                  it, how you plan to make it happen, and who you are. Your
                  description should tell backers everything they need to know.
                  If possible.
                </p>
              </div>
              <div className="divInputTitle">
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter your project description..."
                  className="inputNewProjectTitle"
                  onChange={(e) => setDesc1(e.target.value)}
                />
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Project image (Optional)</h2>
                <p>
                  Add an image that clearly represents your project. Choose one
                  that looks good at different sizes—it’ll appear on your
                  project page
                </p>
              </div>
              <div className="divInputTitle">
                <div className="uploading">
                  <div>
                    <label className="custom-file-upload">
                      <BsCardImage /> +
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
                  </div>
                  <div className="divUpladProgress">
                    <div className="divBtnUpload">
                      <button className="uploadButton" onClick={handleUpload}>
                        Upload
                      </button>
                    </div>
                    <div className="progress">
                      <progress value={progress} max="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Description (Optional)</h2>
                <p>
                  Describe what you're raising funds to do, why you care about
                  it, how you plan to make it happen, and who you are. Your
                  description should tell backers everything they need to know.
                  If possible.
                </p>
              </div>
              <div className="divInputTitle">
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter your project description..."
                  className="inputNewProjectTitle"
                  onChange={(e) => setDesc2(e.target.value)}
                />
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Project image (Optional)</h2>
                <p>
                  Add an image that clearly represents your project. Choose one
                  that looks good at different sizes—it’ll appear on your
                  project page
                </p>
              </div>
              <div className="divInputTitle">
                <div className="uploading">
                  <div>
                    <label className="custom-file-upload">
                      <BsCardImage /> +
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
                  </div>
                  <div className="divUpladProgress">
                    <div className="divBtnUpload">
                      <button className="uploadButton" onClick={handleUpload}>
                        Upload
                      </button>
                    </div>
                    <div className="progress">
                      <progress value={progress} max="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Description (Optional)</h2>
                <p>
                  Describe what you're raising funds to do, why you care about
                  it, how you plan to make it happen, and who you are. Your
                  description should tell backers everything they need to know.
                  If possible.
                </p>
              </div>
              <div className="divInputTitle">
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter your project description..."
                  className="inputNewProjectTitle"
                  onChange={(e) => setDesc3(e.target.value)}
                />
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Project image (Optional)</h2>
                <p>
                  Add an image that clearly represents your project. Choose one
                  that looks good at different sizes—it’ll appear on your
                  project page
                </p>
              </div>
              <div className="divInputTitle">
                <div className="uploading">
                  <div>
                    <label className="custom-file-upload">
                      <BsCardImage /> +
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
                  </div>
                  <div className="divUpladProgress">
                    <div className="divBtnUpload">
                      <button className="uploadButton" onClick={handleUpload}>
                        Upload
                      </button>
                    </div>
                    <div className="progress">
                      <progress value={progress} max="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Description (Optional)</h2>
                <p>
                  Describe what you're raising funds to do, why you care about
                  it, how you plan to make it happen, and who you are. Your
                  description should tell backers everything they need to know.
                  If possible.
                </p>
              </div>
              <div className="divInputTitle">
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter your project description..."
                  className="inputNewProjectTitle"
                  onChange={(e) => setDesc4(e.target.value)}
                />
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Project image (Optional)</h2>
                <p>
                  Add an image that clearly represents your project. Choose one
                  that looks good at different sizes—it’ll appear on your
                  project page
                </p>
              </div>
              <div className="divInputTitle">
                <div className="uploading">
                  <div>
                    <label className="custom-file-upload">
                      <BsCardImage /> +
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
                  </div>
                  <div className="divUpladProgress">
                    <div className="divBtnUpload">
                      <button className="uploadButton" onClick={handleUpload}>
                        Upload
                      </button>
                    </div>
                    <div className="progress">
                      <progress value={progress} max="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Description (Optional)</h2>
                <p>
                  Describe what you're raising funds to do, why you care about
                  it, how you plan to make it happen, and who you are. Your
                  description should tell backers everything they need to know.
                  If possible.
                </p>
              </div>
              <div className="divInputTitle">
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter your project description..."
                  className="inputNewProjectTitle"
                  onChange={(e) => setDesc5(e.target.value)}
                />
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Project image (Optional)</h2>
                <p>
                  Add an image that clearly represents your project. Choose one
                  that looks good at different sizes—it’ll appear on your
                  project page
                </p>
              </div>
              <div className="divInputTitle">
                <div className="uploading">
                  <div>
                    <label className="custom-file-upload">
                      <BsCardImage /> +
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
                  </div>
                  <div className="divUpladProgress">
                    <div className="divBtnUpload">
                      <button className="uploadButton" onClick={handleUpload}>
                        Upload
                      </button>
                    </div>
                    <div className="progress">
                      <progress value={progress} max="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Description (Optional)</h2>
                <p>
                  Describe what you're raising funds to do, why you care about
                  it, how you plan to make it happen, and who you are. Your
                  description should tell backers everything they need to know.
                  If possible.
                </p>
              </div>
              <div className="divInputTitle">
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter your project description..."
                  className="inputNewProjectTitle"
                  onChange={(e) => setDesc6(e.target.value)}
                />
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Project image (Optional)</h2>
                <p>
                  Add an image that clearly represents your project. Choose one
                  that looks good at different sizes—it’ll appear on your
                  project page
                </p>
              </div>
              <div className="divInputTitle">
                <div className="uploading">
                  <div>
                    <label className="custom-file-upload">
                      <BsCardImage /> +
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
                  </div>
                  <div className="divUpladProgress">
                    <div className="divBtnUpload">
                      <button className="uploadButton" onClick={handleUpload}>
                        Upload
                      </button>
                    </div>
                    <div className="progress">
                      <progress value={progress} max="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
          </div>
          <div className="divSubmitNewProject">
            <button className="submitNewProject" onClick={newStory}>
              Create new project
            </button>
          </div>
        </div>
      ) : (
        <div className="containerAccount">
          <div className="notLogin">
            You must login
            <button className="btnNotLogin" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewProject;
