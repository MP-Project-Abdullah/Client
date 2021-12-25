import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import Title from "react-vanilla-tilt";
import "./style.css";
import Comment from "../Comment";
const ProjectPage = () => {
  const id = useParams().id; // Get project id

  const [project, setProject] = useState([]); // The project
  const [compaignComment, setCompaignComment] = useState(true); // Toggle between compaign and comment

  // Get project by id
  const getData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/project/${id}`
    );
    setProject(res.data);
  };

  // Invoke getData
  useEffect(() => {
    getData();
  }, []);

  // Return
  return (
    <div>
      {project.length &&
        project.map((item) => {
          return (
            <div key={item._id} className="containerProjectAll">
              <div className="divTitleProject">
                <h1 className="h1Title">{item.title}</h1>
                <p className="pDescribeInfo">{item.describe}</p>
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
                    <p className="pGPD" id="goal">
                      Goal {item.goal} 💰
                    </p>
                  </div>
                  <div>
                    <p className="pGPD">Pledged {item.pledged}</p>{" "}
                  </div>
                  <div>
                    <p className="pGPD">Backers {item.deadline}</p>{" "}
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
              <div>
                <div className="divBtnsCC">
                  <div className="divBtnCompaign">
                    {compaignComment ? (
                      <button
                        className="btnCC"
                        onClick={() => setCompaignComment(true)}
                      >
                        {" "}
                        Compaign{" "}
                      </button>
                    ) : (
                      <button
                        style={{
                          background: "white",
                          color: "black",
                          border: "1px solid black",
                        }}
                        className="btnCC"
                        onClick={() => setCompaignComment(true)}
                      >
                        {" "}
                        Compaign{" "}
                      </button>
                    )}
                  </div>{" "}
                  {compaignComment ? (
                    <div className="divBtnComments">
                      <button
                        style={{
                          background: "white",
                          color: "black",
                          border: "1px solid black",
                        }}
                        className="btnCC"
                        onClick={() => setCompaignComment(false)}
                      >
                        Comment
                      </button>
                    </div>
                  ) : (
                    <div className="divBtnComments">
                      <button
                        className="btnCC"
                        onClick={() => setCompaignComment(false)}
                      >
                        Comment
                      </button>
                    </div>
                  )}
                </div>{" "}
              </div>
              <div>
                {compaignComment ? (
                  <div>
                    {project.length &&
                      project.map((item) => {
                        return (
                          <div key={item._id} className="containerProjectInfo">
                            <div className="divProjectPinfo">
                              <h1>Story</h1>
                              <p className="projectPinfo"> {item.desc}</p>
                            </div>

                            {item.img1 ? (
                              <div className="divTitle">
                                <Title
                                  style={{
                                    width: "55%",
                                    height: "60vh",
                                  }}
                                >
                                  <div
                                    data-tilt
                                    data-tilt-scale="1.1"
                                    className="divInfoProjectImg"
                                  >
                                    <img src={item.img1} alt="project img" />
                                  </div>
                                </Title>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="divProjectPinfo">
                              <p className="projectPinfo">{item.desc1}</p>
                            </div>
                            {item.img2 ? (
                              <div className="divTitle">
                                <Title
                                  style={{
                                    width: "55%",
                                    height: "60vh",
                                  }}
                                >
                                  <div
                                    data-tilt
                                    data-tilt-scale="1.1"
                                    className="divInfoProjectImg"
                                  >
                                    <img src={item.img2} alt="project img" />
                                  </div>
                                </Title>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="divProjectPinfo">
                              <p className="projectPinfo">{item.desc2}</p>
                            </div>
                            {item.img3 ? (
                              <div className="divTitle">
                                <Title
                                  style={{
                                    width: "55%",
                                    height: "60vh",
                                  }}
                                >
                                  <div
                                    data-tilt
                                    data-tilt-scale="1.1"
                                    className="divInfoProjectImg"
                                  >
                                    <img src={item.img3} alt="project img" />
                                  </div>
                                </Title>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="divProjectPinfo">
                              <p className="projectPinfo">{item.desc3}</p>
                            </div>
                            {item.img4 ? (
                              <div className="divTitle">
                                <Title
                                  style={{
                                    width: "55%",
                                    height: "60vh",
                                  }}
                                >
                                  <div
                                    data-tilt
                                    data-tilt-scale="1.1"
                                    className="divInfoProjectImg"
                                  >
                                    <img src={item.img4} alt="project img" />
                                  </div>
                                </Title>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="divProjectPinfo">
                              <p className="projectPinfo">{item.desc4}</p>
                            </div>
                            {item.img5 ? (
                              <div className="divTitle">
                                <Title
                                  style={{
                                    width: "55%",
                                    height: "60vh",
                                  }}
                                >
                                  <div
                                    data-tilt
                                    data-tilt-scale="1.1"
                                    className="divInfoProjectImg"
                                  >
                                    <img src={item.img5} alt="project img" />
                                  </div>
                                </Title>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="divProjectPinfo">
                              <p className="projectPinfo">{item.desc5}</p>
                            </div>
                            {item.img6 ? (
                              <div className="divTitle">
                                <Title
                                  style={{
                                    width: "55%",
                                    height: "60vh",
                                  }}
                                >
                                  <div
                                    data-tilt
                                    data-tilt-scale="1.1"
                                    className="divInfoProjectImg"
                                  >
                                    <img src={item.img6} alt="project img" />
                                  </div>
                                </Title>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="divProjectPinfo">
                              <p className="projectPinfo">{item.desc6}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="comment">
                    {" "}
                    <Comment id={id} />{" "}
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProjectPage;
