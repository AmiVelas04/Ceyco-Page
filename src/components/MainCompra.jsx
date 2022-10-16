import React, { useState } from "react";
import { Card, CardGroup, Button } from "react-bootstrap";
import { BuscProd } from "./BuscProd";
import { ListProdOp } from "./ListProdOp";

import { ComboProve } from "./ComboProve";
import BuscProdCompra from "./BuscProdCompra";
import axios from "axios";
import Swal from "sweetalert";

export const MainCompra = () => {
  const UrlSgen = "/compra/incomp";
  const UrlSdet = "/Compra/IncompDet/";
  const UrlElimDet = "/Compra/DelCompDet/";
  const UrlCantiProd = "producto/cantiprod/";
  const UrlUpdProd = "/Producto/Update";

  const [produ, setProdu] = useState([]);
  const [lista, setLista] = useState(<ListProdOp prods={produ} />);

  const getFecha = () => {
    const fech = new Date();
    const respu = `${fech.getDate()}/${
      fech.getMonth() + 1
    }/${fech.getFullYear()}`;
    return respu;
  };

  const preparar = () => {
    const valo = {
      id_compra: 1, //buscar id de compra
      id_usu: 1, // buscar id de que realiza compra
      id_prov: 1, // buscar id del proveedor
      fecha: getFecha(),
      estado: "Activa",
      factura: "C/F",
      pago: handleTot(),
    };
    // setRuta({ ...ruta, [valo.name]: valo.value });
    // console.log(valo);

    saveGen(valo);
  };

  const saveGen = async (datos) => {
    console.log(datos);
    try {
      const response = await axios.post(UrlSgen, datos);
      // const respo = axios.get("compra/");
      if (saveDet(datos.Id_compra)) {
        await Swal(
          "Guardado",
          "los productos has sido asignados a la ruta del vendedor:",
          "success"
        );
      } else if (response.status === 500) {
        Swal(
          "No guardado",
          "No se ha podido guardar la ruta del vendedor",
          "error"
        );
      }
    } catch (error) {
      console.log(datos);
      Swal(
        "No guardado",
        "No se ha podido guardar la compra , verifique el estado del servidor " +
          error,
        "error"
      );
    }
  };

  const saveDet = async (compra) => {
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
          detal_compr: index + 1,
          id_compra: compra,
          id_prod: idprod,
          cantidad: canti,
          precio: precio,
          subtotal: subto,
        };
        console.log(valor);

        const response = axios.post(UrlSdet, valor);
        if (!response.status === 200) {
          Swal(
            "No guardado",
            "No se pudieron guardar los productos de la ruta",
            "error"
          );
          return false;
        } else {
          const ruta = UrlCantiProd + valor.id;
          const RepCanti = axios.get(ruta);
          let canti = RepCanti.data + valor.cantidad;
          const datos = {
            id_prod: valor.id_prod,
            cantidad: canti,
          };
          const respUpdProd = axios.put(UrlUpdProd, datos);
          if (!respUpdProd.status === 200) {
            Swal(
              "No actualizado",
              "No se Pudo actualizar la cantidad de productos, porfavor verifique",
              "error"
            );
          }
        }
      });
    } catch (error) {
      const resp = await axios.delete(UrlElimDet);
      if (resp.status === 200) {
        console.log(produ);
        await Swal(
          "No guardado",
          "No se pudieron guardar los productos de la ruta, verifique el estado del servidor" +
            error,
          "error"
        );
      } else {
        await Swal(
          "Sin reestablecer",
          "se presentó un inconveniente al momento de reestablecer los datos",
          "warning"
        );
      }
      //console.log(error);
      return false;
    }
    return true;
  };

  const handleTot = () => {
    let n1 = 0,
      n2 = 0,
      tot = 0;

    produ.map((val) => {
      n1 = val.pven;
      n2 = val.cantidad;
      tot = n1 * n2;
      // console.log(n1, n2, tot);
    });
    return tot;
  };

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
      //  console.log(canti + "---" + price);
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
      <h1 className="text-center"> Compras</h1>
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
        <Card></Card>
      </CardGroup>

      <br />
      <h3 className="text-center"> Listado de productos</h3>
      <Card>{lista}</Card>
      <br />
      <Button size="lg" variant="success" onClick={() => preparar()}>
        Proceder con la compra
      </Button>
    </div>
  );
};
