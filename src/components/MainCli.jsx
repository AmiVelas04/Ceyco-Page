import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  ListGroup,
  Button,
  ButtonGroup,
  FloatingLabel,
  Modal,
  ModalTitle,
  ModalBody,
  Form,
  ModalFooter,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert";
import ListCli from "./ListCli";

export const MainCli = () => {
  const URLSAVE = "/cliente/";
  const Urlid = "/cliente/maxid/";
  const Urlcantid = "cliente/canti";
  const [dataModal, setDataModal] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [idCli, setIdCli] = useState(0);

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
  const getId = async () => {
    try {
      const respo = await axios.get(Urlcantid);
      if (respo.data === 0) {
        setIdCli(1);
      } else {
        const response = await axios.get(Urlid);
        const id = response.data;
        setIdCli(id + 1);
      }
    } catch (error) {
      return 0;
    }
  };

  const handleSave = async (e) => {
    const cliente = {
      id_cli: idCli,
      nombre: dataModal.nombre,
      direccion: dataModal.direccion,
      telefono: dataModal.telefono,
      negocio: dataModal.negocio,
    };

    try {
      const response = await axios.post(URLSAVE, cliente);
      if (response.status === 200) {
        await Swal(
          "Ingreso",
          "El cliente ha sido ingresado con exito",
          "success"
        );
        //  handleChangeModal();
      } else {
        await Swal("No ingresado", "El cliente no pudo ser ingresado", "error");
      }
    } catch (error) {
      await Swal(
        "No ingresado",
        "El cliente no pudo ser ingresado, verifique el estado del servidor" +
          error,
        "error"
      );
    }
  };

  useEffect(() => {
    getId();
  }, []);

  return (
    <Container>
      <h3>Lista de clientes</h3>
      <Card style={{ width: "80rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <ButtonGroup className="me-2" aria-label="First group">
              <Button variant="success" onClick={() => handleOpenModal()}>
                <i class="bi bi-person-plus-fill"> Agregar Cliente</i>
              </Button>
            </ButtonGroup>
          </ListGroup.Item>

          <ListGroup.Item>
            <ListCli></ListCli>
          </ListGroup.Item>
        </ListGroup>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <ModalTitle>Ingreso de Cliente</ModalTitle>
        </Modal.Header>

        <Form>
          <ModalBody>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Codigo del Cliente"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="id_cli"
                  placeholder="Codigo del Cliente"
                  onChange={handleChangeModal}
                  value={idCli}
                  required
                  disabled
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Nombre del Cliente"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Nombre del Cliente"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Negocio"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="negocio"
                  placeholder="Negocio"
                  onChange={handleChangeModal}
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
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Teléfono"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="telefono"
                  placeholder="Teléfono"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </ModalBody>

          <ModalFooter>
            <Button className="btn btn-success" onClick={() => handleSave()}>
              Guardar nuevo Cliente
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => setshowModal(false)}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Container>
  );
};
