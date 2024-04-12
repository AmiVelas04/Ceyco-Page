import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export const NavBar = () => {
  return (
    <Navbar expand="md" bg="light" variant="warning" sticky="top">
      <Navbar.Brand>
        <Container>
          <img
            src="/img.png"
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt=""
          />
        </Container>
      </Navbar.Brand>
      <Container>
        <h4>CEYCO</h4>
      </Container>
      <Nav className="me-auto">
        <NavDropdown title="Operaciones" id="navbarScrollingDropdown">
          <NavDropdown.Item>
            <Link to="/comp" className="nav-link">
              Compras
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/gast" className="nav-link">
              Gastos
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/carga" className="nav-link">
              Carga de productos
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/pedi" className="nav-link">
              Pedidos
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/presum" className="nav-link">
              Resumen de pedidos
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/caja" className="nav-link">
              Caja
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/salario" className="nav-link">
              Salario
            </Link>
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Administracion" id="navbarScrollingDropdown">
          <NavDropdown.Item>
            <Link to="/produ" className="nav-link">
              Productos
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/usu" className="nav-link">
              Usuarios
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/cli" className="nav-link primary">
              Clientes
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/prov" className="nav-link">
              Proveedores
            </Link>
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Reportes" id="navbarScrollingDropdown">
          <NavDropdown.Item>
            <Link to="/repven" className="nav-link">
              Ventas
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/repcomp" className="nav-link">
              Compras
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/repconce" className="nav-link">
              Conseciones
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/repgast" className="nav-link">
              Gastos
            </Link>
          </NavDropdown.Item>

          <NavDropdown.Item>
            <Link to="/repsala" className="nav-link">
              Salario
            </Link>
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Opciones" id="navbarScrollingDropdown">
          <NavDropdown.Item>
            <Link to="/repven" className="nav-link">
              Salir
            </Link>
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
