import React from "react";
import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AboutUs from "../AboutUs";
import { useNavigate } from "react-router-dom";
import Title from "react-vanilla-tilt";

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

  // Invoke getData
  useEffect(() => {
    getData();
  }, []);

  // Sum all donations
  const sumDonations = () => {
    let sum = 0;

    projects.map((item) => {
      sum += item.pledged;
    });
    setDonations(sum);
  };

  // Invoke sumDonations
  useEffect(() => {
    sumDonations();
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
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/storys`);
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
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/storys`);
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

  // Navigate to project page
  const projectPage = (id) => {
    navigate(`/project/${id}`);
  };

  // Return
  return (
    <div className="container">
      <div className="divImg">
        <div className="backgroundDiv"></div>
        <img
          src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="background"
          className="background"
        />
        <div className="totalDiv">
          {/* <h1 className="welcoming">Blab leb lab lob</h1> */}
          <div className="totalDonateProject">
            <div className="total">
              <Title
                style={{
                  height: "0",
                }}
              >
                <div> 
                  <h1>{donations} $</h1>
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
                  <h1> {totalProject} </h1>
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
                <img className="leatestImg" src={item.img} alt="project" />
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
            <div className="lastStory">
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
                  <div className="story" key={item._id}>
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
  );
};

export default Home;
