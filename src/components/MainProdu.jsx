import React from "react";
import { useState } from "react";
import {
  Card,
  Form,
  ModalFooter,
  FloatingLabel,
  Container,
  ListGroup,
  ButtonGroup,
  Button,
  Modal,
  ModalBody,
  ModalTitle,
} from "react-bootstrap";
import Swal from "sweetalert";
import axios from "axios";

import ListaProdu from "./ListProdu";

export const MainProdu = () => {
  const URLSAVE = "/producto/";
  const [dataModal, setDataModal] = useState(null);
  const [showModal, setshowModal] = useState(false);

  const handleCloseModal = () => {
    setshowModal(false);
  };
  const handleOpenModal = (datos) => {
    setshowModal(true);
  };

  const handleChangeModal = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value,
    });
  };

  const handleSave = async (e) => {
    // alert(dataModal);
    const response = await axios.post(URLSAVE, dataModal);
    try {
      if (response.status === 200) {
        await Swal(
          "Ingreso",
          "El producto ha sido ingresado con exito",
          "success"
        );
      } else {
        await Swal(
          "No ingresado",
          "El producto no pudo ser ingresado",
          "error"
        );
      }
    } catch (error) {
      await Swal(
        "No ingresado",
        "El producto no pudo ser ingresado, verifique el estado del servidor" +
          error,
        "error"
      );
    }
  };

  return (
    <Container>
      <h3>Lista de Productos</h3>
      <Card style={{ width: "80rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <ButtonGroup className="me-2" aria-label="">
              <Button variant="success" onClick={() => handleOpenModal()}>
                <i className="bi bi-bag-plus-fill"> Agregar Producto </i>
              </Button>
            </ButtonGroup>
          </ListGroup.Item>

          <ListGroup.Item>
            <ListaProdu></ListaProdu>
          </ListGroup.Item>
        </ListGroup>
      </Card>

      <Modal show={showModal} onhide={handleCloseModal}>
        <Modal.Header>
          <ModalTitle>Ingreso de producto</ModalTitle>
        </Modal.Header>

        <Form>
          <ModalBody>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Codigo del Producto"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="id_prod"
                  placeholder="Codigo de producto"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Nombre del producto"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Nombre del producto"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Descripción"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="descrip"
                  placeholder="Descripcion"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Costo del producto"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="costo"
                  placeholder="Costo del producto"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Precio venta minimo"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="pmin"
                  placeholder="Precio de venta minimo"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Precio de venta"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="pven"
                  placeholder="Precio de venta"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Cantidad"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="cantidad"
                  placeholder="Cantidad del producto"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Precio por caja"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="precio_caja"
                  placeholder="Precio por caja"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Cantidad por caja"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="cant_caja"
                  placeholder="Cantidad por caja"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Fecha"
                className="mb-3"
              >
                <Form.Control
                  type="date"
                  name="caduc"
                  placeholder="fecha de caducidad"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </ModalBody>

          <ModalFooter>
            <Button className="btn btn-success" onClick={() => handleSave()}>
              Guardar nuevo producto
            </Button>
            <button
              className="btn btn-danger"
              onClick={() => setshowModal(false)}
            >
              Cerrar
            </button>
          </ModalFooter>
        </Form>
      </Modal>
    </Container>
  );
};
