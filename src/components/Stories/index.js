import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
const Stories = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]); // All projects, kind art

  // Get all projects, kind art
  const getData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/stories`
    );
    console.log(res.data);
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
      <div className="projects">
        {stories.length &&
          stories.map((item) => {
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
