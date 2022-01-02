import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div>
        <ul className="ulFooter">
          <li className="liFooter">
            <Link className="linkNav" to="/contact">
              Contact us
            </Link>
          </li>
          <li className="liFooter">
            {" "}
            <Link className="linkNav" to="/">
              Twitter
            </Link>
          </li>
          <li className="liFooter">
            {" "}
            <Link className="linkNav" to="/">
              Instgram
            </Link>
          </li>
          <li className="liFooter">
            {" "}
            <Link className="linkNav" to="/">
              Facebook
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <p> website name, PBC © 2021</p>
      </div>
      <div>
        {" "}
        <ul className="ulFooter">
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
        </ul>
      </div>
    </div>
  );
};

export default Footer;
