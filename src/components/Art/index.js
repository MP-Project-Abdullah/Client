import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import "./style.css";
const Art = () => {
  const navigate = useNavigate();
  const [art, setArt] = useState([]); // All projects, kind art
  const [search, setSearch] = useState("");

  const state = useSelector((state) => {
    return state;
  });

  // Get all projects, kind art
  const getData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/projectsKind/art`
    );
    setArt(res.data);
  };

  // Invoke get all projects, kind art
  useEffect(() => {
    getData();
  }, []);

  // Navigate to project page
  const projectPage = (id) => {
    navigate(`/project/${id}`);
  };

  const deleteProject = async (id) => {
    // eslint-disable-next-line
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
        {art.length &&
          art
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
                <div key={item._id} className="projectLeatset">
                  <div>
                    <img
                      className="leatestImg"
                      src={item.url[0]}
                      alt="project"
                      onClick={() => projectPage(item._id)}
                    />
                  </div>
                  <div className="divInsideLeatestProject">
                    <div onClick={() => projectPage(item._id)}>
                      <h2 className="titleLeatestProject">
                        Title: {item.title}
                      </h2>
                      <div className="pDescribe">
                        <p className="describeProjectLeatest">
                          {item.describe}
                        </p>
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
                    </div>
                    <div>
                      <div>
                        <p className="time">{item.time}</p>
                      </div>

                      {
                        // eslint-disable-next-line
                        state.signin_reducer.user.role ==
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
                        )
                      }
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Art;
