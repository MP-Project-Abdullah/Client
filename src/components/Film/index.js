import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
const Film = () => {
  const navigate = useNavigate();
  const [film, setFilm] = useState([]); // All projects, kind film
  const [search, setSearch] = useState("");

  // Get all projects, kind film
  const getData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/projectsKind/film`
    );
    setFilm(res.data);
  };

  // Invoke get all projects, kind film
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
      <div className="projects">
        {film.length &&
          film
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

export default Film;
