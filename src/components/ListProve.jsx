import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Form,
  Modal,
  ModalFooter,
  ModalTitle,
  ModalBody,
  Button,
} from "react-bootstrap";
import Swal from "sweetalert";
import axios from "axios";

export const ListProve = () => {
  const URL = "/proveedor/todos";
  const URLSAVE = "proveedor/update";

  const getData = async () => {
    const response = axios.get(URL);
    //console.log(URL);
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
    //console.log(datos);
    setDataModal(datos);
  };
  const handleChangeModal = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value,
    });
  };
  const handleSave = async () => {
    const response = await axios.put(URLSAVE, dataModal);
    try {
      if (response.status === 200) {
        await Swal(
          "Actualizado",
          "El proveedor ha sido actualizado con exito",
          "success"
        );
        handleCloseModal();
      } else {
        await Swal(
          "No actualizado",
          "El proveedor no pudo ser actualizado",
          "error"
        );
      }
    } catch (error) {
      await Swal(
        "No Actualizado",
        "El proveedor no pudo ser actualizado, verifique el estado del servidor" +
          error,
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
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Direccion</th>
            <th>Nit</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {list.map((prov) => (
          <tbody>
            <tr>
              <td>{1}</td>
              <td>{prov.nombre}</td>
              <td>{prov.direccion}</td>
              <td>{prov.nit}</td>
              <td>
                <div className="text-center">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleOpenModal(prov)}
                  >
                    Editar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <ModalTitle>Actualizar Datos</ModalTitle>
        </Modal.Header>
        <Form>
          <ModalBody>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="id_prov"
                placeholder="Codigo de proveedor"
                value={dataModal.id_prov}
                onChange={handleChangeModal}
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
                name="nit"
                placeholder="Nit"
                value={dataModal.nit}
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

export default ListProve;
