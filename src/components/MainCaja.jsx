import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  FormLabel,
  InputGroup,
  Modal,
  ModalBody,
  ModalTitle,
  ModalFooter,
  Form,
  Button,
  ListGroup,
  FloatingLabel,
  Overlay,
} from "react-bootstrap";
import ComboVende from "./ComboVende";
import ListaCaja from "./ListaCaja";
import axios from "axios";
import Swal from "sweetalert";
import FechaIni from "./FechaIni";
import { FechaFin } from "./FechaFin";
import { useSelector } from "react-redux";

export const MainCaja = (usera) => {
  const URLSaveCaja = "Caja/saveone";
  const usua = useSelector((state) => state.user);

  const [vende, setVende] = useState([]);
  const [conte, setConte] = useState([]);
  const [datosF, setDatosF] = useState([]);
  const [datosOpe, setDatosOpe] = useState([]);
  const [caja, setCaja] = useState([]);
  const [ope, setOpe] = useState("Entrada");
  const [showModal, setshowModal] = useState(false);
  const [tot, setTot] = useState(0);
  const [idCaja, setIdCaja] = useState(0);
  const [dataModal, setDataModal] = useState([]);

  const handleChange = ({ target }) => {
    setDatosF({
      ...datosF,
      [target.name]: target.value,
    });
    console.log(datosF);
  };

  const handleChangeOpe = ({ target }) => {
    setDatosOpe({
      ...datosOpe,
      [target.name]: target.value,
    });
    console.log(datosOpe);
  };

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

  const handleOpenModal = (datos) => {
    // console.log(valo);
    setshowModal(true);
    // setDataModal(valo);
    getIdCaja();
  };

  const handleCloseModal = (e) => {
    //  e.preventDefault();
    setshowModal(false);
  };

  const opeCaja = () => {};

  const handleChangeModal = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value,
    });
  };

  const handleSave = async (e) => {
    // e.preventDefault();
    const cajadatos = {
      id_caja: idCaja,
      operacion: datosOpe.ope,
      monto: datosOpe.monto,
      detalle: datosOpe.detalle,
      fecha: getFecha(),
      estado: "Activo",
      id_usu: usua.id_usu,
    };
    //console.log(cajadatos);
    try {
      const response = await axios.post(URLSaveCaja, cajadatos);
      if (response.status === 200) {
        await Swal("Ingresado", "El gasto ha sido registrado ", "success");
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

  const operaciones = async () => {
    //  console.log(datosF);

    if (datosF.fechai == null) {
      await Swal(
        "Fechas!",
        "No se ha seleccionado la fecha inicial",
        "warning"
      );
      return;
    } else if (datosF.fechaf == null) {
      await Swal("Fechas!", "No se ha seleccionado la fecha final", "warning");
      return;
    }
    var temp = [];
    const urlCajaDir =
      "Caja/Cajauni/" + datosF.fechai + "/" + datosF.fechaf + "/" + vende;
    //setTot(0);
    let val = 0;
    const response = await axios.get(urlCajaDir);
    // console.log(response.data);
    const respo = response.data;
    respo.forEach((elem) => {
      const interm = {
        id_caja: elem.id_caja,
        operacion: elem.operacion,
        monto: elem.monto,
        detalle: elem.detalle,
        fecha: elem.fecha,
        estado: elem.estado,
        id_usu: elem.id_usu,
      };

      if (elem.operacion === "Salida") {
        val = val - elem.monto;
      } else {
        val = val + elem.monto;
      }

      temp.push(interm);
      console.log(val);
    });
    setTot(val);
    setCaja(temp);
    //console.log(prods);
    setConte(<ListaCaja gene={temp}></ListaCaja>);
  };

  const allOpe = async () => {
    console.log(datosF);
    let val = 0;
    if (datosF.fechai == null) {
      await Swal(
        "Fechas!",
        "No se ha seleccionado la fecha inicial",
        "warning"
      );
      return;
    } else if (datosF.fechaf == null) {
      await Swal("Fechas!", "No se ha seleccionado la fecha final", "warning");
      return;
    }
    var temp = [];
    const urlCajaDir = "Caja/CajauniAll/" + datosF.fechai + "/" + datosF.fechaf;
    // console.log(urlCajaDir);
    const response = await axios.get(urlCajaDir);
    // console.log(response.data);
    const respo = response.data;

    respo.forEach((elem) => {
      const interm = {
        id_caja: elem.id_caja,
        operacion: elem.operacion,
        monto: elem.monto,
        detalle: elem.detalle,
        fecha: elem.fecha,
        estado: elem.estado,
        id_usu: elem.id_usu,
      };

      if (elem.operacion === "Salida") {
        val = val - elem.monto;
      } else {
        val = val + elem.monto;
      }

      temp.push(interm);
    });

    setCaja(temp);
    setTot(val);
    //console.log(prods);
    setConte(<ListaCaja gene={temp}></ListaCaja>);
  };

  return (
    <Container>
      <Card>
        <Card.Header>
          <h3>Caja</h3>
        </Card.Header>
        <ListGroup>
          <ListGroup.Item>
            <Container>
              <Row>
                <Col>
                  <div>
                    <ComboVende vend={setVende} />
                  </div>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      Fecha Inicial
                      <FechaIni fecha={handleChange} />
                    </Col>
                    <Col>
                      Fecha Final
                      <FechaFin fecha={handleChange} />
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
              <Button variant="outline-warning" onClick={() => operaciones()}>
                Mostrar operaciones de caja por vendedor
              </Button>
              <Button variant="outline-info" onClick={() => allOpe()}>
                Mostrar todas operaciones de caja
              </Button>
              <Button
                variant="outline-success"
                onClick={() => handleOpenModal()}
              >
                Agregar operacion de caja
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
              Total Q{tot}
            </Card.Body>
          </ListGroup.Item>
        </ListGroup>
      </Card>

      <Modal show={showModal} onhide={handleCloseModal}>
        <Modal.Header>
          <ModalTitle>Ingresar nueva operacion de caja</ModalTitle>
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

            <Form.Group className="mb-3 col-12">
              <FormLabel>Operacion</FormLabel>
              <Row className="md d-md-flex">
                <InputGroup>
                  <InputGroup.Text>
                    <i class="bi bi-cash"></i>
                  </InputGroup.Text>
                  <Form.Select
                    aria-label=""
                    onChange={handleChangeOpe}
                    name="ope"
                  >
                    <option className="form-group" value="Entrada" key="0">
                      Entrada
                    </option>
                    <option className="form-group" value="Salida" key="1">
                      Salida
                    </option>
                  </Form.Select>
                  <br></br>
                  <Button className="btn btn-success" onClick={handleChangeOpe}>
                    Seleccionar
                  </Button>
                  <br></br>
                </InputGroup>
              </Row>
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
                  onChange={handleChangeOpe}
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
                  onChange={handleChangeOpe}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" onClick={() => handleSave()}>
              Guardar operacion
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
