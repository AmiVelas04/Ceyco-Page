import React, { useState, useEffect } from "react";
import { Container, Form, FormLabel, InputGroup } from "react-bootstrap";
import axios from "axios";

export const ComboCli = () => {
  const URLget1 = "cliente/todos";

  const getCli = async () => {
    //  console.log(URLget1);
    const response = axios.get(URLget1);

    return response;
  };
  const [cli, setCli] = useState("1");
  const [clientes, setClientes] = useState([]);

  const handleChangeCli = (e) => {
    e.preventDefault();
    setCli(e.value);
  };
  useEffect(() => {
    //usefect body
    getCli().then((response) => {
      //hacer alggo con esa respuesta
      setClientes(response.data);
      //console.log(response.data);
    });
  }, []);
  return (
    <Container>
      <div>
        <Form>
          <Form.Group className="mb-3">
            <FormLabel>Cliente</FormLabel>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-person-fill"></i>
              </InputGroup.Text>
              <Form.Select aria-label="Default select example">
                {clientes.map((dato) => (
                  <option className="form-group">{dato.nombre}</option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default ComboCli;
