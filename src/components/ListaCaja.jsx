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
  ButtonGroup,
  FloatingLabel,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert";
import moment from "moment/moment";

export const ListaCaja = ({ gene }) => {
  const URLSave = "Gasto/";

  const [showModal, setshowModal] = useState(false);
  const [datos, setDatos] = useState([]);
  const [dataModal, setDataModal] = useState([]);

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

  const colorBack = (text) => {
    if (text === "Salida") {
      return "#a14242";
    } else {
      return "#ffffff";
    }
  };

  const color = (text) => {
    if (text === "Salida") {
      return "white";
    } else {
      return "black";
    }
  };

  const handleSave = async (e) => {
    // e.preventDefault();
    const gasto = {};
    //  console.log(gasto);
    try {
      const response = await axios.post(URLSave, gasto);
      if (response.status === 200) {
        await Swal("Ingresado", "El gasto ha sido registrado", "success");
      } else {
        await Swal(
          "No guardado!",
          "No se pudo guardar los datos del gasto",
          "error"
        );
      }
    } catch (error) {
      await Swal(
        "Algo salio mal!",
        "No se pudo guardar los datos del gasto" + error,
        "error"
      );
    }
  };

  useEffect(() => {
    //  console.log(itemcaja);
    return () => {};
  }, []);

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Monto</th>
            <th>Operacion</th>
            <th>Detalle</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        {gene.map((elem, index) => (
          <tbody>
            <tr
              key={index}
              style={{
                boxSizing: "border-box",
                backgroundColor: colorBack(elem.operacion),
                color: color(elem.operacion),
                justifyContent: "space-evenly",
                fontSize: "1rem",
                fontWeight: 1.5,
                lineHeight: 1.5,
              }}
            >
              <td>{index + 1}</td>
              <td>Q{elem.monto}</td>
              <td>{elem.operacion}</td>
              <td>{elem.detalle}</td>
              <td>{moment(elem.fecha).format("DD/MM/yyyy")}</td>
              <td>{elem.estado}</td>
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
              <FloatingLabel
                controlId="floatingInput"
                label="Codigo"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="id_usu"
                  placeholder="Codigo"
                  value={dataModal.id_usu}
                  disabled
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Nombre"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={dataModal.nombre}
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
                  value={dataModal.direccion}
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Telefono"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="telefono"
                  placeholder="Telefono"
                  value={dataModal.telefono}
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
                  placeholder="Usuario"
                  value={dataModal.usu}
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
                  placeholder="Contraseña"
                  value={dataModal.pass}
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" onClick={() => handleSave()}>
              Guardar cambios
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

export default ListaCaja;
