import React, { useState } from "react";
import {
  Container,
  Form,
  FormLabel,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";

export const TipoVen = () => {
  const [radioValue, setRadioValue] = useState("Cre");
  const handleCambio = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.value);
    setRadioValue(e.currentTarget.value);
  };
  return (
    <Container>
      <Form>
        <FormLabel>Tipo de venta </FormLabel>
        <Form.Group className="mb-3">
          <ButtonGroup>
            <ToggleButton
              id="1"
              type="radio"
              variant="success"
              name="contado"
              value="Cont"
              checked={radioValue === "Cont"}
              onChange={handleCambio}
            >
              Contado
            </ToggleButton>
            <ToggleButton
              id="2"
              type="radio"
              variant="warning"
              name="radio"
              value="Cre"
              checked={radioValue === "Cre"}
              onChange={handleCambio}
            >
              Credito
            </ToggleButton>
            <ToggleButton
              id="3"
              type="radio"
              variant="secondary"
              name="radio"
              value="Cons"
              checked={radioValue === "Cons"}
              onChange={handleCambio}
            >
              Concesion
            </ToggleButton>
          </ButtonGroup>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default TipoVen;
