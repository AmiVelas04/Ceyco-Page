import React,{useEffect,useState} from 'react';
import { Button, Form,FormLabel,InputGroup,Row,Table } from 'react-bootstrap';
import axios from "axios";
import moment from "moment";
;

export const ComboPedi = ({id,selecpedi}) => {

    if(id==null)
    {id=0;}

    const URLget1 = "Pedido/pedvendexid/1";
    const UrlOne="Pedido/onepednomxid/";

const [nompedi,setNompedi]=useState(["s/n","s/n","s/n","s/n","s/n"]);
    const [pedi, setPedi] = useState([]);
    const [encpedi, setEncpedi] = useState([]);


    const getPedi = async (idp) => {
      //  console.log("Ruta: " + URLget1 );
      //console.log("usuario: " + idp );
      const response =await axios.get(URLget1);
      return response;
    };


    const datapedi= async (idp)=>{
      let urlfull=UrlOne + idp;
      const response =await axios.get(urlfull);
      var conv=convtoArrNom(response.data);
setNompedi(conv);
selecpedi(idp);
//console.log(conv);
      //return response;
    }

    
    const convtoArrNom = (ArrJson) => {
      var Into = [{}];
      //console.log(ArrJson);
      for (let indi in ArrJson) {
        // console.log(ArrJson.length);
        Into.push([
          ArrJson[indi].iD_PED,
          ArrJson[indi].cli,
          ArrJson[indi].fecha,
          ArrJson[indi].usu,
          ArrJson[indi].total,
          ArrJson[indi].estado,
   
        ]);
      }
      Into.splice(0, 1);
      return Into;
    };

      const convtoArr = (ArrJson) => {
        var Into = [{}];
        //console.log(ArrJson);
        for (let indi in ArrJson) {
          // console.log(ArrJson.length);
          Into.push([
            ArrJson[indi].iD_PED,
            ArrJson[indi].iD_CLI,
            ArrJson[indi].fecha,
            ArrJson[indi].iD_USU,
            ArrJson[indi].total,
            ArrJson[indi].estado,
     
          ]);
        }
        Into.splice(0, 1);
        return Into;
      };



      const handleSelecto = ({ target }) => {
        setPedi({
          ...pedi,
          [target.name]: target.value,
        });
       
      };

      const selecto=()=>{
let valor =pedi.id_pedi;
datapedi(valor);

      }



   useEffect(() => {
        //usefect body
        getPedi().then((response) => {
          //hacer alggo con esa respuesta
          const devol = convtoArr(response.data);
          
          //console.log(devol);
          setEncpedi(devol);
        });
      }, []);




      return(
        <div>
             <Form>
        <Form.Group className="mb-3 col-12">
          <FormLabel>Pedido</FormLabel>
          <Row className='md d-md-flex'>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-shop"></i>
            </InputGroup.Text>
            <Form.Select aria-label="" onChange={handleSelecto} name="id_pedi">
              {encpedi.map((dato) => (
                <option className="form-group" value={dato[0]}>
                  {dato[0]}
                </option>
              ))}
            </Form.Select>
            <br></br>
            <Button className='btn btn-success' onClick={selecto}>Buscar</Button>
            <br></br>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                        <th>Cliente</th>
                        <th>Vendedor</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{nompedi[0][0]}</td>
<td>{nompedi[0][1]}</td>
<td>{nompedi[0][3]}</td>
<td>{moment(nompedi[0][2]).format("DD-MM-yyyy")}</td>
<td>Q.{nompedi[0][4]}</td>
<td>{nompedi[0][5]}</td>

                    </tr>
                    
                   
                </tbody>
                
            </Table>

          </InputGroup>
          </Row>
        </Form.Group>
   
      </Form>
        </div>
      );
    
}

export default ComboPedi;