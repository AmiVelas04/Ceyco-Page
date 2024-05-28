import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  CardGroup,
  Button,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

import axios from "axios";
import Swal from "sweetalert";
import MyPDF from "../documents/PedidoPdf";
import { PDFViewer } from "@react-pdf/renderer";
import ResumVenDescarga from "../documents/ResumDescarga";

export const ListDescarga = ({ fecha, todos, nom }) => {
  const URL = "pedido/pedtotusu/1900-01-01/0";

  const getData = async () => {
    const response = axios.get(URL);
    return response;
  };

  const [datos, setDatos] = useState([]);
  const [produs, setProdus] = useState([]);

  const handleChange = ({ target }) => {
    setTimeout(
      setDatos({
        ...datos,
        [target.name]: target.value,
      }),
      1000
    );
  };

  const convtoArr = (ArrJson) => {
    var Into = [{}];
    console.log(ArrJson);
    for (let indi in ArrJson) {
      // console.log(ArrJson.length);
      Into.push([
        ArrJson[indi].id_prod,
        ArrJson[indi].nombre,
        ArrJson[indi].descrip,
        ArrJson[indi].costo,
        ArrJson[indi].pmin,
        ArrJson[indi].pven,
        ArrJson[indi].cantidad,
        ArrJson[indi].caduc,
        ArrJson[indi].unidad,
      ]);
    }
    Into.splice(0, 1);
    //console.log(Into);
    return Into;
  };

  let conte = todos.map((pedis, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{pedis.id_prod}</td>
        <td>{pedis.nombre}</td>
        <td>{pedis.descrip}</td>
        <td> {pedis.conte}</td>
        <td>{pedis.cantidad}</td>
      </tr>
    );
  });

  useEffect(() => {
    //usefect body
    getData().then((response) => {
      //hacer alggo con esa respuesta
      const devol = convtoArr(response.data);
      setProdus(devol);
    });
  }, []);

  return (
    <Container>
      <Card>
        <CardHeader>
          <h3>Listado de descarga</h3>
        </CardHeader>
      </Card>
      <Card>
        <CardGroup>
          <Card.Body>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Codigo</th>
                  <th>Producto</th>
                  <th>Descripcion</th>
                  <th>Unidad/Caja</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>{conte}</tbody>
            </Table>
          </Card.Body>
        </CardGroup>
      </Card>

      <Card>
        <CardGroup>
          <Card.Body>
            <ResumVenDescarga
              conte={todos}
              fecha={fecha}
              Vende={nom}
            ></ResumVenDescarga>
          </Card.Body>
        </CardGroup>
      </Card>
    </Container>
  );
};
