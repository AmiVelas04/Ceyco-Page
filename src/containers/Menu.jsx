import React from "react";
import { Container, Navbar } from "react-bootstrap";
import Cookies from "universal-cookie";
import NavBar from "../components/NavBar";

export const Menu = () => {
  const cookies = new Cookies();
  console.log(cookies.get("user"));
  return <NavBar />;
};
