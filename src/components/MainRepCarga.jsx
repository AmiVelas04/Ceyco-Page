import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  ListGroup,
  Button,
  Col,
  Row,
  CardGroup,
  Table,
} from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import { FechaIni } from "./FechaIni";

import ComboVende from "./ComboVende";

import Swal from "sweetalert";
import ResumVenPed from "../documents/ResumPedidoPdf";

export const MainRepCarga = () => {
  const Url1 = "Pedido/DiccioCajaAll/";
  const Url2 = "Pedido/DiccioUniAll/";

  const [produs, setProdus] = useState([]);
  const [dataForm, setDataForm] = useState([]);
  const [vende, setVende] = useState({});
  const [allVende, setAllVende] = useState([]);
  const [nomVende, setNomVende] = useState("(No seleccionado)");

  const getvend = async () => {
    const response = axios.get("Usuario/Usuvend");
    return response;
  };
  const handleChange = ({ target }) => {
    setDataForm({
      ...dataForm,
      [target.name]: target.value,
    });
  };

  const nomUsu = async (idusu) => {
    const urlusu = "Usuario/usubyid/" + idusu;
    const response = await axios.get(urlusu);
    const resp = response.data;
    // console.log(resp[0].nombre);
    setNomVende(resp[0].nombre);
    return resp[0].nombre;
  };

  const buscarCarga = async () => {
    if (dataForm.fechai == null) {
      await Swal(
        "Fechas!",
        "No se ha seleccionado la fecha inicial",
        "warning"
      );
      return;
    }

    var temp = [];
    // console.log(dataForm);
    const urlCaja = Url1 + dataForm.fechai + "/" + vende;
    const urlUni = Url2 + dataForm.fechai + "/" + vende;
    const response1 = await axios.get(urlCaja);
    const response2 = await axios.get(urlUni);
    const resp1 = response1.data;
    const resp2 = response2.data;
    setNomVende(await nomUsu(vende));
    resp1.forEach((elem, index) => {
      // console.log(elem);
      var pescaja= elem.cantidad*elem.peso;
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
        peso:pescaja
      };
      //  console.log(interm);
      temp.push(interm);
    });

    resp2.forEach((elem1) => {
      var pesindi=elem1.peso*elem1.cantidad;
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
        peso:pesindi
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

  let conte = produs.map((pedis, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{pedis.id_prod}</td>
        <td>{pedis.nombre}</td>
        <td>{pedis.descrip}</td>
        <td> {pedis.conte}</td>
        <td>{pedis.cantidad}</td>
        <td>{pedis.peso}</td>
      </tr>
    );
  });

  useEffect(() => {
    //usefect body
    getvend().then((response) => {
      //hacer alggo con esa respuesta
      setAllVende(response.data);
      //console.log(response.data);
    });
  }, []);

  return (
    <div>
      <Container>
        <br></br>
        <Card border="dark" style={{ width: "80rem" }}>
          <Card.Header>
            <div className="text-center">
              <h2>Reporte general de carga {nomVende}</h2>
            </div>
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Container>
                <Row>
                  <Col>
                    <FechaIni fecha={handleChange}></FechaIni>
                  </Col>
                  <Col>
                    <ComboVende vend={setVende}></ComboVende>
                  </Col>
                </Row>
              </Container>
            </ListGroup.Item>
            <ListGroup.Item>
              <Container>
                <Row>
                  <Button variant="success" onClick={() => buscarCarga()}>
                    Mostar
                  </Button>
                </Row>
              </Container>
            </ListGroup.Item>
          </ListGroup>
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
                    <th>Peso</th>
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
              <ResumVenPed
                conte={produs}
                fecha={dataForm.fechai}
                Vende={nomVende}
              ></ResumVenPed>
            </Card.Body>
          </CardGroup>
        </Card>
      </Container>
    </div>
  );
};
