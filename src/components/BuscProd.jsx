import React, { useState } from "react";
import { Container, Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert";

export const BuscProd = ({ DevProd, Lista }) => {
  const URL = "producto/prod1cod";
  const getDataProd = async (cod) => {
    const response = await axios.get(URL + "/" + cod);
    try {
      //console.log(response.status);
      if (response.status === 200) {
        if ((await response).data.length > 0) {
          return response;
        } else {
          return 0;
        }
      } else if (response.status === 500) {
        Swal(
          "Error",
          "Error en la conexion 1, porfavor intente de nuevo",
          "error"
        );
      } else {
        Swal(
          "Error",
          "Error en la conexion 2, porfavor intente de nuevo",
          "error"
        );
      }
    } catch (error) {
      Swal(
        "Error",
        "Error en la conexion 3, porfavor intente de nuevo",
        "error"
      );
    }
  };

  const [codi, setCodi] = useState("");

  const handleChangeCod = (e) => {
    // console.log(e.target.value);
    setCodi(e.target.value);
  };

  const BuscaProd = () => {
    if (codi === "") {
      Swal("Sin ingreso", "No se ha ingresado ningun codigo", "warning");
      return;
    }
    getDataProd(codi).then((response) => {
      if (response !== 0) {
        //console.log(response.data);
        DevProd(response.data);
      } else {
        Swal(
          "Sin registro",
          "El producto que intenta buscar no posee registro",
          "warning"
        );
      }
    });
  };
  return (
    <Container>
      <Form>
        <Form.Group className="md-6 row">
          <Row>
            <Col xs lg="12">
              <Form.Label htmlFor="inputPassword5">
                Codigo del producto
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col xs lg="9">
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-cart-plus-fill"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="id_prod"
                  placeholder="Codigo"
                  onChange={handleChangeCod}
                  value={codi}
                />
              </InputGroup>
            </Col>
            <Col xs lg="3">
              <Button size="md" onClick={() => BuscaProd()}>
                <i className="bi bi-search"></i> Buscar
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default BuscProd;
