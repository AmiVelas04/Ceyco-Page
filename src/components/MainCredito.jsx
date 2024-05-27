import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  ListGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Row,
} from "react-bootstrap";
import ComboVende from "./ComboVende";
import ComboCred from "./ComboCred";
import Swal from "sweetalert";
import axios from "axios";
import ListPago from "./ListPago";
import { useSelector } from "react-redux";

export const MainCredito = () => {
  const URLgetcred = "Credito/credbyvende/";
  const URLSavePago = "PagoCre/SavePagoCre";

  const usua = useSelector((state) => state.user);
  const [vende, setVende] = useState(0);

  const [conte, setConte] = useState([]);
  const [cred, setCred] = useState([]);
  const [enccred, setEnccred] = useState([]);
  const [dataModal, setDataModal] = useState(null);
  const [showModal, setshowModal] = useState(false);

  const getFecha = () => {
    const fech = new Date();
    const respu = `${fech.getFullYear()}/${
      fech.getMonth() + 1
    }/${fech.getDate()}`;
    return respu;
  };

  const getIdPagoC = async () => {
    const UrlCajIdCount = "pagocre/canti";
    const UrlCajIdMax = "pagocre/maxid";
    try {
      const response1 = await axios.get(UrlCajIdCount);
      if (response1.length <= 0) {
        return 1;
      } else {
        const response2 = await axios.get(UrlCajIdMax);
        const id = response2.data;
        return id + 1;
        //setIdPagoc(id + 1);
      }
    } catch (error) {
      await Swal(
        "Algo salio mal!",
        "hubo un error en la busqueda de pagos anteriores" + error,
        "error"
      );
    }
    //console.log(response.data);
  };

  const getIdCaja = async () => {
    const UrlCajIdCount = "caja/canti";
    const UrlCajIdMax = "caja/maxid";
    try {
      const response1 = await axios.get(UrlCajIdCount);
      if (response1.length <= 0) {
        return 1;
      } else {
        const response2 = await axios.get(UrlCajIdMax);
        const id = response2.data;
        return id + 1;
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

  const handleChangeModal = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value,
    });
  };

  const handleCloseModal = () => {
    setshowModal(false);
  };
  const handleOpenModal = (datos) => {
    setshowModal(true);
  };

  const getCred = async (idusu) => {
    // console.log(idu);
    if (idusu === undefined) {
      // console.log("Usuario no definido: " + idu);
      return;
    }
    var ruta = URLgetcred + idusu;
    // console.log("Ruta para obtener pedido por usuario " + ruta);
    const response = (await axios.get(ruta)).data;
    // console.log(response);
    return response;
  };

  const elegir = async (idusu) => {
    // console.log(idusu);

    //hacer alggo con esa respuesta
    const devol = convtoArr(await getCred(idusu));
    //console.log(devol);
    setVende(idusu);
    setEnccred(devol);
  };

  const handleSave = async (e) => {
    try {
      var id = await getIdPagoC();
      const valo = {
        id_pagoc: id,
        id_credito: cred,
        id_usu: usua,
        monto: dataModal.monto,
        fecha: getFecha(),
        detalle: "Pago de credito",
        estado: "Activo",
      };
      //console.log(valo);
      const response = await axios.post(URLSavePago, valo);
      if (response.status === 200) {
        const UrlCajSave = "caja/saveone";
        const caja = {
          id_caja: await getIdCaja(),
          operacion: "Entrada",
          monto: dataModal.monto,
          detalle: "Abono de credito " + cred,
          fecha: getFecha(),
          estado: "Activo",
          id_usu: usua,
        };
        const respCaja = await axios.post(UrlCajSave, caja);
        if (respCaja.status === 200) {
          await Swal(
            "Guardado",
            "El pago ha sido guardado con exito",
            "success"
          );
        } else {
          await Swal(
            "Algo salio mal",
            "El pago ha sido guardado, sin embargo no se ha registrado en caja",
            "warning"
          );
        }
      } else {
        await Swal(
          "No Guardado",
          "El pago no ha podido ser guardado",
          "warning"
        );
      }
    } catch (error) {
      await Swal(
        "No Guardado",
        "El pago no ha podido ser guardado " + error,
        "error"
      );
    }
  };

  const convtoArr = (ArrJson) => {
    var Into = [{}];
    console.log(ArrJson);
    for (let indi in ArrJson) {
      //console.log(indi);

      Into.push([
        ArrJson[indi].id_credito,
        ArrJson[indi].id_cli,
        ArrJson[indi].id_usu,
        ArrJson[indi].id_venta,
        ArrJson[indi].monto,
        ArrJson[indi].fecha,
        ArrJson[indi].detalle,
        ArrJson[indi].estado,
      ]);
    }
    Into.splice(0, 1);
    //  console.log(Into);
    return Into;
  };

  const pagos = async () => {
    var temp = [];
    const UrlPpedi = "pagocre/Pagosbycred/" + cred;
    // console.log(pedi);
    const response = await axios.get(UrlPpedi);
    const datos = response.data;
    //  console.log(datos);
    datos.forEach((elem) => {
      const interm = {
        id_pagoc: elem.id_pagoc,
        id_credito: elem.id_credito,
        id_usu: elem.id_usu,
        monto: elem.monto,
        fecha: elem.fecha,
        detalle: elem.detalle,
        estado: elem.estado,
      };
      temp.push(interm);
    });
    //console.log(temp);
    //  setProds(temp);
    //console.log(prods);
    setConte(<ListPago cred={cred} gene={temp}></ListPago>);
  };

  return (
    <Container>
      <Card>
        <Card.Header>
          <h3>Creditos</h3>
        </Card.Header>
        <ListGroup>
          <ListGroup.Item>
            <Container>
              <Row>
                <Col>
                  <div>
                    <ComboVende vend={elegir} />
                  </div>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <ComboCred
                        seleccred={setCred}
                        listacred={enccred}
                      ></ComboCred>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
          <ListGroup.Item>
            <Container
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Button variant="outline-info" onClick={() => pagos()}>
                Mostrar Pagos
              </Button>

              <Button
                variant="outline-success"
                onClick={() => handleOpenModal()}
              >
                Realizar pago
              </Button>
            </Container>
          </ListGroup.Item>
          <ListGroup.Item>
            <Card.Body>{conte}</Card.Body>
          </ListGroup.Item>
          <ListGroup.Item>
            <Card.Body
              style={{
                display: "flex",
                alignItems: "right",
                justifyContent: "end",
              }}
            >
              Saldo Q
            </Card.Body>
          </ListGroup.Item>
        </ListGroup>
      </Card>

      <Modal show={showModal} onhide={handleCloseModal}>
        <Modal.Header>
          <ModalTitle>Ingresar pago</ModalTitle>
        </Modal.Header>

        <Form>
          <ModalBody>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Codigo del Credito"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="id_cred"
                  placeholder="Codigo del credito"
                  onChange={handleChangeModal}
                  value={cred}
                  disabled
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Monto del pago"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="monto"
                  placeholder="Monto del pago"
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </ModalBody>

          <ModalFooter>
            <Button className="btn btn-success" onClick={() => handleSave()}>
              Registrar Pago
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
