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
            <Link className="linkNav" to="/twitter">
              Twitter
            </Link>
          </li>
          <li className="liFooter">
            {" "}
            <Link className="linkNav" to="/instgram">
              Instgram
            </Link>
          </li>
          <li className="liFooter">
            {" "}
            <Link className="linkNav" to="/facebook">
              Facebook
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <p> iogjoidj vgadk io g irn agin vndvi ni nvdsia ndi ngui</p>
      </div>
      <div>
        {" "}
        <ul className="ulFooter">
          <li className="liFooter">Art</li>
          <li className="liFooter">Film</li>
          <li className="liFooter">Music</li>
          <li className="liFooter">Comics & Illustration</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
