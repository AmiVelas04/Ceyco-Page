import React from "react";
import { Form, FormControl, FormGroup, FloatingLabel } from "react-bootstrap";

export const FechaIni = ({ fecha }) => {
  return (
    <div>
      <Form>
        <FormGroup>
          <FloatingLabel
            controlId="floatingInput"
            label="Fecha inicial"
            className="mb-3"
          >
            <FormControl
              type="Date"
              name="fechai"
              placeholder="fecha inicial"
              onChange={fecha}
              required
            ></FormControl>
          </FloatingLabel>
        </FormGroup>
      </Form>
    </div>
  );
};

export default FechaIni;
