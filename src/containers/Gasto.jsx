import React from "react";
import { Container } from "react-bootstrap";

import NavBar from "../components/NavBar.jsx";
import MainGasto from "../components/MainGasto";

export const Gasto = () => {
  return (
    <div>
      <NavBar></NavBar>
      <MainGasto></MainGasto>
    </div>
  );
};
