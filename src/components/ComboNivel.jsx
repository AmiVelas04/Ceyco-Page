import React, { useEffect, useState } from "react";
import { Container, Form, FormLabel, InputGroup } from "react-bootstrap";
import axios from "axios";

export const ComboNivel = ({ role }) => {
  const URLget1 = "/usuario/roles";

  const getCli = async () => {
    //  console.log(URLget1);
    const response = axios.get(URLget1);

    return response;
  };

  const [rol, setRol] = useState([]);

  useEffect(() => {
    //usefect body
    getCli().then((response) => {
      //hacer alggo con esa respuesta
      setRol(response.data);
      //console.log(response.data);
    });
  }, []);

  return (
    <Container>
      <div>
        <Form>
          <Form.Group className="mb-3">
            <FormLabel>Tipo de usuario</FormLabel>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-person-fill"></i>
              </InputGroup.Text>
              <Form.Select aria-label="" onChange={role} name="id_rol">
                {rol.map((dato) => (
                  <option className="form-group" value={dato.id_rol}>
                    {dato.nombre}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};
