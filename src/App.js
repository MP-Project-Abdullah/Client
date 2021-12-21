import React from "react";
import { Routes } from "react-router";
import { Route } from "react-router";
import Register from "./components/Register";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
