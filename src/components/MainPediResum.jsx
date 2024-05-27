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
import MyPDF from "../documents/PedidoPdf";
import { PDFViewer } from "@react-pdf/renderer";

export const MainPediResum = () => {
  const GetProdPedi = "pedido/";
  const URL = "pedido/pedtotusu/1900-01-01/0";

  const getData = async () => {
    const response = axios.get(URL);
    return response;
  };

  const [datos, setDatos] = useState([]);
  const [produs, setProdus] = useState([]);
  const [vende, setVende] = useState(0);
  const [isShown, setIsShown] = useState(false);

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

  const allprodu = async (idusu) => {
    console.log(vende);
    if (datos.fechai == null) {
      await Swal(
        "Fechas!",
        "No se ha seleccionado una fecha para los pedidos",
        "warning"
      );
      return;
    }
    if (vende == null) {
      await Swal(
        "Vendendedor!",
        "No se ha seleccionado un vendedor para revisar los pedidos",
        "warning"
      );
      return;
    }
    var temp = [];
    const urlDicioCaja =
      GetProdPedi + "DiccioCajaAll/" + datos.fechai + "/" + vende;

    const urlDiccioUni =
      GetProdPedi + "DiccioUniAll/" + datos.fechai + "/" + vende;

    //const UrlPedRes = urlpedpord;
    //console.log(urlpedpord);
    const response1 = await axios.get(urlDicioCaja);
    const response2 = await axios.get(urlDiccioUni);

    //console.log(urlDicioCaja);
    //console.log(urlDiccioUni);

    const dresp1 = response1.data;
    const dresp2 = response2.data;
    // console.log(dresp1);
    //console.log(dresp2);

    dresp1.forEach((elem, index) => {
      // console.log(elem);

      const interm = {
        id_prod: elem.id_prod,
        nombre: elem.nombre,
        descrip: elem.descrip,
        costo: "0",
        pmin: "0",
        pven: "0",
        caduc: "0",
        cantidad: elem.cantidad,
        conte: "Caja",
      };
      //  console.log(interm);
      temp.push(interm);
    });

    dresp2.forEach((elem1) => {
      const interm = {
        id_prod: elem1.id_prod,
        nombre: elem1.nombre,
        descrip: elem1.descrip,
        costo: "0",
        pmin: "0",
        pven: "0",
        caduc: "0",
        cantidad: elem1.cantidad,
        conte: "Unidad",
      };
      temp.push(interm);
    });

    // console.log(temp);
    // console.log(response.data);
    // const devol = convtoArr(temp);
    // console.log(devol);
    //setProdus(devol);
    setProdus(temp);
  };

  const elegir = async (idusu) => {
    //  console.log(idusu);
    setVende(idusu);
    //hacer alggo con esa respuesta
    // const devol = convtoArr(await getPedi(idusu));
    // console.log(devol);
    //setEncpedi(devol);
  };

  let conte = produs.map((pedis, index) => {
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

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

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
                  <ComboVende vend={elegir}></ComboVende>
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
            <MyPDF conte={produs} fecha={datos.fechai}></MyPDF>
          </Card.Body>
        </CardGroup>
      </Card>
    </Container>
  );
};
