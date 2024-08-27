import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import ComboVende from "./ComboVende";
import FechaIni from "./FechaIni";
import axios from "axios";
import Swal from "sweetalert";
import { ListDescarga } from "./ListDescarga";

export const MainDescarga = () => {
  const GetProdPedi = "pedido/";


  const [vende, setVende] = useState([]);
  const [datos, setDatos] = useState([]);
  const [conte, setConte] = useState([]);
  const [allVende, setAllVende] = useState([]);
  const [nomVende, setNomVende] = useState("(No seleccionado)");
  const [tot, setTot] = useState(0);
  const getvend = async () => {
    const response = axios.get("Usuario/Usuvend");
    return response;
  };

  const handleChange = ({ target }) => {
    setDatos({
      ...datos,
      [target.name]: target.value,
    });
    //console.log(datos);
  };

  const nomUsu = async (idusu) => {
    const urlusu = "Usuario/usubyid/" + idusu;
    const response = await axios.get(urlusu);
    const resp = response.data;
    // console.log(resp[0].nombre);
    setNomVende(resp[0].nombre);
    return resp[0].nombre;
  };

  const allprodu = async () => {
    //  console.log(vende);
    if (datos.fechai == null) {
      await Swal(
        "Fechas!",
        "No se ha seleccionado una fecha para los pedidos",
        "warning"
      );
      return;
    }
    if (vende === null) {
      await Swal(
        "Vendedor!",
        "No se ha seleccionado un vendedor para revisar los pedidos",
        "warning"
      );
      return;
    }

    var temp = [];
    const ventaCaja = "Venta/VentacajaDate/" + datos.fechai + "/" + vende;
    const ventaUni = "Venta/VentauniDate/" + datos.fechai + "/" + vende;
    const urlDicioCaja =
      GetProdPedi + "DiccioCajaAll/" + datos.fechai + "/" + vende;
    const urlDiccioUni =
      GetProdPedi + "DiccioUniAll/" + datos.fechai + "/" + vende;

    //const UrlPedRes = urlpedpord;
    //console.log(ventaCaja);
    const response1 = await axios.get(urlDicioCaja);
    const response2 = await axios.get(urlDiccioUni);
    const response3 = await axios.get(ventaCaja);
    const response4 = await axios.get(ventaUni);
    const mynombre = await nomUsu(vende);
    setNomVende(mynombre);
    //console.log(urlDicioCaja);
    //console.log(urlDiccioUni);

    const dresp1 = response1.data;
    const dresp2 = response2.data;
    const dresp3 = response3.data;
    const dresp4 = response4.data;

    // console.log(dresp2);
    // console.log(dresp4);

    dresp1.forEach((elem, index) => {
      //console.log(elem);
      var sumatot = elem.cantidad;
      dresp3.forEach((eleg1, indice) => {
        if (elem.id_prod === eleg1.id_prod) {
       //   console.log(elem.id_prod + "===" + eleg1.id_prod);
        //  console.log(sumatot);
         // console.log(eleg1.cantidad);
          sumatot = sumatot - eleg1.cantidad;
        }
      });

      const interm = {
        id_prod: elem.id_prod,
        nombre: elem.nombre,
        descrip: elem.descrip,
        costo: "0",
        pmin: "0",
        pven: "0",
        caduc: "0",
        cantidad: sumatot,
        conte: "Caja",
      };

      //  console.log(interm);
      temp.push(interm);
    });

    dresp2.forEach((elem1) => {
      var sumatot = elem1.cantidad;
      dresp4.forEach((eleg2) => {
        if (elem1.id_prod === eleg2.id_prod) {
          sumatot = sumatot - eleg2.cantidad;
          console.log(sumatot);
        }
      });

      const interm = {
        id_prod: elem1.id_prod,
        nombre: elem1.nombre,
        descrip: elem1.descrip,
        costo: "0",
        pmin: "0",
        pven: "0",
        caduc: "0",
        cantidad: sumatot,
        conte: "Unidad",
      };
      temp.push(interm);
    });

   // console.log(temp);
    // console.log(response.data);
    // const devol = convtoArr(temp);
    // console.log(devol);
    //setProdus(devol);
    setConte(
      <ListDescarga
        fecha={datos.fechai}
        todos={temp}
        nom={mynombre}
      ></ListDescarga>
    );
  };

  useEffect(() => {
    //usefect body
    getvend().then((response) => {
      //hacer alggo con esa respuesta
      setAllVende(response.data);
      //console.log(response.data);
    });
  }, []);

  return (
    <Container>
      <Card>
        <Card.Header>
          <h3>Descarga</h3>
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
                      Fecha
                      <FechaIni fecha={handleChange} />
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
              <Button variant="outline-success" onClick={() => allprodu()}>
                Mostrar productos de descarga
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
