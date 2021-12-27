import React from "react";
import { Routes } from "react-router";
import { Route } from "react-router";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
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
import "./App.css";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/:art" element={<Art />} />
        <Route exact path="/profile" element={<Account />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/newProject" element={<NewProject />} />
        <Route
          exact
          path="/newPackage/:postId/:userId"
          element={<NewPackage />}
        />
        <Route exact path="/project/:id" element={<ProjectPage />} />
        <Route exact path="/donate/:projectId" element={<Donate />} />
        <Route exact path="/payment/:projectId/:donate" element={<Payment />} />
        <Route
          exact
          path="/successPay/:projectId/:donate"
          element={<SuccessPay />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
