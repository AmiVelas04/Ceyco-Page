import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Modal,
  Form,
  Button,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert";

export const ListUsu = () => {
  const URL = "/usuario/usurol";
  const URLUPD = "/usuario/";

  const [usua, setUsua] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [dataModal, setDataModal] = useState([]);

  const getData = async () => {
    const response = axios.get(URL);
    //console.log(URL);
    return response;
  };

  useEffect(() => {
    //usefect body
    getData().then((response) => {
      //hacer alggo con esa respuesta
      setUsua(response.data);
      //console.log(response.data);
    });
  }, []);

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
    try {
      console.log(dataModal);
      console.log(URLUPD);
      const response = await axios.put(URLUPD, dataModal);

      if (response.status === 200) {
        await Swal(
          "Actualizado",
          "El usuario ha sido actualizado con exito",
          "success"
        );
      } else {
        await Swal(
          "No actualizado",
          "El usuario no pudo ser actualizado",
          "error"
        );
      }
    } catch (error) {
      await Swal(
        "No Actualizado",
        "El usuario no pudo ser actualizado, verifique el estado del servidor" +
          error,
        "error"
      );
    }
  };

  return (
    <Container>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Cod</th>
            <th>Nombre</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {usua.map((Usu, index) => (
          <tbody>
            <tr>
              <td>{index + 1}</td>
              <td>{Usu.id_usu}</td>
              <td>{Usu.nombre}</td>
              <td>{Usu.direccion}</td>
              <td>{Usu.telefono}</td>
              <td>{Usu.usu}</td>
              <td>{Usu.pass}</td>
              <td>{Usu.rol}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleOpenModal(Usu)}
                >
                  <i className="bi bi-pencil"> </i>
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      <Modal show={showModal} onhide={handleCloseModal}>
        <Modal.Header>
          <ModalTitle>Actualizar Datos</ModalTitle>
        </Modal.Header>
        <Form>
          <ModalBody>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="id_usu"
                placeholder="Codigo"
                value={dataModal.id_usu}
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
                name="direccion"
                placeholder="Direccion"
                value={dataModal.direccion}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="telefono"
                placeholder="Telefono"
                value={dataModal.telefono}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="usu"
                placeholder="Usuario"
                value={dataModal.usu}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="pass"
                placeholder="Contraseña"
                value={dataModal.pass}
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
              onClick={() => handleCloseModal()}
            >
              Cerrar
            </button>
          </ModalFooter>
        </Form>
      </Modal>
    </Container>
  );
};

export default ListUsu;
