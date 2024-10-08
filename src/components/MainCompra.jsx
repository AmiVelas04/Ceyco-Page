import React, { useState, useEffect } from "react";
import { Container, Card, CardGroup, Button } from "react-bootstrap";
import { BuscProd } from "./BuscProd";
import { ListProdOp } from "./ListProdOp";

import { ComboProve } from "./ComboProve";
import BuscProdCompra from "./BuscProdCompra";
import axios from "axios";
import Swal from "sweetalert";
import { useSelector } from "react-redux";

export const MainCompra = () => {
  const UrlSgen = "Compra/Incomp";
  const UrlSdet = "Compra/IncompDet";
  const UrlElimDet = "/Compra/DelCompDet/";
  const UrlCantiProd = "producto/cantiprod/";
  const UrlUpdProd = "/Producto/UpdatePage";
  const urlprodbyid = "producto/prodxcod";
  const idComp = "/compra/idComp/";
  const idCompDeta = "/compra/idCompDet/";
  const usua = useSelector((state) => state.user);

  const [produ, setProdu] = useState([]);
  const [total, setTotal] = useState(0);
  const [dataProve, setDataProve] = useState([]);
  const [lista, setLista] = useState(<ListProdOp prods={produ} />);
  const [user, setUser] = useState();

  const getFecha = () => {
    const fech = new Date();
    const respu = `${fech.getFullYear()}/${
      fech.getMonth() + 1
    }/${fech.getDate()} ${fech.getHours()}: ${fech.getMinutes()}`;
    return respu;
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
  const handleChangeProve = ({ target }) => {
    setDataProve({
      ...dataProve,
      [target.name]: target.value,
    });
    //console.log(dataProve);
    // console.log(cookies.get("id"));
  };

  const ultiComp = async () => {
    // console.log(cookies);
    try {
      const respo = await axios.get(idComp);
      if (respo.data === 0) {
        return 1;
      } else {
        var valo = 1;
        valo = valo + respo.data;
        return valo;
      }
    } catch (error) {
      return 0;
    }
  };
  const ultiCompDet = async () => {
    try {
      const respo = await axios.get(idCompDeta);
      if (respo.data === 0) {
        return 1;
      } else {
        var valo = 1;
        valo = valo + respo.data;
        return valo;
      }
    } catch (error) {
      return 0;
    }
  };

  const preparar = async () => {
    var id = await ultiComp();
    //console.log("Proveedor: " + dataProve.id_prov);
    var idprov = parseInt(dataProve.id_prov);
    var idusu = parseInt(usua.id_usu);

    const ingre = {
      Id_compra: id,
      Id_usu: idusu,
      Id_prov: idprov,
      Fecha: getFecha(),
      Factura: "CF",
      Pago: total,
      Estado: "Activa",
    };
   // console.log(ingre);
    try {
      const response = await axios.post(UrlSgen, ingre);
      if (response.status === 200) {
        console.log(response.status);
        if (saveDet(id) && (await SaveCaja(id, total))) {

          Swal("Exito", "La compra ha sido registrada", "success");
        } else {
          Swal("No guardado", "La compra no pudo ser registrada", "error");
        }
      }
    } catch (error) {
      Swal("No guardado", "La compra no pudo ser registrada " + error, "error");
    }
  };

  const saveGen = async (datos) => {
    try {
      axios
        .request(datos)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(datos);
          console.error(error);
        });
    } catch (error) {
      Swal(
        "No guardado",
        "No se ha podido guardar la compra , verifique el estado del servidor " +
          error +
          "error"
      );
    }
  };

  const saveDet = async (compra) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    var idprod = 0,
      canti = 0,
      precio = 0,
      subto = 0,
      id_det = 0,
      costo=0;
    var id = await ultiCompDet();
    try {
      //  console.log(produ[0]);
      for (let i = 0; i < produ[0].length; i++) {
        id_det = id++;
        idprod = produ[0][i].id_prod;
        canti = produ[0][i].cantidad;
        precio = produ[0][i].pven;
        subto = produ[0][i].cantidad * produ[0][i].costo;
        costo=produ[0][i].costo;
        const detval = {
          detal_compr: id_det,
          id_compra: compra,
          id_prod: idprod,
          cantidad: canti,
          precio: precio,
          costo:costo,
          subtotal: subto,
        };
        //  console.log(detval);
        const repdeta = await axios.post(UrlSdet, detval);
        if (repdeta.status === 200) {
          const urlget1prod = urlprodbyid + "/" + detval.id_prod;
          const prodante = await axios.get(urlget1prod);
          const dataprod = prodante.data;
          // console.log(dataprod[0]);
          const cantchang =
            parseInt(dataprod[0].cantidad) + parseInt(detval.cantidad);
            const precosto=(detval.costo);
          dataprod[0].cantidad = cantchang;
          dataprod[0].costo=precosto;
          //  console.log(dataprod[0]);
          const updprods = await axios.put(UrlUpdProd, dataprod[0]);
          //console.log(updprods);
        }
      }
    } catch (error) {
      await Swal(
        "Error en detalle",
        "se presentó un error al guardar los detalles de la compra",
        "error"
      );

      //console.log(error);
      return false;
    }
    return true;
  };

  const SaveCaja = async (idcomp, monto) => {
    const UrlCajSave = "caja/saveone";
    var idusu = parseInt(usua.id_usu);
    try {
      const caja = {
        id_caja: await getIdCaja(),
        operacion: "Salida",
        monto: monto,
        detalle: "Compra no " + idcomp,
        fecha: getFecha(),
        estado: "Activo",
        id_usu: idusu,
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

  /* const handleTot = () => {
    let n1 = 0,
      n2 = 0,
      tot = 0;
    produ.map((val) => {
      n1 = val.pven;
      n2 = val.cantidad;
      tot = n1 * n2;
      console.log(n1, n2, tot);
    });
    return tot;
  };*/

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
        val.costo = prize;
        resp = val.costo;
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
      <ListProdOp
        prods={produc}
        handleElim={elimProd}
        Edita={editProd}
        Tota={setTotal}
      />
    );
  };

  useEffect(() => {
    setDataProve({ id_prov: 1 });
  }, []);

  return (
    <Container>
      <h1 className="text-center"> Compras</h1>
      <CardGroup>
        <Card>
          <Card.Body>
            <BuscProd DevProd={obtenProdu} />
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <ComboProve Prov={handleChangeProve}></ComboProve>
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
    </Container>
  );
};
