import React from "react";
import { Table } from "react-bootstrap";

export const ReporteGen = ({ datos, cabec, contenido }) => {
  return (
    <div>
      <center>
        <h2>{cabec.titulo}</h2>
      </center>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th># {datos.ini}</th>
            <th>{cabec.h1}</th>
            <th>{cabec.h2}</th>
            <th>{cabec.h3}</th>
            <th>{cabec.h4}</th>
          </tr>
        </thead>
        {contenido.map((valo, index) => (
          <tbody>
            <tr>
              <td>{index + 1}</td>
              <td>{valo.v1}</td>
              <td>{valo.v2}</td>
              <td>{valo.v3}</td>
              <td>{valo.v4}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default ReporteGen;
