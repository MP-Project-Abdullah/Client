import React from "react";
import "./style.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className="websiteName">Website name</h1>
      <div className="lineAll"></div>
      <ul className="ulNav">
        <li>Home</li>
        <li>Kind</li>
        <li>Kind</li>
        <li>Kind</li>
        <li>Profile</li>
      </ul>
      <div className="lineAll"></div>
    </div>
  );
};

export default Navbar;
