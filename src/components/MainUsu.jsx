import React, { useState } from "react";
import {
  Container,
  Card,
  Modal,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Form,
  FloatingLabel,
  ListGroup,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert";
import { ListUsu } from "./ListUsu";
import { ComboNivel } from "./ComboNivel";
import { useEffect } from "react";

export const MainUsu = () => {
  const URLSAVE1 = "/Usuario/Usu/";
  const URLSAVE2 = "/Usuario/saveru/";
  const URLDEL = "/Usuario/";

  const Urlid = "/usuario/maxid/";
  const [dataModal, setDataModal] = useState(null);
  const [idusu, setIdusu] = useState(0);
  const [showModal, setshowModal] = useState(false);

  const handleCloseModal = () => {
    setshowModal(false);
  };
  const handleOpenModal = (datos) => {
    setshowModal(true);
  };

  const getId = async () => {
    const response = await axios.get(Urlid);
    const id = response.data;
    setIdusu(id + 1);
    //console.log(response.data);
  };

  const handleChangeModal = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    setDataModal({ id_rol: 1 });
    getId();
  }, []);

  const handleSave = async (e) => {
    const usuario = {
      id_usu: idusu,
      nombre: dataModal.nombre,
      direccion: dataModal.direccion,
      telefono: dataModal.telefono,
      usu: dataModal.usu,
      pass: dataModal.pass,
    };

    const nivel = {
      id_usu: idusu,
      id_rol: dataModal.id_rol,
    };
    //console.log(nivel);
    const response = await axios.post(URLSAVE1, usuario);
    try {
      if (response.status === 200) {
        const respo = await axios.post(URLSAVE2, nivel);
        if (respo.status === 200) {
          await Swal(
            "Ingreso",
            "El Cliente ha sido ingresado con exito",
            "success"
          );
          setshowModal(false);
          //handleCloseModal();
        } else {
          const delo = await axios.delete(URLDEL, usuario);
          if (delo.status === 200) {
            await Swal(
              "Revertir",
              "Se revirtieron los cambios con exito",
              "warning"
            );
          } else {
            await Swal(
              "Inconveniente",
              "Se produjo un inconveniente al intentar reestablecer datos de cliente",
              "error"
            );
          }
        }
      } else {
        await Swal("No ingresado", "El Cliente no pudo ser ingresado", "error");
      }
    } catch (error) {
      await Swal(
        "No ingresado",
        "El Cliente no pudo ser ingresado, verifique el estado del servidor" +
          error,
        "error"
      );
    }
  };

  return (
    <Container>
      <h3>Lista de usuario</h3>
      <Card style={{ width: "80rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <ButtonGroup className="me-2" aria-label="First group">
              <Button variant="success" onClick={() => handleOpenModal()}>
                <i className="bi bi-person-plus"> Agregar Usuario</i>
              </Button>
            </ButtonGroup>
          </ListGroup.Item>

          <ListGroup.Item>
            <ListUsu></ListUsu>
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
                label="Codigo del Usuario"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="id_usu"
                  placeholder="Codigo del Usuario"
                  onChange={handleChangeModal}
                  value={idusu}
                  disabled
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Nombre del Usuario"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Nombre del Usuario"
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
                label="Teléfono del Usuario"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  maxLength={8}
                  name="telefono"
                  placeholder="Telefono del Usuario"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Usuario"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="usu"
                  placeholder="Nombre del usuario"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Contraseña"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="pass"
                  placeholder="Contraseña del Usuario"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <ComboNivel role={handleChangeModal}></ComboNivel>
            </Form.Group>
          </ModalBody>

          <ModalFooter>
            <Button className="btn btn-success" onClick={() => handleSave()}>
              Guardar nuevo usuario
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => handleCloseModal()}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Container>
  );
};

export default MainUsu;
