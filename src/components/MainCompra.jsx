import React, { useState } from "react";
import { Container, Card, CardGroup, Button } from "react-bootstrap";
import { BuscProd } from "./BuscProd";

import { ListProdOp } from "./ListProdOp";
import { Link } from "react-router-dom";
import { ComboProve } from "./ComboProve";
import BuscProdCompra from "./BuscProdCompra";

export const MainCompra = () => {
  const [produ, setProdu] = useState([]);
  const [lista, setLista] = useState(<ListProdOp prods={produ} />);

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
      <ListProdOp prods={produc} handleElim={elimProd} Edita={editProd} />
    );
  };

  return (
    <div>
      <CardGroup>
        <Card>
          <Card.Body>
            <BuscProd DevProd={obtenProdu} />
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <ComboProve></ComboProve>
          </Card.Body>
        </Card>
      </CardGroup>
      <CardGroup>
        <Card>
          <Card.Header>Datos del producto</Card.Header>
          <Card.Body>
            <BuscProdCompra></BuscProdCompra>
          </Card.Body>
        </Card>
      </CardGroup>

      <br />
      <h3 className="text-center"> Listado de productos para venta</h3>
      <Card>{lista}</Card>
      <br />
      <Button size="lg" variant="success">
        Proeder con la compra
      </Button>
    </div>
  );
};
