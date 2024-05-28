import React from "react";
import NavBar from "../components/NavBar";
import { MainRepCarga } from "../components/MainRepCarga";
import { Container } from "react-bootstrap";

export const RepCarga = () => {
  return (
    <Container>
      <NavBar></NavBar>
      <MainRepCarga></MainRepCarga>
    </Container>
  );
};
