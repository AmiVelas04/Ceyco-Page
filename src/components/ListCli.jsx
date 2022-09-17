import React from "react";
import {
  Container,
  Table,
  Modal,
  ModalBody,
  ModalTitle,
  ModalFooter,
  Form,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert";

export const ListCli = () => {
  const URL = "Cliente/todos";
  const URLSAVE = "cliente/Update";
  const getData = async () => {
    const response = axios.get(URL);
    return response;
  };
  const [list, setList] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const handleCloseModal = () => {
    setshowModal(false);
  };
  const handleOpenModal = (datos) => {
    setshowModal(true);
    setDataModal(datos);
  };
  const handleChangeModal = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value,
    });
  };

  const handleSave = async (e) => {
    const response = await axios.put(URLSAVE, dataModal);
    try {
      if (response.status === 200) {
        await Swal(
          "Actualizado",
          "Los datos del cliente han sido actualizados con exito",
          "success"
        );
      } else {
        await Swal(
          "No actualizado",
          "Los datos del cliente no pudieron ser actualizados",
          "error"
        );
      }
    } catch (error) {
      await Swal(
        "No Actualizado",
        "Los datos del cliente no pudieron ser actualizados" + error,
        "error"
      );
    }
  };

  useEffect(() => {
    //usefect body
    getData().then((response) => {
      //hacer alggo con esa respuesta
      setList(response.data);
      //console.log(response.data);
    });
  }, []);
  return (
    <Container>
      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Negocio</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          {list.map((clien, index) => (
            <tbody>
              <tr>
                <td>{index + 1}</td>
                <td>{clien.nombre}</td>
                <td>{clien.negocio}</td>
                <td>{clien.direccion}</td>
                <td>{clien.telefono}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleOpenModal(clien)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <ModalTitle>Actualizar Datos</ModalTitle>
        </Modal.Header>
        <Form>
          <ModalBody>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="id_cli"
                placeholder="Codigo"
                value={dataModal.id_cli}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={dataModal.nombre}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="negocio"
                placeholder="Negocio"
                value={dataModal.negocio}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="direccion"
                placeholder="Direccion"
                value={dataModal.direccion}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="telefono"
                placeholder="Telefono"
                value={dataModal.telefono}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" onClick={() => handleSave()}>
              Guardar cambios
            </Button>
            <button
              className="btn btn-danger"
              onClick={() => setDataModal(false)}
            >
              Cerrar
            </button>
          </ModalFooter>
        </Form>
      </Modal>
    </Container>
  );
};
export default ListCli;
