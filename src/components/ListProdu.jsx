import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Modal,
  Table,
  ModalBody,
  Form,
  ModalFooter,
  ModalTitle,
  Card,
  FloatingLabel,
  Col,
  Row,
  Image,
} from "react-bootstrap";
import moment from "moment";
import Swal from "sweetalert";
import axios from "axios";
import { Producto } from "../containers/Producto";

export const ListProdu = () => {
  const URLVar = "/producto/TodosWruta/";
  const URLSAVE = "/producto/updatepage/";
  const UrlprodRut = "producto/prodinPedido/";
  const URLIMA = "/producto/imaup/";
  const URLImaup2 = "https://api.imgbb.com/1/upload";
  const apikey = "99e916f083221f9653eef58662f456e3";
  const getData = async () => {
    const response = axios.get(URLVar);
    await crearCantRuta();
    return response;
  };

  const [stock, setStock] = useState([]);
  const [imaAnt, setImaAnt] = useState("");
  const [filePath, setFilePath] = useState("");
  const [list, setList] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [total, setTotal] = useState(0.0);

  const handleCloseModal = () => {
    setshowModal(false);
  };

  const devolimagen = async (data) => {
    const imao = "data:image/png;base64," + data;
    //console.log(imao);
    return imao;
  };

  const handleOpenModal = (datos) => {
    const valo = {
      id_prod: datos[0],
      nombre: datos[1],
      descrip: datos[2],
      costo: datos[3],
      cantidad: datos[6],
      pmin: datos[4],
      pven: datos[5],
      precio_caja: datos[7],
      cant_caja: datos[8],
      caduc: moment(datos[9].caduc).format("yyyy-MM-DD"),
      peso: datos[10],
      // imagen: datos[12],
    };
    console.log("Imagen anterior " + datos[12]);
    setImaAnt(datos[12]);
    setshowModal(true);
    setDataModal(valo);
  };
  const handleChangeModal = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value,
    });
  };

  const imptot = () => {
    var total = 0;
    list.forEach(function (num) {
      total += num[3] * num[6];
    });
    // console.log(total);
    setTotal(total);
  };

  const crearCantRuta = async () => {
    const response = await axios.get(UrlprodRut);
    // console.log(response.data);
    setStock(response.data);
  };

  let conte = list.map((prod, index) => {
    //console.log("Total en ruta:"+prod[11]);
    var estilo = { backgroundColor: "white", color: "black" };
    if (prod[6] <= 0) {
      estilo = { backgroundColor: "red", color: "white" };
    }

    // console.log(prod[12]);
    return (
      <tr key={index} style={estilo}>
        <td>{prod[0]}</td>
        <td>{prod[1]}</td>
        <td>{prod[2]}</td>
        <td>Q.{prod[3]}</td>
        <td>Q.{prod[4]}</td>
        <td>Q.{prod[5]}</td>
        <td>
          <tr>Stock:{prod[6]}</tr> <tr>Ruta:{[prod[11]]}</tr>
        </td>
        <td>Q{prod[7]}</td>
        <td>{prod[8]}</td>
        <td>{moment(prod[9]).format("DD/MM/yyyy")}</td>
        <td>{prod[10]}</td>
        <td>
          <img
            src={prod[12]}
            width="75px"
            height="75px"
            alt={`Imagen ${index + 1}`}
            loading="lazy"
            value={prod[12]}
          />
        </td>
        <td>
          <button
            className="btn btn-warning"
            onClick={() => handleOpenModal(prod)}
          >
            <i className="bi bi-pencil"> </i>
            Editar
          </button>
        </td>
      </tr>
    );
  });

  const convtoArr = async (ArrJson) => {
    var Into = [{}];

    //console.log(ArrJson);
    for (let indi in ArrJson) {
      // console.log(ArrJson.length);
      Into.push([
        ArrJson[indi].id_prod,
        ArrJson[indi].nombre,
        ArrJson[indi].descrip,
        ArrJson[indi].costo,
        ArrJson[indi].pmin,
        ArrJson[indi].pven,
        ArrJson[indi].cantidad,
        ArrJson[indi].precio_caja,
        ArrJson[indi].cant_caja,
        ArrJson[indi].caduc,
        ArrJson[indi].peso,
        ArrJson[indi].ruta,
        ArrJson[indi].imagen,
      ]);

      // console.log(valo);
    }
    Into.splice(0, 1);
    //  console.log(images);
    return Into;
  };

  const handleSave = async (e) => {
    try {
      let ima = null;
      let dira = "lol";
      //console.log("direccion de imagen cargada " + filePath.name);
      if (filePath.name === undefined) {
        dira = imaAnt;
        console.log("Direccion de imagen anterior" + dira);
      } else {
        ima = await handleUploadima();
        dira = ima.data.url;
        console.log("Direccion de imagen nueva subida " + dira);
      }
      console.log(dira);
      //const ima =
      const datosSave = {
        id_prod: dataModal.id_prod,
        nombre: dataModal.nombre,
        descrip: dataModal.descrip,
        costo: dataModal.costo,
        pven: dataModal.pven,
        pmin: dataModal.pmin,
        cantidad: dataModal.cantidad,
        cant_caja: dataModal.cant_caja,
        precio_caja: dataModal.precio_caja,
        caduc: dataModal.caduc,
        peso: dataModal.peso,
        imagen: dira,
      };
      console.log(datosSave);
      const response = await axios.put(URLSAVE, datosSave);

      if (response.status === 200) {
        await Swal(
          "Actualizado",
          "El producto ha sido actualizado con exito",
          "success"
        );
      } else {
        await Swal(
          "No actualizado",
          "El producto no pudo ser actualizado",
          "error"
        );
      }
    } catch (error) {
      await Swal(
        "No Actualizado",
        "El producto no pudo ser actualizado, verifique el estado del servidor" +
          error,
        "error"
      );
    }
  };

  const handleShow = (e) => {
    // const path = URL.createObjectURL(e.target.files[0]);
    setFilePath(e.target.files[0]);
  };

  const handleUploadima = async () => {
    let long = filePath.name.length;
    //console.log(filePath.name);
    long = long - 3;
    let nom = filePath.name;
    let extension = nom.toString().substring(long);
    let completoNom = "prod" + dataModal.id_prod + "." + extension;

    const urlGrab = URLIMA + completoNom;
    // console.log(dataModal.ima);
    //console.log(filePath);
    var formData = new FormData();
    var reader = new FileReader();
    reader.readAsDataURL(filePath);
    reader.onloadend = function () {
      var base64data = reader.result;
      // console.log(base64data);
    };

    formData.append("image", filePath);
    formData.append("key", apikey);
    formData.append("name", completoNom);

    const response = await axios.post(URLImaup2, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    try {
      if (response.status === 200) {
        return response.data;
      } else {
        await Swal(
          "No subida",
          "La imagen no pudo ser subida, codigo de operacion",
          "error"
        );
      }
    } catch (error) {
      await Swal(
        "No ingresado",
        "El producto no pudo ser ingresado, verifique el estado del servidor" +
          error,
        "error"
      );
    }
  };

  useEffect(() => {
    //usefect body
    getData().then(async (response) => {
      //hacer alggo con esa respuesta
      //const respo = await axios.get("/producto/getimage/0");
      // setImages(respo.data);
      const devol = await convtoArr(response.data);
      //      console.log(respo.data);
      //console.log(response.data);
      setList(devol);
    });
  }, []);

  return (
    <Container>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Producto</th>
            <th>Descripcion</th>
            <th>Costo</th>
            <th>Precio Minimo</th>
            <th>Precio de Venta</th>
            <th>Cantidad</th>
            <th>Precio por caja</th>
            <th>Cantidad por caja</th>
            <th>Fecha de caducidad</th>
            <th>Peso Individual(lb)</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{conte}</tbody>
      </Table>

      <Row className="">
        <Col md={{ span: 6, offset: 4 }}>
          <Card border="success" style={{ width: "14rem" }}>
            <Card.Header>Total de inventario</Card.Header>
            <Card.Body className="text-center">
              <Card.Title>Q.{total}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={{ span: 6, offset: 4 }}>
          <Button variant="primary" onClick={imptot}>
            Mostrar Total de inventario
          </Button>
        </Col>
      </Row>

      <Modal show={showModal} onhide={handleCloseModal}>
        <Modal.Header>
          <ModalTitle>Actualizar Datos del producto</ModalTitle>
        </Modal.Header>
        <Form>
          <ModalBody>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Codigo de producto"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="id_prod"
                  placeholder="Codigo de producto"
                  value={dataModal.id_prod}
                  disabled
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Nombre"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={dataModal.nombre}
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Descripcion"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="descrip"
                  placeholder="Descripcion"
                  value={dataModal.descrip}
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Costo del producto"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="costo"
                  placeholder="Costo"
                  value={dataModal.costo}
                  onChange={handleChangeModal}
                  required
                  onWheel={() => document.activeElement.blur()}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Precio de venta minimo"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="pmin"
                  placeholder="Precio de venta minimo"
                  value={dataModal.pmin}
                  onChange={handleChangeModal}
                  required
                  onWheel={() => document.activeElement.blur()}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Precio de venta"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="pven"
                  placeholder="Precio de venta"
                  value={dataModal.pven}
                  onChange={handleChangeModal}
                  required
                  onWheel={() => document.activeElement.blur()}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Cantidad"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="cantidad"
                  placeholder="Cantidad del producto"
                  value={dataModal.cantidad}
                  onChange={handleChangeModal}
                  required
                  onWheel={() => document.activeElement.blur()}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Precio de caja"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="precio_caja"
                  placeholder="Precio por caja"
                  value={dataModal.precio_caja}
                  onChange={handleChangeModal}
                  required
                  onWheel={() => document.activeElement.blur()}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Cantidad por caja"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="cant_caja"
                  placeholder="Cantidad por caja"
                  value={dataModal.cant_caja}
                  onChange={handleChangeModal}
                  required
                  onWheel={() => document.activeElement.blur()}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Fecha de caducidad"
                className="mb-3"
              >
                <Form.Control
                  type="date"
                  name="caduc"
                  placeholder="fecha de caducidad"
                  value={dataModal.caduc}
                  onChange={handleChangeModal}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Peso individual"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="peso"
                  placeholder="Peso individual"
                  value={dataModal.peso}
                  onChange={handleChangeModal}
                  required
                  onWheel={() => document.activeElement.blur()}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Imagen del producto"
                className="mb-3"
              >
                <Form.Control
                  type="file"
                  accept=".jpg"
                  name="imagen"
                  onChange={handleShow}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" onClick={() => handleSave()}>
              Guardar cambios
            </Button>
            <button
              className="btn btn-danger"
              onClick={() => setshowModal(false)}
            >
              Cerrar
            </button>
          </ModalFooter>
        </Form>
      </Modal>
    </Container>
  );
};
export default ListProdu;
