import React from "react";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Loading.css";

export const Loading = () => {
  return (
    <div className="divPadre">
      <div className="divHijo">
        <Spinner color="primary" />
      </div>
    </div>
  );
};

export default Loading;
