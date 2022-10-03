import React from "react";

import { Container } from "react-bootstrap";
import { MainCompra } from "../components/MainCompra";
import { NavBar } from "../components/NavBar";

export const Compra = () => {
  return (
    <div className="md-11">
      <NavBar></NavBar>
      <MainCompra></MainCompra>
    </div>
  );
};
