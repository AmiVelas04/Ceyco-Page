import React from "react";
import { Container } from "react-bootstrap";
import { MainVenta } from "../components/MainVenta";
import { NavBar } from "../components/NavBar";

export const Venta = () => {
  return (
    <Container>
      <NavBar></NavBar>
      <MainVenta></MainVenta>
    </Container>
  );
};
