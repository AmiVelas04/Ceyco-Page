import React, { useState } from "react";
import "../css/login.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "../components/Loading";

export const Login = () => {
  const Url = "Usuario/log/";
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
    setLog(true);
    try {
      const dire = Url + state.user + "/" + state.pass;
      var response = await axios.get(dire);

      if (response.data.length > 0) {
        cookies.set("id", response.data.id, { path: "/" });
        cookies.set("user", state.user, { path: "/" });
        cookies.set("nivel", response.data.nivel, { path: "/" });
        //  console.log("Exito");

        window.location.href = "./menu";
      } else {
        setLog(false);
        console.log("No ne econtro usario");
      }
    } catch (err) {
      setLog(false);
      console.log("Error" + err);
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
