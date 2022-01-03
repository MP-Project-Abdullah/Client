import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./style.css";
const Stories = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]); // All projects, kind art
  const [search, setSearch] = useState("");

  // Get all projects, kind art
  const getData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/stories`);
    setStories(res.data);
  };

  // Invoke get all projects, kind art
  useEffect(() => {
    getData();
  }, []);

  // Navigate to project page
  const projectPage = (id) => {
    navigate(`/story/${id}`);
  };

  // Return
  return (
    <div>
      <Navbar />
      <div className="divSearchInput">
        <input
          type="text"
          name="search"
          id="search"
          className="inputSearch"
          placeholder="Search for project..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="projects" id="allProjects">
        {stories.length &&
          stories
            .filter((item) => {
              if (search === "") {
                return item;
              } else if (
                item.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item) => {
              return (
                <div
                  key={item._id}
                  className="projectLeatset"
                  onClick={() => projectPage(item._id)}
                >
                  <img className="leatestImg" src={item.img} alt="project" />
                  <div className="divInsideLeatestProject">
                    <h2 className="titleLeatestProject">Title: {item.title}</h2>
                    <div className="pDescribe">
                      <p className="describeProjectLeatest">{item.describe}</p>
                    </div>
                    <hr />

                    <div className="kindAndLocation"></div>
                    <p className="time">{item.time}</p>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Stories;
