import React from "react";
import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AboutUs from "../AboutUs";
import { useNavigate } from "react-router-dom";
import Title from "react-vanilla-tilt";
import Navbar from "../Navbar";
import CountUp from "react-countup";

const Home = () => {
  const [latestWork, setLatestWork] = useState([]); // Leatest work
  const [stories, setStories] = useState([]); // All stories
  const [lastStory, setLastStory] = useState([]); // Leatest stories
  const [donations, setDonations] = useState(""); // All donations
  const [projects, setProjects] = useState([]); // All projects
  const [totalProject, setTotalProject] = useState(0); // Total projects

  const navigate = useNavigate();

  // Get all project
  const getData = async () => {
    let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/projects`);
    setProjects(res.data);
    setTotalProject(res.data.length);
  };

  // Sum all donations
  const sumDonations = () => {
    let sum = 0;

    projects.map((item) => {
      return (sum += item.pledged);
    });
    setDonations(sum);
  };

  // Invoke sumDonations
  useEffect(() => {
    sumDonations();
    // eslint-disable-next-line
  }, [projects]);

  // Get leatest project
  const getLetestWork = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/projects`);
    let newArr = [];
    for (let i = res.data.length - 1; i > res.data.length - 5; i--) {
      if (i > -1) {
        newArr.push(res.data[i]);
      }
    }
    setLatestWork(newArr);
  };

  // Get stories
  const getStories = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/stories`);
    let newArr = [];
    for (let i = res.data.length - 2; i > res.data.length - 4; i--) {
      if (i > -1) {
        newArr.push(res.data[i]);
      }
    }
    setStories(newArr);
  };

  // Get leatest story
  const getLastStory = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/stories`);
    let newArr = [];
    for (let i = res.data.length - 1; i > res.data.length - 2; i--) {
      if (i > -1) {
        newArr.push(res.data[i]);
      }
    }
    setLastStory(newArr);
  };

  // Invoke getLastStory
  useEffect(() => {
    getLastStory();
  }, []);

  // Invoke getStories
  useEffect(() => {
    getStories();
  }, []);

  // Invoke getLetestWork
  useEffect(() => {
    getLetestWork();
  }, []);

  // Invoke getData
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
      <div className="container">
        <div className="divImg">
          <div className="backgroundDiv"></div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-2-4f59d.appspot.com/o/pexels-photo-2325446.jpeg?alt=media&token=b059e7b2-e0a8-480e-accc-59608134cd68"
            alt="background"
            className="background"
          />
          <div className="totalDiv">
            <div className="totalDonateProject">
              <div className="total">
                <Title
                  style={{
                    height: "0",
                  }}
                >
                  <div>
                    <CountUp start={0} end={donations} duration={5} />
                    <p>Total donations </p>
                  </div>
                </Title>
              </div>

              <div className="total">
                <Title
                  style={{
                    height: "0",
                  }}
                >
                  <div>
                    <CountUp start={0} end={totalProject} duration={2.75} />
                    <p>Total projects</p>
                  </div>
                </Title>
              </div>
            </div>
          </div>
        </div>

        <h1 className="h1Leatest">Leatest work</h1>
        <div className="projectLeatsetDiv">
          {latestWork &&
            latestWork.map((item) => {
              return (
                <div
                  key={item._id}
                  className="projectLeatset "
                  onClick={() => projectPage(item._id)}
                >
                  <img className="leatestImg" src={item.url[0]} alt="project" />
                  <div className="divInsideLeatestProject">
                    <h2 className="titleLeatestProject">Title: {item.title}</h2>
                    <div className="pDescribe">
                      <p className="describeProjectLeatest">{item.describe}</p>
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
            })}
        </div>
        <div className="line"></div>
        <h1 className="h1Success">Success storys</h1>
        <div className="containerStory">
          <div className="storyDiv">
            {lastStory.length && (
              <div
                className="lastStory"
                onClick={() => storyPage(lastStory[0]._id)}
              >
                <img
                  className="lastStoryImg"
                  src={lastStory[0].img}
                  alt="imgStory"
                />{" "}
                <div className="paddingPandTitle">
                  <h2>{lastStory[0].title}</h2>
                  <div className="lineFirst"></div>

                  <p className="lastStoryP">{lastStory[0].desc}</p>
                </div>
              </div>
            )}
            <div className="lineBetween"> </div>
            <div className="storysDiv">
              {stories.length &&
                stories.map((item) => {
                  return (
                    <div
                      className="story"
                      key={item._id}
                      onClick={() => storyPage(item._id)}
                    >
                      <img className="imgStory" src={item.img} alt="story" />
                      <div className="paddingPandTitle">
                        <h2 className="titleStory">{item.title}</h2>
                        <div className="lineFirst"></div>
                        <p className="descStorys">{item.desc}</p>
                      </div>
                      <div className="lineBetweenStory"> </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="aboutUs">
          <AboutUs />
        </div>
      </div>
    </div>
  );
};

export default Home;
