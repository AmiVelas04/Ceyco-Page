import React from "react";
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from "../containers/Login";
import { Menu } from "../containers/Menu";
import { Cliente } from "../containers/Cliente";
import {Producto} from "../containers/Producto";
import { Venta } from "../containers/Venta";
import { Usuario } from "../containers/Usuario";
import { Proveedor } from "../containers/Proveedor";
import { Gasto } from "../containers/Gasto";
import{ RepGasto} from "../containers/RepGasto";
import { RepVenta } from "../containers/RepVenta";
import { RepSalario } from "../containers/RepSalario";
import { RepCompra } from "../containers/RepCompra";
import { CargaVenta } from "../containers/CargaVenta";
import { Compra } from "../containers/Compra";
import { Pedido } from "../containers/Pedido";
import { PedidoResum } from "../containers/PedidoResum";
import { Caja } from "../containers/Caja";
import { Salario} from "../containers/Salario.jsx";
import { Credito } from "../containers/Credito.jsx";

  // <Route  exact path='/repcomp' element={<RepCompra/>}  ></Route>



function router() {
  return (
   <BrowserRouter>
 <Routes>
   <Route exact path="/" element={<Login/>}></Route>
   <Route exact path="/menu" element={<Menu/>}></Route>
   <Route exact path='/cli' element={<Cliente/>} ></Route>
   <Route  exact path='/vent' element={<Venta/>} ></Route>
   <Route  exact path='/produ' element={<Producto/>}  ></Route>
   <Route  exact path='/usu' element={<Usuario/>}  ></Route>
   <Route  exact path='/prov' element={<Proveedor/>}  ></Route>
   <Route  exact path='/gast' element={<Gasto/>}  ></Route>
   <Route  exact path='/repgast' element={<RepGasto/>}  ></Route>
   <Route  exact path='/repven' element={<RepVenta/>}  ></Route>
   <Route  exact path='/repsala' element={<RepSalario/>}  ></Route>
   <Route  exact path='/repconse' element={<RepGasto/>}  ></Route>
   <Route  exact path='/carga' element={<CargaVenta/>}  ></Route>
  <Route exact path='/comp' element={<Compra/>}></Route>
  <Route exact path='/pedi' element={<Pedido/>}></Route>
  <Route exact path="/presum" element={<PedidoResum/>}> </Route>
  <Route exact path="/caja" element={<Caja/>}/>
    <Route exact path="/salario" element={<Salario/>}/>
    <Route exact path="/credito" element={<Credito/>}/>



       
   </Routes>
   </BrowserRouter>
  );
}

export default router;
