import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Form,
  FloatingLabel,
  Modal,
  ModalBody,
  ModalTitle,
  Button,
  ModalFooter,
} from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert";

export const ListPago = ({ cred, gene }) => {
  //const UrlAllPedi="pedido/todos";
  const UrlDetaPedi = "pagocred/Pagosbycred/" + cred;
  // console.log(pedid);
  const UrlUpd = "";

  const getData = async () => {
    const response = axios.get(UrlDetaPedi);
    return response;
  };

  let conte = gene.map((pags, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{pags.id_pagoc}</td>
        <td>{pags.id_credito}</td>
        <td>Q.{pags.monto}</td>
        <td>{moment(pags.fecha).format("DD/MM/yyyy")}</td>
        <td>{pags.detalle}</td>
        <td>{pags.estado}</td>
      </tr>
    );
  });

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>No. Pago</th>
            <th>Credito</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Detalle</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>{conte}</tbody>
      </Table>
    </Container>
  );
};

export default ListPago;
