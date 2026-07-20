import {
    useEffect,
    useState,
    useContext
} from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

import "../styles/checkout.css";
import "../styles/buttons.css";


function Checkout(){


    const { id } = useParams();

    const navigate = useNavigate();

    const { usuario } = useContext(AuthContext);


    const [producto,setProducto] = useState(null);


    const [metodoPago,setMetodoPago] = useState("YAPE");


    const [referenciaPago,setReferenciaPago] = useState("");
    const [notificacion,setNotificacion] = useState(null);



    useEffect(()=>{

        cargarProducto();

    },[id]);


    {
        notificacion &&

        <Notificacion

        mensaje={notificacion}

        cerrar={()=>setNotificacion(null)}

        />

        }

    const cargarProducto = async()=>{

        try{


            const respuesta =
            await api.get(`/productos/${id}`);


            console.log(
                "PRODUCTO CHECKOUT:",
                respuesta.data
            );


            setProducto(respuesta.data);



        }catch(error){

            console.log(error);

        }

    };






    const copiar = async(texto)=>{


        if(!texto){

            setNotificacion(
                "No hay información para copiar"
            );

            return;

        }


        await navigator.clipboard.writeText(texto);


        setNotificacion(
            "Copiado al portapapeles"
        );

    };







    const confirmarCompra = async () => {

        if (!metodoPago) {
            setNotificacion("Seleccione un método de pago");
            return;
        }

        if (!usuario?.id) {
            setNotificacion("No se encontró el usuario autenticado.");
            console.log("Usuario:", usuario);
            return;
        }

        if (!producto?.id) {
            setNotificacion("No se encontró el producto.");
            return;
        }

        const datosCompra = {
            productoId: producto.id,
            compradorId: usuario.id,
            metodoPago,
            numeroPago: usuario.numeroCelular || "",
            referenciaPago
        };

        console.log("DATOS ENVIADOS:", datosCompra);

        try {

            const respuesta = await api.post("/compras", datosCompra);

            console.log("COMPRA:", respuesta.data);

            setNotificacion("Compra registrada correctamente");

            navigate("/mis-compras");

        } catch (error) {

            console.error("ERROR:", error);

            console.error("STATUS:", error.response?.status);

            console.error("DATA:", error.response?.data);

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                error.message
            );
        }
    };






    if(!producto){

        return <h2>Cargando...</h2>;

    }





return(

<div className="checkout-page">


<div className="checkout-grid">



<div className="checkout-left">



<h1>
Checkout
</h1>


<p>
Selecciona un método de pago.
</p>





<div className="payment-tabs">



<button
className={
    metodoPago==="YAPE"
    ?
    "tab active"
    :
    "tab"
}
onClick={()=>setMetodoPago("YAPE")}
>
Yape
</button>




<button
className={
    metodoPago==="PLIN"
    ?
    "tab active"
    :
    "tab"
}
onClick={()=>setMetodoPago("PLIN")}
>
Plin
</button>





<button
className={
    metodoPago==="TARJETA"
    ?
    "tab active"
    :
    "tab"
}
onClick={()=>setMetodoPago("TARJETA")}
>
Tarjeta
</button>



</div>






{
(metodoPago==="YAPE" || metodoPago==="PLIN")
&&
<>


<div className="checkout-field">


<label>
Número del vendedor
</label>



<div className="copy-row">


<input

readOnly

value={
producto.usuario?.numeroCelular || 
"No registrado"
}

/>



<button

className="btn-secondary"

onClick={()=>copiar(
producto.usuario?.numeroCelular
)}

>
Copiar
</button>


</div>


</div>








<div className="checkout-field">


<label>
Concepto
</label>



<div className="copy-row">


<input

readOnly

value={
`AYNI-${producto.id}`
}

/>



<button

className="btn-secondary"

onClick={()=>copiar(
`AYNI-${producto.id}`
)}

>
Copiar
</button>


</div>


</div>







<div className="checkout-field">


<label>
Referencia del pago (opcional)
</label>



<input

className="form-control"

placeholder="Ejemplo: Yape 10:30pm"

value={referenciaPago}

onChange={
e=>setReferenciaPago(
e.target.value
)
}

/>


</div>






<div className="checkout-info">

Luego de realizar el pago, presiona
<b> Confirmar pago</b>.
El vendedor verificará la operación.

</div>



</>

}








{
metodoPago==="TARJETA"
&&
<div className="checkout-card">



<div className="checkout-field">

<label>
Número de tarjeta
</label>


<input

className="form-control"

placeholder="1234 5678 9012 3456"

/>


</div>






<div className="checkout-row">


<div className="checkout-field">

<label>
Fecha vencimiento
</label>


<input

className="form-control"

placeholder="MM/AA"

/>


</div>





<div className="checkout-field">

<label>
CVV
</label>


<input

className="form-control"

placeholder="123"

/>


</div>


</div>







<div className="checkout-field">

<label>
Titular
</label>


<input

className="form-control"

placeholder="Nombre de la tarjeta"

/>


</div>




</div>

}



</div>









<div className="checkout-right">


<h2>
Resumen
</h2>



<div className="summary-card">



<h3>
{producto.nombre}
</h3>




<p>
Vendedor
</p>


<strong>
{
producto.usuario?.nombre
}
</strong>



<p>
Número de contacto
</p>


<strong>
{
producto.usuario?.numeroCelular ||
"No registrado"
}
</strong>




<p>
Total
</p>



<h1>
S/ {producto.precio}
</h1>




<button

className="btn-primary btn-block"

onClick={confirmarCompra}

>

Confirmar pago S/ {producto.precio}

</button>



</div>


</div>







</div>


</div>


);


}


export default Checkout;