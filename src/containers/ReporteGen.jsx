import React,{ useState, useEffect } from "react";
import { Table,Modal,ModalFooter,  ModalBody,  FloatingLabel,
  ModalTitle,
Form } from "react-bootstrap";
import Swal from "sweetalert";
import moment from "moment";
import axios from "axios";

export const ReporteGen = ({ datos, cabec, contenido }) => {
  const URL = "/producto/todos/";
  const URLSAVE = "/producto/updatepage/";
  const [showModal, setshowModal] = useState(false);
  const [dataModal, setDataModal] = useState([]);

  const handleCloseModal = () => {
    setshowModal(false);
  };
  const handleOpenModal = (datos) => {
    const valo = {
      producto:datos[0],
      cantidad:datos[1],
      precio:datos[2],
      subtotal:datos[3]
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
        "El prodducto no pudo ser actualizado, verifique el estado del servidor" +
          error,
        "error"
      );
    }
  };
  
  return (
    <div>
      <center>
        <h2>{cabec.titulo}</h2>
      </center>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th># {datos.ini}</th>
            <th>{cabec.h1}</th>
            <th>{cabec.h2}</th>
            <th>{cabec.h3}</th>
            <th>{cabec.h4}</th>
            <th>{cabec.h5}</th>

          </tr>
        </thead>
        {contenido.map((valo, index) => (
          <tbody>
            <tr>
              <td>{index + 1}</td>
              <td>{valo.producto}</td>
              <td>{valo.v2}</td>
              <td>{valo.v3}</td>
              <td>{valo.v4}</td>
                <td>
                <button
            className="btn bnt/ btn btn-primary"
            onClick={() => handleOpenModal(valo)}
          >
            <i className="bi bi-eye"
            > </i>
            ver detalle
          </button>
                </td>
            </tr>
          </tbody>
        ))}
      </Table>

      
      <Modal show={showModal} onhide={handleCloseModal}>
        <Modal.Header>
          <ModalTitle>Actualizar Datos del producto</ModalTitle>
        </Modal.Header>
        <Form>
          <ModalBody>

            <Table>
            <Table striped bordered hover size="sm">
        <thead>
          <tr>
          <th>Orden</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        {dataModal.map((valo, index) => (
          <tbody>
            <tr>
              <td>{index + 1}</td>
              <td>{valo}</td>
              <td>{valo.v2}</td>
              <td>{valo.v3}</td>
              <td>{valo.v4}</td>
           
            </tr>
          </tbody>
        ))}
      </Table>
            </Table>
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
          
            <button
              className="btn btn-danger"
              onClick={() => setshowModal(false)}
            >
              Cerrar
            </button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>

    
  );
};

export default ReporteGen;
