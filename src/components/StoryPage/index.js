import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import Title from "react-vanilla-tilt";
import "./style.css";
import { useNavigate } from "react-router-dom";
const StoryPage = () => {
  const id = useParams().id; // Get project id

  const navigate = useNavigate();

  const [story, setStory] = useState([]);
  const [compaignComment, setCompaignComment] = useState(true); // Toggle between compaign and comment

  // Get project by id
  const getData = async () => {
    console.log();
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/story/${id}`
    );
    console.log(res.data);
    setStory(res.data);
  };

  // Invoke getData
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  // Return
  return (
    <div>
      <h1>Story page</h1>
      {story.length &&
        story.map((item) => {
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
                </div>
              </div>
              <div>
                <div className="divBtnsCC">
                  <div className="divBtnCompaign"></div>{" "}
                </div>{" "}
              </div>
              <div>
                <div>
                  {story.length &&
                    story.map((item) => {
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
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })
        }
    </div>
  );
};

export default StoryPage;
