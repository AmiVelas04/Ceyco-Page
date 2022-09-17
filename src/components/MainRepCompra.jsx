import React, { useState } from "react";
import { Container, Card, ListGroup, Button, Col, Row } from "react-bootstrap";

import { FechaIni } from "./FechaIni";
import { FechaFin } from "./FechaFin";

export const MainRepCompra = () => {
  const [dataForm, setDataForm] = useState([]);

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
              <Button variant="primary">Generar Reporte</Button>
            </Container>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
};
