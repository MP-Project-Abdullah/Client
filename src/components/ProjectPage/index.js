import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";

import "./style.css";
const ProjectPage = () => {
  const id = useParams().id;

  const [project, setProject] = useState([]);
  const getData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/project/${id}`
    );
    setProject(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {project.length &&
        project.map((item) => {
          return (
            <div>
              <div className="divTitleProject">
                <h1 className="h1Title">{item.title}</h1>
              </div>
              <div className="containerInfoProject">
                <div>
                  {" "}
                  <img
                    src={item.img}
                    alt="projectImg"
                    className="imgProjectInfo"
                  />{" "}
                  <div className="divLK">
                    <p className="pLocation">
                      <IoLocationSharp />
                      {item.location}
                    </p>{" "}
                    <p className="pKind">{item.kind}</p>
                  </div>
                </div>
                <div className="divGPD">
                  {" "}
                  <div>
                    <p className="pGPD">Goal {item.goal}$</p>
                  </div>
                  <div>
                    <p className="pGPD">Pledged :{item.pledged}</p>{" "}
                  </div>
                  <div>
                    <p className="pGPD">Deadline :{item.deadline}</p>{" "}
                  </div>
                  <div className="divDonateBtn">
                    <button className="btnDonate">Donate</button>{" "}
                  </div>
                  <div>
                    {" "}
                    <p className="pDeadline">
                      {" "}
                      This project will only be funded if it reaches its goal by{" "}
                      {item.deadline} days left
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProjectPage;
