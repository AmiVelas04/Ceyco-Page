import React, { useEffect, useState } from "react";
import "../css/login.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button, Form, InputGroup, Container, Image } from "react-bootstrap";
import { addUser } from "../redux/userSlice";

import Loading from "../components/Loading";
import Swal from "sweetalert";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export const Login = () => {
  const Url = "/Usuario/log/";
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [log, setLog] = useState(false);
  const [usuas, setUsuas] = useState([]);
  const [state, setState] = useState({
    user: "",
    pass: "",
    nivel: "",
  });
  const navigate = useNavigate();

  const getData = async (comp) => {
    const response = axios.get(Url + comp);
    return response;
  };

  const handleChange = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value,
    });

    // console.log(val);
  };

  const iniciarSesion = async () => {
    //   console.log(Url);
    try {
      setLog(true);
      const compl = state.user + "/" + state.pass;
      const respo = await getData(compl);
      if (respo.data.length > 0) {
        const valo = [
          respo.data[0].id_usu,
          respo.data[0].nombre,
          respo.data[0].rol,
        ];
        dispatch(addUser(valo));
        navigate("/Menu");
      } else {
        setLog(false);
        Swal("Error de inicio", "Verifique su usuario y contraseña", "warning");
      }
    } catch (err) {
      setLog(false);
      Swal(
        "Error de inicio",
        "No se ha podido iniciar sesion, porfavor verifique el error: \n" + err,
        "warning"
      );
      // console.log("Error" + err);
    }
  };

  const convtoArr = (ArrJson) => {
    var Into = [{}];
    //console.log(ArrJson);
    for (let indi in ArrJson) {
      // console.log(ArrJson.length);
      Into.push([
        ArrJson[indi].id_usu,
        ArrJson[indi].nombre,
        ArrJson[indi].direccion,
        ArrJson[indi].telefono,
        ArrJson[indi].usu,
        ArrJson[indi].pass,
      ]);
    }
    Into.splice(0, 1);
    console.log(Into);
    setUsuas(Into);
  };

  if (log) {
    return (
      <Container>
        <center>
          <img
            src="/fondo.jpg"
            width="500"
            height="500"
            className="d-inline-block align-top"
            alt=""
          />
        </center>
      </Container>
    );
  } else {
    return (
      <Container>
        <Form>
          <div className="login">
            <div className="containerPrincipal">
              <div className="containerSecundario">
                <div className="form-group">
                  <label>Usuario</label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-person-fill"></i>
                    </InputGroup.Text>
                    <input
                      type="text"
                      className="form-control"
                      name="user"
                      placeholder="Usuario"
                      onChange={handleChange}
                    />
                    <br />
                  </InputGroup>
                  <br />
                  <label>Contraseña</label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-key-fill"></i>
                    </InputGroup.Text>
                    <input
                      type="password"
                      className="form-control"
                      name="pass"
                      placeholder="Contraseña"
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <br />
                  <Button className="btn btn-primary" onClick={iniciarSesion}>
                    Iniciar Sesion
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Container>
    );
  }
};

export default Login;
