import React from "react";
import { Routes } from "react-router";
import { Route } from "react-router";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Art from "./components/Art";
import Account from "./components/Account";
import ProjectPage from "./components/ProjectPage";
import Reset from "./components/Reset";
import NewProject from "./components/NewProject";
import NewPackage from "./components/newPackage";
import Donate from "./components/Donate";
import Payment from "./components/Payment";
import SuccessPay from "./components/SuccessPay";
import Dashboard from "./components/Dashboard";
import Film from "./components/Film";
import NewStory from "./components/newStory";
import Stories from "./components/Stories";
import StoryPage from "./components/StoryPage";
import Comic from "./components/Comic";
import Music from "./components/Music";
import ContactUs from "./components/ContactUs";
import Confirm from "./components/Confirm";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/art" element={<Art />} />
        <Route exact path="/film" element={<Film />} />
        <Route exact path="/music" element={<Music />} />
        <Route exact path="/comic" element={<Comic />} />
        <Route exact path="/contact" element={<ContactUs />} />
        <Route exact path="/confirm/:id" element={<Confirm />} />

        <Route exact path="/stories" element={<Stories />} />
        <Route exact path="/story/:id" element={<StoryPage />} />

        <Route exact path="/profile" element={<Account />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/newProject" element={<NewProject />} />
        <Route exact path="/newStory" element={<NewStory />} />

        <Route
          exact
          path="/newPackage/:postId/:userId"
          element={<NewPackage />}
        />
        <Route exact path="/project/:id" element={<ProjectPage />} />
        <Route exact path="/donate/:projectId" element={<Donate />} />
        <Route
          exact
          path="/payment/:projectId/:donate/:packageId"
          element={<Payment />}
        />
        <Route
          exact
          path="/successPay/:projectId/:donate/:packageId"
          element={<SuccessPay />}
        />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
