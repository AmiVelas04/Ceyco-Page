import React, { useState, useEffect } from "react";
import { Container, Form, FormLabel, InputGroup } from "react-bootstrap";
import axios from "axios";

export const ComboProve = () => {
  const URLget1 = "proveedor/todos";

  const getProve = async () => {
    //  console.log(URLget1);
    const response = axios.get(URLget1);
    return response;
  };
  const [prove, setProve] = useState("1");
  const [proveedor, setProveedor] = useState([]);

  const handleChangeCli = (e) => {
    e.preventDefault();
    setProve(e.value);
  };
  useEffect(() => {
    //usefect body
    getProve().then((response) => {
      //hacer alggo con esa respuesta
      setProveedor(response.data);
      //console.log(response.data);
    });
  }, []);
  return (
    <Container>
      <div>
        <Form>
          <Form.Group className="mb-3">
            <FormLabel>Proveedor</FormLabel>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-person-fill"></i>
              </InputGroup.Text>
              <Form.Select aria-label="Default select example">
                {proveedor.map((dato) => (
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
