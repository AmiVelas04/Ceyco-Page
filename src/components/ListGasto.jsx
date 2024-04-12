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
import ComboVende from "./ComboVende";
import axios from "axios";
import Swal from "sweetalert";
import moment from "moment/moment";
import FechaIni from "./FechaIni";
import { FechaFin } from "./FechaFin";

export const ListGasto = () => {
  const URL = "Gasto/";
  const URL1 = "Gasto/peri";
  /*const URL = "Gasto/";
  const URL = "Gasto/";*/

  const URLSAVE = "gasto/save";
  const UrlGasIdCount = "gasto/codcant";
  const UrlGasIdMax = "gasto/codmax";

  const getData = async () => {
    const dire = URL + "Todos";
    const response = axios.get(dire);

    return response;
  };

  const getFecha = () => {
    const fech = new Date();
    const respu = `${fech.getFullYear()}/${
      fech.getMonth() + 1
    }/${fech.getDate()}`;
    console.log(respu);
    return respu;
  };

  const [list, setList] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [showModal2, setshowModal2] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [dataModal2, setDataModal2] = useState([]);
  const [total, setTotal] = useState(0);
  const [datos, setDatos] = useState([]);
  const [vende, setVende] = useState([]);
  const [idgast, setIdgast] = useState(0);
  const [dateHoy, setDayHoy] = useState(getFecha());

  const handleCloseModal = (e) => {
    e.preventDefault();
    setshowModal(false);
  };

  const handleCloseModal2 = (e) => {
    setshowModal2(false);
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

  const handleOpenModal2 = (datos) => {
    getIdGast();
    // console.log(valo);
    setshowModal2(true);
  };

  const handleChangeModal = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value,
    });
  };

  const handleChangeModal2 = ({ target }) => {
    setDataModal2({
      ...dataModal2,
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

  const getIdGast = async () => {
    try {
      const response1 = await axios.get(UrlGasIdCount);

      if (response1.length <= 0) {
        setIdgast(1);
      } else {
        const response2 = await axios.get(UrlGasIdMax);
        const id = response2.data;
        setIdgast(id + 1);
      }
    } catch (error) {
      await Swal(
        "Algo salio mal!",
        "hubo un error en la busqueda de gastos anteriores" + error,
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

  const totGast = async () => {
    let tot = 0;
    // console.log(list);
    list.forEach((item) => {
      tot = tot + item.monto;
    });

    setTotal(tot);
  };

  const handleTot = async (valor) => {
    //   console.log(valor);
    var toto = 0;
    valor.map((val) => {
      toto = val.monto;
    });

    console.log(toto);
    return toto;
  };

  const handleSave2 = async (e) => {
    // e.preventDefault();
    const gasto = {
      id_gasto: idgast,
      descrip: dataModal2.descrip,
      fecha: dataModal2.fecha,
      monto: dataModal2.monto,
      estado: "Activo",
      docu: dataModal2.docu,
      id_usu: vende,
    };
    //  console.log(gasto);
    try {
      const response = await axios.post(URLSAVE, gasto);
      if (response.status === 200) {
        if (saveCaja(gasto)) {
          await Swal("Ingresado", "El gasto ha sido registrado", "success");
        } else {
          await Swal(
            "No guardado!",
            "No se pudo guardar los datos en caja",
            "error"
          );
        }
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

  const saveCaja = async (datos) => {
    const UrlCajSave = "caja/saveone";
    try {
      const caja = {
        id_caja: await getIdCaja(),
        operacion: "Salida",
        monto: datos.monto,
        detalle: "Gasto registrado",
        fecha: datos.fecha,
        estado: "Activo",
        id_usu: vende,
      };
      console.log(caja);
      const response = await axios.post(UrlCajSave, caja);
      return response.status === 200;
    } catch (error) {
      await Swal(
        "Algo salio mal!",
        "No se pudo guardar el registro en caja" + error,
        "error"
      );
      return false;
    }
  };

  const cargaGasto = async () => {
    //console.log(datos);
    const dire = URL1 + "/" + datos.fechai + "/" + datos.fechaf + "/" + vende;
    //  console.log(dire);
    const response = await axios.get(dire);

    if (response.data.length <= 0) {
      await Swal(
        "Sin registos",
        "No se encontraron registros de gastos para el usuario seleccionado",
        "warning"
      );
    } else {
      setList(response.data);
      totGast();
    }
  };

  useEffect(() => {
    //usefect body
    getData().then((response) => {
      //hacer alggo con esa respuesta
      // setList(response.data);
      // totGast();
      //console.log(response.data);
    });
  }, []);

  return (
    <Container fluid="md">
      <Card>
        <Card.Header>
          <h3>Control de gastos</h3>
        </Card.Header>

        <ListGroup variant="flush">
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
                      <FechaIni fecha={handleChange}></FechaIni>
                    </Col>
                    <Col>
                      Fecha Final
                      <FechaFin fecha={handleChange}></FechaFin>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
          <ListGroup.Item>
            <ButtonGroup className="me-2" aria-label="">
              <Button variant="success" onClick={() => handleOpenModal2()}>
                <i className="bi bi-cash"> Agregar Gasto </i>
              </Button>
            </ButtonGroup>
          </ListGroup.Item>

          <ListGroup.Item>
            <div>
              <h1> Listado de Gastos</h1>

              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Descripcion</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Documento</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                {list.map((valu, index) => (
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{valu.descrip}</td>
                      <td>{moment(valu.fecha).format("DD/MM/yyyy")}</td>
                      <td>Q{valu.monto}</td>
                      <td># Documentacion {index + 33}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => handleOpenModal(valu)}
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <Row className="">
                <Col>
                  <Button variant="primary" onClick={() => cargaGasto()}>
                    Mostrar gastos <i className="bi bi-calculator-fill"></i>
                  </Button>
                </Col>
                <Col>
                  <h3>
                    <FormLabel className="md-3 offset-0 position-relative">
                      Total Q.{total}
                    </FormLabel>
                  </h3>
                </Col>
              </Row>
            </div>
          </ListGroup.Item>
        </ListGroup>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header>
            <ModalTitle>Actualizar Datos</ModalTitle>
          </Modal.Header>
          <Form onSubmit={handleCloseModal}>
            <ModalBody>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="id_gasto"
                  placeholder="Codigo"
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="descrip"
                  placeholder="Descripcion"
                  value={dataModal.descrip}
                  onChange={handleChangeModal}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="monto"
                  placeholder="Monto"
                  value={dataModal.monto}
                  onChange={handleChangeModal}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="date"
                  name="fecha"
                  placeholder="Fecha"
                  defaultValue={dataModal.fecha}
                  onChange={handleChangeModal}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3"></Form.Group>
            </ModalBody>
            <ModalFooter>
              <Button className="btn btn-success">Guardar cambios</Button>
              <button
                className="btn btn-danger"
                onClick={() => setDataModal(false)}
              >
                Cerrar
              </button>
            </ModalFooter>
          </Form>
        </Modal>

        <Modal show={showModal2} onHide={handleCloseModal2}>
          <Modal.Header>
            <ModalTitle>Ingresar gasto</ModalTitle>
          </Modal.Header>
          <Form>
            <ModalBody>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="id_gasto"
                  placeholder="Codigo"
                  value={idgast}
                  onChange={handleChangeModal2}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="descrip"
                  placeholder="Descripcion"
                  onChange={handleChangeModal2}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  name="monto"
                  placeholder="Monto"
                  onChange={handleChangeModal2}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="date"
                  name="fecha"
                  // value={new Date()}
                  onChange={handleChangeModal2}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="estado"
                  placeholder="Estado"
                  onChange={handleChangeModal2}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="docu"
                  placeholder="Documento"
                  onChange={handleChangeModal2}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <ComboVende vend={setVende} />
              </Form.Group>

              <Form.Group className="mb-3"></Form.Group>
            </ModalBody>
            <ModalFooter>
              <Button className="btn btn-success" onClick={handleSave2}>
                Guardar cambios
              </Button>
              <Button onClick={setshowModal2}>Cerrar</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Card>
    </Container>
  );
};

export default ListGasto;
