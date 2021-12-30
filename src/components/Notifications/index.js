import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { BiNotification } from "react-icons/bi";
import "./style.css";
const Notifications = ({ toggle, setToggle, setMenu }) => {
  const [notif, setNotif] = useState([]);

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
        <div className="notifs">
          <div>
            {" "}
            {notif.length > 0 ? (
              notif.map((item) => {
                return (
                  <div key={item._id}>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.message}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <p className="test">Not</p>
                <p className="test">Not</p>
                <p className="test"> Not</p>
                <p className="test">Not</p>
                <p className="test">Not</p>
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
