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
export const ComboCred = ({ seleccred, listacred, selemonto }) => {
  const UrlOne = "Credito/onecredDato/";

  const [nomcred, setNomcred] = useState([
    "0",
    "sn",
    "sn",
    "00-00-00",
    "0",
    "Sin",
  ]);
  const [cred, setCred] = useState([]);

  const datacred = async (idp) => {
    if (idp === undefined) {
      let urlfull = UrlOne + idp;
      console.log("Url para detalles de pedido" + urlfull);
      return;
    }
    let urlfull = UrlOne + idp;
    //console.log("Url para detalles de pedido" + urlfull);
    const response = await axios.get(urlfull);
    var conv = convtoArrNom(response.data);
    //  console.log(conv[0][4]);
    setNomcred(conv);
    selemonto(conv[0][4]);
    seleccred(idp);
    //   console.log("Pedido " + idp);
    //return response;
  };

  const convtoArrNom = (ArrJson) => {
    var Into = [{}];
    console.log(ArrJson);
    for (let indi in ArrJson) {
      //   console.log(ArrJson.length);
      Into.push([
        ArrJson[indi].idcred,
        ArrJson[indi].cli,
        ArrJson[indi].vende,
        ArrJson[indi].fecha,
        ArrJson[indi].total,
        ArrJson[indi].estado,
      ]);
    }
    Into.splice(0, 1);
    return Into;
  };

  const handleSelecto = ({ target }) => {
    setCred({
      ...cred,
      [target.name]: target.value,
    });
    console.log(cred);
    //selecto(target.value);
  };

  const selecto = () => {
    // console.log("mostar el contenido de pedi " + pedi.id_pedi);
    let valor = cred.id_credito;
    datacred(valor);
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3 col-12">
          <FormLabel>Credito</FormLabel>
          <Row className="md d-md-flex">
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-shop"></i>
              </InputGroup.Text>
              <Form.Select
                aria-label=""
                onChange={handleSelecto}
                name="id_credito"
              >
                {listacred.map((dato) => (
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
                    <th>Genero</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {nomcred != null ? (
                    <tr>
                      <td>{nomcred[0][0]}</td>
                      <td>{nomcred[0][1]}</td>
                      <td>{nomcred[0][2]}</td>
                      <td>{moment(nomcred[0][3]).format("DD-MM-yyyy")}</td>
                      <td>Q.{nomcred[0][4]}</td>
                      <td>{nomcred[0][5]}</td>
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

export default ComboCred;
