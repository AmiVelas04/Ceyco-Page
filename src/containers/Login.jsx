import React, { useEffect, useState } from "react";
import "../css/login.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button, Form, InputGroup, Container } from "react-bootstrap";
import { addNom, addNivel, showName, addUser, addId } from "../redux/userSlice";

import Loading from "../components/Loading";
import Swal from "sweetalert";
import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

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

  const getData = async (comp) => {
    const response = axios.get(Url + comp);
    // console.log(Url + comp);
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
      //    const dire = Url + state.user + "/" + state.pass;
      getData(compl).then((resp) => {
        const valo = [
          resp.data[0].id_usu,
          resp.data[0].nombre,
          resp.data[0].rol,
        ];
        console.log(valo);
        //  dispatch(addId(resp.data[0].id_usu));
        dispatch(addUser(valo));
        //  dispatch(addNom(resp.data[0].nombre));
      });
      Swal("Error de inicio", "Verifique su usuario y contraseña", "warning");
      window.location.href = "./menu";

      //  Swal("Error de inicio", "Verifique su usuario y contraseña", "warning");
      if (true) {
      } else {
      }

      //  console.log("Exito");
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
    return <Loading></Loading>;
  } else {
    return (
      <Container>
        valor del nombre;{}
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

const mapStateToProps = (state) => {
  return {
    nombre: state.nombre,
  };
};

const mapDispatchToProps = (dispach) => {
  return { mostrar: () => dispach(showName()) };
};

export default Login;
