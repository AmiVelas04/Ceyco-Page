import React, { useState } from "react";
import { Container, Card, ListGroup, Button, Col, Row } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert";
import { FechaIni } from "./FechaIni";
import { FechaFin } from "./FechaFin";
import ReporteGen from "../containers/ReporteGen";

export const MainRepCompra = () => {
  const Url1 = "Reporte/CompraTot";

  const [retorno, setRetorno] = useState(null);
  const [conte, setConte] = useState([]);
  const [dataForm, setDataForm] = useState([]);
  const [verRepo, setVerRepo] = useState(false);
  const [cabe, setCabe] = useState({
    titulo: "Ventas",
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
    datos.forEach((elem) => {
      const intermed = {
        v1: elem.id_gasto,
        v2: elem.descrip,
        v3: moment(elem.fecha).format("DD/MM/yyyy"),
        v4: "Q." + elem.monto,
      };
      temp.push(intermed);
    });
    console.log(temp);
    setConte(temp);
    setVerRepo(!verRepo);
    setRetorno(
      <ReporteGen datos={dataForm} cabec={cabe} contenido={conte}></ReporteGen>
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
            <h2>Reporte de compras</h2>
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
      {verRepo ? retorno : null}
    </Container>
  );
};
