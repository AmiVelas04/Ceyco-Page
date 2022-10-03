import React, { useState } from "react";
import {
  Button,
  Form,
  Table,
  Toast,
  Row,
  Col,
  FormLabel,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert";
import moment from "moment/moment";

export const BuscProdCompra = () => {
  const [showt, setShowt] = useState(false);
  const mostraMsj = () => setShowt(!showt);
  const msj = (
    <Toast
      onClose={() => setShowt(false)}
      show={showt}
      delay={3000}
      autohide
      position="top-end"
      bg="warning"
    >
      <Toast.Header>
        <strong className="me-auto">Información</strong>
        <small>Codigo no existente</small>
      </Toast.Header>
      <Toast.Body className="warning">
        El codigo no pertenece a ningun producto ingresado
      </Toast.Body>
    </Toast>
  );

  const fechaAct = () => {
    var separator = "-";
    const fecha = new Date();
    let date = fecha.getDate();
    let month = fecha.getMonth() + 1;
    let year = fecha.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  };
  const valoresnull = () => {
    setProdu({
      cantidad: 0,
      pven: 0,
    });
  };

  const URL = "producto/prod1cod";
  const [produ, setProdu] = useState({
    caduc: moment(fechaAct()).format("yyyy-MM-DD"),
  });
  const [existencia, setExistencia] = useState("");

  const getDataProd = async (cod) => {
    const response = await axios.get(URL + "/" + cod);
    try {
      //console.log(response.status);
      if (response.status === 200) {
        if ((await response).data.length > 0) {
          return response;
        } else {
          return 0;
        }
      } else if (response.status === 500) {
        Swal(
          "Error",
          "Error en la conexion 1, porfavor intente de nuevo",
          "error"
        );
      } else {
        Swal(
          "Error",
          "Error en la conexion 2, porfavor intente de nuevo",
          "error"
        );
      }
    } catch (error) {
      Swal(
        "Error",
        "Error en la conexion 3, porfavor intente de nuevo",
        "error"
      );
    }
  };

  const handleChangeCod = ({ target }) => {
    setProdu({
      ...produ,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const BuscaProd = async (e) => {
    if (produ.id_prod === "") {
      await Swal("Sin ingreso", "No se ha ingresado ningun codigo", "warning");
      return;
    }
    getDataProd(produ.id_prod).then((response) => {
      setExistencia("Si hay producto");
      if (response !== 0) {
        //console.log(response.data);
        // DevProd(response.data);
      } else {
        mostraMsj();
        valoresnull();
      }
    });
  };
  return (
    <div>
      <Form>
        <Table>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Producto</th>
              <th>Descripcion</th>
              <th>Costo</th>
              <th>Precio Minimo</th>
              <th>Precio de Venta</th>
              <th>Cantidad</th>
              <th>Fecha de caducidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Row>
                  <Col md="8">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="id_prod"
                        placeholder="Codigo"
                        onChange={handleChangeCod}
                        required
                      />
                    </Form.Group>
                    <Form.Text className="warning"> {msj}</Form.Text>
                  </Col>
                  <Col md="4">
                    <Button
                      placeholder="Resvisar existencia"
                      className="btn btn-primary"
                      alt="Buscar exitencia"
                      onClick={() => BuscaProd()}
                    >
                      <i className="bi bi-binoculars-fill"></i>
                    </Button>
                  </Col>
                </Row>
              </td>
              <td>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Producto"
                    value={produ.nombre}
                    onChange={handleChangeCod}
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="descrip"
                    placeholder="Descripción"
                    value={produ.descrip}
                    onChange={handleChangeCod}
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="costo"
                    placeholder="Costo"
                    value={produ.costo}
                    onChange={handleChangeCod}
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="pmin"
                    placeholder="Precio de venta min."
                    onChange={handleChangeCod}
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="pven"
                    placeholder="Precio de venta"
                    onChange={handleChangeCod}
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="cantidad"
                    placeholder="Cantidad"
                    pattern="^?[0-9]\d*\.?\d*$"
                    onChange={handleChangeCod}
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <Form.Control
                    type="date"
                    name="caduc"
                    onChange={handleChangeCod}
                    value={produ.caduc}
                  />
                </Form.Group>
              </td>
              <td>
                <Button variant="success">
                  <i className="bi bi-plus-lg"></i>
                  Agregar
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Form>
    </div>
  );
};

export default BuscProdCompra;
