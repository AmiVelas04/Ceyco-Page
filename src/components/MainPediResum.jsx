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
import FechaIni from "./FechaIni";
import ComboVende from "./ComboVende";
import axios from "axios";
import Swal from "sweetalert";

export const MainPediResum = () => {
  const GetProdPedi = "pedido/";
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
    //console.log(ArrJson);
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
      ]);
    }
    Into.splice(0, 1);
    return Into;
  };

  const allprodu = async () => {
    if (datos.fechai == null) {
      await Swal(
        "Fechas!",
        "No se ha seleccionado una fecha para los pedidos",
        "warning"
      );
      return;
    }
    if (datos.id_usu == null) {
      await Swal(
        "Vendendedor!",
        "No se ha seleccionado un vendedor para revisar los pedidos",
        "warning"
      );
      return;
    }
    var temp = [];
    const urlpedpord =
      GetProdPedi + "pedtotusu/" + datos.fechai + "/" + datos.id_usu;
    const UrlPedRes = urlpedpord;
    const response = await axios.get(UrlPedRes);
    const dresp = response.data;
    dresp.forEach((elem) => {
      const interm = {
        id_prod: elem.id_prod,
        nombre: elem.nombre,
        descrip: elem.descrip,
        costo: elem.costo,
        pmin: elem.pmin,
        pven: elem.pven,
        caduc: elem.caduc,
        cantidad: elem.cantidad,
      };
      temp.push(interm);
    });
    console.log(response.data);
    //const devol = convtoArr(response.data);
    //setProdus(devol);
    setProdus(temp);
  };

  let conte = produs.map((pedis, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{pedis.id_prod}</td>
        <td>{pedis.nombre}</td>
        <td>{pedis.descrip}</td>
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
      <br></br>
      <Card>
        <CardHeader>
          <h3>Resumen de pedidos</h3>
        </CardHeader>
      </Card>
      <Card>
        <CardGroup>
          <Card.Body className="md col-12">
            <Col>
              <Row>
                <Col className="md col-6">
                  <ComboVende vend={handleChange}></ComboVende>
                </Col>
                <Col className="md col-6">
                  Fecha de pedido
                  <FechaIni fecha={handleChange}></FechaIni>
                </Col>
              </Row>
              <Row>
                <Button onClick={() => allprodu()}>Mostrar</Button>
              </Row>
            </Col>
          </Card.Body>
        </CardGroup>
      </Card>
      <Card>
        <CardHeader>
          <h3>Listado general de productos de pedidos</h3>
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
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>{conte}</tbody>
            </Table>
          </Card.Body>
        </CardGroup>
      </Card>
    </Container>
  );
};
