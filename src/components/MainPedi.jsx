import React, { useState, useEffect } from "react";
import { Card, Container, CardGroup, Button, Row, Col } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import ComboVende from "./ComboVende";
import FechaIni from "./FechaIni";
import { FechaFin } from "./FechaFin";
import axios from "axios";
import Swal from "sweetalert";
import ListPedi from "./ListPedi";
import ComboPedi from "./ComboPedi";

export const MainPedi = () => {
  //Url de direccion

  const Urlpcarga = "ruta/saverut";
  const UrlPupd = "ruta/saverutdet";

  const [datos, setDatos] = useState({ id_usu: 0 });
  const [prods, setProds] = useState([]);
  const [conte, setConte] = useState();
  const [pedi, setPedi] = useState(1);
  const [vend, setVend] = useState(0);
  // console.log(pedi);

  const handleChange = ({ target }) => {
    setTimeout(
      setDatos({
        ...datos,
        [target.name]: target.value,
      }),
      1000
    );
    setVend(datos.id_usu);

    //console.log("Este es el cambio de id que aparece: " + datos.id_usu);
  };

  const produs = async () => {
    var temp = [];
    const UrlPpedi = "pedido/pedetanomxid/" + pedi;
    console.log(pedi);
    const response = await axios.get(UrlPpedi);
    const datos = response.data;
    datos.forEach((elem) => {
      const interm = {
        id_pdeta: elem.iD_PDETA,
        id_ped: elem.iD_PED,
        id_prod: elem.iD_PROD,
        nombre: elem.nombre,
        cantidad: elem.cantidad,
        precio: elem.precio,
        subtotal: elem.subtotal,
      };
      temp.push(interm);
    });
    console.log(temp);
    setProds(temp);
    console.log(prods);
    setConte(<ListPedi pedid={pedi} gene={temp}></ListPedi>);
  };

  return (
    <Container>
      <br></br>
      <Card className="md col-md-12">
        <CardHeader>
          <h3>Pedidos por Vendedor</h3>
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
                <Col className="md col6">
                  <ComboPedi idu={vend} selecpedi={setPedi} />
                </Col>
              </Row>
            </Col>
            <Container>
              {" "}
              <Row>
                <Button className="md col-6 offset-3" onClick={() => produs()}>
                  Mostrar
                </Button>
              </Row>
            </Container>
          </Card.Body>
          <Card.Body></Card.Body>
        </CardGroup>
      </Card>

      <Card>
        <CardGroup>
          <Card.Body>{conte}</Card.Body>
        </CardGroup>
      </Card>
    </Container>
  );
};
