import React, { useState } from "react";
import { Container, Form, InputGroup, Button } from "react-bootstrap";

export const ComboMes = ({ mes }) => {
  const [month, setMonth] = useState();

  const handleChangeMonth = ({ target }) => {
    setMonth({
      ...month,
      [target.name]: target.value,
    });
    //console.log(cli);
    //selecto(target.value);
  };

  const meses = [
    { label: "Enero", value: "1" },
    { label: "Febrero", value: "2" },
    { label: "Marzo", value: "3" },
    { label: "Abril", value: "4" },
    { label: "Mayo", value: "5" },
    { label: "Junio", value: "6" },
    { label: "Julio", value: "7" },
    { label: "Agosto", value: "8" },
    { label: "Septiembre", value: "9" },
    { label: "Octubre", value: "10" },
    { label: "Noviembre", value: "11" },
    { label: "Diciembre", value: "12" },
  ];

  const seleMes = () => {
    console.log(month);
    mes(month.values);
  };

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>Mes de Salario</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i class="bi bi-calendar-month-fill"></i>
            </InputGroup.Text>
            <Form.Select onChange={handleChangeMonth} name="values">
              {meses.map((dato) => (
                <option className="form-group" value={dato.value}>
                  {dato.label}
                </option>
              ))}
            </Form.Select>
            <br></br>

            <Button className="btn btn-info" onClick={() => seleMes()}>
              Elegir
            </Button>
            <br></br>
          </InputGroup>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ComboMes;
