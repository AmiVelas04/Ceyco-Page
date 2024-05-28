import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  FormLabel,
  InputGroup,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

export const ComboVende = ({ vend }) => {
  const usua = useSelector((state) => state);
  const URLget1 = "Usuario/Usuvend";
  const getCli = async () => {
    const response = axios.get(URLget1);
    return response;
  };

  const [cli, setCli] = useState();
  const [vende, setVende] = useState([]);

  /*const handleChangeCli = (e) => {
    e.preventDefault();
    setCli(e.value);
    console.log(e.value);
  };*/

  const handleChangeCli = ({ target }) => {
    setCli({
      ...cli,
      [target.name]: target.value,
    });
    //  console.log(cli);
    //selecto(target.value);
  };

  const selectVende = () => {
    //console.log("mostar el contenido de pedi " + cli.id_usu);
    // console.log(cli.id_usu);
    vend(cli.id_usu);
    //console.log(cli.id_usu);
  };

  useEffect(() => {
    //usefect body
    getCli().then((response) => {
      //hacer alggo con esa respuesta

      setVende(response.data);
      //console.log(response.data);
    });
  }, []);

  return (
    <Container>
      <Form>
        <Form.Group className="md col-12">
          <FormLabel>Vendedor </FormLabel>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-person-fill"></i>
            </InputGroup.Text>
            <Form.Select aria-label="" onChange={handleChangeCli} name="id_usu">
              {vende.map((dato) => (
                <option className="form-group" value={dato.id_usu}>
                  {dato.nombre}
                </option>
              ))}
            </Form.Select>
            <br></br>
            <Button className="btn btn-success" onClick={() => selectVende()}>
              Elegir
            </Button>
            <br></br>
          </InputGroup>
        </Form.Group>
      </Form>
    </Container>
  );
};
export default ComboVende;
