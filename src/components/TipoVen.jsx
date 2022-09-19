import React from "react";
import { Container, Form, FormLabel } from "react-bootstrap";

export const TipoVen = () => {
  //const [radioValue, setRadioValue] = useState("Cre");

  /*const handleCambio = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.value);
    setRadioValue(e.currentTarget.value);
  };*/
  return (
    <Container>
      <Form>
        <FormLabel>Tipo de venta </FormLabel>
        <Form.Group className="mb-3">
          <Form.Check
            inline
            name="tventa"
            label="Contado"
            type="radio"
            id="1"
          />
          <Form.Check
            inline
            name="tventa"
            label="Credito"
            type="radio"
            id="2"
          />
          <Form.Check
            inline
            name="tventa"
            label="Consecion"
            type="radio"
            id="3"
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default TipoVen;
