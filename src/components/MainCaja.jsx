import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  CardGroup,
  Button,
  ListGroup,
} from "react-bootstrap";
import ComboVende from "./ComboVende";
import ListaCaja from "./ListaCaja";
import axios from "axios";
import Swal from "sweetalert";
import FechaIni from "./FechaIni";
import { FechaFin } from "./FechaFin";

export const MainCaja = (usera) => {
  const [vende, setVende] = useState([]);
  const [conte, setConte] = useState([]);
  const [datosF, setDatosF] = useState([]);
  const [caja, setCaja] = useState([]);
  const [tot, setTot] = useState(0);

  const handleChange = ({ target }) => {
    setDatosF({
      ...datosF,
      [target.name]: target.value,
    });
    console.log(datosF);
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
              <Button variant="outline-success" onClick={() => allOpe()}>
                Mostrar todas operaciones de caja
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
    </Container>
  );
};
