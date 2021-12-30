import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { storage } from "../../firebase";
import "./style.css";
import axios from "axios";
import Navbar from "../Navbar";
const NewStory = () => {
  const state = useSelector((state) => {
    return state;
  });

  const navigate = useNavigate();

  const [image, setImage] = useState(null); // Upload iamge
  const [url, setUrl] = useState([]); /// Upload iamge
  // eslint-disable-next-line
  const [urlString, setUrlString] = useState(""); // Upload iamge
  const [progress, setProgress] = useState(0); // Upload iamge

  // New project state
  const [title, setTitle] = useState(""); // title of the project
  const [describe, setDescribe] = useState(""); // describe of the project
  const [desc, setDesc] = useState(""); // desc of the project

  const [desc1, setDesc1] = useState(""); // desc  of the project
  const [desc2, setDesc2] = useState(""); // desc  of the project
  const [desc3, setDesc3] = useState(""); // desc  of the project

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

  // Create new project
  const newProject = async () => {
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/newStory/${state.signin_reducer.user._id}`,
      {
        title: title,
        desc: desc,
        describe: describe,
        url: url,
        desc1: desc1,
        desc2: desc2,
        desc3: desc3,
      }
    );
    navigate(`/`);
  };

  // Return
  return (
    <div>
      <Navbar />
      {state.signin_reducer.token.length > 0 ? (
        <div className="containerNewProject">
          {" "}
          <div className="divH1NewProject">
            <h1>New Story</h1>{" "}
          </div>
          <div className="line"> </div>
          <div className="containerDivNewProject">
            <div className="divNewProjectH2AndInput">
              <h2>Title</h2>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter your title here..."
                className="inputNewProject"
                maxLength={50}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="divNewProjectH2AndInput">
              <h2>Story image</h2>
              <div className="uploading">
                <label style={{ color: "white" }} className="uploadLabel">
                  Upload Image
                  <input
                    style={{ marginLeft: "10px" }}
                    type="file"
                    name="postImg"
                    onChange={(e) => {
                      setUrlString(e.target.value);
                      handleChange(e);
                    }}
                    required
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
              <h2>Describe your Story</h2>
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
          </div>
          <button onClick={newProject}>Submit</button>
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

export default NewStory;
