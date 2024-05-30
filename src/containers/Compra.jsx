import React from "react";

import { Container } from "react-bootstrap";
import { MainCompra } from "../components/MainCompra";
import { NavBar } from "../components/NavBar";
import Cookies from "universal-cookie";

export const Compra = () => {
  const cookies = new Cookies();
  const id = cookies.get();
  return (
    <div>
      <NavBar></NavBar>
      <MainCompra idusu={id}></MainCompra>
    </div>
  );
};
