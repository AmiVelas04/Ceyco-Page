import React, { useState } from "react";
import {
  Container,
  Form,
  FloatingLabel,
  Card,
  ListGroup,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalTitle,
  ModalFooter,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert";
import ListaProve from "./ListProve";

export const MainProve = () => {
  const URLSAVE = "/proveedor/";
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
          "El proveedor ha sido ingresado con exito",
          "success"
        );
        //    handleChangeModal();
      } else {
        await Swal(
          "No ingresado",
          "El proveedor no pudo ser ingresado",
          "error"
        );
      }
    } catch (error) {
      await Swal(
        "No ingresado",
        "El proveedor no pudo ser ingresado, por un error en el servidor" +
          error,
        "error"
      );
    }
  };

  return (
    <Container>
      <h3>Lista de Proveedores</h3>
      <Card style={{ width: "80rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <ButtonGroup className="me-2" aria-label="First group">
              <Button variant="success" onClick={() => handleOpenModal()}>
                <i class="bi bi-person-rolodex">+ Agregar Proveedor</i>
              </Button>
            </ButtonGroup>
          </ListGroup.Item>

          <ListGroup.Item>
            <ListaProve></ListaProve>
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
                label="codigo del proveedor"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="id_prov"
                  placeholder="Codigo de proveedor"
                  onChange={handleChangeModal}
                  required
                  disabled
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Nombre del proveedor"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Nombre del proveedor"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Direccion"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="direccion"
                  placeholder="Direccion"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Nit del proveedor"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="nit"
                  placeholder="Nit del proveedor"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </ModalBody>

          <ModalFooter>
            <Button className="btn btn-success" onClick={() => handleSave()}>
              Guardar nuevo proveedor
            </Button>
            <button
              className="btn btn-danger"
              onClick={() => setshowModal(false)}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Form>
      </Modal>
    </Container>
  );
};
