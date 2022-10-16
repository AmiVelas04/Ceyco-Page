import React, { useState } from "react";
import { Container, Card, ListGroup, Button, Col, Row } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import { FechaIni } from "./FechaIni";
import { FechaFin } from "./FechaFin";
import ComboVende from "./ComboVende";
import ReporteGen from "../containers/ReporteGen";
import Swal from "sweetalert";

export const MainRepGasto = () => {
  const Url1 = "Reporte/GastTot";
  const Url2 = "Reporte/GastoUsu";
  const [retorno, setRetorno] = useState(null);
  const [conte, setConte] = useState([]);
  const [dataForm, setDataForm] = useState([]);
  const [verRepo, setVerRepo] = useState(false);
  const [cabe, setCabe] = useState({
    titulo: "Gastos",
    h1: "Gasto",
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

  const buscarSingle = async () => {
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
    var temp = [];
    const url =
      Url2 +
      "/" +
      dataForm.id_usu +
      "/" +
      dataForm.fechai +
      "/" +
      dataForm.fechaf;
    const response = await axios.get(url);
    const datos = response.data;
    //  setConte(response.data);

    datos.forEach((elem) => {
      const intermed = {
        v1: elem.id_gasto,
        v2: elem.descrip,
        v3: moment(elem.fecha).format("DD/MM/yyyy"),
        v4: "Q." + elem.monto,
      };
      temp.push(intermed);
    });

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
    <div>
      <Container>
        <br></br>
        <Card border="dark" style={{ width: "80rem" }}>
          <Card.Header>
            <div className="text-center">
              <h2>Reporte de gastos</h2>
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
              <ComboVende vend={handleChange}></ComboVende>
            </ListGroup.Item>

            <ListGroup.Item>
              <Container>
                <Button variant="primary" onClick={() => buscarSingle()}>
                  Generar Reporte Individual
                  <i className="bi bi-layout-text-sidebar"></i>
                </Button>
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
    </div>
  );
};

export default MainRepGasto;
