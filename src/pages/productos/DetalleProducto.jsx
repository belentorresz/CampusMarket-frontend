import {
useEffect,
useState,
useContext
} from "react";

import { crearChat } from "../../api/chatApi";
import { AuthContext } from "../../context/AuthContext";

import {
useParams,
useNavigate
} from "react-router-dom";

import api from "../../api/axios";

import "../../styles/detalle-producto.css";


function DetalleProducto(){


const {id}=useParams();

const navigate = useNavigate();

const {usuario}=useContext(AuthContext);
const [notificacion,setNotificacion] = useState(null);


const [producto,setProducto]=useState(null);





useEffect(()=>{

    cargarProducto();

},[id]);





const cargarProducto=async()=>{

    try{

        const respuesta =
        await api.get(`/productos/${id}`);


        setProducto(respuesta.data);


    }catch(error){

        console.log(error);

    }

};





const contactarVendedor = async()=>{


    try{


        const chat = await crearChat(

            usuario.id,

            producto.usuario.id

        );


        // mandar directamente al chat creado

        navigate(`/chat/${chat.id}`);



    }catch(error){


        console.log(error);

        alert("No se pudo iniciar el chat");


    }


};






if(!producto){

    return <h2>Cargando...</h2>;

}





return(


<div className="detalle-page">


    <div className="detalle-producto">



        <div className="detalle-imagen">


            <img

            src={
                producto.imagen
                ?
                `https://campusmarket-production-98d0.up.railway.app/uploads/productos/${producto.imagen}`
                :
                "https://via.placeholder.com/400"
            }

            alt={producto.nombre}

            />


        </div>







        <div className="detalle-info">



            <h1>

                {producto.nombre}

            </h1>





            <h2 className="detalle-precio">

                S/ {producto.precio}

            </h2>





            <span className="detalle-estado">

                {producto.estado}

            </span>







            <div className="detalle-seccion">


                <h3>
                    Descripción
                </h3>


                <p>
                    {producto.descripcion}
                </p>


            </div>







            <div className="detalle-seccion">


                <h3>
                    Condición
                </h3>


                <p>
                    {producto.condicion}
                </p>


            </div>







            <div className="detalle-seccion">


                <h3>
                    Vendedor
                </h3>


                <p>
                    {producto.usuario?.nombre}
                </p>


            </div>








            {
            usuario?.id !== producto.usuario?.id && (


                <div className="detalle-acciones">



                    <button

                    className="btn-contactar"

                    onClick={contactarVendedor}

                    >

                        Contactar vendedor

                    </button>






                    <button

                    className="btn-comprar"

                    onClick={()=>navigate(`/checkout/${producto.id}`)}

                    >

                        Comprar

                    </button>



                </div>


            )
            }




        </div>


    </div>


</div>


)


}


export default DetalleProducto;