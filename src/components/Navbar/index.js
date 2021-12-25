import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout_reducser } from "../../reducers/login";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    dispatch(logout_reducser());
    navigate("/login");
  };

  const state = useSelector((state) => {
    return state;
  });

  return (
    <div className="navbar">
      <h1 className="websiteName">Website name</h1>
      <div className="lineAll"></div>
      <ul className="ulNav">
        <li className="liFooter">
          {" "}
          <Link className="linkNav" to="/">
            Home
          </Link>
        </li>
        <li className="liFooter">
          {" "}
          <Link className="linkNav" to="/art">
            Art
          </Link>
        </li>
        <li className="liFooter">
          {" "}
          <Link className="linkNav" to="/film">
            Film
          </Link>
        </li>
        <li className="liFooter">
          {" "}
          <Link className="linkNav" to="/music">
            Music
          </Link>
        </li>
        <li className="liFooter">
          {" "}
          <Link className="linkNav" to="/comic">
            Comics & Illustration
          </Link>
        </li>
        <li className="liFooter">
          {" "}
          <Link className="linkNav" to="/profile">
            Profile
          </Link>
        </li>
        {state.signin_reducer.token ? (
          <li className="liFooter" onClick={logout}>
            Logout
          </li>
        ) : (
          <li className="liFooter">
            {" "}
            <Link className="linkNav" to="/login">
              Login
            </Link>
          </li>
        )}
      </ul>
      <div className="lineAll"></div>
    </div>
  );
};

export default Navbar;
