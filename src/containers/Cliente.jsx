import React from "react";
import { Container } from "react-bootstrap";
import { MainCli } from "../components/MainCli";
import { NavBar } from "../components/NavBar";

export const Cliente = () => {
  return (
    <div>
      <NavBar></NavBar>
      <MainCli></MainCli>
    </div>
  );
};
