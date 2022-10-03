import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Modal,
  Form,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert";

export const ListUsu = () => {
  const URL = "/usuario/usurol";
  const URLUPD = "/usuario/update";

  const [usua, setUsua] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [dataModal, setDataModal] = useState([]);

  const getData = async () => {
    const response = axios.get(URL);
    console.log(URL);
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
    const response = await axios.put(URLUPD, dataModal);
    console.log(dataModal);
    console.log(URLUPD);
    try {
      if (response.status === 200) {
        await Swal(
          "Actualizado",
          "El usuario ha sido actualizado con exito",
          "Success"
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
              <td>{Usu.idusu}</td>
              <td>{Usu.nombre}</td>
              <td>{Usu.direccion}</td>
              <td>{Usu.telefono}</td>
              <td>{Usu.usuario}</td>
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
        <Form onSubmit={handleSave}>
          <ModalBody>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="idusu"
                placeholder="Codigo"
                value={dataModal.idusu}
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
                type="text"
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
                name="usuario"
                placeholder="Usuario"
                value={dataModal.usuario}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="pass"
                placeholder="Conraseña"
                value={dataModal.pass}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={() => handleSave()}>
              Guardar cambios
            </button>
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
