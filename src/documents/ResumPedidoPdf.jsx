import React, { Image } from "react";
import { Button, i } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

const ResumVenPed = ({ conte, fecha, Vende }) => {
  const generarPDF = () => {
    const doc = new jsPDF();
    //console.log(fecha);
    //Encabezado
    let fech = format(new Date(fecha), "dd/MM/yyyy");
    //let ima = <img src="./Images/Fondo.jpg"></img>;
    // doc.addImage(ima, "JPEG", 20, 20, 2, 10, 10);
    doc.text("CEYCO", 85, 10);
    doc.text("Pedido por vendedor " + Vende, 62, 15);
    doc.text("Fecha: " + fech, 78, 20);

    //tabla
    const encabe = [
      "Orden",
      "Codigo",
      "Producto",
      "Descripcion",
      "Entrega",
      "Cantidad",
    ];
    // console.log(conte);
    const filas = [];
    conte.forEach((elem, key) => {
      let ord = key + 1;
      const sencillo = [
        ord,
        elem.id_prod,
        elem.nombre,
        elem.descrip,
        elem.conte,
        elem.cantidad,
      ];
      filas.push(sencillo);
    });
    doc.autoTable(encabe, filas, {
      startY: 23,
      showHead: "everyPage",
    });
    doc.save("Reporte pedido " + Vende + ", " + fecha + ".pdf");
  };

  return (
    <div>
      <button className="btn btn-dark" onClick={generarPDF}>
        <i className="bi bi-file-earmark-pdf-fill"> Descarga</i>
      </button>
    </div>
  );
};

export default ResumVenPed;
