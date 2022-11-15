import React, { useState, useEffect } from "react";
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
  const URLSAVE = "/proveedor/SaveProv";
  const Urlid = "/proveedor/maxid";
  const Urlcantid = "/proveedor/canti";
  const [dataModal, setDataModal] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [idProv, setIdProv] = useState(0);

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
      //  console.log(respo.data);
      if (respo.data === 0) {
        setIdProv(1);
      } else {
        const response = await axios.get(Urlid);
        console.log(response.data);
        const id = response.data;
        setIdProv(id + 1);
      }
    } catch (error) {
      return 0;
    }
  };
  const handleSave = async (e) => {
    const proveedor = {
      id_prov: idProv,
      nombre: dataModal.nombre,
      direccion: dataModal.direccion,
      telefono: dataModal.telefono,
      nit: dataModal.nit,
    };
    console.log(proveedor);
    const response = await axios.post(URLSAVE, proveedor);

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

  useEffect(() => {
    getId();
  }, []);
  return (
    <Container>
      <h3>Lista de Proveedores</h3>
      <Card style={{ width: "80rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <ButtonGroup className="me-2" aria-label="First group">
              <Button variant="success" onClick={() => handleOpenModal()}>
                <i className="bi bi-person-rolodex">+ Agregar Proveedor</i>
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
          <ModalTitle>Ingreso de Proveedor</ModalTitle>
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
                  value={idProv}
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
              Cerrar
            </button>
          </ModalFooter>
        </Form>
      </Modal>
    </Container>
  );
};
