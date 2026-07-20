import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import ProductoCard from "../components/ProductoCard";
import "../styles/home.css";
import comunidad from "../assets/comunidad.png";
import lazos from "../assets/lazos.png";
import chat from "../assets/chat.png";
import perfil from "../assets/perfil.png";


function Home(){


    const [productos,setProductos] = useState([]);



    useEffect(()=>{


        cargarProductos();


    },[]);



    const cargarProductos = async()=>{


        try{

const respuesta = await api.get("/productos");

setProductos(
    Array.isArray(respuesta.data)
        ? respuesta.data.slice(0,6)
        : []
);

        }catch(error){

            console.log(error);

        }


    };



    return(

    <div className="home">


        <section className="hero">


            <div className="hero-text">


                <h1>
                    Bienvenido a AyniUnsa
                </h1>


                <p>
                    Compra, vende y conecta con estudiantes
                    de la Universidad Nacional de San Agustín.
                </p>



                <div className="hero-buttons">


                    <Link
                    to="/productos"
                    className="btn-primary"
                    >
                        Explorar productos
                    </Link>



                    <Link
                    to="/publicar"
                    className="btn-secondary"
                    >
                        Publicar producto
                    </Link>


                </div>


            </div>



<section className="hero">


    <div className="hero-right">

        <div className="hero-card">
            <img src={comunidad} alt="Comunidad" />
        </div>

        <div className="hero-card">
            <img src={lazos} alt="Reciprocidad" />
        </div>

        <div className="hero-card">
            <img src={perfil} alt="Perfil" />
        </div>

        <div className="hero-card">
            <img src={chat} alt="Chat" />
        </div>

    </div>

</section>


        </section>





        <section className="productos-home">


            <div className="section-header">


                <h2>
                    Productos recientes
                </h2>


                <Link
                to="/productos"
                >
                    Ver todos
                </Link>


            </div>



            <div className="productos-grid">


            {
                productos.map(producto=>(

                    <ProductoCard

                    key={producto.id}

                    producto={producto}

                    />

                ))
            }


            </div>


        </section>



    </div>

    )


}


export default Home;