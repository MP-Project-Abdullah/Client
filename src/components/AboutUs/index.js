import React from "react";
import "./style.css";
const AboutUs = () => {
  return (
    <div className="aboutus">
      <div className="ourMission">
        <h1>Our mission is to help bring creative</h1>
        <h1> projects to life.</h1>
      </div>
      <div className="aboutDiv">
        <img
          className="imgAbout"
          src="https://www.bkacontent.com/wp-content/uploads/2020/06/about-us.jpg"
          alt="about us"
        />
        <p className="pAbout">
          [website name] campaigns make ideas into reality. It’s where creators
          share new visions for creative work with the communities that will
          come together to fund them.
        </p>

        <p className="pAbout">
          Our mission is to help bring creative projects to life. We believe
          that art and creative expression are essential to a healthy and
          vibrant society, and the space to create requires protection.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
