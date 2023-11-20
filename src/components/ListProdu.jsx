import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Modal,
  Table,
  ModalBody,
  Form,
  ModalFooter,
  ModalTitle,
  Card,
  FloatingLabel,
  Col,
  Row,
} from "react-bootstrap";
import moment from "moment";
import Swal from "sweetalert";
import axios from "axios";

export const ListProdu = () => {
  // const URL = "http://cloudfma2022-001-site1.itempurl.com/api/producto/todos";
  const URL = "/producto/todos/";
  const URLSAVE = "/producto/updatepage/";

  const getData = async () => {
    const response = axios.get(URL);
    return response;
  };
  const [mostra, setMostra] = useState([]);
  const [list, setList] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [total, setTotal] = useState(0.0);

  const handleCloseModal = () => {
    setshowModal(false);
  };
  const handleOpenModal = (datos) => {
    const valo = {
      id_prod: datos[0],
      nombre: datos[1],
      descrip: datos[2],
      costo: datos[3],
      cantidad: datos[6],
      pmin: datos[4],
      pven: datos[5],
      precio_caja: datos[7],
      cant_caja: datos[8],
      caduc: moment(datos[9].caduc).format("yyyy-MM-DD"),
    };
    setshowModal(true);
    setDataModal(valo);
  };
  const handleChangeModal = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value,
    });
  };

  const imptot = () => {
    var total = 0;
    list.forEach(function (num) {
      total += num[3] * num[6];
    });
    // console.log(total);
    setTotal(total);
  };

  let conte = list.map((prod, index) => {
    return (
      <tr key={index}>
        <td>{prod[0]}</td>
        <td>{prod[1]}</td>
        <td>{prod[2]}</td>
        <td>Q.{prod[3]}</td>
        <td>Q.{prod[4]}</td>
        <td>Q.{prod[5]}</td>
        <td>{prod[6]}</td>
        <td>Q{prod[7]}</td>
        <td>{prod[8]}</td>
        <td>{moment(prod[9]).format("DD/MM/yyyy")}</td>
        <td>
          <button
            className="btn btn-warning"
            onClick={() => handleOpenModal(prod)}
          >
            <i className="bi bi-pencil"> </i>
            Editar
          </button>
        </td>
      </tr>
    );
  });

  const convtoArr = (ArrJson) => {
    var Into = [{}];
    //console.log(ArrJson);
    for (let indi in ArrJson) {
      // console.log(ArrJson.length);
      Into.push([
        ArrJson[indi].id_prod,
        ArrJson[indi].nombre,
        ArrJson[indi].descrip,
        ArrJson[indi].costo,
        ArrJson[indi].pmin,
        ArrJson[indi].pven,
        ArrJson[indi].cantidad,
        ArrJson[indi].precio_caja,
        ArrJson[indi].cant_caja,
        ArrJson[indi].caduc,
      ]);
    }
    Into.splice(0, 1);
    return Into;
  };

  const handleSave = async (e) => {
    try {
      const response = await axios.put(URLSAVE, dataModal);
      if (response.status === 200) {
        await Swal(
          "Actualizado",
          "El producto ha sido actualizado con exito",
          "success"
        );
      } else {
        await Swal(
          "No actualizado",
          "El producto no pudo ser actualizado",
          "error"
        );
      }
    } catch (error) {
      await Swal(
        "No Actualizado",
        "El producto no pudo ser actualizado, verifique el estado del servidor" +
          error,
        "error"
      );
    }
  };

  useEffect(() => {
    //usefect body
    getData().then((response) => {
      //hacer alggo con esa respuesta
      const devol = convtoArr(response.data);
      setList(devol);
    });
  }, []);

  return (
    <Container>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Producto</th>
            <th>Descripcion</th>
            <th>Costo</th>
            <th>Precio Minimo</th>
            <th>Precio de Venta</th>
            <th>Cantidad</th>
            <th>Precio por caja</th>
            <th>Cantidad por caja</th>
            <th>Fecha de caducidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{conte}</tbody>
      </Table>

      <Row className="">
        <Col md={{ span: 6, offset: 4 }}>
          <Card border="success" style={{ width: "14rem" }}>
            <Card.Header>Total de inventario</Card.Header>
            <Card.Body className="text-center">
              <Card.Title>Q.{total}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={{ span: 6, offset: 4 }}>
          <Button variant="primary" onClick={imptot}>
            Mostrar Total de inventario
          </Button>
        </Col>
      </Row>

      <Modal show={showModal} onhide={handleCloseModal}>
        <Modal.Header>
          <ModalTitle>Actualizar Datos del producto</ModalTitle>
        </Modal.Header>
        <Form>
          <ModalBody>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Codigo de producto"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="id_prod"
                  placeholder="Codigo de producto"
                  value={dataModal.id_prod}
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
                label="Descripcion"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="descrip"
                  placeholder="Descripcion"
                  value={dataModal.descrip}
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Costo del producto"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="costo"
                  placeholder="Costo"
                  value={dataModal.costo}
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Precio de venta minimo"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="pmin"
                  placeholder="Precio de venta minimo"
                  value={dataModal.pmin}
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Precio de venta"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="pven"
                  placeholder="Precio de venta"
                  value={dataModal.pven}
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Cantidad"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="cantidad"
                  placeholder="Cantidad del producto"
                  value={dataModal.cantidad}
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Precio de caja"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="precio_caja"
                  placeholder="Precio por caja"
                  value={dataModal.precio_caja}
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Cantidad por caja"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="cant_caja"
                  placeholder="Cantidad por caja"
                  value={dataModal.cant_caja}
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Fecha de caducidad"
                className="mb-3"
              >
                <Form.Control
                  type="date"
                  name="caduc"
                  placeholder="fecha de caducidad"
                  value={dataModal.caduc}
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
export default ListProdu;
