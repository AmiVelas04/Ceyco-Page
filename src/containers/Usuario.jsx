import React from "react";
import NavBar from "../components/NavBar.jsx";
import MainUsu from "../components/MainUsu";

import { Container } from "react-bootstrap";

export const Usuario = () => {
  return (
    <div>
      <NavBar></NavBar>
      <MainUsu></MainUsu>
    </div>
  );
};

export default Usuario;
