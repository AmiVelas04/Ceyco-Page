import React, { useState, useEffect } from "react";
import { Container, Form, FormLabel, InputGroup } from "react-bootstrap";
import axios from "axios";

export const ComboVende = ({ vend }) => {
  const URLget1 = "Usuario/Usuvend";
  const getCli = async () => {
    const response = axios.get(URLget1);
    return response;
  };
  // const [cli, setCli] = useState("1");
  const [vende, setVende] = useState([]);

  /*const handleChangeCli = (e) => {
    e.preventDefault();
    setCli(e.value);
  };*/

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
        <Form.Group className="mb-3">
          <FormLabel>Vendedor</FormLabel>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-person-fill"></i>
            </InputGroup.Text>
            <Form.Select aria-label="" onChange={vend} name="id_usu">
              {vende.map((dato) => (
                <option className="form-group" value={dato.id_usu}>
                  {dato.nombre}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Form.Group>
      </Form>
    </Container>
  );
};
export default ComboVende;
