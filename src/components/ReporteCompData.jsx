import React, { useState, useEffect } from "react";
import {
  Table,
  Modal,
  ModalFooter,
  ModalBody,
  FloatingLabel,
  ModalTitle,
  Form,
} from "react-bootstrap";
import Swal from "sweetalert";
import moment from "moment";
import axios from "axios";

export const ReporteCompData = ({ datos, cabec, contenido }) => {
  const URL = "/producto/todos/";
  const URLSAVE = "/producto/updatepage/";
  const UrlUpdVent = "/venta/updateventa/";
  const UrlDetVen = "/compra/LstProdCompDet/";
  const Url1Venta = "/Venta/venxid/";

  const [showModal, setshowModal] = useState(false);
  const [totComp, setTotComp] = useState(0);
  const [dataModal, setDataModal] = useState([]);
  const [datosComp, setDatosComp] = useState([]);

  const handleCloseModal = (e) => {
    e.preventDefault();
    setshowModal(false);
  };
  const handleOpenModal = (datos) => {
    const valo = {
      producto: datos[0],
      cantidad: datos[1],
      precio: datos[2],
      subtotal: datos[3],
    };
    setshowModal(true);
    setDataModal(valo);
  };

  const cargaUniVen = async (idven) => {
    try {
      const DatoVenUrl = Url1Venta + idven;
      const response = await axios.get(DatoVenUrl);
      if (response.status === 200) {
        return response.data[0];
      } else {
        await Swal(
          "No Encontrado",
          "No se encontraron los datos de la venta",
          "error"
        );
      }
    } catch (error) {
      await Swal(
        "Algo salio mal!",
        "El producto no pudo ser actualizado",
        "error"
      );
    }
  };

  const cargaDetaComp = async (idven) => {
    const detV = [];

    const DatoVenUrl = UrlDetVen + idven;
    const response = await axios.get(DatoVenUrl);
    const recib = response.data;

     console.log(recib);
    let items = 0;
    let tot = 0;
    recib.forEach((elem) => {
      let conte = "";
      if (elem.cant_caja === 1) {
        conte = "Unidad";
      } else {
        conte = "Caja";
      }
      const intermed = {
        idprod: elem.id_prod,
        nombre: elem.nombre,
        desc: elem.descrip,
        cant: elem.cantidad,
        precio: elem.pven,
        subt: elem.precio_caja,
        uni: conte,
      };
      items = items + 1;
      tot = tot + elem.precio_caja;
      detV.push(intermed);
      setTotComp(tot);
    });
    setDatosComp(detV);
    // console.log(items);
    if (items > 0) setshowModal(true);
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

  const anularv = async (idven) => {
    try {
      const unventa = await cargaUniVen(idven);
      unventa.estado = "Anulada";
      // console.log(unventa);
      const response = await axios.put(UrlUpdVent, unventa);
      if (response.status === 200) {
        await Swal("Actualizado", "La venta has sido anulada", "success");
      } else {
        await Swal("No actualizado", "No se pudo anular la venta", "error");
      }
    } catch (error) {
      await Swal(
        "Algo salio mal!",
        "No se ha podido cambiar el estado de la venta seleccionada" + error,
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
              <td>{valo.v1}</td>
              <td>{valo.v2}</td>
              <td>{valo.v3}</td>
              <td>{valo.v4}</td>
              <td className="col-md-3">
                <button
                  className="btn btn-info"
                  onClick={() => cargaDetaComp(valo.v1)}
                >
                  <i className="bi bi-exclamation-circle-fill"> </i>
                  Ver detalle
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      <Modal show={showModal} size="lg">
        <Modal.Header>
          <ModalTitle>Productos de venta #</ModalTitle>
        </Modal.Header>
        <Form>
          <ModalBody>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Producto</th>
                  <th>Descripcion</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                  <th>Unidad/Caja</th>
                </tr>
              </thead>
              {datosComp.map((valo, index) => (
                <tbody>
                  <tr>
                    <td>{valo.idprod}</td>
                    <td>{valo.nombre}</td>
                    <td>{valo.desc}</td>
                    <td>{valo.cant}</td>
                    <td>Q{valo.precio}</td>
                    <td>Q{valo.subt}</td>
                    <td>{valo.uni}</td>
                  </tr>
                </tbody>
              ))}
              <tfoot>
                <tr className="md-6">Total Q{totComp}</tr>
              </tfoot>
            </Table>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={handleCloseModal}>
              <i className="bi bi-x"></i>
              Cerrar
            </button>
            <button className="btn btn-Info">
              <i className="bi bi-filetype-pdf"></i>
              Generar PDF
            </button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default ReporteCompData;
