import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { storage } from "../../firebase";
import "./style.css";
import axios from "axios";
import Navbar from "../Navbar";
import { BsCardImage } from "react-icons/bs";
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
  const [kind, setKind] = useState("art"); // Kind of the story
  const [title, setTitle] = useState(""); // title of the story
  const [describe, setDescribe] = useState(""); // describe of the story
  const [desc, setDesc] = useState(""); // desc of the story
  const [goal, setGoal] = useState(0); // goal of the story
  const [deadline, setDeadline] = useState(0); // deadline of the story
  const [location, setLocation] = useState(""); // location of the story
  const [desc1, setDesc1] = useState(""); // desc  of the story
  const [desc2, setDesc2] = useState(""); // desc  of the story
  const [desc3, setDesc3] = useState(""); // desc  of the story
  const [desc4, setDesc4] = useState(""); // desc  of the story
  const [desc5, setDesc5] = useState(""); // desc  of the story
  const [desc6, setDesc6] = useState(""); // desc  of the story

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
      }
    );
    console.log(res, "res");
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
          <div className="line"> </div>
          <div className="containerDivNewProject">
            <div className="divNewProjectH2AndInput">
              <form>
                <h2>Choose a kind:</h2>
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
              </form>
            </div>{" "}
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
                    <label class="custom-file-upload">
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
                    <div>
                      <button className="uploadButton" onClick={handleUpload}>
                        Upload
                      </button>
                    </div>
                    <div>
                      <progress value={progress} max="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="divNewProjectH2AndInput">
              <h2>Description</h2>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Enter your project description..."
                className="inputNewProject"
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>{" "}
            <div className="divNewProjectH2AndInput">
              <h2>Describe your project</h2>
              <input
                type="text"
                name="describe"
                id="describe"
                placeholder="Nax letter 160"
                maxLength={160}
                className="inputNewProject"
                onChange={(e) => setDescribe(e.target.value)}
                required
              />
            </div>{" "}
            <div className="divNewProjectH2AndInput">
              <h2>Your project goal</h2>
              <input
                type="text"
                name="goal"
                id="goal"
                placeholder="Enter your project goal here..."
                className="inputNewProject"
                onChange={(e) => setGoal(e.target.value)}
                required
              />
            </div>{" "}
            <div className="divNewProjectH2AndInput">
              <h2>Deadline</h2>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter your project deadline here..."
                className="inputNewProject"
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>{" "}
            <div className="divNewProjectH2AndInput">
              <h2>Location</h2>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter your project deadline here..."
                className="inputNewProject"
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>{" "}
            <div className="divNewProjectH2AndInput">
              <h2>Description</h2>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Enter your project description..."
                className="inputNewProject"
                onChange={(e) => setDesc1(e.target.value)}
              />
            </div>{" "}
            <div className="uploading">
              <label style={{ color: "white" }} className="uploadLabel">
                Upload Image
                <input
                  style={{ marginLeft: "10px" }}
                  type="file"
                  name="postImg"
                  onChange={handleChange}
                  // eslint-disable-next-line
                  onChange={(e) => {
                    handleChange(e);
                    setUrlString(e.target.value);
                  }}
                />
              </label>
              <button
                style={{
                  marginRight: "10px",
                  width: "5%",
                }}
                className="upBtn"
                onClick={handleUpload}
              >
                Upload
              </button>
              <progress style={{ width: "12%" }} value={progress} max="100" />
            </div>
            <div className="divNewProjectH2AndInput">
              <h2>Description</h2>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Enter your project description..."
                className="inputNewProject"
                onChange={(e) => setDesc2(e.target.value)}
              />
            </div>{" "}
            <div className="uploading">
              <label style={{ color: "white" }} className="uploadLabel">
                Upload Image
                <input
                  style={{ marginLeft: "10px" }}
                  type="file"
                  name="postImg"
                  onChange={handleChange}
                  // eslint-disable-next-line
                  onChange={(e) => {
                    handleChange(e);
                    setUrlString(e.target.value);
                  }}
                />
              </label>
              <button
                style={{
                  marginRight: "10px",
                  width: "5%",
                }}
                className="upBtn"
                onClick={handleUpload}
              >
                Upload
              </button>
              <progress style={{ width: "12%" }} value={progress} max="100" />
            </div>
            <div className="divNewProjectH2AndInput">
              <h2>Description</h2>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Enter your project description..."
                className="inputNewProject"
                onChange={(e) => setDesc3(e.target.value)}
              />
            </div>{" "}
            <div className="uploading">
              <label style={{ color: "white" }} className="uploadLabel">
                Upload Image
                <input
                  style={{ marginLeft: "10px" }}
                  type="file"
                  name="postImg"
                  onChange={handleChange}
                  // eslint-disable-next-line
                  onChange={(e) => {
                    handleChange(e);
                    setUrlString(e.target.value);
                  }}
                />
              </label>
              <button
                style={{
                  marginRight: "10px",
                  width: "5%",
                }}
                className="upBtn"
                onClick={handleUpload}
              >
                Upload
              </button>
              <progress style={{ width: "12%" }} value={progress} max="100" />
            </div>
            <div className="divNewProjectH2AndInput">
              <h2>Description</h2>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Enter your project description..."
                className="inputNewProject"
                onChange={(e) => setDesc4(e.target.value)}
              />
            </div>{" "}
            <div className="uploading">
              <label style={{ color: "white" }} className="uploadLabel">
                Upload Image
                <input
                  style={{ marginLeft: "10px" }}
                  type="file"
                  name="postImg"
                  onChange={handleChange}
                  // eslint-disable-next-line
                  onChange={(e) => {
                    handleChange(e);
                    setUrlString(e.target.value);
                  }}
                />
              </label>
              <button
                style={{
                  marginRight: "10px",
                  width: "5%",
                }}
                className="upBtn"
                onClick={handleUpload}
              >
                Upload
              </button>
              <progress style={{ width: "12%" }} value={progress} max="100" />
            </div>
            <div className="divNewProjectH2AndInput">
              <h2>Description</h2>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Enter your project description..."
                className="inputNewProject"
                onChange={(e) => setDesc5(e.target.value)}
              />
            </div>{" "}
            <div className="uploading">
              <label style={{ color: "white" }} className="uploadLabel">
                Upload Image
                <input
                  style={{ marginLeft: "10px" }}
                  type="file"
                  name="postImg"
                  onChange={handleChange}
                  // eslint-disable-next-line
                  onChange={(e) => {
                    handleChange(e);
                    setUrlString(e.target.value);
                  }}
                />
              </label>
              <button
                style={{
                  marginRight: "10px",
                  width: "5%",
                }}
                className="upBtn"
                onClick={handleUpload}
              >
                Upload
              </button>
              <progress style={{ width: "12%" }} value={progress} max="100" />
            </div>
            <div className="divNewProjectH2AndInput">
              <h2>Description</h2>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Enter your project description..."
                className="inputNewProject"
                onChange={(e) => setDesc6(e.target.value)}
              />
            </div>{" "}
            <div className="uploading">
              <label style={{ color: "white" }} className="uploadLabel">
                Upload Image
                <input
                  style={{ marginLeft: "10px" }}
                  type="file"
                  name="postImg"
                  onChange={handleChange}
                  // eslint-disable-next-line
                  onChange={(e) => {
                    handleChange(e);
                    setUrlString(e.target.value);
                  }}
                />
              </label>
              <button
                style={{
                  marginRight: "10px",
                  width: "5%",
                }}
                className="upBtn"
                onClick={handleUpload}
              >
                Upload
              </button>
              <progress style={{ width: "12%" }} value={progress} max="100" />
            </div>
          </div>
          <button onClick={newStory}>Submit</button>
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
