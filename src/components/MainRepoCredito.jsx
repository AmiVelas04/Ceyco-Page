import React, { useState, useEffect } from "react";
import { Container, Card, ListGroup, Button, Col, Row } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert";
import { FechaIni } from "./FechaIni";
import { ReporteCeditoData } from "./ReporteCredData";

export const MainRepCredito = () => {
  const Url1 = "Reporte/Creditoall";

  const [retorno, setRetorno] = useState(null);
  const [conte, setConte] = useState([]);
  const [dataForm, setDataForm] = useState([]);
  const [allCredi, setAllCredi] = useState([]);
  const [verRepo, setVerRepo] = useState(false);
  const [cabe, setCabe] = useState({
    titulo: "Creditos",
    h1: "Credito",
    h2: "Vendedor que autorizo",
    h3: "Cliente",
    h4: "Fecha",
    h5: "Monto",
    h6: "Estado",
  });

  const getAllCrediAct = async () => {
    const url = "Credito/AllActiv";
    const response = await axios.get(url);
    //  console.log(response.data);
    return response.data;
  };

  const buscarTodo = async () => {
    const temp = [];

    // console.log(datos);
    allCredi.forEach((elem) => {
      const intermed = {
        v1: elem.id_cred,
        v2: elem.cli,
        v3: elem.vende,
        v4: moment(elem.fecha).format("DD/MM/yyyy"),
        v5: "Q." + elem.total,
        v6: elem.estado,
        v7: elem.ven,
      };
      temp.push(intermed);
    });
    //  console.log(temp);
    setConte(temp);
    // setVerRepo(!verRepo);
    setRetorno(
      <ReporteCeditoData datos={dataForm} cabec={cabe} contenido={conte} />
    );
  };

  const handleChange = ({ target }) => {
    setDataForm({
      ...dataForm,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    //usefect body
    getAllCrediAct().then((respo) => {
      //hacer alggo con esa respuesta
      setAllCredi(respo);
      //console.log(response.data);
    });
  }, []);

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
              <Row></Row>
            </Container>
          </ListGroup.Item>

          <ListGroup.Item>
            <Container>
              <label> &nbsp;&nbsp;&nbsp;&nbsp; </label>
              <Button variant="success" onClick={() => buscarTodo()}>
                Generar Reporte
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
