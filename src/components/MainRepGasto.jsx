import React, { useState } from "react";
import { Container, Card, ListGroup, Button, Col, Row } from "react-bootstrap";

import { FechaIni } from "./FechaIni";
import { FechaFin } from "./FechaFin";
import ComboVende from "./ComboVende";

export const MainRepGasto = () => {
  const [dataForm, setDataForm] = useState([]);
  const handleChange = ({ target }) => {
    setDataForm({
      ...dataForm,
      [target.name]: target.value,
    });
  };

  const mostrar = () => {
    console.log(dataForm);
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
                <Button variant="primary" onClick={() => mostrar()}>
                  Generar Reporte Individual{" "}
                  <i className="bi bi-layout-text-sidebar"></i>
                </Button>
                <label> &nbsp;&nbsp;&nbsp;&nbsp; </label>
                <Button variant="success" onClick={() => mostrar()}>
                  Generar Reporte General{" "}
                  <i className="bi bi-layout-text-sidebar"></i>
                </Button>
              </Container>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
    </div>
  );
};

export default MainRepGasto;
