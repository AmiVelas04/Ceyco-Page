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
  const URLgetpedi = "Pedido/pedvendexid/";

  const [datos, setDatos] = useState({ id_usu: 0 });
  const [prods, setProds] = useState([]);
  const [conte, setConte] = useState();
  const [pedi, setPedi] = useState([]);
  const [vend, setVend] = useState(0);
  const [encpedi, setEncpedi] = useState([]);
  // console.log(pedi);

  const getPedi = async (idusu) => {
    // console.log(idu);
    if (idusu === undefined) {
      // console.log("Usuario no definido: " + idu);
      return;
    }
    var ruta = URLgetpedi + idusu;
    console.log("Ruta para obtener pedido por usuario " + ruta);
    const response = (await axios.get(ruta)).data;
    // console.log(response);
    return response;
  };

  const handleChange = ({ target }) => {
    setTimeout(
      setDatos({
        ...datos,
        [target.name]: target.value,
      }),
      1000
    );
    console.log(datos.id_usu);
    //setVend(datos.id_usu);

    //console.log("Este es el cambio de id que aparece: " + datos.id_usu);
  };

  const elegir = async (idusu) => {
    // console.log(idusu);

    //hacer alggo con esa respuesta
    const devol = convtoArr(await getPedi(idusu));
    //console.log(devol);
    setEncpedi(devol);
  };

  const convtoArr = (ArrJson) => {
    var Into = [{}];
    //console.log(ArrJson);
    for (let indi in ArrJson) {
      //console.log(indi);

      Into.push([
        ArrJson[indi].iD_PED,
        ArrJson[indi].iD_CLI,
        ArrJson[indi].fecha,
        ArrJson[indi].iD_USU,
        ArrJson[indi].total,
        ArrJson[indi].estado,
      ]);
    }
    Into.splice(0, 1);
    // console.log(Into);
    return Into;
  };

  const produs = async () => {
    var temp = [];
    const UrlPpedi = "pedido/pedetanomxid/" + pedi;
    // console.log(pedi);
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
    //console.log(temp);
    setProds(temp);
    //console.log(prods);
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
                  <ComboVende vend={elegir}></ComboVende>
                </Col>
                <Col className="md col6">
                  <ComboPedi
                    idu={vend}
                    selecpedi={setPedi}
                    listaped={encpedi}
                  />
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
