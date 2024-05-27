import React from "react";
import { Container, Navbar } from "react-bootstrap";

import NavBar from "../components/NavBar.jsx";
import { MainDescarga } from "../components/MainDescarga.jsx";

export const Descarga = () => {
  return (
    <div>
      <NavBar></NavBar>
      <MainDescarga />
    </div>
  );
};
