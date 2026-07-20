import { useEffect,useState } from "react";
import api from "../api/axios";


function Productos(){


const [productos,setProductos]=useState([]);



useEffect(()=>{


    cargarProductos();


},[]);



const cargarProductos=async()=>{


try{


const respuesta =
await api.get("/productos");


setProductos(
    respuesta.data
);


}catch(error){

console.log(error);

}


};



return(

<div>


<h1>
Productos disponibles
</h1>


{
productos.map(producto=>(


<div key={producto.id}>


<h3>
{producto.nombre}
</h3>


<p>
    <strong>Descripción:</strong> {producto.descripcion}
</p>


<p>
S/. {producto.precio}
</p>


</div>


))

}


</div>

)


}


export default Productos;