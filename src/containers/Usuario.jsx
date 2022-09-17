import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import MainUsu from "../components/MainUsu";
import axios from "axios";
import { Container } from "react-bootstrap";

export const Usuario = () => {
  return (
    <Container>
      <NavBar></NavBar>
      <MainUsu></MainUsu>
    </Container>
  );
};

export default Usuario;
