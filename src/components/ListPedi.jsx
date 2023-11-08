import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Form,
  FloatingLabel,
  Modal,
  ModalBody,
  ModalTitle,
  Button,
  ModalFooter,
} from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert";

export const ListPedi = ({ pedid, gene }) => {
  //const UrlAllPedi="pedido/todos";
  const UrlDetaPedi = "pedido/pedetanomxid/" + pedid;
  // console.log(pedid);
  const UrlUpd = "";

  const getData = async () => {
    const response = axios.get(UrlDetaPedi);
    return response;
  };
  const convtoArr = (ArrJson) => {
    var Into = [{}];
    //console.log(ArrJson);
    for (let indi in ArrJson) {
      // console.log(ArrJson.length);
      Into.push([
        ArrJson[indi].iD_PDETA,
        ArrJson[indi].iD_PED,
        ArrJson[indi].iD_PROD,
        ArrJson[indi].cantidad,
        ArrJson[indi].precio,
        ArrJson[indi].subtotal,
        ArrJson[indi].nombre,
      ]);
    }
    Into.splice(0, 1);
    return Into;
  };

  const [list, setList] = useState(convtoArr(getData));
  const [showModal, setshowModal] = useState(false);
  const [dataModal, setDataModal] = useState([]);

  const handleCloseModal = () => {
    setshowModal(false);
  };

  const handleChangeModal = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value,
    });
  };

  const handleOpenModal = (datos) => {
    const valo = {
      id_ped: datos.id_ped,
      id_pdeta: datos.id_pdeta,
      id_prod: datos.id_prod,
      nombre: datos.nombre,
      cantidad: datos.cantidad,
      precio: datos.precio,
    };
    setshowModal(true);
    setDataModal(valo);
  };

  let conte = gene.map((pedis, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{pedis.nombre}</td>
        <td>{pedis.cantidad}</td>
        <td>Q.{pedis.precio}</td>
        <td>Q.{pedis.subtotal}</td>
        <td>
          <button
            className="btn btn-outline-primary"
            onClick={() => handleOpenModal(pedis)}
          >
            <i className="bi bi-eye"> </i>
            Editar
          </button>
        </td>
      </tr>
    );
  });

  const handleUpd = async (e) => {
    try {
      const response = await axios.put(UrlUpd, dataModal);
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
        "El prodducto no pudo ser actualizado, verifique el estado del servidor" +
          error,
        "error"
      );
    }
  };

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{conte}</tbody>
      </Table>

      <Modal show={showModal} onhide={handleCloseModal}>
        <Modal.Header>
          <ModalTitle>Cambiar detalle del pedido</ModalTitle>
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
                  disabled
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
                label="Precio de venta"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="precio"
                  placeholder="Precio de venta"
                  value={dataModal.precio}
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" onClick={() => handleUpd()}>
              Realizar cambios
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

export default ListPedi;
