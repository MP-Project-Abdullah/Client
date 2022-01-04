import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { storage } from "../../firebase";
import "./style.css";
import axios from "axios";
import Navbar from "../Navbar";
import Swal from "sweetalert2";
import { BsCardImage } from "react-icons/bs";
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

  // New story state
  const [title, setTitle] = useState(""); // title of the story
  const [describe, setDescribe] = useState(""); // describe of the story
  const [desc, setDesc] = useState(""); // desc of the story

  const [desc1, setDesc1] = useState(""); // desc  of the story
  const [desc2, setDesc2] = useState(""); // desc  of the story
  const [desc3, setDesc3] = useState(""); // desc  of the story

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
    // eslint-disable-next-line
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

    Swal.fire({
      icon: "success",
      title: "New story created",
      showConfirmButton: false,
      timer: 1500,
    });
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
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Story title</h2>
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
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInput">
              <div className="divNewProjectH2AndInputTitle">
                <div className="divH2Title">
                  <h2>Story image </h2>
                  <p>
                    Add an image that clearly represents your Story. Choose one
                    that looks good at different sizes—it’ll appear on your
                    Story page
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
            </div>{" "}
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Story Description</h2>
                <p></p>
              </div>
              <div className="divInputTitle">
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter your story description..."
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
                  Brief describe of your story, describe will appear on your
                  story and pre-launch pages.
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
                <h2>Story Description (Optional) </h2>
                <p></p>
              </div>
              <div className="divInputTitle">
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter your story description..."
                  className="inputNewProjectTitle"
                  onChange={(e) => setDesc1(e.target.value)}
                  required
                />
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Story image (Optional)</h2>
                <p>
                  Add an image that clearly represents your Story. Choose one
                  that looks good at different sizes—it’ll appear on your Story
                  page
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
                <h2>Story Description (Optional) </h2>
                <p></p>
              </div>
              <div className="divInputTitle">
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter your story description..."
                  className="inputNewProjectTitle"
                  onChange={(e) => setDesc2(e.target.value)}
                  required
                />
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Story image (Optional)</h2>
                <p>
                  Add an image that clearly represents your Story. Choose one
                  that looks good at different sizes—it’ll appear on your Story
                  page
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
                <h2>Story Description (Optional) </h2>
                <p></p>
              </div>
              <div className="divInputTitle">
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter your story description..."
                  className="inputNewProjectTitle"
                  onChange={(e) => setDesc3(e.target.value)}
                  required
                />
              </div>
            </div>{" "}
            <div className="lineAll"> </div>
            <div className="divNewProjectH2AndInputTitle">
              <div className="divH2Title">
                <h2>Story image (Optional) </h2>
                <p>
                  Add an image that clearly represents your Story. Choose one
                  that looks good at different sizes—it’ll appear on your Story
                  page
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
              Submit
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

export default NewStory;
