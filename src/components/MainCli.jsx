import React from "react";
import {
  Container,
  Card,
  ListGroup,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ListCli from "./ListCli";

export const MainCli = () => {
  return (
    <Container>
      <h3>Lista de clientes</h3>
      <Card style={{ width: "80rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <ButtonGroup className="me-2" aria-label="First group">
              <Button variant="success" icon="">
                {" "}
                + Agregar Cliente <Link to="/" className="nav-link"></Link>
              </Button>
            </ButtonGroup>
          </ListGroup.Item>

          <ListGroup.Item>
            <ListCli></ListCli>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
};
