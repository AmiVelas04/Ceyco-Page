import React from "react";

import NavBar from "../components/NavBar";
import { MainRepCredito, ReporteCredito } from "../components/MainRepoCredito";
import { MainRepCompra } from "../components/MainRepCompra";

export const RepCredito = () => {
  return (
    <div>
      <NavBar></NavBar>
      <MainRepCredito></MainRepCredito>
    </div>
  );
};
