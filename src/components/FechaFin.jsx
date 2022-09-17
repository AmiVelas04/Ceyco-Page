import React from "react";
import { Form, FormControl, FormGroup, FloatingLabel } from "react-bootstrap";

export const FechaFin = ({ fecha }) => {
  return (
    <div>
      <Form>
        <FormGroup>
          <FloatingLabel
            controlId="floatingInput"
            label="Fecha Final"
            className="mb-3"
          >
            <FormControl
              type="Date"
              name="fechaf"
              placeholder="Fecha"
              onChange={fecha}
              required
            ></FormControl>
          </FloatingLabel>
        </FormGroup>
      </Form>
    </div>
  );
};
