import {
    useContext,
    useEffect,
    useState
} from "react";

import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import Notificacion from "../components/Notificacion";

import "../styles/ventas.css";


function Ventas(){

    const { usuario } = useContext(AuthContext);


    const [ventas,setVentas] = useState([]);


    const [notificacion,setNotificacion] = useState(null);



    useEffect(()=>{

        if(usuario){

            cargarVentas();

        }

    },[usuario]);



    const cargarVentas = async()=>{

        try{

            const respuesta =
            await api.get(
                `/compras/vendedor/${usuario.id}`
            );


            setVentas(respuesta.data);


        }catch(error){

            console.log(error);

        }

    };





    const aceptarVenta = async(id)=>{

        try{

            await api.put(
                `/compras/${id}/aceptar`
            );


            setNotificacion(
                "Venta confirmada"
            );


            cargarVentas();


        }catch(error){

            console.log(error);

            setNotificacion(
                "No se pudo confirmar la venta"
            );

        }

    };





    const cancelarVenta = async(id)=>{

        try{

            await api.put(
                `/compras/${id}/cancelar`
            );


            setNotificacion(
                "Venta cancelada"
            );


            cargarVentas();


        }catch(error){

            console.log(error);

            setNotificacion(
                "No se pudo cancelar la venta"
            );

        }

    };





return(

<>


{
notificacion &&

<Notificacion

mensaje={notificacion}

tipo="success"

cerrar={()=>setNotificacion(null)}

/>

}



<div className="ventas-page">


<h1>
💰 Mis Ventas
</h1>



{
ventas.length === 0 ?

<p>
No tienes ventas pendientes.
</p>


:


ventas.map(venta=>(


<div 
className="venta-card"
key={venta.id}
>


<div>


<h2>
{venta.producto.nombre}
</h2>


<p>
Comprador:
</p>

<strong>
{venta.comprador.nombre}
</strong>



<p>
Método de pago:
</p>

<strong>
{venta.metodoPago}
</strong>



{
venta.referenciaPago &&
<>
<p>
Referencia:
</p>

<strong>
{venta.referenciaPago}
</strong>
</>
}



<p>
Estado:
</p>


<span className={
    venta.estado==="ACEPTADA"
    ?
    "estado vendido"
    :
    venta.estado==="CANCELADA"
    ?
    "estado cancelado"
    :
    "estado pendiente"
}
>
{venta.estado}
</span>



</div>





{
venta.estado==="PENDIENTE"
&&

<div className="acciones">


<button
className="btn-aceptar"
onClick={()=>
    aceptarVenta(venta.id)
}
>
Aceptar venta
</button>



<button
className="btn-cancelar"
onClick={()=>
    cancelarVenta(venta.id)
}
>
Cancelar
</button>


</div>

}


</div>


))


}



</div>


</>

);


}


export default Ventas;