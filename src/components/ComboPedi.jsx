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
export const ComboPedi = ({ idu, selecpedi }) => {
  const URLget1 = "Pedido/pedvendexid/";
  const UrlOne = "Pedido/onepednomxid/";

  const [nompedi, setNompedi] = useState(["s/n", "s/n", "s/n", "s/n", "s/n"]);
  const [pedi, setPedi] = useState([]);
  const [encpedi, setEncpedi] = useState([]);

  const getPedi = async () => {
    var idusu = 0;
    if (idu === undefined) {
      console.log("Usuario no definido: " + idu);
      return;
    }
    idusu = idu;
    var ruta = URLget1 + idusu;
    console.log("Ruta para obtener pedido por usuario " + ruta);
    const response = await axios.get(ruta);
    return response;
  };

  const datapedi = async (idp) => {
    if (idp === undefined) {
      let urlfull = UrlOne + idp;
      console.log("Url para detalles de pedido" + urlfull);
      return;
    }
    let urlfull = UrlOne + idp;
    console.log("Url para detalles de pedido" + urlfull);
    const response = await axios.get(urlfull);
    var conv = convtoArrNom(response.data);
    setNompedi(conv);
    selecpedi(idp);
    //console.log(conv);
    //return response;
  };

  const convtoArrNom = (ArrJson) => {
    var Into = [{}];
    //console.log(ArrJson);
    for (let indi in ArrJson) {
      // console.log(ArrJson.length);
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

  const convtoArr = (ArrJson) => {
    var Into = [{}];
    //console.log(ArrJson);
    for (let indi in ArrJson) {
      // console.log(ArrJson.length);
      Into.push([
        ArrJson[indi].iD_PED,
        ArrJson[indi].iD_CLI,
        ArrJson[indi].fecha,
        ArrJson[indi].iD_USU,
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
  };

  const selecto = () => {
    console.log("mostar el contenido de pedi " + pedi.iD_PED);
    //let valor = ;
    //datapedi(valor);
  };

  useEffect(() => {
    //usefect body
    console.log("Id del vendedor:" + idu);
    getPedi().then((response) => {
      //hacer alggo con esa respuesta
      const devol = convtoArr(response.data);
      setEncpedi(devol);
    });
  }, []);

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
                {encpedi.map((dato) => (
                  <option className="form-group" value={dato[0]} key={dato[0]}>
                    {dato[0]}
                  </option>
                ))}
              </Form.Select>
              <br></br>
              <Button className="btn btn-success" onClick={selecto()}>
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
                  <tr>
                    <td>{nompedi[0][0]}</td>
                    <td>{nompedi[0][1]}</td>
                    <td>{nompedi[0][3]}</td>
                    <td>{moment(nompedi[0][2]).format("DD-MM-yyyy")}</td>
                    <td>Q.{nompedi[0][4]}</td>
                    <td>{nompedi[0][5]}</td>
                  </tr>
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
