import React, { useState, useEffect } from "react";
import { Container, Form, FormLabel } from "react-bootstrap";
import axios from "axios";

export const ComboVende = ({ vend }) => {
  const URLget1 = "Usuario/Usuvend";
  const getCli = async () => {
    const response = axios.get(URLget1);
    return response;
  };
  // const [cli, setCli] = useState("1");
  const [vende, setVende] = useState([]);
  const [sele, setSele] = useState(0);

  /*const handleChangeCli = (e) => {
    e.preventDefault();
    setCli(e.value);
  };*/

  const HandelChange = async (e) => {
    setSele(e.target.value);
    console.log(sele);
    //usua = sele;
  };

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
          <Form.Select aria-label="" onChange={vend} name="vendedor">
            {vende.map((dato) => (
              <option className="form-group" value={dato.id_usu}>
                {dato.nombre}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
    </Container>
  );
};
export default ComboVende;
