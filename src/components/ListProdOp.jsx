import React, { useState, useEffect } from "react";
import {
  Container,
  Modal,
  ModalTitle,
  ModalFooter,
  ModalBody,
  Form,
  Button,
  Row,
  Table,
  FormLabel,
  Col,
} from "react-bootstrap";

export const ListProdOp = ({ prods, handleElim, Edita, Tota }) => {
  const [precio, setPrecio] = useState("0");
  const [canti, setCanti] = useState("0");
  const [Lprods, setLprods] = useState([]);
  const [dataModal, setDataModal] = useState([]);
  const [showModal, setshowModal] = useState(false);

  const handleOpenModal = (id, canti, precios) => {
    var cambi = { id, canti, precios };
    setshowModal(true);
    setDataModal(cambi);
  };

  const handleCloseModal = (e) => {
    setshowModal(false);
    setPrecio(dataModal.precios);
    setCanti(dataModal.cant);
    //handleCamb(dataModal.id, dataModal.canti, dataModal.precios);
  };

  const handleChangeModal = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    // 👇️ prevent page refresh
    event.preventDefault();
  };

  const handleSave = () => {
    Edita(dataModal.id, dataModal.canti, dataModal.precios);
    setshowModal(false);
  };

  const handleId = (valor) => {
    let resp = "";
    valor.map((val) => {
      resp = val.id_prod;
    });
    return resp;
  };

  const handleNom = (valor) => {
    let resp = "";
    valor.map((val) => {
      resp = val.nombre;
    });
    return resp;
  };
  const handleDesc = (valor) => {
    let resp = "";
    valor.map((val) => {
      resp = val.descrip;
    });
    return resp;
  };

  const handlePre = (valor) => {
    let resp = "";
    valor.map((val) => {
      resp = val.costo;
    });
    return resp;
  };

  const handleCant = (valor) => {
    let resp = "";
    valor.map((val) => {
      resp = val.cantidad;
    });
    return resp;
  };

  const handleTot = (valor) => {
    let n1 = 0,
      n2 = 0,
      tot = 0;

    valor.map((val) => {
      n1 = val.costo;
      n2 = val.cantidad;
      tot = n1 * n2;
      // console.log(n1, n2, tot);
    });
    Tota(tot);
    return tot;
  };

  const totGen = () => {
    let tot = 0;
    Lprods.map((item, index) => {
      tot = tot + handleTot(item);
    });
    return tot;
  };

  useEffect(() => {
    setLprods(prods);
    //console.log(Lprods);
  }, []);

  return (
    <Container>
      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Codigo</th>
              <th>Producto</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>

          {Lprods.map((p, index) => (
            <tbody>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{handleId(p)}</td>
                <td>{handleNom(p)}</td>
                <td>{handleDesc(p)}</td>
                <td>{handlePre(p)}</td>
                <td>{handleCant(p)}</td>
                <td>{handleTot(p)}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() =>
                      handleOpenModal(handleId(p), handleCant(p), handlePre(p))
                    }
                  >
                    <i className="bi bi-pencil"></i>
                    Editar
                  </button>
                  <label> &nbsp;&nbsp;&nbsp;&nbsp; </label>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleElim(index)}
                  >
                    <i className="bi bi-trash3-fill"></i>
                    Borrar
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>

      <div>
        <Row>
          <Col></Col>
          <Col align="right">
            <h3>
              <FormLabel>Total Q.{totGen()}</FormLabel>
            </h3>
          </Col>
        </Row>
        <br />
      </div>

      <Modal show={showModal} onhide={handleCloseModal}>
        <Modal.Header>
          <ModalTitle>Cambiar Valores</ModalTitle>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="id_prod"
                placeholder="Codigo de producto"
                value={dataModal.id}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="precios"
                placeholder="Precio"
                value={dataModal.precios}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="canti"
                placeholder="Cantidad"
                value={dataModal.canti}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={() => handleSave()}>
              Guardar cambios
            </button>
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

export default ListProdOp;
