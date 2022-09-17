import React from "react";
import NavBar from "../components/NavBar.jsx";

import { Container } from "react-bootstrap";
import { MainProdu } from "../components/MainProdu.jsx";

export const Producto = () => {
  return (
    <Container>
      <NavBar></NavBar>
      <MainProdu></MainProdu>
    </Container>
  );
};
