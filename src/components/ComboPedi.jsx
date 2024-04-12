import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormLabel,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import axios from "axios";
import moment from "moment";
export const ComboPedi = ({ idu, selecpedi, listaped }) => {
  const UrlOne = "Pedido/onepednomxid/";

  const [nompedi, setNompedi] = useState([
    "0",
    "sn",
    "sn",
    "00-00-00",
    "0",
    "Sin",
  ]);
  const [pedi, setPedi] = useState([]);

  const datapedi = async (idp) => {
    if (idp === undefined) {
      let urlfull = UrlOne + idp;
      console.log("Url para detalles de pedido" + urlfull);
      return;
    }
    let urlfull = UrlOne + idp;
    //console.log("Url para detalles de pedido" + urlfull);
    const response = await axios.get(urlfull);
    var conv = convtoArrNom(response.data);
    setNompedi(conv);
    selecpedi(idp);
    //   console.log("Pedido " + idp);
    //return response;
  };

  const convtoArrNom = (ArrJson) => {
    var Into = [{}];
    //console.log(ArrJson);
    for (let indi in ArrJson) {
      //   console.log(ArrJson.length);
      Into.push([
        ArrJson[indi].iD_PED,
        ArrJson[indi].cli,
        ArrJson[indi].fecha,
        ArrJson[indi].usu,
        ArrJson[indi].total,
        ArrJson[indi].estado,
      ]);
    }
    Into.splice(0, 1);
    return Into;
  };

  const handleSelecto = ({ target }) => {
    setPedi({
      ...pedi,
      [target.name]: target.value,
    });
    // console.log(pedi);
    //selecto(target.value);
  };

  const selecto = () => {
    // console.log("mostar el contenido de pedi " + pedi.id_pedi);
    let valor = pedi.id_pedi;
    datapedi(valor);
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3 col-12">
          <FormLabel>Pedido</FormLabel>
          <Row className="md d-md-flex">
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-shop"></i>
              </InputGroup.Text>
              <Form.Select
                aria-label=""
                onChange={handleSelecto}
                name="id_pedi"
              >
                {listaped.map((dato) => (
                  <option className="form-group" value={dato[0]} key={dato[0]}>
                    {dato[0]}
                  </option>
                ))}
              </Form.Select>
              <br></br>
              <Button className="btn btn-success" onClick={selecto}>
                Buscar
              </Button>
              <br></br>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>Vendedor</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {nompedi != null ? (
                    <tr>
                      <td>{nompedi[0][0]}</td>
                      <td>{nompedi[0][1]}</td>
                      <td>{nompedi[0][3]}</td>
                      <td>{moment(nompedi[0][2]).format("DD-MM-yyyy")}</td>
                      <td>Q.{nompedi[0][4]}</td>
                      <td>{nompedi[0][5]}</td>
                    </tr>
                  ) : null}
                </tbody>
              </Table>
            </InputGroup>
          </Row>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ComboPedi;
