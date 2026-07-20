import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

import "../styles/producto-card.css";


function ProductoCard({producto}){

    const { usuario } = useContext(AuthContext);

const [favorito, setFavorito] = useState(false);

useEffect(() => {

    if(usuario){

        verificarFavorito();

    }

}, [usuario, producto.id]);



const verificarFavorito = async () => {

    try{

        const respuesta = await api.get(
            `/favoritos/existe?usuarioId=${usuario.id}&productoId=${producto.id}`
        );

        setFavorito(respuesta.data);

    }catch(error){

        console.log(error);

    }

};



const cambiarFavorito = async (e) => {

    e.preventDefault();

    e.stopPropagation();

    if(!usuario){

        alert("Debes iniciar sesión.");

        return;

    }

    try{

        if(favorito){

            await api.delete(
                `/favoritos?usuarioId=${usuario.id}&productoId=${producto.id}`
            );

            setFavorito(false);

        }else{

            await api.post("/favoritos",{

                usuarioId:usuario.id,

                productoId:producto.id

            });

            setFavorito(true);

        }

    }catch(error){

        console.log(error);

    }

};


return(

<div className="producto-card">


    <div className="producto-imagen">

        <button
            className="btn-favorito"
            onClick={cambiarFavorito}
        >
            {favorito ? "❤️" : "🤍"}
        </button>

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



    <div className="producto-info">


        <h3>
            {producto.nombre}
        </h3>



        <p className="descripcion">

            {producto.descripcion}

        </p>



        <p className="precio">

            S/. {producto.precio}

        </p>



        <span className="estado">

            {producto.estado}

        </span>



        <Link

            to={`/producto/${producto.id}`}

            className="btn-ver"

        >

            Ver producto

        </Link>



    </div>


</div>

)


}


export default ProductoCard;