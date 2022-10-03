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
  Col,
  FormLabel,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import ComboVende from "./ComboVende";
import axios from "axios";
import Swal from "sweetalert";
import moment from "moment/moment";
import FechaIni from "./FechaIni";
import { FechaFin } from "./FechaFin";

export const ListGasto = () => {
  const URL = "Gasto/";
  const URL1 = "Gasto/peri";
  /*const URL = "Gasto/";
  const URL = "Gasto/";*/

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
  const [datos, setDatos] = useState([]);

  const handleCloseModal = (e) => {
    e.preventDefault();
    setshowModal(false);
  };
  const handleOpenModal = (datos) => {
    const valo = {
      descrip: datos.descrip,
      fecha: moment(datos.fecha).format("yyyy-MM-DD"),
      monto: datos.monto,
      estado: datos.estado,
      id_gasto: datos.id_gasto,
      id_usu: datos.id_usu,
    };
    // console.log(valo);
    setshowModal(true);
    setDataModal(valo);
  };
  const handleChangeModal = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value,
    });
  };

  const handleChange = ({ target }) => {
    setTimeout(
      setDatos({
        ...datos,
        [target.name]: target.value,
      }),
      1000
    );
  };

  const totGast = async () => {
    let tot = 0;
    // console.log(list);
    list.forEach((item) => {
      tot = tot + item.monto;
    });

    setTotal(tot);
  };

  const handleTot = async (valor) => {
    //   console.log(valor);
    var toto = 0;
    valor.map((val) => {
      toto = val.monto;
    });

    console.log(toto);
    return toto;
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

  const cargaGasto = async () => {
    //console.log(datos);
    const dire =
      URL1 + "/" + datos.fechai + "/" + datos.fechaf + "/" + datos.id_usu;
    const response = await axios.get(dire);
    //console.log(dire);
    if (response.data.length <= 0) {
      await Swal(
        "Si registo",
        "No se encontraron registros de gastos para el usuario seleccionado",
        "warning"
      );
    } else {
      setList(response.data);
      totGast();
    }
  };

  useEffect(() => {
    //usefect body
    getData().then((response) => {
      //hacer alggo con esa respuesta
      // setList(response.data);
      // totGast();
      //console.log(response.data);
    });
  }, []);

  return (
    <Container fluid="md">
      <Card>
        <Card.Header>
          <h3>Control de gastos</h3>
        </Card.Header>

        <ListGroup variant="flush">
          <ListGroup.Item>
            <Container>
              <Row>
                <Col>
                  <div>
                    <ComboVende vend={handleChange} />
                  </div>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      Fecha Inicial
                      <FechaIni fecha={handleChange}></FechaIni>
                    </Col>
                    <Col>
                      Fecha Final
                      <FechaFin fecha={handleChange}></FechaFin>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>

          <ListGroup.Item>
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
                      <td>{moment(valu.fecha).format("DD/MM/yyyy")}</td>
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
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <Row className="">
                <Col>
                  <Button variant="primary" onClick={() => cargaGasto()}>
                    Mostrar gastos <i className="bi bi-calculator-fill"></i>
                  </Button>
                </Col>
                <Col>
                  <h3>
                    <FormLabel className="md-3 offset-0 position-relative">
                      Total Q.{total}
                    </FormLabel>
                  </h3>
                </Col>
              </Row>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <ModalTitle>Actualizar Datos</ModalTitle>
        </Modal.Header>
        <Form onSubmit={handleCloseModal}>
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
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="monto"
                placeholder="Monto"
                value={dataModal.monto}
                onChange={handleChangeModal}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                name="fecha"
                placeholder="Fecha"
                defaultValue={dataModal.fecha}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3"></Form.Group>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" onSubmit={() => handleSave()}>
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
