import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Navbar from "../Navbar";
const Music = () => {
  const navigate = useNavigate();
  const [music, setMusic] = useState([]); // All projects, kind music
  const [search, setSearch] = useState("");

  // Get all projects, kind music
  const getData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/projectsKind/music`
    );
    setMusic(res.data);
  };

  // Invoke get all projects, kind music
  useEffect(() => {
    getData();
  }, []);

  // Navigate to project page
  const projectPage = (id) => {
    navigate(`/project/${id}`);
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
      </div>{" "}
      <div className="projects" id="allProjects">
        {music.length &&
          music
          // eslint-disable-next-line
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
    </div>
  );
};

export default Music;
