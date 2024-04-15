import React from "react";

import Cookies from "universal-cookie";
import NavBar from "../components/NavBar";
//import fond from "../Images/Fondo.jpg";

export const Menu = () => {
  //console.log(cookies.get("user"));
  return (
    <div style={{ backgroundImage: "./Images/Fondo.jpg" }}>
      <NavBar />
    </div>
  );
};
