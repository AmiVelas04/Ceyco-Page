import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Modal,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Form,
  Button,
  Row,
  FormLabel,
  Card,
} from "react-bootstrap";
import ComboVende from "./ComboVende";
import axios from "axios";
import Swal from "sweetalert";
import moment from "moment/moment";

export const ListGasto = () => {
  const URL = "Gasto/";

  const URLSAVE = "cliente/Update";

  const getData = async () => {
    const dire = URL + "Todos";
    const response = axios.get(dire);

    return response;
  };
  const [list, setList] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [total, setTotal] = useState(0);

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

  const cambiaVende = () => {};

  const totGast = () => {
    let tot = 0;
    list.map((item) => (tot = tot + handleTot(item)));
    console.log(tot);
    setTotal(tot);
    //return tot;
  };

  const handleTot = (valor) => {
    console.log(valor);
    return valor.map((val) => {
      return val.monto;
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
      totGast();
      //console.log(response.data);
    });
  }, []);

  return (
    <Container fluid="md">
      <Card>
        <Card.Body>
          <div>
            <ComboVende />
          </div>
          <div>
            <h1> Listado de Gastos</h1>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Descripcion</th>
                  <th>Fecha</th>
                  <th>Monto</th>
                  <th>Documento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              {list.map((valu, index) => (
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{valu.descrip}</td>
                    <td>{moment(valu.fecha).format("DD/MM/yyy")}</td>
                    <td>{valu.monto}</td>
                    <td># Documentacion {index + 33}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => handleOpenModal(valu)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </div>

          <div>
            <Row className="md-10 offset-1">
              <h3>
                <FormLabel className="md-3 offset-9">Total Q.{total}</FormLabel>
              </h3>
            </Row>
          </div>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <ModalTitle>Actualizar Datos</ModalTitle>
        </Modal.Header>
        <Form>
          <ModalBody>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="id_gasto"
                placeholder="Codigo"
                value={dataModal.id_gasto}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="descrip"
                placeholder="Descripcion"
                value={dataModal.descrip}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                name="fecha"
                placeholder="Fecha"
                value={dataModal.fecha}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3"></Form.Group>
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

export default ListGasto;
