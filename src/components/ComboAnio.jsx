import React, { useState } from "react";
import { Container, Form, InputGroup, Button } from "react-bootstrap";

export const ComboAnio = ({ valor }) => {
  const [anio, setAnio] = useState();

  const handleChangeAnio = ({ target }) => {
    setAnio({
      ...anio,
      [target.name]: target.value,
    });
    //console.log(cli);
    //selecto(target.value);
  };

  const anios = [
    { label: "2024", value: "2024" },
    { label: "2025", value: "2025" },
    { label: "2026", value: "2026" },
    { label: "2027", value: "2027" },
    { label: "2028", value: "2028" },
    { label: "2029", value: "2029" },
    { label: "2030", value: "2030" },
    { label: "2031", value: "2031" },
    { label: "2032", value: "2032" },
    { label: "2033", value: "2033" },
  ];
  const seleAnio = () => {
    console.log(anio);
    valor(anio);
  };
  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>Año de salario</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i class="bi bi-calendar-date-fill"></i>
            </InputGroup.Text>
            <Form.Select name="anios" onChange={handleChangeAnio}>
              {anios.map((dato) => (
                <option className="form-group" value={dato.id}>
                  {dato.label}
                </option>
              ))}
            </Form.Select>

            <Button className="btn btn-info" onClick={seleAnio}>
              Elegir
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ComboAnio;
