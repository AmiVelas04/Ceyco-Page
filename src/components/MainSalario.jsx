import React, { useState } from "react";
import { Container, Card, ListGroup, Row, Col, Button } from "react-bootstrap";

import { ComboAnio } from "./ComboAnio";

import ComboVende from "./ComboVende";
import axios from "axios";
import Swal from "sweetalert";
import ComboMes from "./ComboMes";
import { ListSal } from "./ListSal";

const MainSalario = () => {
  const [vende, setVende] = useState(1);
  const [anio, setAnio] = useState(2024);
  const [mesele, setMesele] = useState(1);
  const [datos, setDatoS] = useState([]);
  const [conte, setConte] = useState([]);
  const [sal, setSal] = useState([]);

  const handleChange = ({ target }) => {
    setDatoS({
      ...datos,
      [target.name]: target.value,
    });
    //console.log(datos);
  };

  const operaciones = async () => {
    var temp = [];
    const urlSalVende =
      "Salario/SalVendeUn/" + mesele + "/" + anio + "/" + vende;
    try {
      // console.log(urlSalVende);

      const response = await axios.get(urlSalVende);
      //  console.log(response.data);
      const respo = response.data;
      respo.forEach((elem) => {
        const interm = {
          id_sala: elem.id_sala,
          mes: elem.mes,
          anio: elem.anio,
          monto: elem.monto,
          descuento: elem.descuento,
          total: elem.total,
          fecha: elem.fecha,
        };

        temp.push(interm);
      });
      //console.log(temp);
      setSal(temp);
      //console.log(prods);
      setConte(<ListSal conte={temp}></ListSal>);
    } catch (error) {
      await Swal(
        "Sin Registros!",
        "No existen registros para salarios del " + error,
        "warning"
      );
    }
  };

  return (
    <Container>
      <Card>
        <Card.Header>
          <h3>Salarios</h3>
        </Card.Header>
        <ListGroup>
          <ListGroup.Item>
            <Container>
              <Row>
                <Col>
                  <div>
                    <ComboVende vend={setVende} />
                  </div>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <ComboAnio anio={setAnio} />
                    </Col>
                    <Col>
                      <ComboMes mes={setMesele}></ComboMes>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Button variant="success" onClick={() => operaciones()}>
                  <i class="bi bi-eye-fill">Ver salarios pagados</i>
                </Button>
              </Row>
            </Container>
          </ListGroup.Item>

          <ListGroup.Item>{conte}</ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
};

export default MainSalario;
