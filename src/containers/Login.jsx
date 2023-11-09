import React, { useState } from "react";
import "../css/login.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "../components/Loading";
import Swal from "sweetalert";

export const Login = () => {
  const Url = "/Usuario/log/";
  const cookies = new Cookies();
  const [log, setLog] = useState(false);
  const [state, setState] = useState({
    user: "",
    pass: "",
    nivel: "",
  });

  const handleChange = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value,
    });
    // console.log(state.user);
  };

  const iniciarSesion = async () => {
    //console.log(Url);
    setLog(true);
    try {
      const dire = Url + state.user + "/" + state.pass;
      var response = await axios.get(dire);
      if (response.data.length > 0) {
        var data = response.data;
        data.forEach((elem) => {
          cookies.set("id", elem.id_usu, { path: "/" });
          cookies.set("user", elem.nombre, { path: "/" });
          // cookies.set("nivel", elem.data.nivel, { path: "/" });
        });

        //  console.log("Exito");
        window.location.href = "./menu";
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
  if (log) {
    return <Loading></Loading>;
  } else {
    return (
      <div className="login">
        <div className="containerPrincipal">
          <div className="containerSecundario">
            <div className="form-group">
              <label>Usuario</label>
              <InputGroup>
                <InputGroup.Text>
                  {" "}
                  <i className="bi bi-person-fill"></i>
                </InputGroup.Text>
                <input
                  type="text"
                  className="form-control"
                  name="user"
                  placeholder="Ingrese su usuario"
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
                  placeholder="Ingrese su contraseña"
                  onChange={handleChange}
                />
              </InputGroup>
              <br />
              <button
                className="btn btn-primary"
                onClick={() => iniciarSesion()}
              >
                Iniciar Sesion
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
