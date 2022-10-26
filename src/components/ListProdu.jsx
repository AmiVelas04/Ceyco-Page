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
} from "react-bootstrap";
import moment from "moment";
import Swal from "sweetalert";
import axios from "axios";

export const ListProdu = () => {
  // const URL = "http://cloudfma2022-001-site1.itempurl.com/api/producto/todos";
  const URL = "https://cloudfma2022-001-site1.itempurl.com/api/producto/todos/";
  const URLSAVE =
    "https://cloudfma2022-001-site1.itempurl.com/api/producto/update/";

  const getData = async () => {
    const response = axios.get(URL);
    return response;
  };
  const [mostra, setMostra] = useState([]);
  const [list, setList] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [dataModal, setDataModal] = useState([]);

  const handleCloseModal = () => {
    setshowModal(false);
  };
  const handleOpenModal = (datos) => {
    const valo = {
      id_prod: datos.id_prod,
      nombre: datos.nombre,
      descrip: datos.descrip,
      costo: datos.costo,
      cantidad: datos.cantidad,
      pmin: datos.pmin,
      pven: datos.pven,
      caduc: moment(datos.caduc).format("yyyy-MM-DD"),
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

  let conte = list.map((prod, index) => {
    return (
      <tr key={prod.id_prod}>
        <td>{prod[0]}</td>
        <td>{prod[1]}</td>
        <td>{prod[2]}</td>
        <td>Q.{prod[3]}</td>
        <td>Q.{prod[4]}</td>
        <td>Q.{prod[5]}</td>
        <td>{prod[6]}</td>
        <td>{moment(prod[7]).format("DD/MM/yyyy")}</td>
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
        ArrJson[indi].caduc,
      ]);
    }
    // Into.splice(0, 1);

    return Into;
  };

  const handleSave = async (e) => {
    // alert(dataModal);
    const response = await axios.put(URLSAVE, dataModal);
    try {
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

  useEffect(() => {
    //usefect body
    getData().then((response) => {
      //hacer alggo con esa respuesta
      // console.log(URL);
      //console.log(response.data);
      const devol = convtoArr(response.data);
      setList(devol);
      // console.log(list);
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
            <th>Fecha de caducidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{conte}</tbody>
      </Table>

      <Modal show={showModal} onhide={handleCloseModal}>
        <Modal.Header>
          <ModalTitle>Actualizar Datos del producto</ModalTitle>
        </Modal.Header>
        <Form>
          <ModalBody>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="id_prod"
                placeholder="Codigo de producto"
                value={dataModal.id_prod}
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
                name="descrip"
                placeholder="Descripcion"
                value={dataModal.descrip}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="costo"
                placeholder="Costo del producto"
                value={dataModal.costo}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="pmin"
                placeholder="Precio de venta minimo"
                value={dataModal.pmin}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="pven"
                placeholder="Precio de venta"
                value={dataModal.pven}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="cantidad"
                placeholder="Cantidad del producto"
                value={dataModal.cantidad}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                name="caduc"
                placeholder="fecha de caducidad"
                value={dataModal.caduc}
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
export default ListProdu;
