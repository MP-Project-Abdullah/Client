import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      {/* <div className="circle4"></div>
      <div className="circle5"></div>
      <div className="circle6"></div> */}

      <h1 className="websiteName">Website name</h1>
      <div className="lineAll"></div>
      <ul className="ulNav">
        <li className="liFooter">
          {" "}
          <Link className="linkNav" to="/">Home</Link>
        </li>
        <li className="liFooter">
          {" "}
          <Link className="linkNav" to="/art">Art</Link>
        </li>
        <li className="liFooter">
          {" "}
          <Link className="linkNav" to="/film">Film</Link>
        </li>
        <li className="liFooter">
          {" "}
          <Link className="linkNav" to="/music">Music</Link>
        </li>
        <li className="liFooter">
          {" "}
          <Link className="linkNav" to="/comic">Comics & Illustration</Link>
        </li>
        <li className="liFooter">
          {" "}
          <Link className="linkNav" to="/profile">Profile</Link>
        </li>
      </ul>
      <div className="lineAll"></div>
    </div>
  );
};

export default Navbar;
