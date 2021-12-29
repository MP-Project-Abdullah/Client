import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout_reducser } from "../../reducers/login";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const dispatch = useDispatch();

  const [menu, setMenu] = useState(false);
  const [toggleCss, setToggleCss] = useState(true);

  const logout = () => {
    localStorage.clear();
    dispatch(logout_reducser());
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
          <Link
            className="linkNav"
            to="/"
            onClick={() => {
              setMenu(false);
              setToggleCss(true);
            }}
          >
            Home
          </Link>
        </li>
        <li className="liFooter">
          {" "}
          <Link
            className="linkNav"
            to="/art"
            onClick={() => {
              setMenu(false);
              setToggleCss(true);
            }}
          >
            Art
          </Link>
        </li>
        <li className="liFooter">
          {" "}
          <Link
            className="linkNav"
            to="/film"
            onClick={() => {
              setMenu(false);
              setToggleCss(true);
            }}
          >
            Film
          </Link>
        </li>
        <li className="liFooter">
          {" "}
          <Link
            className="linkNav"
            to="/music"
            onClick={() => {
              setMenu(false);
              setToggleCss(true);
            }}
          >
            Music
          </Link>
        </li>
        <li className="liFooter">
          {" "}
          <Link
            className="linkNav"
            to="/comic"
            onClick={() => {
              setMenu(false);
              setToggleCss(true);
            }}
          >
            Comics & Illustration
          </Link>
        </li>
        <li className="liFooter">
          {" "}
          <Link
            className="linkNav"
            to="/stories"
            onClick={() => {
              setMenu(false);
              setToggleCss(true);
            }}
          >
            Success Stories
          </Link>
        </li>

        <div>
          {" "}
          <li>
            <div>
              <p
                onClick={() => {
                  setMenu(!menu);
                  setToggleCss(!toggleCss);
                  console.log(toggleCss, "TOGLE CSS");
                }}
                className="linkNav"
              >
                <IoMdArrowDropdown className="iconMenu" /> Menu
              </p>
            </div>
            <div className="menu">
              {menu ? (
                <div className="menuOptions">
                  {" "}
                  <ul className="ulMenu">
                    <li className="liFooter" id="linkMenuu">
                      {" "}
                      <Link
                        className="linkNav"
                        id="menuLink"
                        to="/profile"
                        onClick={() => setMenu(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <div className="marginLinks"></div>
                    <li className="liFooter" id="linkMenuu">
                      {" "}
                      <Link
                        className="linkNav"
                        id="menuLink"
                        to="/newProject"
                        onClick={() => setMenu(false)}
                      >
                        New Project
                      </Link>
                    </li>
                    <div className="marginLinks"></div>
                    <li className="liFooter" id="linkMenuu">
                      {" "}
                      <Link
                        className="linkNav"
                        id="menuLink"
                        to="/newStory"
                        onClick={() => setMenu(false)}
                      >
                        New Story
                      </Link>
                    </li>
                    <div className="marginLinks"></div>
                    {state.signin_reducer.token ? (
                      <>
                        <li
                          className="liFooter"
                          onClick={logout}
                          id="linkMenuu"
                        >
                          <Link
                            className="linkNav"
                            id="menuLink"
                            to="/login"
                            onClick={() => setMenu(false)}
                          >
                            Logout
                          </Link>
                        </li>
                        <div className="marginLinks"></div>
                      </>
                    ) : (
                      <li className="liFooter" id="linkMenuu">
                        {" "}
                        <Link
                          className="linkNav"
                          id="menuLink"
                          to="/login"
                          onClick={() => setMenu(false)}
                        >
                          Login
                        </Link>
                      </li>
                    )}

                    <div className="marginLinks"></div>
                    <li className="liFooter" id="liDashboard">
                      {state.signin_reducer.token ? (
                        <div>
                          {" "}
                          {state.signin_reducer.user.role ===
                          "61c04770ff8aeaad62406e9b" ? (
                            <>
                              {" "}
                              <Link
                                className="linkNav"
                                id="menuLink"
                                to="/dashboard"
                                onClick={() => setMenu(false)}
                              >
                                Dashboard
                              </Link>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </li>
                  </ul>{" "}
                </div>
              ) : (
                ""
              )}
            </div>
          </li>
        </div>
      </ul>
      <div className="lineAll"></div>
    </div>
  );
};

export default Navbar;
