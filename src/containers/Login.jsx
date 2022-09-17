import React, { useState, useEffect, Container } from "react";
import "../css/login.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

export const Login = () => {
  const Url = "Usuario/log/";
  const cookies = new Cookies();
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
    try {
      const dire = Url + state.user + "/" + state.pass;
      var response = await axios.get(dire);

      if (response.data.length > 0) {
        cookies.set("id", response.data.id, { path: "/" });
        cookies.set("user", state.user, { path: "/" });
        cookies.set("nivel", response.data.nivel, { path: "/" });
        console.log("Exito");
        window.location.href = "./menu";
      } else {
        console.log("No ne econtro usario");
      }
    } catch (err) {
      console.log("Error" + err);
    }
  };

  return (
    <div className="containerPrincipal">
      <div className="containerSecundario">
        <div className="form-group">
          <label>Usuario</label>
          <input
            type="text"
            className="form-control"
            name="user"
            placeholder="Ingrese su usuario"
            onChange={handleChange}
          />
          <br />
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="pass"
            placeholder="Ingrese su contraseña"
            onChange={handleChange}
          />
          <br />
          <button className="btn btn-primary" onClick={() => iniciarSesion()}>
            Iniciar Sesion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
