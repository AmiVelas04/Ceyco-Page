import React, { useState } from "react";
import { Container, Card, CardGroup } from "react-bootstrap";
import { BuscProd } from "./BuscProd";
import { ComboCli } from "./ComboCli";
import ComboVende from "./ComboVende";
import { ListProdOp } from "./ListProdOp";
import { TipoVen } from "./TipoVen";

export const MainVenta = () => {
  const [produ, setProdu] = useState([]);
  const [lista, setLista] = useState(<ListProdOp prods={produ} />);
  const [total, setTotal] = useState();

  const canti = 1;

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

  const handleTotal = (cant, valor) => {
    let total = cant * valor;

    return total;
  };

  const listado = (produc) => {
    setLista(
      <ListProdOp prods={produc} handleElim={elimProd} Edita={editProd} />
    );
  };

  return (
    <Container>
      <CardGroup>
        <Card>
          <Card.Body>
            <BuscProd DevProd={obtenProdu} />
            <TipoVen></TipoVen>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <ComboCli></ComboCli>
          </Card.Body>
        </Card>
      </CardGroup>
      <br></br>
      <Card>{lista}</Card>
    </Container>
  );
};
