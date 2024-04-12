import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export const NavBar = () => {
  return (
    <Navbar expand="md" bg="light" sticky="center">
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
              <i class="bi bi-cart-check-fill"> Compras</i>
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/gast" className="nav-link">
              <i class="bi bi-credit-card-2-back-fill"> Gastos</i>
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/carga" className="nav-link">
              <i class="bi bi-truck-flatbed"> Carga de productos</i>
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/pedi" className="nav-link">
              <i class="bi bi-box2-fill"> Pedidos</i>
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/presum" className="nav-link">
              <i class="bi bi-boxes"> Resumen de pedidos</i>
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/caja" className="nav-link">
              <i class="bi bi-cash-stack"> Caja</i>
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/salario" className="nav-link">
              <i class="bi bi-piggy-bank-fill"> Salario</i>
            </Link>
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Administracion" id="navbarScrollingDropdown">
          <NavDropdown.Item>
            <Link to="/produ" className="nav-link">
              <i class="bi bi-clipboard2-plus-fill"> Productos</i>
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/usu" className="nav-link">
              <i class="bi bi-file-person-fill"> Usuarios</i>
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/cli" className="nav-link primary">
              <i class="bi bi-people-fill"> Clientes</i>
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/prov" className="nav-link">
              <i class="bi bi-person-fill-add"> Proveedores</i>
            </Link>
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Reportes" id="navbarScrollingDropdown">
          <NavDropdown.Item>
            <Link to="/repven" className="nav-link">
              <i class="bi bi-cart-fill"> Ventas</i>
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/repcomp" className="nav-link">
              <i class="bi bi-bag-check-fill"> Compras</i>
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/repconce" className="nav-link">
              <i class="bi bi-person-up"> Conseciones</i>
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/repgast" className="nav-link">
              <i class="bi bi-credit-card-2-front-fill"> Gastos</i>
            </Link>
          </NavDropdown.Item>

          <NavDropdown.Item>
            <Link to="/repsala" className="nav-link">
              <i class="bi bi-piggy-bank-fill"> Salario</i>
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
