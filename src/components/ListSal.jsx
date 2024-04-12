import React, { useState } from "react";
import {
  ListGroup,
  Button,
  Container,
  Table,
  Modal,
  Form,
  ModalBody,
  ModalTitle,
  ModalFooter,
  FloatingLabel,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert";
import moment from "moment/moment";
import ComboMes from "./ComboMes";
import ComboAnio from "./ComboAnio";
import ComboVende from "./ComboVende";

export const ListSal = ({ conte }) => {
  const URLSave = "salario/saveone";
  const UrlSave2 = "salario/savesalusu";
  const [showModal, setshowModal] = useState(false);

  const [idSala, setIdSala] = useState([]);
  const [dataModal, setDataModal] = useState([]);

  const [vendemod, setVendemod] = useState(1);
  const [mese, setMese] = useState(1);
  const [anios, setAnios] = useState(2023);
  const getFecha = () => {
    const fech = new Date();
    const respu = `${fech.getFullYear()}/${
      fech.getMonth() + 1
    }/${fech.getDate()} ${fech.getHours()}: ${fech.getMinutes()}`;
    return respu;
  };

  const handleChangeModal = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value,
    });
  };
  const handleOpenModal = () => {
    getIdSala();
    setVendemod(1);
    setshowModal(true);
  };

  const handleCloseModal = (e) => {
    // e.preventDefault();
    setshowModal(false);
  };

  const lMes = (id) => {
    console.log(id);
    let mesName = "";
    switch (id) {
      case "1":
        mesName = "Enero";
        break;

      case "2":
        mesName = "Febrero";
        break;
      case "3":
        mesName = "Marzo";
        break;
      case "4":
        mesName = "Abril";
        break;
      case "5":
        mesName = "Mayo";
        break;
      case "6":
        mesName = "Junio";
        break;
      case "7":
        mesName = "Julio";
        break;
      case "8":
        mesName = "Agosto";
        break;
      case "9":
        mesName = "Septiembre";
        break;
      case "10":
        mesName = "Octubre";
        break;
      case "11":
        mesName = "Noviembre";
        break;
      case "12":
        mesName = "Diciembre";
        break;
      default:
        break;
    }
    return mesName;
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

  const getIdSala = async () => {
    try {
      const response1 = await axios.get("/salario/canti");

      if (response1.data === 0) {
        setIdSala(1);
      } else {
        const response2 = await axios.get("/salario/maxid");
        const id = response2.data;
        setIdSala(id + 1);
      }
    } catch (error) {
      await Swal(
        "Algo salio mal!",
        "hubo un error en la busqueda de salarios anteriores" + error,
        "error"
      );
    }
    //console.log(response.data);
  };

  const handleSave = async (e) => {
    // e.preventDefault();
    let total = dataModal.monto - dataModal.descuento;
    const salario = {
      id_sala: idSala,
      mes: lMes(mese),
      anio: anios.anios,
      monto: dataModal.monto,
      descuento: dataModal.descuento,
      total: total,
      estado: "Hecho",
      fecha: getFecha(),
    };
    console.log(salario);
    try {
      const response = await axios.post(URLSave, salario);
      if (response.status === 200) {
        const rel = {
          id_usu: vendemod,
          id_sala: idSala,
        };
        console.log(rel);
        const resp2 = await axios.post(UrlSave2, rel);
        if (resp2.status === 200) {
          const UrlCajSave = "caja/saveone";
          const caja = {
            id_caja: await getIdCaja(),
            operacion: "Salida",
            monto: total,
            detalle: "Pago sueldo",
            fecha: getFecha(),
            estado: "Activo",
            id_usu: 2,
          };
          const respCaja = await axios.post(UrlCajSave, caja);
          if (respCaja.status === 200) {
            await Swal(
              "Ingresado",
              "El  salario fue registrado con exito",
              "success"
            );
          } else {
            await Swal(
              "No guardado!",
              "No se pudo guardar los datos del salario en caja",
              "error"
            );
          }
        } else {
          await Swal(
            "No guardado!",
            "No se pudo guardar los datos del salario en relacion al empledo",
            "error"
          );
        }
      } else {
        await Swal(
          "No guardado!",
          "No se pudo guardar los datos del salario en relacion al usuario",
          "error"
        );
      }
    } catch (error) {
      await Swal(
        "Algo salio mal!",
        "No se pudo guardar los datos del salario" + error,
        "error"
      );
    }
  };

  return (
    <Container>
      <ListGroup></ListGroup>
      <ListGroup.Item>
        <Button variant="success" onClick={handleOpenModal}>
          <i class="bi bi-piggy-bank-fill"> Pagar Salario</i>
        </Button>
      </ListGroup.Item>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Mes</th>
            <th>Año</th>
            <th>Monto</th>
            <th>Descuento</th>
            <th>Total</th>
            <th>Fecha</th>
          </tr>
        </thead>
        {conte.map((elem, index) => (
          <tbody>
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{elem.mes}</td>
              <td>{elem.anio}</td>
              <td>Q{elem.monto}</td>
              <td>Q{elem.descuento}</td>
              <td>Q{elem.total}</td>
              <td>{moment(elem.fecha).format("DD/MM/yyyy HH:mm")}</td>
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
                  name="id_sala"
                  placeholder="Codigo"
                  value={idSala}
                  disabled
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <ComboMes mes={setMese}></ComboMes>
            </Form.Group>

            <Form.Group className="mb-3">
              <ComboAnio valor={setAnios}></ComboAnio>
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
                  placeholder="Telefono"
                  value={dataModal.monto}
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Descuento"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="descuento"
                  placeholder="Usuario"
                  value={dataModal.descuento}
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <ComboVende vend={setVendemod} />
            </Form.Group>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" onClick={() => handleSave()}>
              Guardar cambios
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
