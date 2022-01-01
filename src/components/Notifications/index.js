import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { BiNotification } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import "./style.css";
const Notifications = ({ toggle, setToggle, setMenu }) => {
  const [notif, setNotif] = useState([]);

  const [colorNotf, setColorNotf] = useState(false);
  const [homeNotif, setHomeNotif] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const state = useSelector((state) => {
    return state;
  });
  const getData = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getNotif/${state.signin_reducer.user._id}`
    );

    setNotif(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const changeColor = () => {
    if (window.scrollY > 250) {
      setColorNotf(true);
    } else {
      setColorNotf(false);
    }
  };
  window.addEventListener("scroll", changeColor);

  const hider = () => {
    if (window.location.href == "http://localhost:3000/") {
      setHomeNotif(true);
    } else {
      setHomeNotif(false);
    }
  };

  useEffect(() => {
    hider();
  }, []);

  const showMessageFunction = async (id) => {
    let res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/showHide/${id}`
    );
    getData();
  };

  const deleteNotif = async (id) => {
    console.log(id);
    let res = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/deleteNotif/${id}`
    );
    console.log(res.data);
    getData();
  };

  return (
    <div className="notif">
      <div className="containerNotif">
        {" "}
        <BiNotification
          className="iconNotif"
          onClick={() => {
            setToggle(!toggle);
            setMenu(false);
          }}
        />
      </div>
      {toggle ? (
        <div
          className={homeNotif ? (colorNotf ? "notHome" : "notifs") : "notHome"}
        >
          <div>
            {" "}
            {notif.length > 0 ? (
              notif.map((item, i) => {
                return (
                  <div key={item._id}>
                    <div>
                      <div className="divAprrovedAndIcon">
                        <div>
                          <h4
                            className="titleNotif"
                            onClick={() => {
                              showMessageFunction(item._id);
                            }}
                          >
                            {item.title}
                          </h4>
                        </div>
                        <div>
                          {" "}
                          <MdDeleteOutline
                            className="deleteNotif"
                            onClick={() => deleteNotif(item._id)}
                          />
                        </div>
                      </div>
                      <hr />
                      {item.showMessage == true ? (
                        <p
                          className="messageNotif"
                          onClick={() => {
                            showMessageFunction(item._id);
                          }}
                        >
                          {" "}
                          {item.message}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <p className="test">You have no notifications</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notifications;