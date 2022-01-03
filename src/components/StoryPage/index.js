import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "react-vanilla-tilt";
import Navbar from "../Navbar";
import "./style.css";
const StoryPage = () => {
  const id = useParams().id; // Get project id

  const [story, setStory] = useState([]); // Story info

  // Get Story by id
  const getData = async () => {
    console.log();
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/story/${id}`
    );
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
      <Navbar />
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
                    className="imgProjectInfo"     id="imgInfoId"
                    
                  />{" "}
                </div>
              </div>
              <div className="line"> </div>
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
                                  <img src={item.url[1]} alt="project img"  id="imgInfoId"/>
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
                                  <img src={item.url[2]} alt="project img"  id="imgInfoId"/>
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
                                  <img src={item.url[3]} alt="project img"  id="imgInfoId"/>
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
        })}
    </div>
  );
};

export default StoryPage;
