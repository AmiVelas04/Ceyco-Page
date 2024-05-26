import React from "react";
import { Container } from "react-bootstrap";

import NavBar from "../components/NavBar.jsx";
import MainGasto from "../components/MainGasto";
import { MainCredito } from "../components/MainCredito.jsx";

export const Credito = () => {
  return (
    <div>
      <NavBar></NavBar>
      <MainCredito></MainCredito>
    </div>
  );
};
