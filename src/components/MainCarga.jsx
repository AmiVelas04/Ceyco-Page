import React, { useState } from "react";
import { Card, Container, CardGroup } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import BuscProd from "./BuscProd";
import ComboVende from "./ComboVende";
import ListaProdCarga from "./ListaProdCarga";

export const MainCarga = () => {
  const [produ, setProdu] = useState([]);
  const [lista, setLista] = useState(<ListaProdCarga prods={produ} />);

  const obtenProdu = (prod) => {
    produ.push(prod);
    listado(produ);
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
              <ComboVende></ComboVende>
            </Card.Body>
          </Card>
        </CardGroup>
      </Card>
      <br />
      <h3 className="text-center"> Listado de productos de ruta</h3>
      <Card>{lista}</Card>
    </Container>
  );
};
