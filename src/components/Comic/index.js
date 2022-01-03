import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";

const Comic = () => {
  const navigate = useNavigate();
  const [comic, setComic] = useState([]); // All projects, kind comic
  const [search, setSearch] = useState("");

  const state = useSelector((state) => {
    return state;
  });
  // Get all projects, kind comic
  const getData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/projectsKind/comic`
    );
    setComic(res.data);
  };

  // Invoke get all projects, kind comic
  useEffect(() => {
    getData();
  }, []);

  // Navigate to project page
  const projectPage = (id) => {
    navigate(`/project/${id}`);
  };

  const deleteProject = async (id) => {
    let res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/deleteProject/${id}`,
      {
        headers: { Authorization: `Bearer ${state.signin_reducer.token}` },
      }
    );
    getData();
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
        {comic.length &&
          comic
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
                  {state.signin_reducer.user.role ==
                  "61c04770ff8aeaad62406e9b" ? (
                    <div className="divBtnDelete">
                      {" "}
                      <button
                        className="btnDelete"
                        onClick={() => deleteProject(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Comic;
