import React from "react";
import { Container } from "react-bootstrap";
import { NavBar } from "../components/NavBar";
import { MainPedi } from "../components/MainPedi";

export const Pedido=()=>{
    return  (
        <div>
  <NavBar></NavBar>
<MainPedi></MainPedi>
        </div>
        
   );
}