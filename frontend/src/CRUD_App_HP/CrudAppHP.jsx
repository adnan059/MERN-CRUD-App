import React from "react";

//import bootstrap css and js
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// Import custom css file
import "./CrudAppHP.css";


import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Edit from "./components/Edit";
import Home from "./components/Home";

import Register from "./components/Register";

const CrudAppHP = () => {
  return (
    <>
      <BrowserRouter>
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/view/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default CrudAppHP;
