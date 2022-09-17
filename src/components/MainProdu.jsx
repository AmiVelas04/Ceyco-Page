import React from "react";
import {
  Card,
  Container,
  ListGroup,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ListaProdu from "./ListProdu";

export const MainProdu = () => {
  return (
    <Container>
      <h3>Lista de Productos</h3>
      <Card style={{ width: "80rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <ButtonGroup className="me-2" aria-label="First group">
              <Button variant="success" icon="">
                + Agregar Producto{"A"}
                <Link to="/menu" className="nav-link"></Link>
              </Button>
            </ButtonGroup>
          </ListGroup.Item>

          <ListGroup.Item>
            <ListaProdu></ListaProdu>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
};
