import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
const Art = () => {
  
  const navigate = useNavigate();
  const [art, setArt] = useState([]); // All projects, kind art

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

  // Return
  return (
    <div>
      <div className="projects">
        {art.length &&
          art.map((item) => {
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

export default Art;
