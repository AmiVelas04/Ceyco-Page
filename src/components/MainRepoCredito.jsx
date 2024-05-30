import React, { useState } from "react";
import { Container, Card, ListGroup, Button, Col, Row } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert";
import { FechaIni } from "./FechaIni";
import { FechaFin } from "./FechaFin";
import ReporteGen from "../containers/ReporteGen";
import ReporteCompData from "./ReporteCompData";
import ReporteCredito from "./ReporteCredData";

export const MainRepCredito = () => {
  const Url1 = "Reporte/Creditoall";

  const [retorno, setRetorno] = useState(null);
  const [conte, setConte] = useState([]);
  const [dataForm, setDataForm] = useState([]);
  const [verRepo, setVerRepo] = useState(false);
  const [cabe, setCabe] = useState({
    titulo: "Compras",
    h1: "Compra",
    h2: "Descripción",
    h3: "Fecha",
    h4: "Monto",
  });
  const buscarTodo = async () => {
    if (dataForm.fechai == null) {
      await Swal(
        "Fechas!",
        "No se ha seleccionado la fecha inicial",
        "warning"
      );
      return;
    } else if (dataForm.fechaf == null) {
      await Swal("Fechas!", "No se ha seleccionado la fecha final", "warning");
      return;
    }
    const temp = [];
    const url = Url1 + "/" + dataForm.fechai + "/" + dataForm.fechaf;
    const response = await axios.get(url);
    //setConte(response.data);
    const datos = response.data;
    // console.log(datos);
    datos.forEach((elem) => {
      const intermed = {
        v1: elem.id,
        v2: "Venta No. " + elem.id,
        v3: moment(elem.fecha).format("DD/MM/yyyy"),
        v4: "Q." + elem.total,
      };
      temp.push(intermed);
    });
    //console.log(temp);
    setConte(temp);
    // setVerRepo(!verRepo);
    setRetorno(
      <ReporteCredito datos={dataForm} cabec={cabe} contenido={conte} />
    );
  };

  const handleChange = ({ target }) => {
    setDataForm({
      ...dataForm,
      [target.name]: target.value,
    });
  };

  return (
    <Container>
      <br></br>
      <Card border="dark" style={{ width: "80rem" }}>
        <Card.Header>
          <div className="text-center">
            <h2>Reporte de creditos</h2>
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
                  <FechaFin fecha={handleChange}></FechaFin>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>

          <ListGroup.Item>
            <Container>
              <label> &nbsp;&nbsp;&nbsp;&nbsp; </label>
              <Button variant="success" onClick={() => buscarTodo()}>
                Generar Reporte General
                <i className="bi bi-layout-text-sidebar"></i>
              </Button>
            </Container>
          </ListGroup.Item>
        </ListGroup>
      </Card>
      {retorno}
    </Container>
  );
};
