import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Comment = ({ id }) => {
  const [comment, setComment] = useState([]); // All comment
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return state;
  });

  // Get all comment
  const getData = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/allComment/${id}`
    );
    setComment(res.data);
  };

  // Invoke getData
  useEffect(() => {
    getData();
  }, []);

  // Create new comment
  const newComment = async (e) => {
    e.preventDefault();
    if (state.signin_reducer.token.length > 0) {
      let res = axios.post(
        `${process.env.REACT_APP_BASE_URL}/newComment/${state.signin_reducer.user._id}/${id}`,
        {
          desc: e.target[0].value,
        }
      );
      getData();
    } else {
      navigate("/login");
    }
    e.target[0].value = "";
  };

  // Return
  return (
    <div>
      <form onSubmit={(e) => newComment(e)} className="formNewComment">
        <input type="text" name="comment" id="comment" className="newComment" placeholder="New comment..." />
        <input type="submit" value="Post" className="submitNewComment" />
      </form>
      {comment.length &&
        comment.map((item) => {
          return (
            <div className="containerComment" key={item._id}>
              <div className="divAvatarAndName">
                <div>
                  <img
                    src={item.user.avatar}
                    alt="avatarUser"
                    className="avatarComment"
                  />
                </div>
                <div>
                  {" "}
                  <p>{item.user.name}</p>
                  <p>@{item.user.username}</p>{" "}
                </div>
              </div>
              <div>
                <p className="pComment">{item.desc}</p>
              </div>
              <div>
                {" "}
                <p className="time">{item.time}</p>{" "}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Comment;
