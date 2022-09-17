import React from "react";
import {
  Container,
  Card,
  ListGroup,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { ListUsu } from "./ListUsu";

export const MainUsu = () => {
  return (
    <Container>
      <h3>Lista de usuario</h3>
      <Card style={{ width: "80rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <ButtonGroup className="me-2" aria-label="First group">
              <Button variant="success" icon="">
                {" "}
                + Agregar Usuario{" "}
                <Link to="/newusu" className="nav-link"></Link>
              </Button>
            </ButtonGroup>
          </ListGroup.Item>

          <ListGroup.Item>
            <ListUsu></ListUsu>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
};

export default MainUsu;
