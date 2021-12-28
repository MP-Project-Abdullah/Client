import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import Title from "react-vanilla-tilt";
import "./style.css";
import Comment from "../Comment";
import { useNavigate } from "react-router-dom";
const ProjectPage = () => {
  const id = useParams().id; // Get project id

  const navigate = useNavigate();

  const [project, setProject] = useState([]); // The project
  const [compaignComment, setCompaignComment] = useState(true); // Toggle between compaign and comment
  // const [green, setGreen] = useState(false);

  // Get project by id
  const getData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/project/${id}`
    );
    // if (res.data.pledged > res.data.goal) {
    //   setGreen(true);
    // }
    setProject(res.data);
  };

  // Invoke getData
  useEffect(() => {
    getData();
    // eslint-disable-next-line
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
                    src={item.url[0]}
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
                    <button
                      className="btnDonate"
                      onClick={() => navigate(`/donate/${item._id}`)}
                    >
                      Donate
                    </button>{" "}
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

                            {item.url[1] ? (
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
                                    <img src={item.url[1]} alt="project img" />
                                  </div>
                                </Title>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="divProjectPinfo">
                              <p className="projectPinfo">{item.desc1}</p>
                            </div>
                            {item.url[2] ? (
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
                                    <img src={item.url[2]} alt="project img" />
                                  </div>
                                </Title>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="divProjectPinfo">
                              <p className="projectPinfo">{item.desc2}</p>
                            </div>
                            {item.url[3] ? (
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
                                    <img src={item.url[3]} alt="project img" />
                                  </div>
                                </Title>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="divProjectPinfo">
                              <p className="projectPinfo">{item.desc3}</p>
                            </div>
                            {item.url[4] ? (
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
                                    <img src={item.url[4]} alt="project img" />
                                  </div>
                                </Title>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="divProjectPinfo">
                              <p className="projectPinfo">{item.desc4}</p>
                            </div>
                            {item.url[5] ? (
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
                                    <img src={item.url[5]} alt="project img" />
                                  </div>
                                </Title>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="divProjectPinfo">
                              <p className="projectPinfo">{item.desc5}</p>
                            </div>
                            {item.url[6] ? (
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
                                    <img src={item.url[6]} alt="project img" />
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
