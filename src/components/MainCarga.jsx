import React, { useState } from "react";
import { Card, Container, CardGroup, Button } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import BuscProd from "./BuscProd";
import ComboVende from "./ComboVende";
import ListaProdCarga from "./ListaProdCarga";
import axios from "axios";
import Swal from "sweetalert";

export const MainCarga = () => {
  //Url de direccion
  const UrlSgen = "ruta/saverut";
  const UrlSdet = "ruta/saverutdet";

  //Obtener fecha actual
  const getFecha = () => {
    const fech = new Date();
    const respu = `${fech.getFullYear()}/${
      fech.getMonth() + 1
    }/${fech.getDate()}`;
    return respu;
  };

  const [produ, setProdu] = useState([]);
  const [lista, setLista] = useState(<ListaProdCarga prods={produ} />);
  const [datos, setDatos] = useState([]);

  const preparar = () => {
    const valo = {
      id_ruta: 1,
      id_usu: datos.id_usu,
      fecha: getFecha(),
      estado: "Cargado",
    };
    saveGen(valo);
  };

  const saveGen = async (datos) => {
    try {
      const response = await axios.post(UrlSgen, datos);
      if (response.status === 200 && saveDet(datos.id_ruta)) {
        await Swal(
          "Guardado",
          "los productos has sido asignados a la ruta del vendedor:",
          "success"
        );
        // history("/prod");
      } else if (response.status === 500) {
        Swal(
          "No guardado",
          "No se ha podido guardar la ruta del vendedor",
          "error"
        );
      }
    } catch (error) {
      Swal(
        "No guardado",
        "No se ha podido guardar la ruta del vendedor, verifique el estado del servidor " +
          error,
        "error"
      );
    }
  };

  const saveDet = (ruta) => {
    console.log(produ);
    var idprod = 0,
      canti = 0,
      precio = 0,
      subto = 0;
    try {
      produ.map((elem, index) => {
        elem.map((dato, index) => {
          idprod = dato.id_prod;
          canti = dato.cantidad;
          precio = dato.pven;
          subto = dato.cantidad * dato.pven;
        });

        const valor = {
          id_ruta_detalle: index + 1,
          id_ruta: ruta,
          id_prod: idprod,
          cantidad: canti,
          precio: precio,
          subtotal: subto,
        };
        // console.log(valor);
        //console.log(valor);
        const response = axios.post(UrlSdet, valor);
        if (!response.status === 200) {
          Swal(
            "No guardado",
            "No se pudieron guardar los productos de la ruta",
            "error"
          );
          return false;
        }
      });
    } catch (error) {
      Swal(
        "No guardado",
        "No se pudieron guardar los productos de la ruta, verifique el estado del servidor" +
          error,
        "error"
      );
      console.log(error);
      return false;
    }
    return true;
  };

  const elimingre = () => {};

  const obtenProdu = (prod) => {
    produ.push(prod);
    listado(produ);
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

  const editProd = (indice, cant, precio) => {
    produ.map((elem, index) => {
      let canti = 0,
        price = 0;
      canti = handlePrec(elem, indice, precio);
      price = handleCanti(elem, indice, cant);
      console.log(canti + "---" + price);
    });
    setProdu(produ);
    listado(produ);
  };

  const handlePrec = (valor, id, prize) => {
    let resp = "0";
    valor.map((val) => {
      if (id === val.id_prod) {
        val.pven = prize;
        resp = val.pven;
        return resp;
      }
    });
  };

  const handleCanti = (valor, id, cant) => {
    let resp = "0";
    valor.map((val) => {
      if (id === val.id_prod) {
        val.cantidad = cant;
        resp = val.cantidad;
        return resp;
      }
    });
  };

  const elimProd = (indice) => {
    produ.splice(indice, 1);
    listado(produ);
  };

  const listado = (produc) => {
    setLista(
      <ListaProdCarga prods={produc} handleElim={elimProd} Edita={editProd} />
    );
  };

  return (
    <Container>
      <br></br>
      <Card>
        <CardHeader>
          <h3>Carga de productos a vendedor</h3>
        </CardHeader>
        <CardGroup>
          <Card>
            <Card.Body>
              <BuscProd DevProd={obtenProdu} />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <ComboVende vend={handleChange}></ComboVende>
            </Card.Body>
          </Card>
        </CardGroup>
      </Card>
      <br />
      <h3 className="text-center"> Listado de productos de ruta</h3>
      <Card>{lista}</Card>
      <br />
      <Button size="lg" variant="success" onClick={preparar}>
        Cargar Ruta
      </Button>
    </Container>
  );
};
