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
  const URLSave = "Caja/saveone";

  const [showModal, setshowModal] = useState(false);
  const [datos, setDatos] = useState([]);
  const [dataModal, setDataModal] = useState([]);
  const [idCaja, setIdCaja] = useState(0);

  const getFecha = () => {
    const fech = new Date();
    const respu = `${fech.getFullYear()}/${
      fech.getMonth() + 1
    }/${fech.getDate()} ${fech.getHours()}: ${fech.getMinutes()}`;
    return respu;
  };

  const getIdCaja = async () => {
    const UrlCajIdCount = "caja/canti";
    const UrlCajIdMax = "caja/maxid";
    try {
      const response1 = await axios.get(UrlCajIdCount);
      if (response1.length <= 0) {
        setIdCaja(1);
      } else {
        const response2 = await axios.get(UrlCajIdMax);
        const id = response2.data;
        setIdCaja(id + 1);
      }
    } catch (error) {
      await Swal(
        "Algo salio mal!",
        "hubo un error en la busqueda de cajas anteriores" + error,
        "error"
      );
    }
    //console.log(response.data);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setshowModal(false);
  };
  const handleOpenModal = (datos) => {
    // console.log(valo);
    setshowModal(true);
    // setDataModal(valo);
    getIdCaja();
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
    const gasto = {
      id_caja: idCaja,
      operacion: datos.operacion,
      monto: datos.monto,
      detalle: datos.detalle,
      fecha: getFecha(),
      estado: "Activo",
      id_usu: 0,
    };
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
                  name="id_caja"
                  placeholder="Codigo"
                  value={idCaja}
                  disabled
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Operacion"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="operacion"
                  placeholder="Operacion"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Monto"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="monto"
                  placeholder="monto"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Detalle"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="detalle"
                  placeholder="detalle"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" onClick={() => handleSave()}>
              Guardar nueva operacion de caja
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
