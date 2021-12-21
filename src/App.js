import React from "react";
import { Routes } from "react-router";
import { Route } from "react-router";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
